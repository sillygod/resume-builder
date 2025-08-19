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
import { ErrorBoundary } from './ErrorBoundary';

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
  resumeDataSource,
  editorMode,
  setEditorMode,
  editorValue,
  setEditorValue,
  jsonValue,
  setJsonValue
}) => {

  // Extract data from resumeDataSource, providing fallbacks for robustness
  const currentPersonalInfo = React.useMemo(
    () =>
      resumeDataSource.personalInfo ||
      ({ fullName: "", email: "", phone: "", jobTitle: "", location: "" } as PersonalInfoData),
    [resumeDataSource.personalInfo]
  );
  const currentWorkExperience = React.useMemo(() => resumeDataSource.workExperience || [], [resumeDataSource.workExperience]);
  const currentEducation = React.useMemo(() => resumeDataSource.education || [], [resumeDataSource.education]);
  const currentSkills = React.useMemo(() => resumeDataSource.skills || [], [resumeDataSource.skills]);
  const currentExtraData = React.useMemo(() => resumeDataSource.extraData || {}, [resumeDataSource.extraData]);

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
  }, [
    editorMode,
    customCode,
    selectedLayout,
    editorValue,
    resumeDataSource,
    currentTheme,
    jsonValue,
    setEditorValue,
    setCustomCode,
    setJsonValue,
    currentPersonalInfo,
    currentWorkExperience,
    currentEducation,
    currentSkills,
    currentExtraData
  ]);
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


  const renderLayout = () => {
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
        return func(React, ...Object.values(scope));
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
        return <LayoutComponent resumeData={resumeDataForLayout} />;
      }
    } catch (err) {
      return (
        <div className="p-4 border border-red-200 bg-red-50 rounded-md">
          <h3 className="text-red-800 font-semibold mb-2">Code Execution Error</h3>
          <p className="text-red-700 text-sm mb-2">
            There was an error executing your custom layout code.
          </p>
          <details className="text-xs text-red-600">
            <summary className="cursor-pointer font-medium">Error Details</summary>
            <pre className="mt-2 whitespace-pre-wrap">{(err as Error).message}</pre>
          </details>
        </div>
      );
    }
  };

  return (
    <Card className="p-3 bg-white rounded shadow-md max-w-full overflow-x-auto">
      {/* Compact header with inline layout selection */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">Layout Editor</h2>
        <div className="flex items-center gap-2">
          <Label htmlFor="layout-select" className="text-sm">Template:</Label>
          <Select value={selectedLayout} onValueChange={setSelectedLayout}>
            <SelectTrigger id="layout-select" className="w-32">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(layouts).map((layout) => (
                <SelectItem key={layout} value={layout}>{layout}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="code" className="mt-2" onValueChange={(value) => setEditorMode(value as any)}>
        <TabsList className="mb-2 h-8">
          <TabsTrigger value="code" className="text-xs px-3 py-1">Code</TabsTrigger>
          <TabsTrigger value="json" className="text-xs px-3 py-1">JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="code">
          <div className="mb-2">
            {/* Compact info section */}
            <div className="p-2 mb-2 bg-blue-50 border border-blue-200 rounded text-blue-700 text-xs">
              <strong>Variables:</strong> <code>personalInfo</code>, <code>workExperience</code>, <code>education</code>, <code>skills</code>
              <br /><strong>Note:</strong> Wrap JSX in parentheses: <code>(&lt;div&gt;...&lt;/div&gt;)</code>
            </div>

            <div className="border rounded overflow-hidden mb-2">
              <MonacoEditor
                height="600px"
                defaultLanguage="javascript"
                language="javascript"
                theme="vs-dark"
                value={editorValue}
                onChange={(value) => {
                  // Remove single-line and multi-line comments before validation
                  const code = value ?? '';
                  // code = code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
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
              <div className="p-2 mb-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-xs">
                {codeError}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={resetCustomCode} variant="outline" size="sm">Reset to Template</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="json">
          <div className="mb-2">
            <div className="p-2 mb-2 bg-gray-50 border border-gray-200 rounded text-gray-600 text-xs">
              Edit resume data JSON. Changes auto-apply after 500ms.
            </div>

            <div className="border rounded overflow-hidden mb-2">
              <MonacoEditor
                height="600px"
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
