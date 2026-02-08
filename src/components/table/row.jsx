// Utilities
import { IndividualPayment } from '/utilities/shapes/payment';

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
        <span className="dollar-amount">${remainingBalance.toFixed(2)}</span>
      </td>
      <td>
        <span className="dollar-amount">${interestPaid.toFixed(2)}</span>
      </td>
      <td>
        <span className="dollar-amount">${interestPaidToDate.toFixed(2)}</span>
      </td>
    </tr>
  );
};

TableRow.propTypes = IndividualPayment.isRequired;
