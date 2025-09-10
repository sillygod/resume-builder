import { Card } from "@/components/ui/card";
import { PersonalInfoData } from "./PersonalInfo";
import { WorkExperienceEntry } from "./WorkExperience";
import { EducationEntry } from "./Education";
import React, { useState, useRef, useEffect } from "react";
import { ThemeName } from "@/themes/ThemeContext";
import { Button } from "./ui/button";
// Removed: toast (now handled in hooks), html2pdf, useReactToPrint, * as Babel
// Removed: lucide-react icons (now handled in useCustomLayoutRenderer)

import { getLayoutJSXString } from "./resume-layouts/layoutTemplates";
import { Mail, Phone, MapPin, Link } from 'lucide-react';
import { themes } from '@/themes/ThemeContext';

// Import new hooks
import { useCustomLayoutRenderer, ResumeLayoutData } from '../hooks/useCustomLayoutRenderer';
import { useResumePDFGenerator } from '../hooks/useResumePDFGenerator';
import { ErrorBoundary } from './ErrorBoundary';

interface ResumePreviewProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  theme?: ThemeName;
  // Removed: onPreviewPdf?: () => void;
  extraData?: Record<string, any>;
  customLayoutCode?: string;
  isCodeChanging?: boolean;
  onPreviewUpdate?: () => void;
  onSectionHighlight?: (sectionId: string) => void;
  onSectionClearHighlight?: () => void;
}

