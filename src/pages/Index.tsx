
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PersonalInfo, PersonalInfoData } from "@/components/PersonalInfo";
import { WorkExperience, WorkExperienceEntry } from "@/components/WorkExperience";
import { Education, EducationEntry } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { ResumePreview } from "@/components/ResumePreview";
import { Eye, EyeOff } from "lucide-react";

const Index = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });
  const [workExperience, setWorkExperience] = useState<WorkExperienceEntry[]>([]);
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Resume Builder</h1>
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
            className="flex items-center gap-2"
          >
            {showPreview ? (
              <>
                <EyeOff className="w-4 h-4" /> Hide Preview
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" /> Show Preview
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <PersonalInfo data={personalInfo} onChange={setPersonalInfo} />
            <WorkExperience
              experiences={workExperience}
              onChange={setWorkExperience}
            />
            <Education education={education} onChange={setEducation} />
            <Skills skills={skills} onChange={setSkills} />
          </div>

          {showPreview && (
            <div className="lg:sticky lg:top-8">
              <ResumePreview
                personalInfo={personalInfo}
                workExperience={workExperience}
                education={education}
                skills={skills}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
