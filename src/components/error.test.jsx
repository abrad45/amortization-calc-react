import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataError } from './error';

// Mock the hooks module
vi.mock('/hooks/actions', () => ({
  useResetAllData: () => vi.fn(),
}));

describe('DataError', () => {
  it('should render error message', () => {
    render(<DataError value="insufficient_payment" />);
    expect(screen.getByText(/So, some bad news./i)).toBeInTheDocument();
  });

  it('should render explanation text', () => {
    render(<DataError value="insufficient_payment" />);
    expect(
      screen.getByText(/You're never going to pay off your loan/i)
    ).toBeInTheDocument();
  });

  it('should render dismiss explanation', () => {
    render(<DataError value="insufficient_payment" />);
    expect(
      screen.getByText(/Dismissing this will reset the data/i)
    ).toBeInTheDocument();
  });

  it('should render delete button', () => {
    render(<DataError value="insufficient_payment" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('delete');
  });

  it('should have notification styling', () => {
    const { container } = render(<DataError value="insufficient_payment" />);
    const notification = container.querySelector('.notification');
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveClass('is-danger');
    expect(notification).toHaveClass('is-light');
  });
});
