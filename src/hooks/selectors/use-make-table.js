import { useGetInterest } from './';

export const useMakeTable = () => {
    const interestData = useGetInterest();

    return interestData;
};
