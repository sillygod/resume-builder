import React, { useState, useEffect } from 'react';
import { SimpleLayout } from './resume-layouts/SimpleLayout';
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
  resumeData?: any;
  setResumeData?: (data: any) => void;
  onApplyResumeChanges?: (
    newPersonalInfo: any,
    newWorkExperience: any[],
    newEducation: any[],
    newSkills: any[],
    newExtraData?: Record<string, any>
  ) => void;
  // New props for lifted state and data
  personalInfo: any;
  workExperience: any[];
  education: any[];
  skills: any[];
  extraData: Record<string, any>;
  editorMode: 'preview' | 'code' | 'json';
  setEditorMode: (mode: 'preview' | 'code' | 'json') => void;
  editorValue: string;
  setEditorValue: (value: string) => void;
}

const LayoutEditor: React.FC<LayoutEditorProps> = ({
  selectedLayout,
  setSelectedLayout,
  layoutProps,
  setLayoutProps,
  customCode,
  setCustomCode,
  resumeData,
  setResumeData = () => {},
  onApplyResumeChanges,
  editorValue,
  setEditorValue
}) => {
  // Defensive defaults to avoid undefined errors
  resumeData = resumeData || {};
  resumeData.basics = resumeData.basics || { name: '', email: '', phone: '', jobTitle: '', location: { city: '', countryCode: 'US' } };
  resumeData.work = resumeData.work || [];
  resumeData.education = resumeData.education || [];
  resumeData.skills = resumeData.skills || [];
  resumeData.extraData = resumeData.extraData || {};
  // Use lifted state for editorValue and setEditorValue from props
  const [editorMode, setEditorMode] = useState<'preview' | 'code' | 'json'>('preview');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [prevSelectedLayout, setPrevSelectedLayout] = useState<string>('');
  const [jsonValue, setJsonValue] = useState<string>('');
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
      const jsonResume = {
        ...resumeData,
        theme: currentTheme,
      };
      setJsonValue(JSON.stringify(jsonResume, null, 2));
    }
  }, [editorMode, customCode, selectedLayout, editorValue, resumeData, currentTheme, jsonValue]);

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
    if (editorMode === 'code' && editorValue && editorValue.trim().startsWith('(')) {
      const scope = {
        basics: resumeData.basics,
        work: resumeData.work,
        education: resumeData.education,
        skills: resumeData.skills,
        extraData: resumeData.extraData,
        personalInfo: resumeData.basics, // for backward compatibility
        workExperience: resumeData.work,
      };
      const func = new Function('React', ...Object.keys(scope), `return ${editorValue}`);
      renderedLayout = func(React, ...Object.values(scope));
    } else {
      const LayoutComponent = layouts[selectedLayout] || layouts['Simple'];
      renderedLayout = <LayoutComponent resumeData={resumeData} />;
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
                height="300px"
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
                        const basics = parsedJson.basics || {};
                        const work = parsedJson.work || [];
                        const education = parsedJson.education || [];
                        const skills = parsedJson.skills || [];
                        const extraData = parsedJson.extraData || {};

                        onApplyResumeChanges(
                          {
                            fullName: basics.name || "",
                            email: basics.email || "",
                            phone: basics.phone || "",
                            location: basics.location?.city || "",
                            jobTitle: basics.jobTitle || "",
                          },
                          work,
                          education,
                          skills,
                          extraData
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
