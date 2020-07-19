import React from 'react';
import PropTypes from 'prop-types';

// @TODO in the future, we can show different error messages depending
// on `value` prop. For now, we only have one error.

export const DataError = ({ value }) => (
    <div className="notification is-danger is-light mt-5">
        <button className="delete" onClick={resetPaymentData} />
        <p className="is-size-4">So, some bad news.</p>
        <p>
            You're never going to pay off your loan at this rate. You've got to
            reduce the interest rate you're paying or pay up faster. Sorry!
        </p>
        <p>
            <em>
                Dismissing this will reset the data to its original state,
                clearing out your input
            </em>
        </p>
    </div>
);

Error.propTypes = {
    value: PropTypes.string.isRequired,
};
