import React, { useState } from 'react';

// Components
import { InterestFields } from './fields';
import { PaymentsTable } from '/components/table';

export const InterestCalc = () => {
    const [activeTab, setActiveTab] = useState('table');
    const isTableActive = activeTab === 'table';
    const isGraphActive = activeTab === 'graph';

    return (
        <React.Fragment>
            <InterestFields />
            <div className="tabs is-medium">
                <ul>
                    <li className={`${isTableActive && 'is-active'}`}>
                        <a onClick={() => setActiveTab('table')}>Table</a>
                    </li>
                    <li className={`${isGraphActive && 'is-active'}`}>
                        <a onClick={() => setActiveTab('graph')}>Graph</a>
                    </li>
                </ul>
            </div>
            {isTableActive && <PaymentsTable />}
            {isGraphActive && <h2>Hi</h2>}
        </React.Fragment>
    );
};
