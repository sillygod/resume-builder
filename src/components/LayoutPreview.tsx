
import React from 'react';
import { SimpleLayout } from './resume-layouts/SimpleLayout';
import { ModernLayout } from './resume-layouts/ModernLayout';
import { SidebarLayout } from './resume-layouts/SidebarLayout';
import { CenteredLayout } from './resume-layouts/CenteredLayout';
import { PersonalInfoData } from './PersonalInfo';
import { WorkExperienceEntry } from './WorkExperience';
import { EducationEntry } from './Education';
import { toast } from 'sonner';
import * as Babel from '@babel/standalone';

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
      // First, sanitize the code - convert HTML entities and trim
      const sanitizedCode = customCode
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();
      
      // We'll use Babel to transform the JSX
      try {
        // Transform the code using Babel
        const transformedCode = Babel.transform(sanitizedCode, {
          presets: ['react'],
          filename: 'virtual.jsx',
        }).code;
        
        // Create a function that will return the React elements
        const renderFunction = new Function(
          'React', 
          'personalInfo', 
          'workExperience', 
          'education', 
          'skills',
          `
          try {
            ${transformedCode}
            return ${sanitizedCode.startsWith('(') ? sanitizedCode : `(${sanitizedCode})`};
          } catch (err) {
            console.error("Runtime error in custom layout:", err);
            throw new Error("Error running the layout: " + err.message);
          }
          `
        );
        
        // Execute the function with our dependencies
        return renderFunction(React, personalInfo, workExperience, education, skills);
      } catch (transformError) {
        console.error("Babel transformation error:", transformError);
        
        // Show a helpful error message with guidance
        return (
          <div className="p-4 bg-red-100 text-red-800 rounded">
            <p className="font-medium">Error compiling JSX: {transformError.message}</p>
            <p className="mt-2 text-sm">
              Please check your JSX syntax. For example:
            </p>
            <pre className="mt-1 p-2 bg-red-50 text-xs overflow-auto">
              {`(
  <div className="resume">
    <h1>{personalInfo.fullName}</h1>
    <p>{personalInfo.jobTitle}</p>
  </div>
)`}
            </pre>
            <p className="mt-2 text-xs">
              Make sure your code is wrapped in parentheses and uses valid JSX.
            </p>
          </div>
        );
      }
    } catch (error) {
      console.error("Fatal error in custom layout:", error);
      
      // Provide helpful feedback about the error
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <p className="font-medium">Error in custom layout: {error.message}</p>
          <p className="mt-2 text-sm">
            Please make sure your JSX is valid and properly formatted.
          </p>
          <p className="mt-2 text-xs">
            Try using the "Reset to Template" button to start with a working template.
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
