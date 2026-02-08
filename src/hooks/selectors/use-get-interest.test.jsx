import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { useGetInterest } from './use-get-interest';
import interestReducer from '/reducers/interest';

const createTestStore = (initialState = {}) => {
  const rootReducer = combineReducers({ interest: interestReducer });
  return createStore(rootReducer, initialState);
};

const wrapper = ({ children, store }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useGetInterest', () => {
  it('should return interest state from store', () => {
    const store = createTestStore();
    const { result } = renderHook(() => useGetInterest(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    expect(result.current).toEqual({
      balance: 10000,
      interestRate: 6.25,
      payment: 175,
      modifier: 5,
    });
  });

  it('should return updated state after dispatch', () => {
    const store = createTestStore();
    const { result } = renderHook(() => useGetInterest(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    act(() => {
      store.dispatch({
        type: 'amortization-calc/KEY_SET',
        keyName: 'balance',
        keyValue: 5000,
      });
    });

    expect(result.current.balance).toBe(5000);
  });

  it('should use shallow equality for optimization', () => {
    const store = createTestStore();
    const { result, rerender } = renderHook(() => useGetInterest(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    const firstResult = result.current;
    rerender();
    const secondResult = result.current;

    // Should be the same reference if state hasn't changed
    expect(firstResult).toBe(secondResult);
  });
});
