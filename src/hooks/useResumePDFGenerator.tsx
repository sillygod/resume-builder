import React from 'react';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import { toast } from 'sonner'; // For error handling

// 1. Define Input Prop Types
export interface UseResumePDFGeneratorProps {
  contentRef: React.RefObject<HTMLDivElement>;
  fileNamePrefix?: string;
}

// Define Return Value Types
export interface UseResumePDFGeneratorReturn {
  downloadPDF: () => void; // From useReactToPrint
  generatePdfPreviewUri: () => Promise<string | null>; // Using html2pdf.js
}

// 2. Hook Logic
export const useResumePDFGenerator = ({
  contentRef,
  fileNamePrefix = 'resume', // Default filename prefix
}: UseResumePDFGeneratorProps): UseResumePDFGeneratorReturn => {
  // `useReactToPrint` Integration
  const handlePrintPDF = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: `${fileNamePrefix}.pdf`, // Set document title for print dialog/save
    // onBeforeGetContent: () => { /* ... */ },
    // onBeforePrint: () => { /* ... */ },
    // onAfterPrint: () => { /* ... */ },
  });

  // `html2pdf.js` Integration for Preview
  const generatePdfPreviewUri = async (): Promise<string | null> => {
    if (!contentRef.current) {
      toast.error("Resume content is not available for PDF generation.");
      return null;
    }

    const element = contentRef.current;
    const opt = {
      margin: [0, 0, 0, 0], // Top, Left, Bottom, Right margins in mm
      filename: `${fileNamePrefix}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        // It's good to set width and height explicitly if possible,
        // especially if contentRef.current might not have intrinsic dimensions html2pdf likes.
        // Example:
        // width: contentRef.current.scrollWidth,
        // height: contentRef.current.scrollHeight,
        // windowWidth: contentRef.current.scrollWidth,
        // windowHeight: contentRef.current.scrollHeight,
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      },
      // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } // Optional: control page breaks
    };

    try {
      // html2pdf returns a Promise-like object (its own implementation)
      const pdfDataUri = await html2pdf()
        .set(opt)
        .from(element)
        .output('datauristring'); // Get PDF as data URI

      return pdfDataUri as string; // Cast because output('datauristring') should return string
    } catch (error: any) {
      console.error("Error generating PDF preview with html2pdf.js:", error);
      toast.error(error.message || "Failed to generate PDF preview.");
      return null;
    }
  };

  // 3. Return Value
  return {
    downloadPDF: handlePrintPDF as () => void, // Cast if necessary, useReactToPrint can return undefined if not ready
    generatePdfPreviewUri,
  };
};
