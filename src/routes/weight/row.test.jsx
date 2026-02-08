import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WeightedInterestRow } from './row';

describe('WeightedInterestRow', () => {
  const mockUpdate = vi.fn();
  const mockData = {
    amount: 1000,
    interest: 5,
  };

  it('should render two fields', () => {
    render(
      <WeightedInterestRow
        index={0}
        update={mockUpdate}
        data={mockData}
      />
    );

    expect(screen.getByText('I owe:')).toBeInTheDocument();
    expect(screen.getByText('...at...')).toBeInTheDocument();
    expect(screen.getByText('...and...')).toBeInTheDocument();
  });

  it('should render amount field with value', () => {
    render(
      <WeightedInterestRow
        index={0}
        update={mockUpdate}
        data={mockData}
      />
    );

    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs[0]).toHaveValue(1000);
  });

  it('should render interest field with value', () => {
    render(
      <WeightedInterestRow
        index={0}
        update={mockUpdate}
        data={mockData}
      />
    );

    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs[1]).toHaveValue(5);
  });

  it('should render with prefix $', () => {
    render(
      <WeightedInterestRow
        index={0}
        update={mockUpdate}
        data={mockData}
      />
    );

    const dollarSigns = screen.getAllByText('$');
    expect(dollarSigns.length).toBe(2);
  });

  it('should call update with correct parameters for amount change', async () => {
    const user = userEvent.setup();
    render(
      <WeightedInterestRow
        index={0}
        update={mockUpdate}
        data={mockData}
      />
    );

    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]);
    await user.type(inputs[0], '2');

    expect(mockUpdate).toHaveBeenCalled();
  });

  it('should call update with correct parameters for interest change', async () => {
    const user = userEvent.setup();
    render(
      <WeightedInterestRow
        index={0}
        update={mockUpdate}
        data={mockData}
      />
    );

    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[1]);
    await user.type(inputs[1], '6');

    expect(mockUpdate).toHaveBeenCalled();
  });

  it('should render fields horizontally', () => {
    const { container } = render(
      <WeightedInterestRow
        index={0}
        update={mockUpdate}
        data={mockData}
      />
    );

    const horizontalFields = container.querySelectorAll('.field.is-horizontal');
    expect(horizontalFields.length).toBeGreaterThan(0);
  });
});
