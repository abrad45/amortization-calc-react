import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { InterestFields } from './fields';
import interestReducer from '/reducers/interest';

const createTestStore = () => {
  const rootReducer = combineReducers({ interest: interestReducer });
  return createStore(rootReducer);
};

describe('InterestFields', () => {
  it('should render all input fields', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <InterestFields />
      </Provider>
    );

    expect(screen.getByText('Balance')).toBeInTheDocument();
    expect(screen.getByText('Interest Rate')).toBeInTheDocument();
    expect(screen.getByText('Monthly Payment')).toBeInTheDocument();
  });

  it('should render balance field with prefix', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <InterestFields />
      </Provider>
    );

    // Check that $ prefix is shown (appears twice - once for balance, once for payment)
    const dollarSigns = screen.getAllByText('$');
    expect(dollarSigns.length).toBeGreaterThanOrEqual(2);
  });

  it('should render interest rate field with suffix', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <InterestFields />
      </Provider>
    );

    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('should render help text for fields', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <InterestFields />
      </Provider>
    );

    expect(screen.getByText('Total remaining amount')).toBeInTheDocument();
    expect(screen.getByText('Weighted rate (see sidebar)')).toBeInTheDocument();
    expect(screen.getByText('What can you comfortably pay now?')).toBeInTheDocument();
  });

  it('should render with initial values from store', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <InterestFields />
      </Provider>
    );

    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs[0]).toHaveValue(10000);
    expect(inputs[1]).toHaveValue(6.25);
    expect(inputs[2]).toHaveValue(175);
  });
});
