import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import {
  useSetBalance,
  useSetInterest,
  useSetPayment,
  useSetModifier,
  useResetAllData,
} from './interest';
import interestReducer from '/reducers/interest';

const createTestStore = () => {
  const rootReducer = combineReducers({ interest: interestReducer });
  return createStore(rootReducer);
};

const wrapper = ({ children, store }) => (
  <Provider store={store}>{children}</Provider>
);

describe('interest action hooks', () => {
  describe('useSetBalance', () => {
    it('should return a function that dispatches setBalance action', () => {
      const store = createTestStore();
      const { result } = renderHook(() => useSetBalance(), {
        wrapper: ({ children }) => wrapper({ children, store }),
      });

      expect(typeof result.current).toBe('function');
      
      act(() => {
        result.current(5000);
      });

      expect(store.getState().interest.balance).toBe(5000);
    });
  });

  describe('useSetInterest', () => {
    it('should return a function that dispatches setInterest action', () => {
      const store = createTestStore();
      const { result } = renderHook(() => useSetInterest(), {
        wrapper: ({ children }) => wrapper({ children, store }),
      });

      expect(typeof result.current).toBe('function');
      
      act(() => {
        result.current(4.5);
      });

      expect(store.getState().interest.interestRate).toBe(4.5);
    });
  });

  describe('useSetPayment', () => {
    it('should return a function that dispatches setPayment action', () => {
      const store = createTestStore();
      const { result } = renderHook(() => useSetPayment(), {
        wrapper: ({ children }) => wrapper({ children, store }),
      });

      expect(typeof result.current).toBe('function');
      
      act(() => {
        result.current(200);
      });

      expect(store.getState().interest.payment).toBe(200);
    });
  });

  describe('useSetModifier', () => {
    it('should return a function that dispatches setModifier action', () => {
      const store = createTestStore();
      const { result } = renderHook(() => useSetModifier(), {
        wrapper: ({ children }) => wrapper({ children, store }),
      });

      expect(typeof result.current).toBe('function');
      
      act(() => {
        result.current(10);
      });

      expect(store.getState().interest.modifier).toBe(10);
    });
  });

  describe('useResetAllData', () => {
    it('should return a function that dispatches resetAllData action', () => {
      const store = createTestStore();
      
      // First modify the state
      store.dispatch({
        type: 'amortization-calc/KEY_SET',
        keyName: 'balance',
        keyValue: 5000,
      });
      
      expect(store.getState().interest.balance).toBe(5000);

      const { result } = renderHook(() => useResetAllData(), {
        wrapper: ({ children }) => wrapper({ children, store }),
      });

      expect(typeof result.current).toBe('function');
      
      act(() => {
        result.current();
      });

      expect(store.getState().interest).toEqual({
        balance: 10000,
        interestRate: 6.25,
        payment: 175,
        modifier: 5,
      });
    });
  });
});
