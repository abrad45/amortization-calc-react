import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('should render instructions heading', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText(/Instructions/i)).toBeInTheDocument();
  });

  it('should render link to weighted interest calculator', () => {
    renderWithRouter(<Sidebar />);
    const link = screen.getByRole('link', { name: /weighted interest rate/i });
    expect(link).toHaveAttribute('href', '/weighted-interest');
  });

  it('should render link to main calculator', () => {
    renderWithRouter(<Sidebar />);
    const link = screen.getByRole('link', { name: /the calculator/i });
    expect(link).toHaveAttribute('href', '/');
  });

  it('should render all instruction steps', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText(/Figure out your/i)).toBeInTheDocument();
    expect(screen.getByText(/Enter some stuff into/i)).toBeInTheDocument();
    expect(screen.getByText(/Click Calculate/i)).toBeInTheDocument();
    expect(screen.getByText(/Be informed!/i)).toBeInTheDocument();
  });

  it('should have ordered list', () => {
    const { container } = renderWithRouter(<Sidebar />);
    const ol = container.querySelector('ol');
    expect(ol).toBeInTheDocument();
  });
});
