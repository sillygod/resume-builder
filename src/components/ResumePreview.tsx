import { Card } from "@/components/ui/card";
import { PersonalInfoData } from "./PersonalInfo";
import { WorkExperienceEntry } from "./WorkExperience";
import { EducationEntry } from "./Education";
import React, { useState, useRef, useEffect } from "react";
import { ThemeName } from "@/themes/ThemeContext";
import { Button } from "./ui/button";
// Removed: toast (now handled in hooks), html2pdf, useReactToPrint, * as Babel
// Removed: lucide-react icons (now handled in useCustomLayoutRenderer)

import { SimpleLayout } from "./resume-layouts/SimpleLayout";
import { ModernLayout } from "./resume-layouts/ModernLayout";
import { CenteredLayout } from "./resume-layouts/CenteredLayout";
import { SidebarLayout } from "./resume-layouts/SidebarLayout";

// Import new hooks
import { useCustomLayoutRenderer, ResumeLayoutData } from '../hooks/useCustomLayoutRenderer';
import { useResumePDFGenerator } from '../hooks/useResumePDFGenerator';

interface ResumePreviewProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  theme?: ThemeName;
  // Removed: onPreviewPdf?: () => void;
  extraData?: Record<string, any>;
  customLayoutCode?: string;
}

export function ResumePreview({
  personalInfo,
  workExperience,
  education,
  skills,
  theme = "modern", // Default theme
  extraData = {},
  customLayoutCode,
}: ResumePreviewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState(1);
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
      // Debounce or use ResizeObserver for better performance if this causes issues
      const contentHeight = contentRef.current.scrollHeight;
      const pages = Math.ceil(contentHeight / (pageHeight * 3.779527559)); 
      setTotalPages(Math.max(1, pages));
    }
    // Update totalPages when content changes, or when custom layout is rendered/errored
  }, [resumeLayoutData, customRenderedElement, customLayoutError, theme]); // Added theme dependency

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

    // Standard layout rendering
    switch (theme) {
      case "simple":
        return <SimpleLayout resumeData={resumeLayoutData} />;
      case "modern":
        return <ModernLayout resumeData={resumeLayoutData} />;
      case "centered":
        return <CenteredLayout resumeData={resumeLayoutData} />;
      case "sidebar":
        return <SidebarLayout resumeData={resumeLayoutData} />;
      default:
        return <ModernLayout resumeData={resumeLayoutData} />;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        id="preview-pdf-button"
        className="hidden"
        onClick={downloadPDF} // Use downloadPDF from the hook
      />

      <div className="w-[210mm] h-[297mm] max-w-full overflow-hidden">
        <Card
          className="w-full h-full p-8 bg-white shadow-lg animate-fade-in relative"
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
            className={`${theme === "sidebar" ? "flex" : ""}`} // Sidebar layout might need flex container
          >
            {renderLayout()}
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
