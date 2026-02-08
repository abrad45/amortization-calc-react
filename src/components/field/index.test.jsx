import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from './index';

describe('Field', () => {
  it('should render with default label', () => {
    render(<Field />);
    expect(screen.getByText('Your Field Label')).toBeInTheDocument();
  });

  it('should render with custom label', () => {
    render(<Field label="Custom Label" />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('should render input with placeholder', () => {
    render(<Field placeholder="Enter value" />);
    const input = screen.getByPlaceholderText('Enter value');
    expect(input).toBeInTheDocument();
  });

  it('should render input with value', () => {
    render(<Field value="123" />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(123);
  });

  it('should call onChange when input changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Field onChange={handleChange} value="" />);
    const input = screen.getByRole('spinbutton');
    
    await user.type(input, '5');
    expect(handleChange).toHaveBeenCalled();
  });

  it('should render prefix when provided', () => {
    render(<Field prefix="$" />);
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('should render suffix when provided', () => {
    render(<Field suffix="%" />);
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('should render help text when provided', () => {
    render(<Field helpText="This is help text" />);
    expect(screen.getByText('This is help text')).toBeInTheDocument();
  });

  it('should apply horizontal class when isHorizontal is true', () => {
    const { container } = render(<Field isHorizontal={true} />);
    const field = container.querySelector('.field.is-horizontal');
    expect(field).toBeInTheDocument();
  });

  it('should not apply horizontal class when isHorizontal is false', () => {
    const { container } = render(<Field isHorizontal={false} />);
    const field = container.querySelector('.field.is-horizontal');
    expect(field).not.toBeInTheDocument();
  });

  it('should render with number type by default', () => {
    render(<Field />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('should render with custom type', () => {
    render(<Field type="text" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should have has-addons class when prefix is provided', () => {
    const { container } = render(<Field prefix="$" />);
    const hasAddons = container.querySelector('.field.has-addons');
    expect(hasAddons).toBeInTheDocument();
  });

  it('should have has-addons class when suffix is provided', () => {
    const { container } = render(<Field suffix="%" />);
    const hasAddons = container.querySelector('.field.has-addons');
    expect(hasAddons).toBeInTheDocument();
  });

  it('should have has-addons class when helpText is provided', () => {
    const { container } = render(<Field helpText="Help" />);
    const hasAddons = container.querySelector('.field.has-addons');
    expect(hasAddons).toBeInTheDocument();
  });

  it('should pass value to onChange handler', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Field onChange={handleChange} value="" />);
    const input = screen.getByRole('spinbutton');
    
    await user.clear(input);
    await user.type(input, '42');
    // onChange is called for each character typed
    expect(handleChange).toHaveBeenCalledWith('4');
    expect(handleChange).toHaveBeenCalledWith('2');
  });
});
