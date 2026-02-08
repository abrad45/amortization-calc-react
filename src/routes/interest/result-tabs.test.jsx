import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResultTabs } from './result-tabs';

describe('ResultTabs', () => {
  it('should render table and graph tabs', () => {
    const setActiveTab = vi.fn();
    render(<ResultTabs activeTab="table" setActiveTab={setActiveTab} />);
    
    expect(screen.getByText('Table')).toBeInTheDocument();
    expect(screen.getByText('Graph')).toBeInTheDocument();
  });

  it('should show table tab as active', () => {
    const setActiveTab = vi.fn();
    const { container } = render(
      <ResultTabs activeTab="table" setActiveTab={setActiveTab} />
    );
    
    const tabs = container.querySelectorAll('li');
    expect(tabs[0]).toHaveClass('is-active');
    expect(tabs[1]).not.toHaveClass('is-active');
  });

  it('should show graph tab as active', () => {
    const setActiveTab = vi.fn();
    const { container } = render(
      <ResultTabs activeTab="graph" setActiveTab={setActiveTab} />
    );
    
    const tabs = container.querySelectorAll('li');
    expect(tabs[0]).not.toHaveClass('is-active');
    expect(tabs[1]).toHaveClass('is-active');
  });

  it('should call setActiveTab with "table" when table tab is clicked', async () => {
    const user = userEvent.setup();
    const setActiveTab = vi.fn();
    render(<ResultTabs activeTab="graph" setActiveTab={setActiveTab} />);
    
    const tableLink = screen.getByText('Table');
    await user.click(tableLink);
    
    expect(setActiveTab).toHaveBeenCalledWith('table');
  });

  it('should call setActiveTab with "graph" when graph tab is clicked', async () => {
    const user = userEvent.setup();
    const setActiveTab = vi.fn();
    render(<ResultTabs activeTab="table" setActiveTab={setActiveTab} />);
    
    const graphLink = screen.getByText('Graph');
    await user.click(graphLink);
    
    expect(setActiveTab).toHaveBeenCalledWith('graph');
  });
});
