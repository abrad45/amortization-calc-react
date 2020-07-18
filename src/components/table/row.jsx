import React from 'react';
import PropTypes from 'prop-types';

// Components

// Shapes

// Hooks

// Utilities

export const TableRow = ({
    monthNumber,
    paymentCount,
    remainingBalance,
    dateString,
    interestPaid,
    interestPaidToDate,
}) => {
    return (
        <tr className={`payment-data-row month-${monthNumber}`}>
            <th>{paymentCount}</th>
            <td>
                <span className="date">{dateString}</span>
            </td>
            <td>
                <span className="dollar-amount">
                    ${remainingBalance.toFixed(2)}
                </span>
            </td>
            <td>
                <span className="dollar-amount">
                    ${interestPaid.toFixed(2)}
                </span>
            </td>
            <td>
                <span className="dollar-amount">
                    ${interestPaidToDate.toFixed(2)}
                </span>
            </td>
        </tr>
    );
};

TableRow.propTypes = {
    monthNumber: PropTypes.number.isRequired,
    paymentCount: PropTypes.number.isRequired,
    remainingBalance: PropTypes.number.isRequired,
    dateString: PropTypes.string.isRequired,
    interestPaid: PropTypes.number.isRequired,
    interestPaidToDate: PropTypes.number.isRequired,
};
