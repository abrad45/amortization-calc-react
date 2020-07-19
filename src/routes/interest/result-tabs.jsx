import React, { useState } from 'react';

// Components
import { PaymentsTable } from '/components/table';
import { InterestFields } from './fields';
import { PaymentsGraph } from './graph';
import { Results } from './results';

// Utilities
import { useGetPaymentData } from '/hooks/selectors';

export const ResultTabs = ({ activeTab, setActiveTab }) => {
    const isTableActive = activeTab === 'table';
    const isGraphActive = activeTab === 'graph';

    const onTableClick = () => setActiveTab('table');
    const onGraphClick = () => setActiveTab('graph');

    return (
        <div className="tabs is-medium">
            <ul>
                <li className={`${isTableActive && 'is-active'}`}>
                    <a onClick={onTableClick}>Table</a>
                </li>
                <li className={`${isGraphActive && 'is-active'}`}>
                    <a onClick={onGraphClick}>Graph</a>
                </li>
            </ul>
        </div>
    );
};
