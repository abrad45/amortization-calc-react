import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer', () => {
  it('should render footer content', () => {
    render(<Footer />);
    expect(screen.getByText(/Amortization Calc/i)).toBeInTheDocument();
  });

  it('should render author name', () => {
    render(<Footer />);
    expect(screen.getByText(/Alex Bradley/i)).toBeInTheDocument();
  });

  it('should render link to author website', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /Alex Bradley/i });
    expect(link).toHaveAttribute('href', 'https://abrad45.com');
  });

  it('should have footer element', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });
});
