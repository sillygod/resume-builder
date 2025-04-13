import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PersonalInfo, PersonalInfoData } from "@/components/PersonalInfo";
import { WorkExperience, WorkExperienceEntry } from "@/components/WorkExperience";
import { Education, EducationEntry } from "@/components/Education";
import { ResumePreview } from "@/components/ResumePreview";
import { ResumeAssistant } from "@/components/ResumeAssistant";
import { Download, Upload } from "lucide-react";
import { exportToJsonResume, importFromJsonResume } from "@/utils/jsonResume";
import { FoldablePanel } from "@/components/FoldablePanel";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useTheme, ThemeName } from "@/themes/ThemeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShowPreviewButton } from "@/components/ShowPreviewButton";
import LayoutEditor from '@/components/LayoutEditor';

const Index = () => {
  const { currentTheme, setTheme } = useTheme();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
  });
  const [workExperience, setWorkExperience] = useState<WorkExperienceEntry[]>([]);
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isFolded, setIsFolded] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<string>("Modern");
  const [layoutProps, setLayoutProps] = useState<any>({});
  const [customCode, setCustomCode] = useState<string | null>(null);
  const [extraData, setExtraData] = useState<Record<string, any>>({});
  // LIFTED STATE FOR LAYOUT CODE EDITOR
  const [editorMode, setEditorMode] = useState<'preview' | 'code' | 'json'>('preview');
  const [editorValue, setEditorValue] = useState<string>("");

  const handleExport = () => {
    const jsonResume = exportToJsonResume(
      personalInfo,
      workExperience,
      education,
      skills,
      currentTheme
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
          const { 
            personalInfo: newPersonalInfo, 
            workExperience: newWorkExperience, 
            education: newEducation, 
            skills: newSkills,
            theme: newTheme
          } = importFromJsonResume(jsonResume);

          setPersonalInfo(newPersonalInfo);
          setWorkExperience(newWorkExperience);
          setEducation(newEducation);
          setSkills(newSkills);
          
          if (newTheme) {
            setTheme(newTheme);
          }
        } catch (error) {
          console.error("Error importing resume:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePreviewPdf = () => {
    const previewButton = document.getElementById('preview-pdf-button');
    if (previewButton) {
      previewButton.click();
    }
  };

  const handleApplyResumeChanges = (
    newPersonalInfo: PersonalInfoData,
    newWorkExperience: WorkExperienceEntry[],
    newEducation: EducationEntry[],
    newSkills: string[],
    newExtraData?: Record<string, any>
  ) => {
    setPersonalInfo(newPersonalInfo);
    setWorkExperience(newWorkExperience);
    setEducation(newEducation);
    setSkills(newSkills);
    if (newExtraData) {
      setExtraData(newExtraData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
          <h1 className="text-4xl font-bold text-primary">Resume Builder</h1>
          
          <div className="flex flex-wrap gap-2 items-center">
            <ThemeSwitcher />
            
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
            <ShowPreviewButton 
              showPreview={showPreview}
              togglePreview={() => setShowPreview(!showPreview)}
              handlePreviewPdf={handlePreviewPdf}
            />
          </div>
        </div>

        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor">
            <div className="grid gap-8 lg:grid-cols-2">
              <FoldablePanel setIsFolded={setIsFolded} isFolded={isFolded}>
                <LayoutEditor
                  selectedLayout={selectedLayout}
                  setSelectedLayout={setSelectedLayout}
                  layoutProps={layoutProps}
                  setLayoutProps={setLayoutProps}
                  customCode={customCode}
                  setCustomCode={setCustomCode}
                  personalInfo={personalInfo}
                  workExperience={workExperience}
                  education={education}
                  skills={skills}
                  extraData={extraData}
                  onApplyResumeChanges={handleApplyResumeChanges}
                  // LIFTED STATE FOR LAYOUT CODE EDITOR
                  editorMode={editorMode}
                  setEditorMode={setEditorMode}
                  editorValue={editorValue}
                  setEditorValue={setEditorValue}
                />
              </FoldablePanel>

              {showPreview && (
                <div className={`${isFolded ? "col-span-2" : "lg:col-span-1"}`}>
                  <ResumePreview
                    personalInfo={personalInfo}
                    workExperience={workExperience}
                    education={education}
                    skills={skills}
                    theme={currentTheme}
                    onPreviewPdf={handlePreviewPdf}
                    extraData={extraData}
                    // Pass custom layout code and mode to preview
                    customLayoutCode={editorValue}
                    customLayoutMode={editorMode}
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="assistant">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="lg:col-span-1">
                <ResumeAssistant 
                  personalInfo={personalInfo}
                  workExperience={workExperience}
                  education={education}
                  skills={skills}
                />
              </div>
              
              <div className="lg:col-span-1">
                <ResumePreview
                  personalInfo={personalInfo}
                  workExperience={workExperience}
                  education={education}
                  skills={skills}
                  theme={currentTheme}
                  onPreviewPdf={handlePreviewPdf}
                  extraData={extraData}
                  // Do not pass custom code in assistant tab
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
