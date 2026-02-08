import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Results } from './results';
import interestReducer from '/reducers/interest';

// Mock the graph component
vi.mock('./graph', () => ({
  PaymentsGraph: ({ data }) => <div data-testid="graph">Graph with {data.length} items</div>,
}));

const createTestStore = (initialState = {}) => {
  const rootReducer = combineReducers({ interest: interestReducer });
  const store = createStore(rootReducer);
  
  // Update state if custom values provided
  if (Object.keys(initialState).length > 0) {
    Object.entries(initialState).forEach(([key, value]) => {
      store.dispatch({
        type: 'amortization-calc/KEY_SET',
        keyName: key,
        keyValue: value,
      });
    });
  }
  
  return store;
};

describe('Results', () => {
  it('should render table tab by default', () => {
    const store = createTestStore({
      balance: 500,
      interestRate: 5,
      payment: 100,
    });

    render(
      <Provider store={store}>
        <Results />
      </Provider>
    );

    expect(screen.getByText('Table')).toBeInTheDocument();
    expect(screen.getByText('Graph')).toBeInTheDocument();
  });

  it('should render error when payment is insufficient', () => {
    const store = createTestStore({
      balance: 10000,
      interestRate: 50,
      payment: 10,
    });

    render(
      <Provider store={store}>
        <Results />
      </Provider>
    );

    expect(screen.getByText(/So, some bad news./i)).toBeInTheDocument();
  });

  it('should render PaymentsTable when table tab is active', () => {
    const store = createTestStore({
      balance: 500,
      interestRate: 5,
      payment: 100,
    });

    render(
      <Provider store={store}>
        <Results />
      </Provider>
    );

    // Look for table content
    expect(screen.getByText(/You'll be paid off in/i)).toBeInTheDocument();
  });

  it('should have result tabs', () => {
    const store = createTestStore({
      balance: 500,
      interestRate: 5,
      payment: 100,
    });

    const { container } = render(
      <Provider store={store}>
        <Results />
      </Provider>
    );

    const tabs = container.querySelector('.tabs');
    expect(tabs).toBeInTheDocument();
  });
});
