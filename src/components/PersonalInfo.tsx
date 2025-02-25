
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export interface PersonalInfoData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
}

interface PersonalInfoProps {
  data: PersonalInfoData;
  onChange: (data: PersonalInfoData) => void;
}

export function PersonalInfo({ data, onChange }: PersonalInfoProps) {
  const handleChange = (key: keyof PersonalInfoData, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <AccordionItem value="personal-info" className="border-b-0">
      <AccordionTrigger className="hover:no-underline">
        <h2 className="text-2xl font-semibold text-primary">Personal Information</h2>
      </AccordionTrigger>
      <AccordionContent>
        <Card className="p-6 space-y-4 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="City, Country"
          />
        </div>
      </div>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
}
