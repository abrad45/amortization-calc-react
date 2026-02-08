import React, { useState } from 'react';

// Components
import { PaymentsTable } from '/components/table';
import { DataError } from '/components/error';
import { PaymentsGraph } from './graph';
import { ResultTabs } from './result-tabs';

// Utilities
import { useGetPaymentData } from '/hooks/selectors';

export const Results = () => {
  const [activeTab, setActiveTab] = useState('table');
  const isTableActive = activeTab === 'table';
  const isGraphActive = activeTab === 'graph';

  const paymentData = useGetPaymentData();
  const errorString = paymentData.error || false;

  if (errorString) {
    return <DataError value={errorString} />;
  }

  return (
    <div className="interest-results">
      <ResultTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {isTableActive && <PaymentsTable data={paymentData} />}
      {isGraphActive && <PaymentsGraph data={paymentData} />}
    </div>
  );
};
