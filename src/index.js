import React from 'react';
import ReactDOM from 'react-dom';

// Utilities
import bulma from 'bulma';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '/reducers';

// Components
import { Footer } from '/components/footer';
import { Sidebar } from '/components/sidebar';

// Routes
import { InterestCalc } from '/routes/interest';
import { WeightedInterest } from '/routes/weight';

const App = () => (
    <Provider store={store}>
        <Router>
            <div className="container">
                <h1 className="is-size-1">
                    Student Loan Amortization Calculator
                </h1>
                <div className="columns">
                    <div className="column is-three-quarters">
                        <Switch>
                            <Route path="/" exact>
                                <InterestCalc />
                            </Route>
                            <Route path="/weighted-interest">
                                <WeightedInterest />
                            </Route>
                        </Switch>
                    </div>
                    <Sidebar />
                </div>
                <div className="columns">
                    <Footer />
                </div>
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
