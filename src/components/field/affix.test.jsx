import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Affix } from './affix';

describe('Affix', () => {
  it('should render text when provided', () => {
    render(<Affix text="$" />);
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('should not render when text is not provided', () => {
    const { container } = render(<Affix />);
    expect(container.firstChild).toBeNull();
  });

  it('should have correct classes', () => {
    const { container } = render(<Affix text="%" />);
    const control = container.querySelector('.control');
    expect(control).toBeInTheDocument();
    const button = container.querySelector('.button.is-static');
    expect(button).toBeInTheDocument();
  });

  it('should render different text values', () => {
    const { rerender } = render(<Affix text="prefix" />);
    expect(screen.getByText('prefix')).toBeInTheDocument();
    
    rerender(<Affix text="suffix" />);
    expect(screen.getByText('suffix')).toBeInTheDocument();
  });
});
