import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { useGetPaymentData } from './use-get-payment-data';
import interestReducer from '/reducers/interest';

const createTestStore = (interestState = {}) => {
  const rootReducer = combineReducers({ interest: interestReducer });
  const store = createStore(rootReducer);
  
  // Update state if custom values provided
  if (Object.keys(interestState).length > 0) {
    Object.entries(interestState).forEach(([key, value]) => {
      store.dispatch({
        type: 'amortization-calc/KEY_SET',
        keyName: key,
        keyValue: value,
      });
    });
  }
  
  return store;
};

const wrapper = ({ children, store }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useGetPaymentData', () => {
  beforeEach(() => {
    // Mock date to get consistent results
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 0, 1)); // Jan 1, 2024
  });

  it('should calculate payment data with default values', () => {
    const store = createTestStore();
    const { result } = renderHook(() => useGetPaymentData(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current[0]).toHaveProperty('paymentCount');
    expect(result.current[0]).toHaveProperty('remainingBalance');
    expect(result.current[0]).toHaveProperty('dateString');
    expect(result.current[0]).toHaveProperty('interestPaid');
    expect(result.current[0]).toHaveProperty('interestPaidToDate');
  });

  it('should return error when payment is insufficient', () => {
    const store = createTestStore({
      balance: 10000,
      interestRate: 50, // Very high interest rate
      payment: 10, // Very low payment
      modifier: 5,
    });

    const { result } = renderHook(() => useGetPaymentData(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    expect(result.current).toEqual({ error: 'insufficient_payment' });
  });

  it('should calculate correct remaining balance over time', () => {
    const store = createTestStore({
      balance: 1000,
      interestRate: 6,
      payment: 100,
      modifier: 5,
    });

    const { result } = renderHook(() => useGetPaymentData(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    expect(Array.isArray(result.current)).toBe(true);
    
    // First payment should reduce balance
    if (result.current.length > 0) {
      expect(result.current[0].remainingBalance).toBeLessThan(1000);
    }
    
    // Last payment should have balance of 0 or close to 0
    const lastPayment = result.current[result.current.length - 1];
    expect(lastPayment.remainingBalance).toBe(0);
  });

  it('should accumulate interest paid over time', () => {
    const store = createTestStore({
      balance: 1000,
      interestRate: 6,
      payment: 100,
      modifier: 5,
    });

    const { result } = renderHook(() => useGetPaymentData(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    if (result.current.length > 1) {
      expect(result.current[1].interestPaidToDate).toBeGreaterThan(
        result.current[0].interestPaidToDate
      );
    }
  });

  it('should increment payment count', () => {
    const store = createTestStore({
      balance: 500,
      interestRate: 5,
      payment: 100,
      modifier: 5,
    });

    const { result } = renderHook(() => useGetPaymentData(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    if (result.current.length > 1) {
      expect(result.current[0].paymentCount).toBe(1);
      expect(result.current[1].paymentCount).toBe(2);
    }
  });

  it('should generate date strings', () => {
    const store = createTestStore({
      balance: 500,
      interestRate: 5,
      payment: 100,
      modifier: 5,
    });

    const { result } = renderHook(() => useGetPaymentData(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    if (result.current.length > 0) {
      expect(result.current[0].dateString).toMatch(/^\d{2}\/20\d{2}$/);
    }
  });

  it('should round currency values correctly', () => {
    const store = createTestStore({
      balance: 1000,
      interestRate: 6.25,
      payment: 100,
      modifier: 5,
    });

    const { result } = renderHook(() => useGetPaymentData(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    if (result.current.length > 0) {
      const payment = result.current[0];
      // Check that values have at most 2 decimal places
      expect(Number.isInteger(payment.remainingBalance * 100)).toBe(true);
      expect(Number.isInteger(payment.interestPaid * 100)).toBe(true);
      expect(Number.isInteger(payment.interestPaidToDate * 100)).toBe(true);
    }
  });

  it('should handle small balances', () => {
    const store = createTestStore({
      balance: 50,
      interestRate: 5,
      payment: 20,
      modifier: 5,
    });

    const { result } = renderHook(() => useGetPaymentData(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current[result.current.length - 1].remainingBalance).toBe(0);
  });
});
