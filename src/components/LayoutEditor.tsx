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
import 'codemirror/theme/material.css';

const layouts = {
  Simple: SimpleLayout,
  Modern: ModernLayout,
  Sidebar: SidebarLayout,
  Centered: CenteredLayout,
};

const getLayoutSourceCode = (layoutName: string) => {
  switch(layoutName) {
    case 'Simple':
      return `// SimpleLayout Component
(
  <div className="layout-contentClass">
    {/* Personal Info Section */}
    <div className="personalInfo-containerClass">
      <h1>{personalInfo.fullName || "Your Name"}</h1>
      <p>{personalInfo.jobTitle || "Your Profession"}</p>
      
      {/* Contact info */}
      <div className="flex flex-wrap gap-4 mt-2">
        {personalInfo.email && <div>{personalInfo.email}</div>}
        {personalInfo.phone && <div>{personalInfo.phone}</div>}
        {personalInfo.location && <div>{personalInfo.location}</div>}
      </div>
    </div>

    {/* Work Experience Section */}
    {workExperience.length > 0 && (
      <section className="mt-6">
        <h2 className="text-xl font-semibold border-b pb-1 mb-3">Work Experience</h2>
        <div className="space-y-4">
          {workExperience.map((exp) => (
            <div key={exp.id}>
              <h3 className="font-medium">{exp.position}</h3>
              <p className="text-sm">{exp.company}</p>
              <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Education Section */}
    {education.length > 0 && (
      <section className="mt-6">
        <h2 className="text-xl font-semibold border-b pb-1 mb-3">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id}>
              <h3 className="font-medium">{edu.institution}</h3>
              <p className="text-sm">{edu.degree} in {edu.field}</p>
              <p className="text-xs text-gray-500">Graduated: {edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Skills Section */}
    {skills.length > 0 && (
      <section className="mt-6">
        <h2 className="text-xl font-semibold border-b pb-1 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="bg-gray-100 px-2 py-1 rounded text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>
    )}
  </div>
)`;
    case 'Modern':
      return `// ModernLayout Component
(
  <div className="space-y-6">
    {/* Personal Info Section */}
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {personalInfo.photoUrl ? (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName || "Profile"}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
            Photo
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
          <p className="text-gray-600">{personalInfo.jobTitle || "Your Profession"}</p>
          
          <div className="flex flex-wrap gap-3 mt-2 text-sm">
            {personalInfo.email && <div className="flex items-center gap-1">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-1">{personalInfo.phone}</div>}
            {personalInfo.location && <div className="flex items-center gap-1">{personalInfo.location}</div>}
          </div>
        </div>
      </div>
    </div>

    {/* Work Experience Section */}
    {workExperience.length > 0 && (
      <section>
        <h2 className="text-xl font-bold mb-3 text-gray-800">Work Experience</h2>
        <div className="space-y-4">
          {workExperience.map((exp) => (
            <div key={exp.id} className="p-3 border-l-2 border-gray-300 hover:border-blue-500">
              <h3 className="font-semibold">{exp.position}</h3>
              <p className="text-sm font-medium">{exp.company}</p>
              <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Education Section */}
    {education.length > 0 && (
      <section>
        <h2 className="text-xl font-bold mb-3 text-gray-800">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="p-3 border-l-2 border-gray-300 hover:border-blue-500">
              <h3 className="font-semibold">{edu.institution}</h3>
              <p className="text-sm">{edu.degree} in {edu.field}</p>
              <p className="text-xs text-gray-500">Graduated: {edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Skills Section */}
    {skills.length > 0 && (
      <section>
        <h2 className="text-xl font-bold mb-3 text-gray-800">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>
    )}
  </div>
)`;
    case 'Sidebar':
      return `// SidebarLayout Component
(
  <div className="flex flex-col md:flex-row gap-6">
    {/* Left Sidebar */}
    <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg">
      <div className="mb-6 text-center">
        {personalInfo.photoUrl ? (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName || "Profile"}
            className="w-32 h-32 rounded-full mx-auto object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full mx-auto bg-gray-300 flex items-center justify-center text-gray-500">
            Photo
          </div>
        )}

        <h1 className="text-xl font-bold mt-3">{personalInfo.fullName || "Your Name"}</h1>
        <p className="text-gray-600">{personalInfo.jobTitle || "Your Profession"}</p>
        
        <div className="mt-3 text-sm space-y-1">
          {personalInfo.email && <div className="flex items-center gap-1">{personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1">{personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-1">{personalInfo.location}</div>}
        </div>
      </div>

      {/* Skills in sidebar */}
      {skills.length > 0 && (
        <section>
          <h2 className="font-semibold mb-2 text-center">Skills</h2>
          <div className="flex flex-wrap gap-1 justify-center">
            {skills.map((skill) => (
              <div key={skill} className="bg-white px-2 py-1 rounded-full text-xs">
                {skill}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>

    {/* Main Content */}
    <div className="md:w-2/3">
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">Work Experience</h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="border-b pb-3">
                <h3 className="font-semibold">{exp.position}</h3>
                <p className="text-sm font-medium">{exp.company}</p>
                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-3">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-b pb-3">
                <h3 className="font-semibold">{edu.institution}</h3>
                <p>{edu.degree} in {edu.field}</p>
                <p className="text-sm text-gray-500">Graduated: {edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
)`;
    case 'Centered':
      return `// CenteredLayout Component
(
  <div className="max-w-2xl mx-auto text-center">
    {/* Personal Info Section */}
    <div className="mb-8">
      <div className="flex justify-center mb-4">
        {personalInfo.photoUrl ? (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName || "Profile"}
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
            Photo
          </div>
        )}
      </div>

      <h1 className="text-3xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
      <p className="text-xl text-gray-600 mt-1">{personalInfo.jobTitle || "Your Profession"}</p>
      
      <div className="flex justify-center flex-wrap gap-4 mt-3">
        {personalInfo.email && <div className="flex items-center gap-1">{personalInfo.email}</div>}
        {personalInfo.phone && <div className="flex items-center gap-1">{personalInfo.phone}</div>}
        {personalInfo.location && <div className="flex items-center gap-1">{personalInfo.location}</div>}
      </div>
    </div>

    {/* Summary Section */}
    {personalInfo.summary && (
      <section className="mb-8">
        <p className="text-gray-700">{personalInfo.summary}</p>
      </section>
    )}

    {/* Skills Section */}
    {skills.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {skills.map((skill) => (
            <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>
    )}

    {/* Work Experience Section */}
    {workExperience.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
        <div className="space-y-6">
          {workExperience.map((exp) => (
            <div key={exp.id}>
              <h3 className="text-lg font-medium">{exp.position}</h3>
              <p className="font-medium">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
              <p className="mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Education Section */}
    {education.length > 0 && (
      <section>
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu.id}>
              <h3 className="text-lg font-medium">{edu.institution}</h3>
              <p>{edu.degree} in {edu.field}</p>
              <p className="text-sm text-gray-500">Graduated: {edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </section>
    )}
  </div>
)`;
    default:
      return '';
  }
};

