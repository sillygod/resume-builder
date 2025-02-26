
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export interface PersonalInfoData {
  [key: string]: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
}

interface PersonalInfoProps {
  data: PersonalInfoData;
  onChange: (data: PersonalInfoData) => void;
}

const defaultFields = ['fullName', 'jobTitle', 'email', 'phone', 'location'];

export function PersonalInfo({ data, onChange }: PersonalInfoProps) {
  const handleChange = (key: string, value: string) => {
    onChange({ ...data, [key]: value });
  };

  // Get all unique fields from the data object
  const fields = Array.from(new Set([...defaultFields, ...Object.keys(data)]));

  // Helper function to format field labels
  const formatFieldLabel = (field: string) => {
    return field
      .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim();
  };

  // Helper function to determine input type
  const getInputType = (field: string) => {
    if (field === 'email') return 'email';
    if (field === 'phone') return 'tel';
    if (field.toLowerCase().includes('date')) return 'date';
    return 'text';
  };

  // Helper function to determine if field should use textarea
  const shouldUseTextarea = (field: string) => {
    return field.toLowerCase().includes('summary') || 
           field.toLowerCase().includes('description') ||
           field.toLowerCase().includes('bio');
  };

  return (
    <Card className="p-6 space-y-4 animate-fade-in">
      <h2 className="text-2xl font-semibold text-primary mb-4">Personal Information</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field} className={`space-y-2 ${shouldUseTextarea(field) ? 'md:col-span-2' : ''}`}>
            <Label htmlFor={field}>{formatFieldLabel(field)}</Label>
            {shouldUseTextarea(field) ? (
              <Textarea
                id={field}
                value={data[field] || ''}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={`Enter your ${formatFieldLabel(field).toLowerCase()}`}
                className="min-h-[100px]"
              />
            ) : (
              <Input
                id={field}
                type={getInputType(field)}
                value={data[field] || ''}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={`Enter your ${formatFieldLabel(field).toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
