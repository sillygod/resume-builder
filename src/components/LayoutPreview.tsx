
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
      // This is a simplified approach - in a real app, you'd want to use
      // a proper JSX parser/renderer or a sandbox
      const CustomComponent = new Function('React', 'personalInfo', 'workExperience', 'education', 'skills', 
        `return ${customCode}`)(React, personalInfo, workExperience, education, skills);
      
      return CustomComponent;
    } catch (error) {
      console.error("Error rendering custom layout:", error);
      // Don't show the toast for every render to avoid spamming
      // We'll rely on the error display in the editor instead
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
