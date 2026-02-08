import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Utilities
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

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
