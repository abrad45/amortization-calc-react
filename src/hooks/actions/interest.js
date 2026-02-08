import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  resetAllData,
  setBalance,
  setInterest,
  setPayment,
  setModifier,
} from '/reducers/interest';

export const useSetBalance = (value) => {
  const dispatch = useDispatch();

  return useCallback((value) => dispatch(setBalance(value)), [dispatch]);
};

export const useSetInterest = (value) => {
  const dispatch = useDispatch();

  return useCallback((value) => dispatch(setInterest(value)), [dispatch]);
};

export const useSetPayment = (value) => {
  const dispatch = useDispatch();

  return useCallback((value) => dispatch(setPayment(value)), [dispatch]);
};

export const useSetModifier = (value) => {
  const dispatch = useDispatch();

  return useCallback((value) => dispatch(setModifier(value)), [dispatch]);
};

export const useResetAllData = () => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(resetAllData()), [dispatch]);
};
