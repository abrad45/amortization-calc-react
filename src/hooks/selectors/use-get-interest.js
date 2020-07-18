import { useSelector } from 'react-redux';

const getInterest = (state) => state.interest;

export const useGetInterest = () => useSelector(getInterest);