interface LayoutEditorProps {
  selectedLayout: string;
  setSelectedLayout: (layout: string) => void;
  layoutProps: Record<string, any>;
  setLayoutProps: (props: Record<string, any>) => void;
  customCode: string | null;
  setCustomCode: (code: string | null) => void;
}

const LayoutEditor: React.FC<LayoutEditorProps> = ({ 
  selectedLayout, 
  setSelectedLayout, 
  layoutProps, 
  setLayoutProps,
  customCode,
  setCustomCode 
}) => {
  const [editorValue, setEditorValue] = useState<string>('');
  const [editorMode, setEditorMode] = useState<'preview' | 'code'>('preview');
  const [codeError, setCodeError] = useState<string | null>(null);

  useEffect(() => {
    const LayoutComponent = layouts[selectedLayout];
    if (LayoutComponent) {
      setLayoutProps(LayoutComponent.defaultProps || {});
      
      if (editorMode === 'code') {
        const templateCode = getLayoutSourceCode(selectedLayout);
        setEditorValue(templateCode);
        setCustomCode(null);
      }
    }
  }, [selectedLayout, editorMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLayoutProps({ ...layoutProps, [name]: value });
  };

  const handleCodeChange = (editor: any, data: any, value: string) => {
    setEditorValue(value);
    
    let codeToValidate = value.trim();
    
    if (!codeToValidate.startsWith('(') || !codeToValidate.endsWith(')')) {
      setCodeError("Warning: JSX code should be wrapped in parentheses for proper rendering");
    } else {
      setCodeError(null);
    }
    
    setCustomCode(value);
  };

  const resetCustomCode = () => {
    const templateCode = getLayoutSourceCode(selectedLayout);
    setEditorValue(templateCode);
    setCustomCode(templateCode);
    setCodeError(null);
    toast.info("Reset to template layout");
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
      
      <Tabs defaultValue="code" className="mt-6" onValueChange={(value) => setEditorMode(value as 'preview' | 'code')}>
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Layout Properties</TabsTrigger>
          <TabsTrigger value="code">Edit Layout Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Layout Properties</h3>
            {Object.keys(layoutProps).map((key) => (
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
            ))}
          </div>
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
              <strong>Note:</strong> Due to browser security limitations, custom layouts are limited to 
              the template formats. Make sure your code is wrapped in parentheses and follows the format in the examples.
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
      </Tabs>
    </Card>
  );
};

export default LayoutEditor;
