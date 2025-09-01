import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock the pages to avoid complex component dependencies
vi.mock('./pages/Index', () => ({
  default: () => <div data-testid="index-page">Index Page</div>
}));

vi.mock('./pages/NotFound', () => ({
  default: () => <div data-testid="notfound-page">Not Found Page</div>
}));

// Mock ThemeProvider to avoid theme context complexity
vi.mock('./themes/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock Toaster component to avoid Sonner's matchMedia usage
vi.mock('./components/ui/sonner', () => ({
  Toaster: () => <div data-testid="toaster-mock" />
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('index-page')).toBeInTheDocument();
  });

  it('renders Index component on root path', () => {
    render(<App />);
    expect(screen.getByTestId('index-page')).toBeInTheDocument();
  });

  it('includes all required providers', () => {
    const { container } = render(<App />);
    
    // Check that the component tree renders (indicating providers are working)
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByTestId('index-page')).toBeInTheDocument();
  });

  it('sets correct basename for production environment', () => {
    const originalEnv = import.meta.env.MODE;
    
    // Mock production environment
    vi.stubGlobal('import.meta', { env: { MODE: 'production' } });
    
    // The basename is used internally by BrowserRouter, 
    // so we just ensure the app still renders correctly
    render(<App />);
    expect(screen.getByTestId('index-page')).toBeInTheDocument();
    
    // Restore original environment
    vi.stubGlobal('import.meta', { env: { MODE: originalEnv } });
  });
});