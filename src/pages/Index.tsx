
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PersonalInfo, PersonalInfoData } from "@/components/PersonalInfo";
import { WorkExperience, WorkExperienceEntry } from "@/components/WorkExperience";
import { Education, EducationEntry } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Accordion } from "@/components/ui/accordion";
import { ResumePreview } from "@/components/ResumePreview";
import { Eye, EyeOff, Download, Upload } from "lucide-react";
import { exportToJsonResume, importFromJsonResume } from "@/utils/jsonResume";

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

  const handleExport = () => {
    const jsonResume = exportToJsonResume(
      personalInfo,
      workExperience,
      education,
      skills
    );
    const blob = new Blob([JSON.stringify(jsonResume, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonResume = JSON.parse(e.target?.result as string);
          const { personalInfo: newPersonalInfo, workExperience: newWorkExperience, education: newEducation, skills: newSkills } = 
            importFromJsonResume(jsonResume);
          
          setPersonalInfo(newPersonalInfo);
          setWorkExperience(newWorkExperience);
          setEducation(newEducation);
          setSkills(newSkills);
        } catch (error) {
          console.error("Error importing resume:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Resume Builder</h1>
          <div className="flex gap-2">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="resume-import"
            />
            <label htmlFor="resume-import">
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <span>
                  <Upload className="w-4 h-4" /> Import JSON
                </span>
              </Button>
            </label>
            <Button
              onClick={handleExport}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export JSON
            </Button>
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
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Accordion type="multiple" className="space-y-6">
            <PersonalInfo data={personalInfo} onChange={setPersonalInfo} />
            <WorkExperience
              experiences={workExperience}
              onChange={setWorkExperience}
            />
            <Education education={education} onChange={setEducation} />
            <Skills skills={skills} onChange={setSkills} />
          </Accordion>

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
