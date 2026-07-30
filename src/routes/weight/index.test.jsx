import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WeightedInterest } from './index';

describe('WeightedInterest', () => {
  it('should render explanation text', () => {
    render(<WeightedInterest />);
    expect(screen.getByText(/Quick math problem/i)).toBeInTheDocument();
  });

  it('should render Add Loan button', () => {
    render(<WeightedInterest />);
    expect(screen.getByText('Add Loan')).toBeInTheDocument();
  });

  it('should render initial 3 rows', async () => {
    const { container } = render(<WeightedInterest />);

    // Wait for rows to be rendered
    await waitFor(() => {
      const rows = container.querySelectorAll('.field.is-grouped');
      expect(rows.length).toBe(3);
    });
  });

  it('should add a new row when Add Loan is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<WeightedInterest />);

    // Wait for initial rows
    await waitFor(() => {
      const initialRows = container.querySelectorAll('.field.is-grouped');
      expect(initialRows.length).toBe(3);
    });

    const addButton = screen.getByText('Add Loan');
    await user.click(addButton);

    // Wait for new row to be added
    await waitFor(() => {
      const updatedRows = container.querySelectorAll('.field.is-grouped');
      expect(updatedRows.length).toBe(4);
    });
  });

  it('should not display weighted interest when total is 0', async () => {
    render(<WeightedInterest />);

    await waitFor(() => {
      expect(screen.queryByText(/You owe \$/)).not.toBeInTheDocument();
    });
  });

  it('should calculate and display weighted interest', async () => {
    const user = userEvent.setup();
    render(<WeightedInterest />);

    // Wait for rows to render
    await waitFor(() => {
      const rows = screen.getAllByText('I owe:');
      expect(rows.length).toBe(3);
    });

    // Get all input fields
    const inputs = screen.getAllByRole('spinbutton');

    // Set first loan: $10000 at 5%
    await user.clear(inputs[0]);
    await user.type(inputs[0], '10000');
    await user.clear(inputs[1]);
    await user.type(inputs[1], '5');

    await waitFor(() => {
      expect(
        screen.getByText('You owe $10000 at an interest rate of 5.000%.')
      ).toBeInTheDocument();
    });
  });

  it('should keep existing input when Add Loan is clicked', async () => {
    const user = userEvent.setup();
    render(<WeightedInterest />);

    await waitFor(() => {
      expect(screen.getAllByText('I owe:')).toHaveLength(3);
    });

    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]);
    await user.type(inputs[0], '10000');
    await user.clear(inputs[1]);
    await user.type(inputs[1], '5');

    await user.click(screen.getByText('Add Loan'));

    await waitFor(() => {
      expect(screen.getAllByText('I owe:')).toHaveLength(4);
    });

    // The typed values used to be wiped out by the rowCount effect
    const updatedInputs = screen.getAllByRole('spinbutton');
    expect(updatedInputs[0]).toHaveValue(10000);
    expect(updatedInputs[1]).toHaveValue(5);
  });

  it('should have correct class name', () => {
    const { container } = render(<WeightedInterest />);
    expect(
      container.querySelector('.interest-weight-calculation')
    ).toBeInTheDocument();
  });

  it('should render "I owe" labels for each row', async () => {
    render(<WeightedInterest />);

    await waitFor(() => {
      const labels = screen.getAllByText('I owe:');
      expect(labels.length).toBe(3);
    });
  });

  it('should render "...at..." labels for each row', async () => {
    render(<WeightedInterest />);

    await waitFor(() => {
      const labels = screen.getAllByText('...at...');
      expect(labels.length).toBe(3);
    });
  });
});
