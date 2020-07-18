import React from 'react';
import { useSelector } from 'react-redux';

export const InterestCalc = () => {
    // @TODO
    const interest = useSelector((state) => state.interest);
    console.log(interest);

    return <h2>InterestCalc!</h2>;
};
