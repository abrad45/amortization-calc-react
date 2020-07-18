import React from 'react';

import { Link } from 'react-router-dom';

export const Sidebar = () => (
    <div className="column has-background-primary-light">
        <h2 className="is-size-3">Instructions</h2>
        <div className="content">
            <ol>
                <li>
                    Figure out your{' '}
                    <Link to="/weighted-interest">weighted interest rate</Link>
                </li>
                <li>
                    Enter some stuff into <Link to="/">the calculator</Link>
                </li>
                <li>Click Calculate</li>
                <li>
                    <strike>Profit</strike> Be informed!
                </li>
            </ol>
        </div>
    </div>
);
