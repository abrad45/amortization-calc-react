import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { InterestCalc } from './index';
import interestReducer from '/reducers/interest';

// Mock the graph component
vi.mock('./graph', () => ({
  PaymentsGraph: ({ data }) => <div data-testid="graph">Graph</div>,
}));

const createTestStore = () => {
  const rootReducer = combineReducers({ interest: interestReducer });
  return createStore(rootReducer);
};

describe('InterestCalc', () => {
  it('should render fields section', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <InterestCalc />
      </Provider>
    );

    expect(screen.getByText('Balance')).toBeInTheDocument();
    expect(screen.getByText('Interest Rate')).toBeInTheDocument();
    expect(screen.getByText('Monthly Payment')).toBeInTheDocument();
  });

  it('should render results section', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <InterestCalc />
      </Provider>
    );

    expect(screen.getByText('Table')).toBeInTheDocument();
    expect(screen.getByText('Graph')).toBeInTheDocument();
  });

  it('should have interest-calculation class', () => {
    const store = createTestStore();
    const { container } = render(
      <Provider store={store}>
        <InterestCalc />
      </Provider>
    );

    const wrapper = container.querySelector('.interest-calculation');
    expect(wrapper).toBeInTheDocument();
  });

  it('should render both fields and results', () => {
    const store = createTestStore();
    const { container } = render(
      <Provider store={store}>
        <InterestCalc />
      </Provider>
    );

    expect(container.querySelector('.data-collection')).toBeInTheDocument();
    expect(container.querySelector('.interest-results')).toBeInTheDocument();
  });
});
