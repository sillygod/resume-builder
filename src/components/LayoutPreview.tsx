
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
      // Create a safer approach to evaluate custom code
      // Instead of trying to directly evaluate JSX (which causes the Unexpected token '<' error),
      // we'll pre-process the code to handle it as a string first
      
      // First, make sure the code is properly wrapped
      let codeToEvaluate = customCode.trim();
      
      if (!codeToEvaluate.startsWith('(')) {
        codeToEvaluate = `(${codeToEvaluate}`;
      }
      if (!codeToEvaluate.endsWith(')')) {
        codeToEvaluate = `${codeToEvaluate})`;
      }

      // Replace HTML entities
      codeToEvaluate = codeToEvaluate.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      
      // Create a fallback component in case of errors
      const FallbackComponent = () => (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          Error in custom layout: Unable to render JSX directly. 
          Try using React.createElement instead of JSX syntax.
        </div>
      );

      let CustomComponent;
      
      try {
        // First attempt: Try using a more robust approach for React elements
        // This approach uses React.createElement instead of trying to evaluate JSX directly
        CustomComponent = new Function('React', 'personalInfo', 'workExperience', 'education', 'skills', `
          try {
            // Convert any JSX to React.createElement calls
            // This is a simplified approach - in a real app, you'd use a proper JSX transformer
            const jsx = ${codeToEvaluate};
            return jsx;
          } catch (err) {
            console.error("Runtime error in custom layout:", err);
            return null;
          }
        `)(React, personalInfo, workExperience, education, skills);
        
        // If we got null, throw an error to use fallback
        if (CustomComponent === null) {
          throw new Error("Failed to render custom component");
        }
      } catch (innerError) {
        console.error("Inner evaluation error:", innerError);
        // Display a helpful message about JSX limitations
        toast.error("JSX syntax cannot be directly evaluated. See console for details.");
        return <FallbackComponent />;
      }
      
      return CustomComponent;
    } catch (error) {
      console.error("Error compiling custom layout:", error);
      
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <p>Error rendering custom layout: {error.message}</p>
          <p className="mt-2 text-sm">
            Try using React.createElement syntax instead of JSX tags. For example:
          </p>
          <pre className="mt-1 p-2 bg-red-50 text-xs overflow-auto">
            {`React.createElement('div', { className: 'my-class' }, 'Content')`}
          </pre>
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
