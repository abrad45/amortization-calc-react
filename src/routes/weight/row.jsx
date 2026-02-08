import PropTypes from 'prop-types';

// Components
import { Field } from '/components/field/index';

// @TODO for now, just going to hook this up to update local
// state rather than doing a whole redux thing. Maybe that'd be better but I think this'll work

export const WeightedInterestRow = ({
  index = 0,
  update,
  data: { amount, interest },
}) => {
  const updateAmount = (value) => update('amount', index, value);
  const updateInterest = (value) => update('interest', index, value);

  return (
    <div className="field is-grouped">
      <div className="field-body">
        <Field
          label="I owe: "
          value={amount}
          prefix="$"
          onChange={updateAmount}
          isHorizontal
        />
        <Field
          label="...at..."
          value={interest}
          prefix="$"
          onChange={updateInterest}
          isHorizontal
        />
        <label className="ml-2 label field-label is-normal">...and...</label>
      </div>
    </div>
  );
};

WeightedInterestRow.propTypes = {
  index: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
  data: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    interest: PropTypes.number.isRequired,
  }).isRequired,
};
