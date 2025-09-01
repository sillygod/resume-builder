import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useEditableListManager, Identifiable } from './useEditableListManager';

interface TestItem extends Identifiable {
  name: string;
  value: string;
}

describe('useEditableListManager', () => {
  let mockOnChange: ReturnType<typeof vi.fn>;
  let mockNewItemFactory: ReturnType<typeof vi.fn>;
  let initialItems: TestItem[];

  beforeEach(() => {
    mockOnChange = vi.fn();
    mockNewItemFactory = vi.fn(() => ({ name: '', value: '' }));
    initialItems = [
      { id: '1', name: 'Item 1', value: 'Value 1' },
      { id: '2', name: 'Item 2', value: 'Value 2' }
    ];
  });

  it('initializes with provided items', () => {
    const { result } = renderHook(() =>
      useEditableListManager({
        items: initialItems,
        onChange: mockOnChange,
        newItemFactory: mockNewItemFactory
      })
    );

    expect(result.current).toHaveProperty('addItem');
    expect(result.current).toHaveProperty('updateItem');
    expect(result.current).toHaveProperty('removeItem');
    expect(typeof result.current.addItem).toBe('function');
    expect(typeof result.current.updateItem).toBe('function');
    expect(typeof result.current.removeItem).toBe('function');
  });

  it('adds a new item when addItem is called', () => {
    const { result } = renderHook(() =>
      useEditableListManager({
        items: initialItems,
        onChange: mockOnChange,
        newItemFactory: mockNewItemFactory
      })
    );

    act(() => {
      result.current.addItem();
    });

    expect(mockNewItemFactory).toHaveBeenCalledOnce();
    expect(mockOnChange).toHaveBeenCalledOnce();
    
    const calledWith = mockOnChange.mock.calls[0][0];
    expect(calledWith).toHaveLength(3);
    expect(calledWith[2]).toMatchObject({ name: '', value: '' });
    expect(calledWith[2]).toHaveProperty('id');
    expect(typeof calledWith[2].id).toBe('string');
  });

  it('generates unique IDs for new items', () => {
    const { result } = renderHook(() =>
      useEditableListManager({
        items: initialItems,
        onChange: mockOnChange,
        newItemFactory: mockNewItemFactory
      })
    );

    act(() => {
      result.current.addItem();
    });

    act(() => {
      result.current.addItem();
    });

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    
    const firstCall = mockOnChange.mock.calls[0][0];
    const secondCall = mockOnChange.mock.calls[1][0];
    
    const firstNewId = firstCall[firstCall.length - 1].id; // Get the last item from first call
    const secondNewId = secondCall[secondCall.length - 1].id; // Get the last item from second call
    
    expect(firstNewId).not.toBe(secondNewId);
  });

  it('updates an existing item correctly', () => {
    const { result } = renderHook(() =>
      useEditableListManager({
        items: initialItems,
        onChange: mockOnChange,
        newItemFactory: mockNewItemFactory
      })
    );

    act(() => {
      result.current.updateItem('1', 'name', 'Updated Item 1');
    });

    expect(mockOnChange).toHaveBeenCalledOnce();
    
    const updatedItems = mockOnChange.mock.calls[0][0];
    expect(updatedItems[0]).toMatchObject({
      id: '1',
      name: 'Updated Item 1',
      value: 'Value 1'
    });
    expect(updatedItems[1]).toMatchObject(initialItems[1]); // Second item unchanged
  });

  it('updates the correct field of an item', () => {
    const { result } = renderHook(() =>
      useEditableListManager({
        items: initialItems,
        onChange: mockOnChange,
        newItemFactory: mockNewItemFactory
      })
    );

    act(() => {
      result.current.updateItem('2', 'value', 'Updated Value 2');
    });

    const updatedItems = mockOnChange.mock.calls[0][0];
    expect(updatedItems[1]).toMatchObject({
      id: '2',
      name: 'Item 2',
      value: 'Updated Value 2'
    });
    expect(updatedItems[0]).toMatchObject(initialItems[0]); // First item unchanged
  });

  it('does not update item when ID is not found', () => {
    const { result } = renderHook(() =>
      useEditableListManager({
        items: initialItems,
        onChange: mockOnChange,
        newItemFactory: mockNewItemFactory
      })
    );

    act(() => {
      result.current.updateItem('nonexistent', 'name', 'Updated Name');
    });

    const updatedItems = mockOnChange.mock.calls[0][0];
    expect(updatedItems).toEqual(initialItems); // No changes
  });

  it('removes an item correctly', () => {
    const { result } = renderHook(() =>
      useEditableListManager({
        items: initialItems,
        onChange: mockOnChange,
        newItemFactory: mockNewItemFactory
      })
    );

    act(() => {
      result.current.removeItem('1');
    });

    expect(mockOnChange).toHaveBeenCalledOnce();
    
    const updatedItems = mockOnChange.mock.calls[0][0];
    expect(updatedItems).toHaveLength(1);
    expect(updatedItems[0]).toMatchObject(initialItems[1]);
  });

  it('does not remove item when ID is not found', () => {
    const { result } = renderHook(() =>
      useEditableListManager({
        items: initialItems,
        onChange: mockOnChange,
        newItemFactory: mockNewItemFactory
      })
    );

    act(() => {
      result.current.removeItem('nonexistent');
    });

    const updatedItems = mockOnChange.mock.calls[0][0];
    expect(updatedItems).toEqual(initialItems); // No changes
  });

  it('handles empty items array', () => {
    const { result } = renderHook(() =>
      useEditableListManager({
        items: [],
        onChange: mockOnChange,
        newItemFactory: mockNewItemFactory
      })
    );

    act(() => {
      result.current.addItem();
    });

    expect(mockOnChange).toHaveBeenCalledOnce();
    
    const updatedItems = mockOnChange.mock.calls[0][0];
    expect(updatedItems).toHaveLength(1);
    expect(updatedItems[0]).toMatchObject({ name: '', value: '' });
  });

  it('uses newItemFactory correctly when adding items', () => {
    const customFactory = vi.fn(() => ({ name: 'Default Name', value: 'Default Value' }));
    
    const { result } = renderHook(() =>
      useEditableListManager({
        items: initialItems,
        onChange: mockOnChange,
        newItemFactory: customFactory
      })
    );

    act(() => {
      result.current.addItem();
    });

    expect(customFactory).toHaveBeenCalledOnce();
    
    const updatedItems = mockOnChange.mock.calls[0][0];
    expect(updatedItems[2]).toMatchObject({
      name: 'Default Name',
      value: 'Default Value'
    });
  });

  it('preserves existing items when adding new ones', () => {
    const { result } = renderHook(() =>
      useEditableListManager({
        items: initialItems,
        onChange: mockOnChange,
        newItemFactory: mockNewItemFactory
      })
    );

    act(() => {
      result.current.addItem();
    });

    const updatedItems = mockOnChange.mock.calls[0][0];
    expect(updatedItems.slice(0, 2)).toEqual(initialItems);
  });

  it('handles multiple operations in sequence', () => {
    const { result } = renderHook(() =>
      useEditableListManager({
        items: initialItems,
        onChange: mockOnChange,
        newItemFactory: mockNewItemFactory
      })
    );

    // Add item
    act(() => {
      result.current.addItem();
    });

    // Update item
    act(() => {
      result.current.updateItem('1', 'name', 'Updated');
    });

    // Remove item
    act(() => {
      result.current.removeItem('2');
    });

    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });

  it('maintains referential stability of functions', () => {
    const { result, rerender } = renderHook(() =>
      useEditableListManager({
        items: initialItems,
        onChange: mockOnChange,
        newItemFactory: mockNewItemFactory
      })
    );

    const firstRender = result.current;
    
    rerender();
    
    const secondRender = result.current;

    expect(firstRender.addItem).toBe(secondRender.addItem);
    expect(firstRender.updateItem).toBe(secondRender.updateItem);
    expect(firstRender.removeItem).toBe(secondRender.removeItem);
  });
});