import PropTypes from 'prop-types';

// Utilities
import { useResetAllData } from '/hooks/actions';

// @TODO in the future, we can show different error messages depending
// on the `value` prop. For now we only have one error, so nothing reads it
// yet — it's still declared in propTypes below as the intended API.

export const DataError = () => {
  const resetPaymentData = useResetAllData();

  return (
    <div className="notification is-danger is-light mt-5">
      <button className="delete" onClick={resetPaymentData} />
      <p className="is-size-4">So, some bad news.</p>
      <p>
        You're never going to pay off your loan at this rate. You've got to
        reduce the interest rate you're paying or pay up faster. Sorry!
      </p>
      <p>
        <em>
          Dismissing this will reset the data to its original state, clearing
          out your input
        </em>
      </p>
    </div>
  );
};

DataError.propTypes = {
  value: PropTypes.string.isRequired,
};
