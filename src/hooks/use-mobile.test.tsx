import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from './use-mobile';

// Mock matchMedia
const createMockMatchMedia = (matches: boolean) => {
  const mql = {
    matches,
    media: '(max-width: 767px)',
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as MediaQueryList;
  
  return vi.fn((_query: string) => mql);
};

describe('useIsMobile', () => {
  let originalInnerWidth: number;
  let mockMatchMedia: ReturnType<typeof createMockMatchMedia>;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    mockMatchMedia = createMockMatchMedia(false);
    window.matchMedia = mockMatchMedia;
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    vi.clearAllMocks();
  });

  it('returns false for desktop widths', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('returns true for mobile widths', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('returns true exactly at mobile breakpoint boundary', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767, // Less than 768
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('returns false exactly at desktop breakpoint boundary', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768, // Equal to or greater than 768
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('sets up matchMedia listener with correct breakpoint', () => {
    renderHook(() => useIsMobile());

    expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 767px)');
  });

  it('adds event listener to matchMedia', () => {
    const mql = {
      matches: false,
      media: '(max-width: 767px)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList;
    
    window.matchMedia = vi.fn((_query: string) => mql);

    renderHook(() => useIsMobile());

    expect(mql.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('removes event listener on unmount', () => {
    const mql = {
      matches: false,
      media: '(max-width: 767px)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList;
    
    window.matchMedia = vi.fn((_query: string) => mql);

    const { unmount } = renderHook(() => useIsMobile());

    unmount();

    expect(mql.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('responds to window resize events', () => {
    let changeCallback: (() => void) | undefined;
    
    const mql = {
      matches: false,
      media: '(max-width: 767px)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event: string, callback: () => void) => {
        if (event === 'change') {
          changeCallback = callback;
        }
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList;
    
    window.matchMedia = vi.fn((_query: string) => mql);
    
    // Start with desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    // Simulate resize to mobile width
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      if (changeCallback) {
        changeCallback();
      }
    });

    expect(result.current).toBe(true);
  });

  it('handles initial undefined state correctly', () => {
    // Mock to prevent immediate setting of isMobile
    const mql = {
      matches: false,
      media: '(max-width: 767px)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList;
    
    window.matchMedia = vi.fn((_query: string) => mql);
    
    const { result } = renderHook(() => useIsMobile());

    // Should return boolean, not undefined (due to !!isMobile)
    expect(typeof result.current).toBe('boolean');
  });

  it('works with various mobile device widths', () => {
    const mobileWidths = [320, 375, 414, 480, 600, 767];
    
    mobileWidths.forEach(width => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(true);
    });
  });

  it('works with various desktop device widths', () => {
    const desktopWidths = [768, 1024, 1200, 1440, 1920];
    
    desktopWidths.forEach(width => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(false);
    });
  });

  it('uses the correct mobile breakpoint constant', () => {
    // The hook uses MOBILE_BREAKPOINT = 768
    // So anything < 768 should be mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    const { result: result2 } = renderHook(() => useIsMobile());
    expect(result2.current).toBe(false);
  });

  it('handles multiple instances of the hook', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    const { result: result1 } = renderHook(() => useIsMobile());
    const { result: result2 } = renderHook(() => useIsMobile());

    expect(result1.current).toBe(true);
    expect(result2.current).toBe(true);
  });

  it('does not cause memory leaks on multiple mounts/unmounts', () => {
    const mql = {
      matches: false,
      media: '(max-width: 767px)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList;
    
    window.matchMedia = vi.fn((_query: string) => mql);

    const { unmount: unmount1 } = renderHook(() => useIsMobile());
    const { unmount: unmount2 } = renderHook(() => useIsMobile());

    unmount1();
    unmount2();

    // Should have called removeEventListener for each mount
    expect(mql.removeEventListener).toHaveBeenCalledTimes(2);
  });
});