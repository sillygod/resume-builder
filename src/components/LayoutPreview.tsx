
import React from 'react';
import { SimpleLayout } from './resume-layouts/SimpleLayout';
import { ModernLayout } from './resume-layouts/ModernLayout';
import { SidebarLayout } from './resume-layouts/SidebarLayout';
import { CenteredLayout } from './resume-layouts/CenteredLayout';
import { PersonalInfoData } from './PersonalInfo';
import { WorkExperienceEntry } from './WorkExperience';
import { EducationEntry } from './Education';
import { toast } from 'sonner';

const layouts = {
  Simple: SimpleLayout,
  Modern: ModernLayout,
  Sidebar: SidebarLayout,
  Centered: CenteredLayout,
};

interface LayoutPreviewProps {
  selectedLayout: string;
  layoutProps: Record<string, any>;
  customCode: string | null;
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

const LayoutPreview: React.FC<LayoutPreviewProps> = ({ 
  selectedLayout, 
  layoutProps, 
  customCode,
  personalInfo,
  workExperience,
  education,
  skills
}) => {
  const LayoutComponent = layouts[selectedLayout];
  
  const renderCustomCode = () => {
    if (!customCode) return null;
    
    try {
      // First, convert HTML entities that might be present
      const sanitizedCode = customCode
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();
      
      // Helper function to convert JSX-like syntax to React.createElement calls
      const convertToReactElements = (code) => {
        // We'll use a simplified approach to support basic resume layouts
        // This isn't a full JSX transformer, but works for our templates
        
        // First check if the code is already wrapped in parentheses
        // If not, we'll wrap it to make the evaluation more predictable
        let processedCode = code;
        if (!processedCode.startsWith('(')) {
          processedCode = `(${processedCode}`;
        }
        if (!processedCode.endsWith(')')) {
          processedCode = `${processedCode})`;
        }
        
        try {
          // Create a Function that returns React elements using React.createElement
          const createElementFunction = new Function(
            'React', 
            'personalInfo', 
            'workExperience', 
            'education', 
            'skills',
            `
            try {
              // The template code should already use React.createElement internally
              return ${processedCode};
            } catch (err) {
              console.error("Error during template rendering:", err);
              return React.createElement('div', { className: 'p-4 bg-red-100 text-red-800 rounded' }, 
                "Error rendering template: " + err.message
              );
            }
            `
          );
          
          // Execute the function with our dependencies
          return createElementFunction(React, personalInfo, workExperience, education, skills);
        } catch (err) {
          console.error("Template compilation error:", err);
          
          // If there's a syntax error, provide helpful guidance
          return (
            <div className="p-4 bg-red-100 text-red-800 rounded">
              <p className="font-medium">Error compiling template: {err.message}</p>
              <p className="mt-2 text-sm">
                Try using React.createElement instead of JSX tags:
              </p>
              <pre className="mt-1 p-2 bg-red-50 text-xs overflow-auto">
                {`React.createElement('div', { className: 'my-class' }, 'Content')`}
              </pre>
              <p className="mt-2 text-xs">
                Or use the template format provided by clicking "Reset to Template"
              </p>
            </div>
          );
        }
      };
      
      // Try to render the custom code
      return convertToReactElements(sanitizedCode);
    } catch (error) {
      console.error("Error in custom layout:", error);
      
      // Provide helpful feedback about the error
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <p className="font-medium">Error rendering custom layout: {error.message}</p>
          <p className="mt-2 text-sm">
            Try using a simpler layout or click "Reset to Template" to start over.
          </p>
          <p className="mt-2 text-xs">
            Browser limitations prevent direct JSX evaluation. Use the template format or simplified HTML.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="preview bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
      <div className="border p-4 rounded">
        {customCode ? (
          renderCustomCode()
        ) : LayoutComponent ? (
          <LayoutComponent 
            personalInfo={personalInfo}
            workExperience={workExperience}
            education={education}
            skills={skills}
            {...layoutProps} 
          />
        ) : (
          <p>Select a layout to preview.</p>
        )}
      </div>
    </div>
  );
};

export default LayoutPreview;
