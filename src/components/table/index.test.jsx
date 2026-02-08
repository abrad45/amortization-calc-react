import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PaymentsTable } from './index';

describe('PaymentsTable', () => {
  const mockData = [
    {
      monthNumber: 1,
      paymentCount: 1,
      remainingBalance: 9875.50,
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
    expect(screen.getByText(/You'll be paid off in 2 months/i)).toBeInTheDocument();
  });

  it('should render years calculation', () => {
    const longData = Array(24).fill(mockData[0]).map((item, index) => ({
      ...item,
      paymentCount: index + 1,
    }));
    render(<PaymentsTable data={longData} />);
    expect(screen.getByText(/just over 2 years/i)).toBeInTheDocument();
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

  it('should handle empty data array', () => {
    render(<PaymentsTable data={[]} />);
    expect(screen.getByText(/You'll be paid off in 0 months/i)).toBeInTheDocument();
  });
});
