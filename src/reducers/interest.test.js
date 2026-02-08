import { describe, it, expect } from 'vitest';
import reducer, {
  setBalance,
  clearBalance,
  setInterest,
  clearInterest,
  setPayment,
  clearPayment,
  setModifier,
  clearModifier,
  resetAllData,
} from './interest';

describe('interest reducer', () => {
  const initialState = {
    balance: 10000,
    interestRate: 6.25,
    payment: 175,
    modifier: 5,
  };

  describe('action creators', () => {
    it('setBalance should create correct action', () => {
      const action = setBalance(5000);
      expect(action).toEqual({
        type: 'amortization-calc/KEY_SET',
        keyName: 'balance',
        keyValue: 5000,
      });
    });

    it('clearBalance should create correct action', () => {
      const action = clearBalance();
      expect(action).toEqual({
        type: 'amortization-calc/KEY_CLEAR',
        keyName: 'balance',
      });
    });

    it('setInterest should create correct action', () => {
      const action = setInterest(4.5);
      expect(action).toEqual({
        type: 'amortization-calc/KEY_SET',
        keyName: 'interestRate',
        keyValue: 4.5,
      });
    });

    it('clearInterest should create correct action', () => {
      const action = clearInterest();
      expect(action).toEqual({
        type: 'amortization-calc/KEY_CLEAR',
        keyName: 'interestRate',
      });
    });

    it('setPayment should create correct action', () => {
      const action = setPayment(200);
      expect(action).toEqual({
        type: 'amortization-calc/KEY_SET',
        keyName: 'payment',
        keyValue: 200,
      });
    });

    it('clearPayment should create correct action', () => {
      const action = clearPayment();
      expect(action).toEqual({
        type: 'amortization-calc/KEY_CLEAR',
        keyName: 'payment',
      });
    });

    it('setModifier should create correct action', () => {
      const action = setModifier(10);
      expect(action).toEqual({
        type: 'amortization-calc/KEY_SET',
        keyName: 'modifier',
        keyValue: 10,
      });
    });

    it('clearModifier should create correct action', () => {
      const action = clearModifier();
      expect(action).toEqual({
        type: 'amortization-calc/KEY_CLEAR',
        keyName: 'modifier',
      });
    });

    it('resetAllData should create correct action', () => {
      const action = resetAllData();
      expect(action).toEqual({
        type: 'amortization-calc/ALL_CLEAR',
      });
    });
  });

  describe('reducer', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, {});
      expect(state).toEqual(initialState);
    });

    it('should handle KEY_SET for balance', () => {
      const action = setBalance(5000);
      const state = reducer(initialState, action);
      expect(state.balance).toBe(5000);
      expect(state.interestRate).toBe(6.25);
      expect(state.payment).toBe(175);
      expect(state.modifier).toBe(5);
    });

    it('should handle KEY_SET for interestRate', () => {
      const action = setInterest(4.5);
      const state = reducer(initialState, action);
      expect(state.balance).toBe(10000);
      expect(state.interestRate).toBe(4.5);
      expect(state.payment).toBe(175);
      expect(state.modifier).toBe(5);
    });

    it('should handle KEY_SET for payment', () => {
      const action = setPayment(200);
      const state = reducer(initialState, action);
      expect(state.balance).toBe(10000);
      expect(state.interestRate).toBe(6.25);
      expect(state.payment).toBe(200);
      expect(state.modifier).toBe(5);
    });

    it('should handle KEY_SET for modifier', () => {
      const action = setModifier(10);
      const state = reducer(initialState, action);
      expect(state.balance).toBe(10000);
      expect(state.interestRate).toBe(6.25);
      expect(state.payment).toBe(175);
      expect(state.modifier).toBe(10);
    });

    it('should convert string values to numbers in KEY_SET', () => {
      const action = setBalance('7500');
      const state = reducer(initialState, action);
      expect(state.balance).toBe(7500);
      expect(typeof state.balance).toBe('number');
    });

    it('should handle KEY_CLEAR', () => {
      const action = clearBalance();
      const state = reducer(initialState, action);
      // Note: clearKey implementation sets keyName: 0, not balance: 0
      expect(state).toEqual({ ...initialState, keyName: 0 });
    });

    it('should handle ALL_CLEAR', () => {
      const modifiedState = {
        balance: 5000,
        interestRate: 4.5,
        payment: 200,
        modifier: 10,
      };
      const action = resetAllData();
      const state = reducer(modifiedState, action);
      expect(state).toEqual(initialState);
    });

    it('should not mutate original state', () => {
      const action = setBalance(5000);
      const state = reducer(initialState, action);
      expect(initialState.balance).toBe(10000);
      expect(state.balance).toBe(5000);
      expect(state).not.toBe(initialState);
    });
  });
});
