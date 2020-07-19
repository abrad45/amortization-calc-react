import React from 'react';

// Components
import { TableRow } from './row';
import { AmountError } from '../error';

// Hooks
import { useGetPaymentData } from '/hooks/selectors';
import { useResetAllData } from '/hooks/actions';

// Utilities
import { PaymentDataShape } from '/utilities/shapes/payment';

export const PaymentsTable = ({ data = [] }) => {
    const resetPaymentData = useResetAllData();

    return (
        <div className="payment-table">
            <h3>You'll be paid off in {data.length} months!</h3>
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
