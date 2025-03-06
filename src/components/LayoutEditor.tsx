
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
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';
import { themes } from '@/themes/ThemeContext';
import { useTheme } from '@/themes/ThemeContext';
import { exportToJsonResume } from '@/utils/jsonResume';
import { getLayoutJSXString } from './resume-layouts/layoutTemplates';
import { PersonalInfoData } from './PersonalInfo';
import { WorkExperienceEntry } from './WorkExperience';
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
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

const LayoutEditor: React.FC<LayoutEditorProps> = ({ 
  selectedLayout, 
  setSelectedLayout, 
  layoutProps, 
  setLayoutProps,
  customCode,
  setCustomCode,
  personalInfo,
  workExperience,
  education,
  skills
}) => {
  const [editorValue, setEditorValue] = useState<string>('');
  const [editorMode, setEditorMode] = useState<'preview' | 'code' | 'json'>('preview');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [prevSelectedLayout, setPrevSelectedLayout] = useState<string>('');
  const [jsonValue, setJsonValue] = useState<string>('');
  const { currentTheme, setTheme } = useTheme();
  
  // Add state for edited resume data
  const [editedPersonalInfo, setEditedPersonalInfo] = useState<PersonalInfoData>(personalInfo);
  const [editedWorkExperience, setEditedWorkExperience] = useState<WorkExperienceEntry[]>(workExperience);
  const [editedEducation, setEditedEducation] = useState<EducationEntry[]>(education);
  const [editedSkills, setEditedSkills] = useState<string[]>(skills);

  // Update local state when props change
  useEffect(() => {
    setEditedPersonalInfo(personalInfo);
    setEditedWorkExperience(workExperience);
    setEditedEducation(education);
    setEditedSkills(skills);
  }, [personalInfo, workExperience, education, skills]);

  // Update editor value when selected layout changes
  useEffect(() => {
    if (selectedLayout && selectedLayout !== prevSelectedLayout) {
      setPrevSelectedLayout(selectedLayout);
      const templateCode = getLayoutJSXString(selectedLayout);
      setEditorValue(templateCode);
      setCustomCode(templateCode);
      
      // Reset any properties when switching layouts
      const LayoutComponent = layouts[selectedLayout];
      if (LayoutComponent) {
        setLayoutProps(LayoutComponent.defaultProps || {});
      }
      
      // Update theme to match the layout for consistency
      setTheme(selectedLayout.toLowerCase() as any);
      
      toast.info(`Layout changed to ${selectedLayout}`);
    }
  }, [selectedLayout, setCustomCode, setLayoutProps, prevSelectedLayout, setTheme]);
  
  // Handle editor mode changes
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
      // Generate JSON from the current resume data
      const jsonResume = exportToJsonResume(editedPersonalInfo, editedWorkExperience, editedEducation, editedSkills, currentTheme);
      setJsonValue(JSON.stringify(jsonResume, null, 2));
    }
  }, [editorMode, customCode, selectedLayout, editorValue, editedPersonalInfo, editedWorkExperience, editedEducation, editedSkills, currentTheme]);

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
      // This would be integrated with your import function
      // For now we'll just validate the JSON
      JSON.parse(jsonValue);
      toast.success("JSON is valid! Import functionality would apply changes here.");
      // In a real implementation, you would use importFromJsonResume and update the app state
    } catch (error) {
      toast.error("Invalid JSON format. Please check your syntax.");
    }
  };

  // Handler for personal info changes
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for skills changes
  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    setEditedSkills(skillsArray);
  };

  // Handler for work experience changes
  const handleWorkExperienceChange = (index: number, field: keyof WorkExperienceEntry, value: string) => {
    const updatedExperiences = [...editedWorkExperience];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    setEditedWorkExperience(updatedExperiences);
  };

  // Handler for education changes
  const handleEducationChange = (index: number, field: keyof EducationEntry, value: string) => {
    const updatedEducation = [...editedEducation];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setEditedEducation(updatedEducation);
  };

  // Function to add a new work experience entry
  const addWorkExperience = () => {
    setEditedWorkExperience([
      ...editedWorkExperience,
      {
        company: 'New Company',
        position: 'New Position',
        startDate: 'Start Date',
        endDate: 'End Date',
        description: 'Job description...'
      }
    ]);
  };

  // Function to remove a work experience entry
  const removeWorkExperience = (index: number) => {
    const updatedExperiences = [...editedWorkExperience];
    updatedExperiences.splice(index, 1);
    setEditedWorkExperience(updatedExperiences);
  };

  // Function to add a new education entry
  const addEducation = () => {
    setEditedEducation([
      ...editedEducation,
      {
        institution: 'New Institution',
        degree: 'New Degree',
        startDate: 'Start Date',
        endDate: 'End Date',
        description: 'Education description...'
      }
    ]);
  };

  // Function to remove an education entry
  const removeEducation = (index: number) => {
    const updatedEducation = [...editedEducation];
    updatedEducation.splice(index, 1);
    setEditedEducation(updatedEducation);
  };

  // Function to apply edited resume data to the parent component
  const applyResumeChanges = () => {
    // Here we would update the parent component's state with our edited values
    // This would require prop functions to be passed down for this purpose
    toast.success("Resume data updates will be applied in a future implementation");
    
    // For now, just log the changes
    console.log("Updated Personal Info:", editedPersonalInfo);
    console.log("Updated Work Experience:", editedWorkExperience);
    console.log("Updated Education:", editedEducation);
    console.log("Updated Skills:", editedSkills);
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
      
      <Tabs defaultValue="preview" className="mt-6" onValueChange={(value) => setEditorMode(value as 'preview' | 'code' | 'json')}>
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Layout Properties</TabsTrigger>
          <TabsTrigger value="code">Edit Layout Code</TabsTrigger>
          <TabsTrigger value="json">Edit JSON</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview">
          <ScrollArea className="h-[600px] pr-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Resume Data Editor</h3>
              
              <Accordion type="single" collapsible className="w-full">
                {/* Personal Information Section */}
                <AccordionItem value="personal-info">
                  <AccordionTrigger className="text-md font-medium">Personal Information</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        name="fullName" 
                        value={editedPersonalInfo.fullName} 
                        onChange={handlePersonalInfoChange} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input 
                        id="jobTitle" 
                        name="jobTitle" 
                        value={editedPersonalInfo.jobTitle} 
                        onChange={handlePersonalInfoChange} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        value={editedPersonalInfo.email} 
                        onChange={handlePersonalInfoChange} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={editedPersonalInfo.phone} 
                        onChange={handlePersonalInfoChange} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        name="location" 
                        value={editedPersonalInfo.location} 
                        onChange={handlePersonalInfoChange} 
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Work Experience Section */}
                <AccordionItem value="work-experience">
                  <AccordionTrigger className="text-md font-medium">Work Experience</AccordionTrigger>
                  <AccordionContent>
                    {editedWorkExperience.map((exp, index) => (
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
                
                {/* Education Section */}
                <AccordionItem value="education">
                  <AccordionTrigger className="text-md font-medium">Education</AccordionTrigger>
                  <AccordionContent>
                    {editedEducation.map((edu, index) => (
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
                              <Label htmlFor={`eduStartDate-${index}`}>Start Date</Label>
                              <Input 
                                id={`eduStartDate-${index}`} 
                                value={edu.startDate} 
                                onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)} 
                              />
                            </div>
                            <div>
                              <Label htmlFor={`eduEndDate-${index}`}>End Date</Label>
                              <Input 
                                id={`eduEndDate-${index}`} 
                                value={edu.endDate} 
                                onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)} 
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor={`eduDescription-${index}`}>Description</Label>
                            <Textarea 
                              id={`eduDescription-${index}`} 
                              value={edu.description} 
                              onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                              rows={3}
                            />
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
                
                {/* Skills Section */}
                <AccordionItem value="skills">
                  <AccordionTrigger className="text-md font-medium">Skills</AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <Label htmlFor="skills">
                        Skills (comma-separated)
                      </Label>
                      <Textarea 
                        id="skills" 
                        value={editedSkills.join(', ')} 
                        onChange={handleSkillsChange}
                        rows={5}
                        placeholder="Enter skills separated by commas"
                      />
                    </div>
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
              <CodeMirror
                value={editorValue}
                options={{
                  mode: 'jsx',
                  theme: 'material',
                  lineNumbers: true,
                  lineWrapping: true,
                }}
                onBeforeChange={handleCodeChange}
                className="min-h-[300px]"
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
              Edit the JSON representation of your resume data. You can modify the data and apply changes.
            </p>
            
            <div className="border rounded overflow-hidden mb-4">
              <CodeMirror
                value={jsonValue}
                options={{
                  mode: 'javascript',
                  theme: 'material',
                  lineNumbers: true,
                  lineWrapping: true,
                }}
                onBeforeChange={handleJsonChange}
                className="min-h-[300px]"
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
