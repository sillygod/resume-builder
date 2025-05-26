import { useCallback } from 'react';

// 1. Define Generic Type and Input Prop Types
export interface Identifiable {
  id: string;
}

export interface UseEditableListManagerProps<T extends Identifiable> {
  items: T[];
  onChange: (newItems: T[]) => void;
  newItemFactory: () => Omit<T, 'id'>;
}

// Define Return Value Types
export interface UseEditableListManagerReturn<T extends Identifiable> {
  addItem: () => void;
  updateItem: (id: string, field: keyof Omit<T, 'id'>, value: string) => void; // Value is string as per plan
  removeItem: (id: string) => void;
}

// 2. Hook Logic
export const useEditableListManager = <T extends Identifiable>({
  items,
  onChange,
  newItemFactory,
}: UseEditableListManagerProps<T>): UseEditableListManagerReturn<T> => {
  
  const addItem = useCallback(() => {
    const newItemData = newItemFactory();
    const newItemId = Date.now().toString() + Math.random().toString(36).substring(2, 11); // Enhanced uniqueness
    
    // Create the new item ensuring 'id' is correctly typed and all other properties from newItemData are spread.
    // We need to cast newItemData to Partial<T> or T depending on whether newItemFactory provides all required fields.
    // Given newItemFactory returns Omit<T, 'id'>, it implies it provides all other required fields.
    const newItem = {
      ...newItemData,
      id: newItemId,
    } as T; // Cast to T, assuming newItemData + id fulfills T

    onChange([...items, newItem]);
  }, [items, onChange, newItemFactory]);

  const updateItem = useCallback((id: string, field: keyof Omit<T, 'id'>, value: string) => {
    // The 'field' is a keyof Omit<T, 'id'>, so it cannot be 'id'.
    // The 'value' is a string. The actual type of T[field] might not be a string.
    // The consuming component/code is responsible for ensuring the string value is appropriate
    // or for converting it before calling updateItem if T[field] is, e.g., a number or boolean.
    // This matches the behavior of typical HTML input onChange events.
    onChange(
      items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }, [items, onChange]);

  const removeItem = useCallback((id: string) => {
    onChange(items.filter(item => item.id !== id));
  }, [items, onChange]);

  // 3. Return Value
  return {
    addItem,
    updateItem,
    removeItem,
  };
};
