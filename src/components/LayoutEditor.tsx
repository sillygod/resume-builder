import React, { useState, useEffect } from 'react';
import { SimpleLayout } from './resume-layouts/SimpleLayout';
import { ModernLayout } from './resume-layouts/ModernLayout';
import { SidebarLayout } from './resume-layouts/SidebarLayout';
import { CenteredLayout } from './resume-layouts/CenteredLayout';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import MonacoEditor from '@monaco-editor/react';
import { themes } from '@/themes/ThemeContext';
import { useTheme } from '@/themes/ThemeContext';
import { exportToJsonResume, importFromJsonResume } from '@/utils/jsonResume';
import { getLayoutJSXString } from './resume-layouts/layoutTemplates';
import { EducationEntry } from './Education';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  resumeData: any;
  setResumeData: (data: any) => void;
  onApplyResumeChanges?: (data: any) => void;
}

const LayoutEditor: React.FC<LayoutEditorProps> = ({
  selectedLayout,
  setSelectedLayout,
  layoutProps,
  setLayoutProps,
  customCode,
  setCustomCode,
  resumeData,
  setResumeData,
  onApplyResumeChanges
}) => {
  // Defensive defaults to avoid undefined errors
  resumeData = resumeData || {};
  resumeData.basics = resumeData.basics || { name: '', email: '', phone: '', jobTitle: '', location: { city: '', countryCode: 'US' } };
  resumeData.work = resumeData.work || [];
  resumeData.education = resumeData.education || [];
  resumeData.skills = resumeData.skills || [];
  resumeData.extraData = resumeData.extraData || {};
  const [editorValue, setEditorValue] = useState<string>('');
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
    } else if (editorMode === 'json') {
      const jsonResume = {
        ...resumeData,
        theme: currentTheme,
      };
      setJsonValue(JSON.stringify(jsonResume, null, 2));
    }
  }, [editorMode, customCode, selectedLayout, editorValue, resumeData, currentTheme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLayoutProps({ ...layoutProps, [name]: value });
  };

  const handleCodeChange = (editor: any, data: any, value: string) => {
    setEditorValue(value);
    setCustomCode(value);

    let codeToValidate = value.trim();
    if (!codeToValidate.startsWith('(') || !codeToValidate.endsWith(')')) {
      setCodeError("Warning: JSX code should be wrapped in parentheses for proper rendering");
    } else {
      setCodeError(null);
    }
  };

  const handleJsonChange = (editor: any, data: any, value: string) => {
    setJsonValue(value);
  };

  const resetCustomCode = () => {
    const templateCode = getLayoutJSXString(selectedLayout);
    setEditorValue(templateCode);
    setCustomCode(templateCode);
    setCodeError(null);
    toast.info("Reset to template layout");
  };

  const applyJsonChanges = () => {
    try {
      const parsedJson = JSON.parse(jsonValue);
      // Assume imported JSON Resume shape
      setResumeData(parsedJson);

      if (onApplyResumeChanges) {
        // Optionally, convert JSON Resume back to your old shape if needed
        toast.success("Applied JSON changes to resume");
      }
    } catch (error) {
      toast.error("Invalid JSON format. Please check your syntax.");
    }
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => {
      const basics = { ...prev.basics };
      if (name === 'location') {
        basics.location = { ...basics.location, city: value };
      } else if (name === 'jobTitle') {
        basics.jobTitle = value;
      } else if (name === 'fullName' || name === 'name') {
        basics.name = value;
      } else {
        basics[name] = value;
      }
      return { ...prev, basics };
    });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    setResumeData(prev => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  const handleWorkExperienceChange = (index: number, field: string, value: string) => {
    setResumeData(prev => {
      const updated = [...prev.work];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, work: updated };
    });
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    setResumeData(prev => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const addWorkExperience = () => {
    setResumeData(prev => ({
      ...prev,
      work: [
        ...prev.work,
        {
          company: 'New Company',
          position: 'New Position',
          startDate: 'Start Date',
          endDate: 'End Date',
          description: 'Job description...',
        },
      ],
    }));
  };

  const removeWorkExperience = (index: number) => {
    setResumeData(prev => {
      const updated = [...prev.work];
      updated.splice(index, 1);
      return { ...prev, work: updated };
    });
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: 'New Institution',
          degree: 'New Degree',
          field: '',
          graduationDate: '',
        },
      ],
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => {
      const updated = [...prev.education];
      updated.splice(index, 1);
      return { ...prev, education: updated };
    });
  };

  const applyResumeChanges = () => {
    if (onApplyResumeChanges) {
      onApplyResumeChanges(resumeData);
      toast.success("Resume data updated successfully");
    } else {
      toast.info("Resume data updates will be applied in a future implementation");

      console.log("Updated Resume Data:", resumeData);
    }
  };

  const renderExtraDataAccordion = () => {
    if (!resumeData.extraData || Object.keys(resumeData.extraData).length === 0) {
      return (
        <div className="border p-3 rounded mb-4">
          <p className="text-sm text-gray-500">
            No additional data fields. You can add custom fields in the JSON editor tab.
          </p>
        </div>
      );
    }

    return (
      <div className="border p-3 rounded mb-4">
        <h3 className="font-medium mb-3">Custom Fields</h3>
        <div className="space-y-3">
          {Object.entries(resumeData.extraData).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <p className="text-sm font-medium">{key}</p>
              <p className="text-sm text-gray-600 border p-2 rounded bg-gray-50">
                {typeof value === 'object'
                  ? JSON.stringify(value, null, 2)
                  : String(value)}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Note: To modify these custom fields, please use the JSON Editor tab.
        </p>
      </div>
    );
  };

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

      <Tabs defaultValue="preview" className="mt-6" onValueChange={(value) => setEditorMode(value as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Resume Data</TabsTrigger>
          <TabsTrigger value="code">Edit Layout Code</TabsTrigger>
          <TabsTrigger value="json">Edit JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <ScrollArea className="h-[600px] pr-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Resume Data Editor</h3>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="personal-info">
                  <AccordionTrigger className="text-md font-medium">Personal Information</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={resumeData.basics.name}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        name="jobTitle"
                        value={resumeData.basics.jobTitle || ''}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={resumeData.basics.email}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={resumeData.basics.phone}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={resumeData.basics.location?.city || ''}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="work-experience">
                  <AccordionTrigger className="text-md font-medium">Work Experience</AccordionTrigger>
                  <AccordionContent>
                    {resumeData.work.map((exp, index) => (
                      <div key={index} className="border p-3 rounded mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Experience {index + 1}</h4>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeWorkExperience(index)}
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor={`company-${index}`}>Company</Label>
                            <Input
                              id={`company-${index}`}
                              value={exp.company}
                              onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`position-${index}`}>Position</Label>
                            <Input
                              id={`position-${index}`}
                              value={exp.position}
                              onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                              <Input
                                id={`startDate-${index}`}
                                value={exp.startDate}
                                onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`endDate-${index}`}>End Date</Label>
                              <Input
                                id={`endDate-${index}`}
                                value={exp.endDate}
                                onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor={`description-${index}`}>Description</Label>
                            <Textarea
                              id={`description-${index}`}
                              value={exp.description}
                              onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={addWorkExperience}
                      className="w-full"
                    >
                      Add Work Experience
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="education">
                  <AccordionTrigger className="text-md font-medium">Education</AccordionTrigger>
                  <AccordionContent>
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="border p-3 rounded mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Education {index + 1}</h4>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeEducation(index)}
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor={`institution-${index}`}>Institution</Label>
                            <Input
                              id={`institution-${index}`}
                              value={edu.institution}
                              onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`degree-${index}`}>Degree</Label>
                            <Input
                              id={`degree-${index}`}
                              value={edu.degree}
                              onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor={`field-${index}`}>Field of Study</Label>
                              <Input
                                id={`field-${index}`}
                                value={edu.field}
                                onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`graduationDate-${index}`}>Graduation Date</Label>
                              <Input
                                id={`graduationDate-${index}`}
                                value={edu.graduationDate}
                                onChange={(e) => handleEducationChange(index, 'graduationDate', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={addEducation}
                      className="w-full"
                    >
                      Add Education
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="skills">
                  <AccordionTrigger className="text-md font-medium">Skills</AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <Label htmlFor="skills">
                        Skills (comma-separated)
                      </Label>
                      <Textarea
                        id="skills"
                        value={resumeData.skills.join(', ')}
                        onChange={handleSkillsChange}
                        rows={5}
                        placeholder="Enter skills separated by commas"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="extra-data">
                  <AccordionTrigger className="text-md font-medium">Additional Fields</AccordionTrigger>
                  <AccordionContent>
                    {renderExtraDataAccordion()}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4">
                <Button onClick={applyResumeChanges} className="w-full">
                  Apply Resume Changes
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold">Layout Properties</h3>
              {Object.keys(layoutProps).length > 0 ? (
                Object.keys(layoutProps).map((key) => (
                  <div key={key} className="mb-2">
                    <Label htmlFor={key} className="block text-sm font-medium">{key}</Label>
                    <Input
                      id={key}
                      type="text"
                      name={key}
                      value={layoutProps[key] || ''}
                      onChange={handleChange}
                      placeholder={`Enter ${key}`}
                      className="mt-1"
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No layout-specific properties available for this template.</p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

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
                  setEditorValue(value ?? '');
                  setCustomCode(value ?? '');

                  const codeToValidate = (value ?? '').trim();
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

            <div className="flex gap-2">
              <Button onClick={applyJsonChanges} variant="outline">Apply JSON Changes</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default LayoutEditor;