export function ResumePreview({
  personalInfo,
  workExperience,
  education,
  skills,
  theme = "modern", // Default theme
  extraData = {},
  customLayoutCode,
  isCodeChanging = false,
  onPreviewUpdate,
  onSectionHighlight,
  onSectionClearHighlight,
}: ResumePreviewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasRecentUpdate, setHasRecentUpdate] = useState(false);
  // Removed: pdfPreviewUrl, isPreviewOpen state

  const pageHeight = 297; // height in mm

  // Initialize new hooks
  const { downloadPDF } = useResumePDFGenerator({ // Removed: generatePdfPreviewUri (not used in this simplified version)
    contentRef,
    fileNamePrefix: personalInfo.fullName || "resume",
  });

  const resumeLayoutData: ResumeLayoutData = React.useMemo(() => ({
    basics: personalInfo,
    work: workExperience,
    education,
    skills,
    extraData,
  }), [personalInfo, workExperience, education, skills, extraData]);

  const { 
    renderedElement: customRenderedElement, 
    error: customLayoutError,
    // transformedCodeForDebug // Can be used if displaying detailed error messages
  } = useCustomLayoutRenderer({ customLayoutCode, resumeData: resumeLayoutData });


  useEffect(() => {
    if (contentRef.current) {
      setIsUpdating(true);
      
      const timer = setTimeout(() => {
        if (contentRef.current) {
          const contentHeight = contentRef.current.scrollHeight;
          const pages = Math.ceil(contentHeight / (pageHeight * 3.779527559)); 
          setTotalPages(Math.max(1, pages));
          setIsUpdating(false);
          setHasRecentUpdate(true);
          
          onPreviewUpdate?.();
          
          setTimeout(() => setHasRecentUpdate(false), 2000);
        }
      }, 300); // Debounce for better performance
      
      return () => {
        clearTimeout(timer);
        setIsUpdating(false);
      };
    }
  }, [resumeLayoutData, customRenderedElement, customLayoutError, theme, onPreviewUpdate]);

  // Add hover effects to preview sections after render
  useEffect(() => {
    const setupSectionHovers = () => {
      const sections = contentRef.current?.querySelectorAll('[data-section]');
      if (!sections) return;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const sectionId = element.getAttribute('data-section');
        if (!sectionId) return;

        const handleMouseEnter = () => {
          element.classList.add('preview-section-highlight');
          onSectionHighlight?.(sectionId);
        };

        const handleMouseLeave = () => {
          element.classList.remove('preview-section-highlight');
          onSectionClearHighlight?.();
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        // Store handlers for cleanup
        (element as any).__previewHandlers = { handleMouseEnter, handleMouseLeave };
      });
    };

    // Setup hover effects after a small delay to ensure DOM is ready
    const timer = setTimeout(setupSectionHovers, 100);

    return () => {
      clearTimeout(timer);
      // Clean up event listeners
      const sections = contentRef.current?.querySelectorAll('[data-section]');
      sections?.forEach((section) => {
        const element = section as HTMLElement;
        const handlers = (element as any).__previewHandlers;
        if (handlers) {
          element.removeEventListener('mouseenter', handlers.handleMouseEnter);
          element.removeEventListener('mouseleave', handlers.handleMouseLeave);
          delete (element as any).__previewHandlers;
        }
      });
    };
  }, [customRenderedElement, onSectionHighlight, onSectionClearHighlight]);

  // Removed: generatePdfPreview function
  // Removed: generatePdfPreviewWithReactToPrint (now part of downloadPDF)

  const renderLayout = () => {
    if (customLayoutCode) {
      if (customLayoutError) {
        return (
          <div className="p-4 text-red-600">
            Error rendering custom layout: {customLayoutError}
            {/* Optionally display transformedCodeForDebug here if needed */}
          </div>
        );
      }
      return customRenderedElement; // This is already React.ReactNode or null
    }

    // Standard layout rendering using string templates
    try {
      const layoutName = theme.charAt(0).toUpperCase() + theme.slice(1); // Capitalize first letter
      const codeToExecute = getLayoutJSXString(layoutName) || getLayoutJSXString('Simple');
      
      // For Storybook compatibility, if we can't execute the template, fall back to a simple layout
      if (!codeToExecute || typeof codeToExecute !== 'string') {
        return renderSimpleLayout();
      }
      
      // Scope for code execution using resumeData
      const scope = {
        basics: resumeLayoutData.basics,
        work: resumeLayoutData.work,
        education: resumeLayoutData.education,
        skills: resumeLayoutData.skills,
        extraData: resumeLayoutData.extraData,
        // For backward compatibility
        personalInfo: resumeLayoutData.basics,
        workExperience: resumeLayoutData.work,
        // Add React components needed for layouts
        Mail,
        Phone,
        MapPin,
        Link,
        // Add themes object for template references
        themes,
      };
      
      const func = new Function('React', ...Object.keys(scope), `return ${codeToExecute}`);
      return func(React, ...Object.values(scope));
    } catch (err) {
      console.warn('Error rendering layout template, falling back to simple layout:', (err as Error).message);
      return renderSimpleLayout();
    }
  };

  // Fallback simple layout for Storybook and error cases
  const renderSimpleLayout = () => {
    const personalInfo = resumeLayoutData.basics;
    const workExperience = resumeLayoutData.work;
    const education = resumeLayoutData.education;
    const skills = resumeLayoutData.skills;

    return (
      <div className="p-6 space-y-6 bg-white text-black">
        {/* Personal Info */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-800">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-lg text-gray-600 mt-1">{personalInfo.jobTitle || 'Your Job Title'}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Work Experience */}
        {workExperience && workExperience.length > 0 && (
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">WORK EXPERIENCE</h2>
            <div className="space-y-4">
              {workExperience.map((job: any) => (
                <div key={job.id} className="space-y-1">
                  <div className="font-medium text-gray-800">{job.position || 'Position'}</div>
                  <div className="text-sm text-gray-700">{job.company || 'Company'}</div>
                  <div className="text-xs text-gray-500">{job.startDate} - {job.endDate || 'Present'}</div>
                  {job.description && (
                    <div className="text-sm text-gray-600 mt-2">{job.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">EDUCATION</h2>
            <div className="space-y-3">
              {education.map((edu: any) => (
                <div key={edu.id} className="space-y-1">
                  <div className="font-medium text-gray-800">{edu.institution || 'Institution'}</div>
                  <div className="text-sm text-gray-700">{edu.degree} {edu.field && `in ${edu.field}`}</div>
                  <div className="text-xs text-gray-500">{edu.graduationDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="pb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 relative">
      {/* Preview status indicators */}
      {(isCodeChanging || isUpdating) && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse shadow-lg">
            {isCodeChanging ? 'Code Changing...' : 'Preview Updating...'}
          </div>
        </div>
      )}
      
      {hasRecentUpdate && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-bounce shadow-lg">
            Preview Updated ✓
          </div>
        </div>
      )}
      
      <Button
        id="preview-pdf-button"
        className="hidden"
        onClick={downloadPDF} // Use downloadPDF from the hook
      />

      <div className={`w-[210mm] h-[297mm] max-w-full overflow-hidden transition-all duration-300 ${
        isUpdating ? 'opacity-75 scale-[0.99]' : 'opacity-100 scale-100'
      }`}>
        <Card
          className="w-full h-full bg-white shadow-lg animate-fade-in relative"
          style={{
            transform:
              currentPage > 1
                ? `translateY(-${(currentPage - 1) * 100}%)`
                : "none",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <div
            ref={contentRef}
            className={`${theme === "sidebar" ? "flex h-full" : "flex h-full"}`} // Sidebar layout might need flex container
          >
            <ErrorBoundary resetKey={customLayoutCode}>
              {renderLayout()}
            </ErrorBoundary>
          </div>
        </Card>
      </div>

      {totalPages > 1 && (
        <div className="flex gap-4 items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
          >
            Previous Page
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
}
