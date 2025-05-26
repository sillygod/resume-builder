import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
// Removed: useState from 'react' as it's now managed by the hook mostly
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
// Removed: AlertDialog from '@/components/ui/alert-dialog' as Primitive is used directly.

// Import the new hook and its helper functions if they are exported and needed separately (they are returned by the hook)
import { 
  useDynamicFormFields,
  // formatFieldLabel, // No longer need to import if used from hook's return
  // getInputType, 
  // shouldUseTextarea 
} from '../hooks/useDynamicFormFields'; // Adjust path as necessary

export interface PersonalInfoData {
  [key: string]: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  // Other fields can be added dynamically
}

interface PersonalInfoProps {
  data: PersonalInfoData;
  onChange: (data: PersonalInfoData) => void;
}

// This remains, as it's specific to what PersonalInfo considers its defaults
const defaultFields = ['fullName', 'jobTitle', 'email', 'phone', 'location'];

export function PersonalInfo({ data, onChange }: PersonalInfoProps) {
  // 2. Hook Initialization
  const {
    fields,
    isDialogOpen,
    newFieldName,
    openDialog,
    closeDialog,
    handleAddField, // This is the hook's version
    setNewFieldName,
    // Helper functions are now part of the hook's return, use them from there
    formatFieldLabel,
    getInputType,
    shouldUseTextarea
  } = useDynamicFormFields({
    initialData: data,
    defaultFields,
    onAddField: (fieldName, initialValue) => {
      // This callback updates the parent's state via the component's onChange prop
      onChange({ ...data, [fieldName]: initialValue });
    }
  });

  // Local handleChange remains as it calls the props.onChange for existing fields
  const handleChange = (key: string, value: string) => {
    onChange({ ...data, [key]: value });
  };

  // Removed: local state for fields, isDialogOpen, newFieldName
  // Removed: local handleAddField function
  // Removed: local helper functions (formatFieldLabel, getInputType, shouldUseTextarea)

  return (
    <Card className="p-6 space-y-4 animate-fade-in">
      <h2 className="text-2xl font-semibold text-primary mb-4">Personal Information</h2>
      {/* Use openDialog from the hook */}
      <button onClick={openDialog} className="btn btn-primary">Add New Field</button>

      {/* Use isDialogOpen and setters from the hook for the dialog */}
      <AlertDialogPrimitive.Root open={isDialogOpen} onOpenChange={(open) => open ? openDialog() : closeDialog()}>
        <AlertDialogPrimitive.Content>
        <Label htmlFor="newFieldNameInput" className="sr-only">New Field Name</Label> {/* Added label for accessibility */}
          <input
            id="newFieldNameInput" // Added id for label association
            type="text"
            value={newFieldName} // From hook
            onChange={(e) => setNewFieldName(e.target.value)} // From hook
            placeholder="Enter new field name"
            className="input" // Assuming 'input' is a defined style
          />
          <div className="flex justify-end mt-4">
            {/* Use closeDialog from the hook */}
            <AlertDialogPrimitive.Cancel onClick={closeDialog} className="btn btn-secondary">Cancel</AlertDialogPrimitive.Cancel>
            {/* Use handleAddField from the hook */}
            <button onClick={handleAddField} className="btn btn-primary ml-2">Add</button>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Root>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Use fields and helper functions from the hook */}
        {fields.map((field) => (
          <div key={field} className={`space-y-2 ${shouldUseTextarea(field) ? 'md:col-span-2' : ''}`}>
            <Label htmlFor={field}>{formatFieldLabel(field)}</Label>
            {shouldUseTextarea(field) ? (
              <Textarea
                id={field}
                value={data[field] || ''}
                onChange={(e) => handleChange(field, e.target.value)} // Uses local handleChange
                placeholder={`Enter your ${formatFieldLabel(field).toLowerCase()}`}
                className="min-h-[100px]"
              />
            ) : (
              <Input
                id={field}
                type={getInputType(field)}
                value={data[field] || ''}
                onChange={(e) => handleChange(field, e.target.value)} // Uses local handleChange
                placeholder={`Enter your ${formatFieldLabel(field).toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
