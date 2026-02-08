import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TableRow } from './row';

describe('TableRow', () => {
  const mockPaymentData = {
    monthNumber: 1,
    paymentCount: 1,
    remainingBalance: 9875.50,
    dateString: '01/2024',
    interestPaid: 51.37,
    interestPaidToDate: 51.37,
  };

  it('should render payment count', () => {
    render(
      <table>
        <tbody>
          <TableRow {...mockPaymentData} />
        </tbody>
      </table>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should render date string', () => {
    render(
      <table>
        <tbody>
          <TableRow {...mockPaymentData} />
        </tbody>
      </table>
    );
    expect(screen.getByText('01/2024')).toBeInTheDocument();
  });

  it('should render remaining balance with 2 decimal places', () => {
    render(
      <table>
        <tbody>
          <TableRow {...mockPaymentData} />
        </tbody>
      </table>
    );
    expect(screen.getByText('$9875.50')).toBeInTheDocument();
  });

  it('should render interest paid with 2 decimal places', () => {
    render(
      <table>
        <tbody>
          <TableRow {...mockPaymentData} />
        </tbody>
      </table>
    );
    const amounts = screen.getAllByText('$51.37');
    expect(amounts.length).toBeGreaterThan(0);
  });

  it('should render interest paid to date with 2 decimal places', () => {
    render(
      <table>
        <tbody>
          <TableRow {...mockPaymentData} />
        </tbody>
      </table>
    );
    const amounts = screen.getAllByText('$51.37');
    expect(amounts.length).toBe(2); // Both interest paid and interest paid to date
  });

  it('should have correct month class', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow {...mockPaymentData} />
        </tbody>
      </table>
    );
    const row = container.querySelector('.payment-data-row.month-1');
    expect(row).toBeInTheDocument();
  });

  it('should render all dollar amounts with .dollar-amount class', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow {...mockPaymentData} />
        </tbody>
      </table>
    );
    const dollarAmounts = container.querySelectorAll('.dollar-amount');
    expect(dollarAmounts).toHaveLength(3);
  });

  it('should render date with .date class', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow {...mockPaymentData} />
        </tbody>
      </table>
    );
    const date = container.querySelector('.date');
    expect(date).toBeInTheDocument();
    expect(date).toHaveTextContent('01/2024');
  });
});
