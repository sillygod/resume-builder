import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
}

interface EducationProps {
  education: EducationEntry[];
  onChange: (education: EducationEntry[]) => void;
}

export function Education({ education, onChange }: EducationProps) {
  const addEducation = () => {
    const newEducation: EducationEntry = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      graduationDate: "",
    };
    onChange([...education, newEducation]);
  };

  const updateEducation = (id: string, field: keyof EducationEntry, value: string) => {
    onChange(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: string) => {
    onChange(education.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary">Education</h2>
      <div className="flex justify-between items-center">
        <Button onClick={addEducation} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>
      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 relative border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => removeEducation(edu.id)}
            >
              <Trash2 className="w-4 h-4 text-accent" />
            </Button>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(edu.id, "institution", e.target.value)
                  }
                  placeholder="University name"
                />
              </div>
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, "degree", e.target.value)
                  }
                  placeholder="e.g., Bachelor's, Master's"
                />
              </div>
              <div className="space-y-2">
                <Label>Field of Study</Label>
                <Input
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(edu.id, "field", e.target.value)
                  }
                  placeholder="e.g., Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label>Graduation Date</Label>
                <Input
                  type="date"
                  value={edu.graduationDate}
                  onChange={(e) =>
                    updateEducation(edu.id, "graduationDate", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
