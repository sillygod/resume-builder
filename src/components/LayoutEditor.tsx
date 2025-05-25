import React, { useState, useEffect } from 'react';
import { SimpleLayout } from './resume-layouts/SimpleLayout';
import { PersonalInfoData } from './PersonalInfo';
import { WorkExperienceEntry } from './WorkExperience';
import { EducationEntry } from './Education';
import { ModernLayout } from './resume-layouts/ModernLayout';
import { SidebarLayout } from './resume-layouts/SidebarLayout';
import { CenteredLayout } from './resume-layouts/CenteredLayout';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import MonacoEditor from '@monaco-editor/react';
import { useTheme } from '@/themes/ThemeContext';
import { getLayoutJSXString } from './resume-layouts/layoutTemplates';
import { ResumeDataState } from '../utils/jsonResume'; // Import ResumeDataState

// @ts-ignore
declare global {
  interface Window {
    __jsonApplyTimeout?: any;
  }
}

const layouts = {
  Simple: SimpleLayout,
  Modern: ModernLayout,
  Sidebar: SidebarLayout,
  Centered: CenteredLayout,
};

interface LayoutEditorProps {
  selectedLayout: string;
  setSelectedLayout: (layout: string) => void;
  layoutProps: Record<string, any>;
  setLayoutProps: (props: Record<string, any>) => void;
  customCode: string | null;
  setCustomCode: (code: string | null) => void;
  // resumeData and setResumeData are no longer passed from Index.tsx
  onApplyResumeChanges?: (
    newPersonalInfo: PersonalInfoData,
    newWorkExperience: WorkExperienceEntry[],
    newEducation: EducationEntry[],
    newSkills: string[],
    newExtraData?: Record<string, any>
  ) => void;
  // New prop for consolidated resume data
  resumeDataSource: ResumeDataState;
  editorMode: 'preview' | 'code' | 'json';
  setEditorMode: (mode: 'preview' | 'code' | 'json') => void;
  editorValue: string;
  setEditorValue: (value: string) => void;
  jsonValue: string;
  setJsonValue: (value: string) => void;
}

