
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface SkillsProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export function Skills({ skills, onChange }: SkillsProps) {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <Card className="p-6 space-y-4 animate-fade-in">
      <h2 className="text-2xl font-semibold text-primary">Skills</h2>
      <form onSubmit={addSkill} className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill"
          className="flex-1"
        />
        <Button type="submit" variant="outline">
          Add
        </Button>
      </form>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="ml-2 hover:text-accent focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    </Card>
  );
}
