// Components
import { TableRow } from './row';

// Utilities
import { PaymentDataShape } from '/utilities/shapes/payment';

const pluralize = (count, noun) => `${count} ${noun}${count === 1 ? '' : 's'}`;

// Under a year the month count says it all; past that, spell out the years
// so nobody has to divide 137 by 12 in their head.
const describePayoffTime = (months) => {
  const total = pluralize(months, 'month');

  if (months < 12) return total;

  const years = Math.floor(months / 12);
  const remainder = months % 12;
  const inYears = remainder
    ? `${pluralize(years, 'year')}, ${pluralize(remainder, 'month')}`
    : pluralize(years, 'year');

  return `${total} (${inYears})`;
};

export const PaymentsTable = ({ data = [] }) => {
  return (
    <div className="payment-table">
      {data.length > 0 && (
        <h3>You'll be paid off in {describePayoffTime(data.length)}!</h3>
      )}
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Payment No.</th>
            <th>Date</th>
            <th>Remaining Balance</th>
            <th>Monthly Interest</th>
            <th>Interest Paid to Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((payment) => (
            <TableRow
              key={`payment_count_${payment.paymentCount}`}
              {...payment}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

PaymentsTable.propTypes = {
  data: PaymentDataShape,
};
