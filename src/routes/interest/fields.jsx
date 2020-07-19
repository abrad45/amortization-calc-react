import React from 'react';

// Components
import { Field } from '/components/field';

// Utilities
import { useGetInterest } from '/hooks/selectors';
import {
    useSetBalance,
    useSetInterest,
    useSetPayment,
    useSetModifier,
} from '/hooks/actions';

export const InterestFields = () => {
    const { balance, interestRate, payment, modifier } = useGetInterest();

    const setBalance = useSetBalance();
    const setInterest = useSetInterest();
    const setPayment = useSetPayment();
    const setModifier = useSetModifier();

    return (
        <div className="data-collection">
            <Field
                label="Balance"
                value={balance}
                prefix="$"
                helpText="Total remaining amount"
                onChange={setBalance}
            />
            <Field
                label="Interest Rate"
                value={interestRate}
                suffix="%"
                helpText="Weighted rate (see sidebar)"
                onChange={setInterest}
            />
            <Field
                label="Monthly Payment"
                value={payment}
                prefix="$"
                helpText="What can you comfortably pay now?"
                onChange={setPayment}
            />
            {/*
            <Field
                label="Payoff Modifier"
                value={modifier}
                suffix="%"
                helpText="See the results of paying this much more or less"
                onChange={setModifier}
            />*/}
        </div>
    );
};
