// Components
import { TableRow } from './row';

// Utilities
import { PaymentDataShape } from '/utilities/shapes/payment';

export const PaymentsTable = ({ data = [] }) => {
  return (
    <div className="payment-table">
      <h3>
        You'll be paid off in {data.length} months (just over{' '}
        {Math.floor(data.length / 12)} years)!
      </h3>
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
