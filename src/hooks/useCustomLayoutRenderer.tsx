import React, { useMemo } from 'react';
import * as Babel from '@babel/standalone';
import { Mail, Phone, MapPin, Link } from 'lucide-react'; // Renamed Link to LinkIcon to avoid conflict with HTML <link>

// Assuming these types are exported from their respective files
// Adjust paths if they are different or if a central types file is used.
import { PersonalInfoData } from '../components/PersonalInfo';
import { WorkExperienceEntry } from '../components/WorkExperience';
import { EducationEntry } from '../components/Education';

export interface ResumeLayoutData {
  basics: PersonalInfoData;
  work: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  extraData?: Record<string, unknown>;
  // Potentially add theme or other meta data if layouts need it
}

interface UseCustomLayoutRendererProps {
  customLayoutCode?: string | null;
  resumeData: ResumeLayoutData; // This is the structured data for the layout
}

interface UseCustomLayoutRendererReturn {
  renderedElement: React.ReactNode | null;
  error: string | null;
  transformedCodeForDebug?: string | null; // For debugging purposes, like in ResumePreview
}

export const useCustomLayoutRenderer = ({
  customLayoutCode,
  resumeData,
}: UseCustomLayoutRendererProps): UseCustomLayoutRendererReturn => {
  return useMemo(() => {
    if (!customLayoutCode || customLayoutCode.trim() === "") {
      return { renderedElement: null, error: null };
    }

    let codeToTransform = customLayoutCode.trim();
    // Remove any comments from the code
    codeToTransform = codeToTransform
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*[\r\n]/gm, ''); // Remove empty lines
    // Remove import statements
    codeToTransform = codeToTransform.replace(/import[^;]+;?/g, "");
    // Remove block comments
    codeToTransform = codeToTransform.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/g, ""); // Improved comment removal
    // Remove line comments (already covered by above, but good to be explicit if separated)
    // codeToTransform = codeToTransform.replace(/\/\/.*$/gm, "");

    // Remove leading/trailing parentheses if present (often added by users copying snippets)
    if (codeToTransform.startsWith("(") && codeToTransform.endsWith(")")) {
      codeToTransform = codeToTransform.slice(1, -1).trim();
    }

    // If the code does not define CustomLayout, wrap it
    // This allows users to provide just a JSX snippet
    if (!/const\s+CustomLayout|function\s+CustomLayout/.test(codeToTransform)) {
      // Wrap in a React.Fragment by default if it's pure JSX
      // The props passed to this CustomLayout will be the resumeData object
      codeToTransform = `const CustomLayout = (props) => (<React.Fragment>${codeToTransform}</React.Fragment>);`;
    }
    
    let transformedCode = "";
    try {
      transformedCode = Babel.transform(codeToTransform, {
        presets: [['react', { runtime: 'classic' }]], // Use classic runtime for new Function approach
      }).code || ""; // Ensure code is not null

      if (!transformedCode) {
        throw new Error("Babel transform resulted in empty code.");
      }

      // Scope for the dynamically created function
      // These are the variables accessible directly within the custom code if not using props.
      // And also for React.createElement if CustomLayout is defined globally by the code.
      const scope = {
        // React is passed as the first argument to new Function
        // resumeData (as props) is passed as the second argument
        // Individual parts of resumeData for convenience if custom code expects them directly (less ideal)
        personalInfo: resumeData.basics,
        workExperience: resumeData.work,
        education: resumeData.education,
        skills: resumeData.skills,
        extraData: resumeData.extraData,
        // Common variables that might be used in custom code
        basics: resumeData.basics,
        work: resumeData.work,
        // Icons
        Mail,
        Phone,
        MapPin,
        Link, // Use the renamed import
        // Common event handler placeholder to prevent 'e is not defined' errors
        e: null,
        event: null,
        console: console, // Allow console logging in custom code
      };
      
      // The 'props' argument to CustomLayout will be the resumeData object.
      // The custom code string (transformedCode) should define a component named CustomLayout.
      // That CustomLayout component will receive `resumeData` as its `props`.
      const func = new Function(
        "React",          // React is explicitly passed
        "props",          // This will be `resumeData`
        ...Object.keys(scope), // Other variables available in the scope
        `
        try {
          ${transformedCode} 
          if (typeof CustomLayout !== 'function') {
            throw new Error('CustomLayout is not defined or not a function. Make sure your code exports or defines a component named CustomLayout.');
          }
          return React.createElement(CustomLayout, props);
        } catch (error) {
          console.error('Error in custom layout execution:', error);
          throw new Error('Custom layout execution failed: ' + (error.message || error));
        }
        `
      );

      const renderedElement = func(
        React,
        resumeData, // This is the 'props' argument for CustomLayout
        ...Object.values(scope)
      );

      return { renderedElement, error: null, transformedCodeForDebug: transformedCode };

    } catch (err: unknown) {
      console.error("Error in useCustomLayoutRenderer:", err);
      return { 
        renderedElement: null, 
        error: (err instanceof Error ? err.message : "An unknown error occurred during custom layout rendering."),
        transformedCodeForDebug: transformedCode // Include for debugging
      };
    }
  }, [customLayoutCode, resumeData]); // Dependencies for useMemo
};