const LayoutEditor: React.FC<LayoutEditorProps> = ({
  selectedLayout,
  setSelectedLayout,
  layoutProps,
  setLayoutProps,
  customCode,
  setCustomCode,
  // resumeData, // No longer a direct prop
  // setResumeData = () => {}, // No longer a direct prop
  onApplyResumeChanges,
  // Destructure the new resumeDataSource prop
  resumeDataSource,
  editorMode,
  setEditorMode,
  editorValue,
  setEditorValue,
  jsonValue,
  setJsonValue
}) => {
  // Extract data from resumeDataSource, providing fallbacks for robustness
  const currentPersonalInfo = resumeDataSource.personalInfo || { fullName: "", email: "", phone: "", jobTitle: "", location: "" } as PersonalInfoData;
  const currentWorkExperience = resumeDataSource.workExperience || [];
  const currentEducation = resumeDataSource.education || [];
  const currentSkills = resumeDataSource.skills || [];
  const currentExtraData = resumeDataSource.extraData || {};

  const [codeError, setCodeError] = useState<string | null>(null);
  const [prevSelectedLayout, setPrevSelectedLayout] = useState<string>('');
  const { currentTheme, setTheme } = useTheme();

  useEffect(() => {
    if (selectedLayout && selectedLayout !== prevSelectedLayout) {
      setPrevSelectedLayout(selectedLayout);
      const templateCode = getLayoutJSXString(selectedLayout);
      setEditorValue(templateCode);
      setCustomCode(templateCode);

      const LayoutComponent = layouts[selectedLayout];
      if (LayoutComponent) {
        setLayoutProps(LayoutComponent.defaultProps || {});
      }

      setTheme(selectedLayout.toLowerCase() as any);

      toast.info(`Layout changed to ${selectedLayout}`);
    }
  }, [selectedLayout, setCustomCode, setLayoutProps, prevSelectedLayout, setTheme]);

  useEffect(() => {
    if (editorMode === 'code' && (!editorValue || editorValue.trim() === '')) {
      if (customCode) {
        setEditorValue(customCode);
      } else {
        const templateCode = getLayoutJSXString(selectedLayout);
        setEditorValue(templateCode);
        setCustomCode(templateCode);
      }
    } else if (editorMode === 'json' && jsonValue.trim() === '') {
      // Construct jsonToEdit from individual props passed from Index.tsx
      const currentResumeStructure = {
        basics: currentPersonalInfo,
        work: currentWorkExperience,
        education: currentEducation,
        skills: currentSkills,
        extraData: currentExtraData,
        theme: currentTheme,
      };
      setJsonValue(JSON.stringify(currentResumeStructure, null, 2));
    }
  }, [editorMode, customCode, selectedLayout, editorValue, resumeDataSource, currentTheme, jsonValue, setEditorValue, setCustomCode, setJsonValue]);
  // Note: resumeDataSource is added to dependency array of above useEffect

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLayoutProps({ ...layoutProps, [name]: value });
  };

  const resetCustomCode = () => {
    const templateCode = getLayoutJSXString(selectedLayout);
    setEditorValue(templateCode);
    setCustomCode(templateCode);
    setCodeError(null);
    toast.info("Reset to template layout");
  };


  let renderedLayout: React.ReactNode = null;
  try {
    // Always use custom JSX code if present and valid, regardless of editorMode
    if (editorValue && editorValue.trim().startsWith('(')) {
      // Scope for custom code execution using resumeDataSource
      const scope = {
        basics: resumeDataSource.personalInfo,
        work: resumeDataSource.workExperience,
        education: resumeDataSource.education,
        skills: resumeDataSource.skills,
        extraData: resumeDataSource.extraData,
        // For backward compatibility
        personalInfo: resumeDataSource.personalInfo,
        workExperience: resumeDataSource.workExperience,
      };
      const func = new Function('React', ...Object.keys(scope), `return ${editorValue}`);
      renderedLayout = func(React, ...Object.values(scope));
    } else {
      // Default rendering if not custom code
      const LayoutComponent = layouts[selectedLayout] || layouts['Simple'];
      // Standard layouts expect a single resumeData prop with basics, work, etc.
      const resumeDataForLayout = {
        basics: resumeDataSource.personalInfo,
        work: resumeDataSource.workExperience,
        education: resumeDataSource.education,
        skills: resumeDataSource.skills,
        extraData: resumeDataSource.extraData,
      };
      renderedLayout = <LayoutComponent resumeData={resumeDataForLayout} />;
    }
  } catch (err) {
    renderedLayout = (
      <div className="p-4 text-red-600">
        Error rendering layout: {(err as Error).message}
      </div>
    );
  }

  return (
    <Card className="p-4 bg-white rounded shadow-md max-w-full overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Layout Editor</h2>

      <div className="mb-4">
        <Label htmlFor="layout-select">Select Layout Template</Label>
        <Select value={selectedLayout} onValueChange={setSelectedLayout}>
          <SelectTrigger id="layout-select" className="w-full">
            <SelectValue placeholder="Select a layout" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(layouts).map((layout) => (
              <SelectItem key={layout} value={layout}>{layout}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Removed the small preview above the code editor */}

      <Tabs defaultValue="code" className="mt-6" onValueChange={(value) => setEditorMode(value as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="code">Edit Layout Code</TabsTrigger>
          <TabsTrigger value="json">Edit JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="code">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Edit Resume Layout JSX</h3>
            <p className="text-sm text-gray-600 mb-2">
              Edit the JSX code for your resume layout. Your code has access to these variables:
              <code className="mx-1 px-1 bg-gray-100 rounded text-xs">personalInfo</code>
              <code className="mx-1 px-1 bg-gray-100 rounded text-xs">workExperience</code>
              <code className="mx-1 px-1 bg-gray-100 rounded text-xs">education</code>
              <code className="mx-1 px-1 bg-gray-100 rounded text-xs">skills</code>
            </p>

            <div className="p-2 mb-3 bg-blue-50 border border-blue-200 rounded text-blue-700 text-sm">
              <strong>Note:</strong> Your JSX code must be wrapped in parentheses like the example below:
              <pre className="mt-1 text-xs overflow-x-auto">{`(\n  <div>\n    <h1>{personalInfo.fullName}</h1>\n  </div>\n)`}</pre>
            </div>

            <div className="border rounded overflow-hidden mb-4">
              <MonacoEditor
                height="500px"
                defaultLanguage="javascript"
                language="javascript"
                theme="vs-dark"
                value={editorValue}
                onChange={(value) => {
                  // Remove single-line and multi-line comments before validation
                  let code = value ?? '';
                  code = code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
                  setEditorValue(code);
                  setCustomCode(code);

                  const codeToValidate = code.trim();
                  if (!codeToValidate.startsWith('(') || !codeToValidate.endsWith(')')) {
                    setCodeError("Warning: JSX code should be wrapped in parentheses for proper rendering");
                  } else {
                    setCodeError(null);
                  }
                }}
                options={{
                  wordWrap: 'on',
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>

            {codeError && (
              <div className="p-2 mb-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-sm">
                {codeError}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={resetCustomCode} variant="outline">Reset to Template</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="json">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Edit Resume JSON</h3>
            <p className="text-sm text-gray-600 mb-2">
              Edit the JSON representation of your resume data, including custom fields. Changes will be applied to your resume when you click "Apply JSON Changes".
            </p>

            <div className="border rounded overflow-hidden mb-4">
              <MonacoEditor
                height="300px"
                defaultLanguage="json"
                language="json"
                theme="vs-dark"
                value={jsonValue}
                onChange={(value) => {
                  setJsonValue(value ?? '');
                  // Debounce auto-apply
                  if (window.__jsonApplyTimeout) clearTimeout(window.__jsonApplyTimeout);
                  window.__jsonApplyTimeout = setTimeout(() => {
                    try {
                      const cleaned = (value ?? '').trim();
                      const fixed = cleaned.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
                      const parsedJson = JSON.parse(fixed);

                      if (onApplyResumeChanges) {
                        const parsedBasics = parsedJson.basics || {};
                        const parsedWork = parsedJson.work || [];
                        const parsedEducation = parsedJson.education || [];
                        const parsedSkills = parsedJson.skills || [];
                        const parsedExtraData = parsedJson.extraData || {};
                        
                        // Reconstruct PersonalInfoData, passing through all fields from basics
                        const {
                          name,
                          email,
                          phone,
                          location, // This is an object { city, countryCode } in JSON resume spec
                          jobTitle,
                          ...otherBasics // Capture any other fields in basics
                        } = parsedBasics;
                        
                        const updatedPersonalInfo: PersonalInfoData = {
                          fullName: name || "",
                          email: email || "",
                          phone: phone || "",
                          // Assuming PersonalInfoData expects location as a string (city)
                          // and jsonResume spec has location as { city, countryCode }
                          location: typeof location === 'object' ? location?.city || "" : typeof location === 'string' ? location : "",
                          jobTitle: jobTitle || "",
                          ...otherBasics, // Spread remaining fields from basics
                        };

                        onApplyResumeChanges(
                          updatedPersonalInfo,
                          parsedWork,
                          parsedEducation,
                          parsedSkills,
                          parsedExtraData
                        );
                      }
                    } catch (error) {
                      // Ignore parse errors, don't apply
                    }
                  }, 500);
                }}
                options={{
                  wordWrap: 'on',
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
            {/* Button removed: now auto-applies */}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default LayoutEditor;
