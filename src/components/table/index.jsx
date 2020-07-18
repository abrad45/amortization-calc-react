import React from 'react';

// Components
import { TableRow } from './row';
import { AmountError } from './error';

// Hooks
import { useMakeTable } from '/hooks/selectors';
import { useResetAllData } from '/hooks/actions';

export const PaymentsTable = () => {
    const paymentsData = useMakeTable();
    const resetPaymentData = useResetAllData();

    // @TODO uggo
    if (paymentsData.error === 'insufficient_payment') {
        return <AmountError />;
    }

    return (
        <div className="payment-table">
            <h3>You'll be paid off in {paymentsData.length} months!</h3>
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
                    {paymentsData.map((payment) => (
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

PaymentsTable.propTypes = {};
