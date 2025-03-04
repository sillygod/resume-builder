
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
import { themes } from '@/themes/ThemeContext';

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
  <div className="${themes.simple.layout.contentClass}">
    {/* Personal Info Section */}
    <div className="${themes.simple.personalInfo.containerClass}">
      <div className="${themes.simple.personalInfo.gridClass}">
        <div className="${themes.simple.personalInfo.infoContainerClass}">
          <h1 className="${themes.simple.personalInfo.titleClass}">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="${themes.simple.personalInfo.subtitleClass}">
            {personalInfo.jobTitle || "Your Profession"}
          </p>
          
          <div className="${themes.simple.personalInfo.contactContainerClass}">
            {personalInfo.email && <div className="${themes.simple.personalInfo.contactItemClass}">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="${themes.simple.personalInfo.contactItemClass}">{personalInfo.phone}</div>}
            {personalInfo.location && <div className="${themes.simple.personalInfo.contactItemClass}">{personalInfo.location}</div>}
          </div>
        </div>
      </div>
    </div>

    {/* Work Experience Section */}
    {workExperience.length > 0 && (
      <section className="${themes.simple.workExperience.containerClass}">
        <h2 className="${themes.simple.workExperience.titleClass}">Work Experience</h2>
        <div className="space-y-4">
          {workExperience.map((exp) => (
            <div key={exp.id} className="${themes.simple.workExperience.entryClass}">
              <h3 className="${themes.simple.workExperience.jobTitleClass}">{exp.position}</h3>
              <p className="${themes.simple.workExperience.companyClass}">{exp.company}</p>
              <p className="${themes.simple.workExperience.periodClass}">{exp.startDate} - {exp.endDate}</p>
              <p className="${themes.simple.workExperience.descriptionClass}">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Education Section */}
    {education.length > 0 && (
      <section className="${themes.simple.education.containerClass}">
        <h2 className="${themes.simple.education.titleClass}">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="${themes.simple.education.entryClass}">
              <h3 className="${themes.simple.education.institutionClass}">{edu.institution}</h3>
              <p className="${themes.simple.education.degreeClass}">{edu.degree} in {edu.field}</p>
              <p className="${themes.simple.education.periodClass}">Graduated: {edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Skills Section */}
    {skills.length > 0 && (
      <section className="${themes.simple.skills.containerClass}">
        <h2 className="${themes.simple.skills.titleClass}">Skills</h2>
        <div className="${themes.simple.skills.skillsListClass}">
          {skills.map((skill) => (
            <span key={skill} className="${themes.simple.skills.skillItemClass}">
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
  <div className="${themes.modern.layout.contentClass}">
    {/* Personal Info Section */}
    <div className="${themes.modern.personalInfo.containerClass}">
      <div className="${themes.modern.personalInfo.gridClass}">
        {personalInfo.photoUrl ? (
          <div className="${themes.modern.personalInfo.avatarContainerClass}">
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName || "Profile"}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="${themes.modern.personalInfo.avatarContainerClass} flex items-center justify-center text-gray-500">
            Photo
          </div>
        )}

        <div className="${themes.modern.personalInfo.infoContainerClass}">
          <h1 className="${themes.modern.personalInfo.titleClass}">{personalInfo.fullName || "Your Name"}</h1>
          <p className="${themes.modern.personalInfo.subtitleClass}">{personalInfo.jobTitle || "Your Profession"}</p>
          
          <div className="${themes.modern.personalInfo.contactContainerClass}">
            {personalInfo.email && <div className="${themes.modern.personalInfo.contactItemClass}">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="${themes.modern.personalInfo.contactItemClass}">{personalInfo.phone}</div>}
            {personalInfo.location && <div className="${themes.modern.personalInfo.contactItemClass}">{personalInfo.location}</div>}
          </div>
        </div>
      </div>
    </div>

    {/* Work Experience Section */}
    {workExperience.length > 0 && (
      <section className="${themes.modern.workExperience.containerClass}">
        <h2 className="${themes.modern.workExperience.titleClass}">Work Experience</h2>
        <div className="space-y-4">
          {workExperience.map((exp) => (
            <div key={exp.id} className="${themes.modern.workExperience.entryClass}">
              <h3 className="${themes.modern.workExperience.jobTitleClass}">{exp.position}</h3>
              <p className="${themes.modern.workExperience.companyClass}">{exp.company}</p>
              <p className="${themes.modern.workExperience.periodClass}">{exp.startDate} - {exp.endDate}</p>
              <p className="${themes.modern.workExperience.descriptionClass}">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Education Section */}
    {education.length > 0 && (
      <section className="${themes.modern.education.containerClass}">
        <h2 className="${themes.modern.education.titleClass}">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="${themes.modern.education.entryClass}">
              <h3 className="${themes.modern.education.institutionClass}">{edu.institution}</h3>
              <p className="${themes.modern.education.degreeClass}">{edu.degree} in {edu.field}</p>
              <p className="${themes.modern.education.periodClass}">Graduated: {edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Skills Section */}
    {skills.length > 0 && (
      <section className="${themes.modern.skills.containerClass}">
        <h2 className="${themes.modern.skills.titleClass}">Skills</h2>
        <div className="${themes.modern.skills.skillsListClass}">
          {skills.map((skill) => (
            <span key={skill} className="${themes.modern.skills.skillItemClass}">
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
  <div className="${themes.sidebar.layout.contentClass}">
    {/* Left Sidebar */}
    <div className="${themes.sidebar.personalInfo.containerClass}">
      <div className="${themes.sidebar.personalInfo.avatarContainerClass}">
        {personalInfo.photoUrl ? (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName || "Profile"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
            Photo
          </div>
        )}
      </div>

      <div className="${themes.sidebar.personalInfo.infoContainerClass}">
        <h1 className="${themes.sidebar.personalInfo.titleClass}">{personalInfo.fullName || "Your Name"}</h1>
        <p className="${themes.sidebar.personalInfo.subtitleClass}">{personalInfo.jobTitle || "Your Profession"}</p>
        
        <div className="${themes.sidebar.personalInfo.contactContainerClass}">
          {personalInfo.email && <div className="${themes.sidebar.personalInfo.contactItemClass}">{personalInfo.email}</div>}
          {personalInfo.phone && <div className="${themes.sidebar.personalInfo.contactItemClass}">{personalInfo.phone}</div>}
          {personalInfo.location && <div className="${themes.sidebar.personalInfo.contactItemClass}">{personalInfo.location}</div>}
        </div>
      </div>

      {/* Skills in sidebar */}
      {skills.length > 0 && (
        <section className="${themes.sidebar.skills.containerClass}">
          <h2 className="${themes.sidebar.skills.titleClass}">Skills</h2>
          <div className="${themes.sidebar.skills.skillsListClass}">
            {skills.map((skill) => (
              <div key={skill} className="${themes.sidebar.skills.skillItemClass}">
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>

    {/* Main Content */}
    <div className="flex-1">
      {workExperience.length > 0 && (
        <section className="${themes.sidebar.workExperience.containerClass}">
          <h2 className="${themes.sidebar.workExperience.titleClass}">Work Experience</h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="${themes.sidebar.workExperience.entryClass}">
                <h3 className="${themes.sidebar.workExperience.jobTitleClass}">{exp.position}</h3>
                <p className="${themes.sidebar.workExperience.companyClass}">{exp.company}</p>
                <p className="${themes.sidebar.workExperience.periodClass}">{exp.startDate} - {exp.endDate}</p>
                <p className="${themes.sidebar.workExperience.descriptionClass}">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="${themes.sidebar.workExperience.containerClass}">
          <h2 className="${themes.sidebar.education.titleClass}">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="${themes.sidebar.education.entryClass}">
                <h3 className="${themes.sidebar.education.institutionClass}">{edu.institution}</h3>
                <p className="${themes.sidebar.education.degreeClass}">{edu.degree} in {edu.field}</p>
                <p className="${themes.sidebar.education.periodClass}">Graduated: {edu.graduationDate}</p>
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
  <div className="${themes.centered.layout.contentClass}">
    {/* Personal Info Section */}
    <div className="${themes.centered.personalInfo.containerClass}">
      <div className="${themes.centered.personalInfo.gridClass}">
        <div className="${themes.centered.personalInfo.avatarContainerClass}">
          {personalInfo.photoUrl ? (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName || "Profile"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
              Photo
            </div>
          )}
        </div>

        <div className="${themes.centered.personalInfo.infoContainerClass}">
          <h1 className="${themes.centered.personalInfo.titleClass}">{personalInfo.fullName || "Your Name"}</h1>
          <p className="${themes.centered.personalInfo.subtitleClass}">{personalInfo.jobTitle || "Your Profession"}</p>
          
          <div className="${themes.centered.personalInfo.contactContainerClass}">
            {personalInfo.email && <div className="${themes.centered.personalInfo.contactItemClass}">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="${themes.centered.personalInfo.contactItemClass}">{personalInfo.phone}</div>}
            {personalInfo.location && <div className="${themes.centered.personalInfo.contactItemClass}">{personalInfo.location}</div>}
          </div>
        </div>
      </div>
    </div>

    {/* Skills Section */}
    {skills.length > 0 && (
      <section className="${themes.centered.skills.containerClass}">
        <h2 className="${themes.centered.skills.titleClass}">Skills</h2>
        <div className="${themes.centered.skills.skillsListClass}">
          {skills.map((skill) => (
            <span key={skill} className="${themes.centered.skills.skillItemClass}">
              {skill}
            </span>
          ))}
        </div>
      </section>
    )}

    {/* Work Experience Section */}
    {workExperience.length > 0 && (
      <section className="${themes.centered.workExperience.containerClass}">
        <h2 className="${themes.centered.workExperience.titleClass}">Work Experience</h2>
        <div className="space-y-6">
          {workExperience.map((exp) => (
            <div key={exp.id} className="${themes.centered.workExperience.entryClass}">
              <h3 className="${themes.centered.workExperience.jobTitleClass}">{exp.position}</h3>
              <p className="${themes.centered.workExperience.companyClass}">{exp.company}</p>
              <p className="${themes.centered.workExperience.periodClass}">{exp.startDate} - {exp.endDate}</p>
              <p className="${themes.centered.workExperience.descriptionClass}">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Education Section */}
    {education.length > 0 && (
      <section className="${themes.centered.education.containerClass}">
        <h2 className="${themes.centered.education.titleClass}">Education</h2>
        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu.id} className="${themes.centered.education.entryClass}">
              <h3 className="${themes.centered.education.institutionClass}">{edu.institution}</h3>
              <p className="${themes.centered.education.degreeClass}">{edu.degree} in {edu.field}</p>
              <p className="${themes.centered.education.periodClass}">Graduated: {edu.graduationDate}</p>
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

  // Load the initial template code when component mounts
  useEffect(() => {
    if (selectedLayout) {
      // Set the layoutProps
      const LayoutComponent = layouts[selectedLayout];
      if (LayoutComponent) {
        setLayoutProps(LayoutComponent.defaultProps || {});
      }
      
      // Initialize the editor value with either customCode or template
      if (customCode) {
        setEditorValue(customCode);
      } else {
        const templateCode = getLayoutSourceCode(selectedLayout);
        setEditorValue(templateCode);
        setCustomCode(templateCode);
      }
    }
  }, [selectedLayout, customCode]);
  
  // Initialize when switching to code tab
  useEffect(() => {
    if (editorMode === 'code' && (!editorValue || editorValue.trim() === '')) {
      if (customCode) {
        setEditorValue(customCode);
      } else {
        const templateCode = getLayoutSourceCode(selectedLayout);
        setEditorValue(templateCode);
        setCustomCode(templateCode);
      }
    }
  }, [editorMode, customCode, selectedLayout, editorValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLayoutProps({ ...layoutProps, [name]: value });
  };

  const handleCodeChange = (editor: any, data: any, value: string) => {
    setEditorValue(value);
    setCustomCode(value);
    
    // Validate code format
    let codeToValidate = value.trim();
    if (!codeToValidate.startsWith('(') || !codeToValidate.endsWith(')')) {
      setCodeError("Warning: JSX code should be wrapped in parentheses for proper rendering");
    } else {
      setCodeError(null);
    }
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
      
      <Tabs defaultValue="preview" className="mt-6" onValueChange={(value) => setEditorMode(value as 'preview' | 'code')}>
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
      </Tabs>
    </Card>
  );
};

export default LayoutEditor;
