import { describe, it, expect } from 'vitest';
import { store } from './index';

describe('reducers index', () => {
  it('should create store with initial state', () => {
    const state = store.getState();
    expect(state).toHaveProperty('interest');
    expect(state.interest).toEqual({
      balance: 10000,
      interestRate: 6.25,
      payment: 175,
      modifier: 5,
    });
  });

  it('should allow dispatching actions', () => {
    const initialState = store.getState();
    store.dispatch({
      type: 'amortization-calc/KEY_SET',
      keyName: 'balance',
      keyValue: 5000,
    });
    const newState = store.getState();
    expect(newState.interest.balance).toBe(5000);
    
    // Reset back to initial
    store.dispatch({ type: 'amortization-calc/ALL_CLEAR' });
  });
});
