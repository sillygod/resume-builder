import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

// Import the new hook
import { useEditableListManager } from '../hooks/useEditableListManager'; // Adjust path if necessary

export interface WorkExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface WorkExperienceProps {
  entries: WorkExperienceEntry[];
  onChange: (entries: WorkExperienceEntry[]) => void;
}

// Define the factory function for new work experience entries
const workExperienceFactory = (): Omit<WorkExperienceEntry, 'id'> => ({
  company: "",
  position: "", 
  startDate: "",
  endDate: "",
  description: "",
});

export function WorkExperience({ entries, onChange }: WorkExperienceProps) {
  // Call the hook
  const {
    addItem: addExperience, // Renaming for consistency with existing button handler
    updateItem: updateExperience, // Renaming for consistency
    removeItem: removeExperience // Renaming for consistency
  } = useEditableListManager<WorkExperienceEntry>({
    items: entries,
    onChange,
    newItemFactory: workExperienceFactory
  });

  // Removed local addExperience, updateExperience, and removeExperience functions

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary">Work Experience</h2>
      <div className="flex justify-between items-center">
        {/* onClick now calls the addExperience function from the hook */}
        <Button onClick={addExperience} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>
      <div className="space-y-6">
        {entries.map((experience) => (
          <div key={experience.id} className="p-4 relative border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              // onClick now calls the removeExperience function from the hook
              onClick={() => removeExperience(experience.id)}
            >
              <Trash2 className="w-4 h-4 text-accent" />
            </Button>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Company</Label> {/* Assuming Label doesn't need htmlFor if input isn't id'd from it */}
                <Input
                  value={experience.company}
                  // onChange now calls the updateExperience function from the hook
                  onChange={(e) =>
                    updateExperience(experience.id, "company", e.target.value)
                  }
                  placeholder="Company name"
                />
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <Input
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(experience.id, "position", e.target.value)
                  }
                  placeholder="Job title"
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={experience.startDate}
                  onChange={(e) =>
                    updateExperience(experience.id, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={experience.endDate}
                  onChange={(e) =>
                    updateExperience(experience.id, "endDate", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(experience.id, "description", e.target.value)
                  }
                  placeholder="Describe your responsibilities and achievements"
                  className="h-24"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
