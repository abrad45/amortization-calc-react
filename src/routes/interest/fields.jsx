// Components
import { Field } from '/components/field/index';

// Utilities
import { useGetInterest } from '/hooks/selectors';
import { useSetBalance, useSetInterest, useSetPayment } from '/hooks/actions';

export const InterestFields = () => {
  const { balance, interestRate, payment } = useGetInterest();

  const setBalance = useSetBalance();
  const setInterest = useSetInterest();
  const setPayment = useSetPayment();

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
      {/* Parked: the Payoff Modifier field. To bring it back, pull `modifier`
          off useGetInterest() and add `const setModifier = useSetModifier();`
          above — both already exist in the reducer and the action hooks.

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
