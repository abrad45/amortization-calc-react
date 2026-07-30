import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  resetAllData,
  setBalance,
  setInterest,
  setPayment,
  setModifier,
} from '/reducers/interest';

export const useSetBalance = () => {
  const dispatch = useDispatch();

  return useCallback((value) => dispatch(setBalance(value)), [dispatch]);
};

export const useSetInterest = () => {
  const dispatch = useDispatch();

  return useCallback((value) => dispatch(setInterest(value)), [dispatch]);
};

export const useSetPayment = () => {
  const dispatch = useDispatch();

  return useCallback((value) => dispatch(setPayment(value)), [dispatch]);
};

export const useSetModifier = () => {
  const dispatch = useDispatch();

  return useCallback((value) => dispatch(setModifier(value)), [dispatch]);
};

export const useResetAllData = () => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(resetAllData()), [dispatch]);
};
