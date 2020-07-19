import PropTypes from 'prop-types';

export const IndividualPayment = PropTypes.shape({
    monthNumber: PropTypes.number,
    paymentCount: PropTypes.number,
    remainingBalance: PropTypes.number,
    dateString: PropTypes.string,
    interestPaid: PropTypes.number,
    interestPaidToDate: PropTypes.number,
});

export const PaymentDataShape = PropTypes.arrayOf(IndividualPayment);
