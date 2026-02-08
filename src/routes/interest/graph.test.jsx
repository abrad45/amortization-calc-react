import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { PaymentsGraph } from './graph';

// Mock react-chartjs-2
vi.mock('react-chartjs-2', () => ({
  Line: ({ data }) => <div data-testid="line-chart">{JSON.stringify(data)}</div>,
}));

describe('PaymentsGraph', () => {
  const mockData = [
    {
      dateString: '01/2024',
      remainingBalance: 9875.50,
      interestPaidToDate: 51.37,
    },
    {
      dateString: '02/2024',
      remainingBalance: 9750.25,
      interestPaidToDate: 102.12,
    },
  ];

  it('should render Line chart component', () => {
    const { getByTestId } = render(<PaymentsGraph data={mockData} />);
    expect(getByTestId('line-chart')).toBeInTheDocument();
  });

  it('should pass correct labels to chart', () => {
    const { getByTestId } = render(<PaymentsGraph data={mockData} />);
    const chartData = JSON.parse(getByTestId('line-chart').textContent);
    
    expect(chartData.labels).toEqual(['01/2024', '02/2024']);
  });

  it('should pass remaining balance dataset', () => {
    const { getByTestId } = render(<PaymentsGraph data={mockData} />);
    const chartData = JSON.parse(getByTestId('line-chart').textContent);
    
    expect(chartData.datasets[0].label).toBe('Remaining Balance');
    expect(chartData.datasets[0].data).toEqual([9875.50, 9750.25]);
  });

  it('should pass interest paid to date dataset', () => {
    const { getByTestId } = render(<PaymentsGraph data={mockData} />);
    const chartData = JSON.parse(getByTestId('line-chart').textContent);
    
    expect(chartData.datasets[1].label).toBe('Interest Paid to Date');
    expect(chartData.datasets[1].data).toEqual([51.37, 102.12]);
  });

  it('should have correct styling properties', () => {
    const { getByTestId } = render(<PaymentsGraph data={mockData} />);
    const chartData = JSON.parse(getByTestId('line-chart').textContent);
    
    expect(chartData.datasets[0].lineTension).toBe(0.1);
    expect(chartData.datasets[0].pointBackgroundColor).toBe('#fff');
    expect(chartData.datasets[0].pointRadius).toBe(1);
  });

  it('should have different colors for each dataset', () => {
    const { getByTestId } = render(<PaymentsGraph data={mockData} />);
    const chartData = JSON.parse(getByTestId('line-chart').textContent);
    
    expect(chartData.datasets[0].borderColor).not.toBe(chartData.datasets[1].borderColor);
    expect(chartData.datasets[0].backgroundColor).not.toBe(chartData.datasets[1].backgroundColor);
  });
});
