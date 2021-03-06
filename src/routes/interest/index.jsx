import React, { useState } from 'react';

// Components
import { PaymentsTable } from '/components/table';
import { InterestFields } from './fields';
import { PaymentsGraph } from './graph';
import { Results } from './results';

// Utilities
import { useGetPaymentData } from '/hooks/selectors';

export const InterestCalc = () => {
    const [activeTab, setActiveTab] = useState('table');
    const isTableActive = activeTab === 'table';
    const isGraphActive = activeTab === 'graph';

    const onTableClick = () => setActiveTab('table');
    const onGraphClick = () => setActiveTab('graph');

    const paymentData = useGetPaymentData();

    return (
        <div className="interest-calculation">
            <InterestFields />
            <Results />
        </div>
    );
};
