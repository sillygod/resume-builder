import { useState, useEffect, useCallback } from 'react';

// 1. Define Input Prop Types
export interface UseDynamicFormFieldsProps {
  initialData: Record<string, string>;
  defaultFields: string[];
  onAddField: (fieldName: string, initialValue: string) => void;
}

// Internal constants for special field names and keywords
const EMAIL_FIELD_NAME = 'email';
const TEL_FIELD_NAME = 'phone';
const DATE_KEYWORDS = ['date']; // Keywords that suggest input type="date"
const TEXTAREA_KEYWORDS = ['summary', 'description', 'bio', 'about']; // Keywords for textarea

// Helper function to format field labels (exported for use)
export const formatFieldLabel = (fieldName: string): string => {
  return fieldName
    .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .trim();
};

// Helper function to determine input type (exported for use)
export const getInputType = (fieldName: string): string => {
  const lowerCaseFieldName = fieldName.toLowerCase();
  if (lowerCaseFieldName === EMAIL_FIELD_NAME) return 'email';
  if (lowerCaseFieldName === TEL_FIELD_NAME) return 'tel';
  if (DATE_KEYWORDS.some(keyword => lowerCaseFieldName.includes(keyword))) return 'date';
  return 'text';
};

// Helper function to determine if field should use textarea (exported for use)
export const shouldUseTextarea = (fieldName: string): boolean => {
  const lowerCaseFieldName = fieldName.toLowerCase();
  return TEXTAREA_KEYWORDS.some(keyword => lowerCaseFieldName.includes(keyword));
};


export const useDynamicFormFields = ({
  initialData,
  defaultFields,
  onAddField,
}: UseDynamicFormFieldsProps) => {
  // 2. Hook State
  const [fields, setFields] = useState<string[]>(() => 
    Array.from(new Set([...defaultFields, ...Object.keys(initialData)]))
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newFieldName, setNewFieldNameState] = useState<string>('');

  // 3. Core Logic & Returned Functions

  // Effect to update fields if initialData keys change externally (less common for this component)
  // This ensures that if fields are added to initialData from outside, they are reflected.
  useEffect(() => {
    setFields(Array.from(new Set([...defaultFields, ...Object.keys(initialData)])));
  }, [initialData, defaultFields]);


  const openDialog = useCallback(() => setIsDialogOpen(true), []);
  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setNewFieldNameState(''); // Reset field name on dialog close
  }, []);

  const setNewFieldName = useCallback((name: string) => {
    setNewFieldNameState(name);
  }, []);
  
  const handleAddField = useCallback(() => {
    const trimmedNewFieldName = newFieldName.trim();
    // Basic validation: not empty and not a duplicate
    if (trimmedNewFieldName && !fields.includes(trimmedNewFieldName)) {
      const newFieldKey = trimmedNewFieldName.replace(/\s+/g, '_').toLowerCase(); // Simple key generation
      
      if (fields.includes(newFieldKey)) {
        // Optionally, handle cases where the generated key might already exist,
        // though formatFieldLabel would make them distinct if user types "My Field" vs "my_field"
        // For simplicity, assuming generated key from a user-friendly name is unique enough for now.
        // Or, use the raw trimmedNewFieldName if keys can have spaces/caps (depends on data structure)
        // Let's use a camelCase or similar approach for the key if the label is "My New Field" -> "myNewField"
        const keyFromName = trimmedNewFieldName
          .replace(/\s(.)/g, (match) => match[1].toUpperCase()) // camelCase spaces
          .replace(/^(.)/, (match) => match.toLowerCase());     // first letter lower
          
        if (fields.includes(keyFromName)) {
            // Handle duplicate key after sanitization if necessary, e.g., show error
            console.warn(`Field key "${keyFromName}" already exists.`);
            // For now, we'll proceed, but a production app might prevent this or add a suffix
        }

        setFields(prevFields => [...prevFields, keyFromName]);
        onAddField(keyFromName, ''); // Notify parent to add the new field with an empty value
        closeDialog();
      } else if (trimmedNewFieldName && fields.includes(trimmedNewFieldName)) {
        // If the exact typed name (after trim) is already a field
        console.warn(`Field "${trimmedNewFieldName}" already exists.`);
      }
    } else if (!trimmedNewFieldName) {
        console.warn("Field name cannot be empty.");
    } else {
        console.warn(`Field "${trimmedNewFieldName}" already exists or is invalid.`);
    }
  }, [newFieldName, fields, onAddField, closeDialog]);


  // 4. Return Value
  return {
    fields,
    isDialogOpen,
    newFieldName,
    openDialog,
    closeDialog,
    handleAddField,
    setNewFieldName, // Expose the setter for the input field
    formatFieldLabel, // Exposing helper directly
    getInputType,     // Exposing helper directly
    shouldUseTextarea,// Exposing helper directly
  };
};
