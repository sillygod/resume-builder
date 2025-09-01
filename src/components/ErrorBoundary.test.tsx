import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>Normal component</div>;
};

// Mock console.error to avoid noise in tests
const originalConsoleError = console.error;

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders default error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Rendering Error')).toBeInTheDocument();
    expect(screen.getByText(/There was an error rendering the custom layout/)).toBeInTheDocument();
  });

  it('displays error details when expanded', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const details = screen.getByText('Error Details');
    expect(details).toBeInTheDocument();
    
    // The error message should be in the details
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>;
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.queryByText('Rendering Error')).not.toBeInTheDocument();
  });

  it('logs error to console when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.any(Object)
    );
  });

  it('resets error state when resetKey changes', () => {
    const { rerender } = render(
      <ErrorBoundary resetKey="key1">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Error should be showing
    expect(screen.getByText('Rendering Error')).toBeInTheDocument();

    // Change resetKey and render without error
    rerender(
      <ErrorBoundary resetKey="key2">
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    // Should show normal content again
    expect(screen.getByText('Normal component')).toBeInTheDocument();
    expect(screen.queryByText('Rendering Error')).not.toBeInTheDocument();
  });

  it('does not reset when resetKey stays the same', () => {
    const { rerender } = render(
      <ErrorBoundary resetKey="key1">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Error should be showing
    expect(screen.getByText('Rendering Error')).toBeInTheDocument();

    // Rerender with same resetKey
    rerender(
      <ErrorBoundary resetKey="key1">
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    // Should still show error (boundary not reset)
    expect(screen.getByText('Rendering Error')).toBeInTheDocument();
    expect(screen.queryByText('Normal component')).not.toBeInTheDocument();
  });

  it('works without resetKey prop', () => {
    render(
      <ErrorBoundary>
        <div>Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });

  it('handles multiple children correctly', () => {
    render(
      <ErrorBoundary>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  it('catches errors in any child component', () => {
    render(
      <ErrorBoundary>
        <div>Normal child</div>
        <ThrowError shouldThrow={true} />
        <div>Another normal child</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Rendering Error')).toBeInTheDocument();
    expect(screen.queryByText('Normal child')).not.toBeInTheDocument();
  });

  it('applies correct CSS classes to error UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const errorContainer = screen.getByText('Rendering Error').closest('div');
    expect(errorContainer).toHaveClass('p-4', 'border', 'border-red-200', 'bg-red-50', 'rounded-md');
  });

  it('handles errors with no message', () => {
    const ThrowEmptyError = () => {
      throw new Error('');
    };

    render(
      <ErrorBoundary>
        <ThrowEmptyError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Rendering Error')).toBeInTheDocument();
    expect(screen.getByText('Error Details')).toBeInTheDocument();
  });

  it('handles non-Error objects thrown', () => {
    const ThrowString = () => {
      throw 'String error';
    };

    render(
      <ErrorBoundary>
        <ThrowString />
      </ErrorBoundary>
    );

    expect(screen.getByText('Rendering Error')).toBeInTheDocument();
  });

  it('resets with numeric resetKey', () => {
    const { rerender } = render(
      <ErrorBoundary resetKey={1}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Rendering Error')).toBeInTheDocument();

    rerender(
      <ErrorBoundary resetKey={2}>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal component')).toBeInTheDocument();
  });

  it('preserves error state across rerenders without resetKey change', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Rendering Error')).toBeInTheDocument();

    // Rerender with different props but no resetKey change
    rerender(
      <ErrorBoundary>
        <div>Different content</div>
      </ErrorBoundary>
    );

    // Should still show error
    expect(screen.getByText('Rendering Error')).toBeInTheDocument();
  });

  it('shows details as collapsible element', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const details = screen.getByText('Error Details').closest('details');
    expect(details).toBeInTheDocument();
    expect(details?.querySelector('summary')).toHaveTextContent('Error Details');
  });

  it('formats error message in preformatted text', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const preElement = screen.getByText('Test error message');
    expect(preElement.tagName.toLowerCase()).toBe('pre');
    expect(preElement).toHaveClass('whitespace-pre-wrap');
  });
});