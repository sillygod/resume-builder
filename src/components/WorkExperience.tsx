
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

export interface WorkExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface WorkExperienceProps {
  experiences: WorkExperienceEntry[];
  onChange: (experiences: WorkExperienceEntry[]) => void;
}

export function WorkExperience({ experiences, onChange }: WorkExperienceProps) {
  const addExperience = () => {
    const newExperience: WorkExperienceEntry = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onChange([...experiences, newExperience]);
  };

  const updateExperience = (id: string, field: keyof WorkExperienceEntry, value: string) => {
    onChange(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <Card className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-primary">Work Experience</h2>
        <Button onClick={addExperience} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>
      <div className="space-y-6">
        {experiences.map((experience) => (
          <Card key={experience.id} className="p-4 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => removeExperience(experience.id)}
            >
              <Trash2 className="w-4 h-4 text-accent" />
            </Button>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={experience.company}
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
          </Card>
        ))}
      </div>
    </Card>
  );
}
