import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelpText } from './help-text';

describe('HelpText', () => {
  it('should render children when provided', () => {
    render(<HelpText>This is help text</HelpText>);
    expect(screen.getByText('This is help text')).toBeInTheDocument();
  });

  it('should not render when children is not provided', () => {
    const { container } = render(<HelpText />);
    expect(container.firstChild).toBeNull();
  });

  it('should have help class', () => {
    const { container } = render(<HelpText>Help message</HelpText>);
    const helpElement = container.querySelector('.help');
    expect(helpElement).toBeInTheDocument();
    expect(helpElement).toHaveTextContent('Help message');
  });

  it('should render different help text', () => {
    const { rerender } = render(<HelpText>First message</HelpText>);
    expect(screen.getByText('First message')).toBeInTheDocument();
    
    rerender(<HelpText>Second message</HelpText>);
    expect(screen.getByText('Second message')).toBeInTheDocument();
  });
});
