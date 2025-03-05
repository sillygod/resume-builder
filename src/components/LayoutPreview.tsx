
import React, { useEffect, useState } from 'react';
import { SimpleLayout } from './resume-layouts/SimpleLayout';
import { ModernLayout } from './resume-layouts/ModernLayout';
import { SidebarLayout } from './resume-layouts/SidebarLayout';
import { CenteredLayout } from './resume-layouts/CenteredLayout';
import { PersonalInfoData } from './PersonalInfo';
import { WorkExperienceEntry } from './WorkExperience';
import { EducationEntry } from './Education';
import { toast } from 'sonner';
import * as Babel from '@babel/standalone';
import { Card } from './ui/card';
import { useTheme, ThemeName } from '@/themes/ThemeContext';

const layouts = {
  Simple: SimpleLayout,
  Modern: ModernLayout,
  Sidebar: SidebarLayout,
  Centered: CenteredLayout,
};

// Map selected layout names to theme names to ensure consistency
const layoutToThemeMap: Record<string, ThemeName> = {
  'Simple': 'simple',
  'Modern': 'modern',
  'Sidebar': 'sidebar',
  'Centered': 'centered'
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
  const { currentTheme } = useTheme();
  const [lastRenderedTheme, setLastRenderedTheme] = useState<string>(currentTheme);
  const LayoutComponent = layouts[selectedLayout];

  // Map the selected layout to the appropriate theme if needed
  const effectiveTheme = layoutToThemeMap[selectedLayout] || currentTheme;

  // Track theme changes to force re-render
  useEffect(() => {
    if (lastRenderedTheme !== currentTheme) {
      setLastRenderedTheme(currentTheme);
    }
  }, [currentTheme, lastRenderedTheme]);
  
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
          'createElement',
          'personalInfo', 
          'workExperience', 
          'education', 
          'skills',
          'currentTheme',
          `
          try {
            return () => (${transformedCode.substring(0, transformedCode.length - 1)});
          } catch (err) {
            console.error("Runtime error in custom layout:", err);
            throw new Error("Error running the layout: " + err.message);
          }
          `
        );

        // Execute the function with our dependencies including currentTheme
        const element = renderFunction(React, React.createElement, personalInfo, workExperience, education, skills, currentTheme);
        return element();
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
    <div className="flex flex-col items-center gap-4">
      <div className="w-[210mm] max-w-full">
        <Card 
          className={`w-full p-8 bg-white shadow-lg animate-fade-in relative ${
            effectiveTheme === 'sidebar' ? 'h-auto min-h-[297mm]' : 'h-[297mm]'
          }`}
        >
          <div ref={null} className={`${effectiveTheme === "sidebar" ? "flex" : ""}`}>
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
              <p className="text-center text-gray-500 my-10">
                Select a layout to preview.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LayoutPreview;
