import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PaymentsTable } from './index';

describe('PaymentsTable', () => {
  const mockData = [
    {
      monthNumber: 1,
      paymentCount: 1,
      remainingBalance: 9875.5,
      dateString: '01/2024',
      interestPaid: 51.37,
      interestPaidToDate: 51.37,
    },
    {
      monthNumber: 2,
      paymentCount: 2,
      remainingBalance: 9750.25,
      dateString: '02/2024',
      interestPaid: 50.75,
      interestPaidToDate: 102.12,
    },
  ];

  it('should render without data', () => {
    const { container } = render(<PaymentsTable />);
    expect(container.querySelector('.payment-table')).toBeInTheDocument();
  });

  it('should render payment count message', () => {
    render(<PaymentsTable data={mockData} />);
    expect(
      screen.getByText(/You'll be paid off in 2 months/i)
    ).toBeInTheDocument();
  });

  const buildData = (months) =>
    Array(months)
      .fill(mockData[0])
      .map((item, index) => ({
        ...item,
        paymentCount: index + 1,
      }));

  it('should render whole years without a month remainder', () => {
    render(<PaymentsTable data={buildData(24)} />);
    expect(
      screen.getByText("You'll be paid off in 24 months (2 years)!")
    ).toBeInTheDocument();
  });

  it('should render years plus remaining months', () => {
    render(<PaymentsTable data={buildData(137)} />);
    expect(
      screen.getByText("You'll be paid off in 137 months (11 years, 5 months)!")
    ).toBeInTheDocument();
  });

  it('should not mention years for a payoff under a year', () => {
    render(<PaymentsTable data={buildData(11)} />);
    expect(
      screen.getByText("You'll be paid off in 11 months!")
    ).toBeInTheDocument();
  });

  it('should use the singular for a one-month payoff', () => {
    render(<PaymentsTable data={buildData(1)} />);
    expect(
      screen.getByText("You'll be paid off in 1 month!")
    ).toBeInTheDocument();
  });

  it('should render table headers', () => {
    render(<PaymentsTable data={mockData} />);
    expect(screen.getByText('Payment No.')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Remaining Balance')).toBeInTheDocument();
    expect(screen.getByText('Monthly Interest')).toBeInTheDocument();
    expect(screen.getByText('Interest Paid to Date')).toBeInTheDocument();
  });

  it('should render correct number of rows', () => {
    const { container } = render(<PaymentsTable data={mockData} />);
    const rows = container.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(2);
  });

  it('should render data for each payment', () => {
    render(<PaymentsTable data={mockData} />);
    expect(screen.getByText('01/2024')).toBeInTheDocument();
    expect(screen.getByText('02/2024')).toBeInTheDocument();
    expect(screen.getByText('$9875.50')).toBeInTheDocument();
    expect(screen.getByText('$9750.25')).toBeInTheDocument();
  });

  it('should have correct table classes', () => {
    const { container } = render(<PaymentsTable data={mockData} />);
    const table = container.querySelector('table');
    expect(table).toHaveClass('table');
    expect(table).toHaveClass('is-striped');
    expect(table).toHaveClass('is-hoverable');
    expect(table).toHaveClass('is-fullwidth');
  });

  it('should omit the payoff summary entirely for an empty data array', () => {
    render(<PaymentsTable data={[]} />);
    expect(screen.queryByText(/You'll be paid off/i)).not.toBeInTheDocument();
  });
});
