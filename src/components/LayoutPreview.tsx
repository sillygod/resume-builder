
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
      // Sanitize the code before evaluation
      let codeToEvaluate = customCode.trim();
      
      // Make sure the code is properly wrapped in parentheses
      if (!codeToEvaluate.startsWith('(')) {
        codeToEvaluate = `(${codeToEvaluate}`;
      }
      if (!codeToEvaluate.endsWith(')')) {
        codeToEvaluate = `${codeToEvaluate})`;
      }
      
      // Replace HTML entities that might cause issues
      codeToEvaluate = codeToEvaluate.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      
      // Use a try-catch inside the function to catch runtime errors
      const CustomComponent = new Function('React', 'personalInfo', 'workExperience', 'education', 'skills', `
        try {
          return ${codeToEvaluate};
        } catch (err) {
          console.error("Runtime error in custom layout:", err);
          return React.createElement('div', { 
            className: 'p-4 bg-red-100 text-red-800 rounded'
          }, 'Error in custom layout: ' + err.message);
        }
      `)(React, personalInfo, workExperience, education, skills);
      
      return CustomComponent;
    } catch (error) {
      console.error("Error compiling custom layout:", error);
      
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          Error rendering custom layout: {error.message}
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
