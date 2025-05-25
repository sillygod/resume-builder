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

interface ResumeDataState {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  extraData: Record<string, any>;
}

const initialResumeData: ResumeDataState = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
  },
  workExperience: [],
  education: [],
  skills: [],
  extraData: {},
};

const Index = () => {
  const { currentTheme, setTheme } = useTheme();
  const [resumeData, setResumeData] = useState<ResumeDataState>(initialResumeData);
  const [showPreview, setShowPreview] = useState(false);
  const [isFolded, setIsFolded] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<string>("Modern");
  const [layoutProps, setLayoutProps] = useState<any>({});
  const [customCode, setCustomCode] = useState<string | null>(null);
  // LIFTED STATE FOR LAYOUT CODE EDITOR
  const [editorMode, setEditorMode] = useState<'preview' | 'code' | 'json'>('preview');
  const [editorValue, setEditorValue] = useState<string>("");
  const [jsonValue, setJsonValue] = useState<string>("");

  const handleExport = () => {
    const jsonResume = exportToJsonResume(
      resumeData, // Pass the entire resumeData object
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
          const importedData = importFromJsonResume(jsonResume);

          setResumeData({
            personalInfo: importedData.personalInfo,
            workExperience: importedData.workExperience,
            education: importedData.education,
            skills: importedData.skills,
            extraData: importedData.extraData || {},
          });
          
          if (importedData.theme) {
            setTheme(importedData.theme as ThemeName);
          }

          // Update the JSON editor as well
          // Ensure this reflects the new resumeData structure and includes extraData
          setJsonValue(JSON.stringify({
            basics: importedData.personalInfo,
            work: importedData.workExperience,
            education: importedData.education,
            skills: importedData.skills,
            theme: importedData.theme, // theme is still separate
            extraData: importedData.extraData,
          }, null, 2));
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
    setResumeData(prev => ({
      ...prev,
      personalInfo: newPersonalInfo,
      workExperience: newWorkExperience,
      education: newEducation,
      skills: newSkills,
      extraData: newExtraData || prev.extraData,
    }));
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
                  personalInfo={resumeData.personalInfo}
                  workExperience={resumeData.workExperience}
                  education={resumeData.education}
                  skills={resumeData.skills}
                  extraData={resumeData.extraData}
                  onApplyResumeChanges={handleApplyResumeChanges}
                  // LIFTED STATE FOR LAYOUT CODE EDITOR
                  editorMode={editorMode}
                  setEditorMode={setEditorMode}
                  editorValue={editorValue}
                  setEditorValue={setEditorValue}
                  jsonValue={jsonValue}
                  setJsonValue={setJsonValue}
                />
              </FoldablePanel>

              {showPreview && (
                <div className={`${isFolded ? "col-span-2" : "lg:col-span-1"}`}>
                  <ResumePreview
                    personalInfo={resumeData.personalInfo}
                    workExperience={resumeData.workExperience}
                    education={resumeData.education}
                    skills={resumeData.skills}
                    theme={currentTheme}
                    onPreviewPdf={handlePreviewPdf}
                    extraData={resumeData.extraData}
                    customLayoutCode={editorValue}
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="assistant">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="lg:col-span-1">
                <ResumeAssistant 
                  personalInfo={resumeData.personalInfo}
                  workExperience={resumeData.workExperience}
                  education={resumeData.education}
                  skills={resumeData.skills}
                />
              </div>
              
              <div className="lg:col-span-1">
                <ResumePreview
                  personalInfo={resumeData.personalInfo}
                  workExperience={resumeData.workExperience}
                  education={resumeData.education}
                  skills={resumeData.skills}
                  theme={currentTheme}
                  onPreviewPdf={handlePreviewPdf}
                  extraData={resumeData.extraData}
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
