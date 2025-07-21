import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  resetKey?: string | number; // Add a reset key to force boundary reset
}

interface State {
  hasError: boolean;
  error?: Error;
  resetKey?: string | number;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, resetKey: props.resetKey };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  static getDerivedStateFromProps(props: Props, state: State): State | null {
    // Reset error boundary when resetKey changes
    if (props.resetKey !== state.resetKey) {
      return {
        hasError: false,
        error: undefined,
        resetKey: props.resetKey,
      };
    }
    return null;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 border border-red-200 bg-red-50 rounded-md">
          <h3 className="text-red-800 font-semibold mb-2">Rendering Error</h3>
          <p className="text-red-700 text-sm mb-2">
            There was an error rendering the custom layout. Please check your code for syntax errors.
          </p>
          {this.state.error && (
            <details className="text-xs text-red-600">
              <summary className="cursor-pointer font-medium">Error Details</summary>
              <pre className="mt-2 whitespace-pre-wrap">{this.state.error.message}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}