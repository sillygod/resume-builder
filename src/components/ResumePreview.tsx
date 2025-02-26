
import { Card } from "@/components/ui/card";
import { PersonalInfoData } from "./PersonalInfo";
import { WorkExperienceEntry } from "./WorkExperience";
import { EducationEntry } from "./Education";
import { useState, useRef, useEffect } from "react";
import { ThemeName } from "@/themes/ThemeContext";
import { Button } from "./ui/button";
import { Download, Eye } from "lucide-react";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import { useReactToPrint } from "react-to-print";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SimpleLayout } from "./resume-layouts/SimpleLayout";
import { ModernLayout } from "./resume-layouts/ModernLayout";
import { CenteredLayout } from "./resume-layouts/CenteredLayout";
import { SidebarLayout } from "./resume-layouts/SidebarLayout";

interface ResumePreviewProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  theme?: ThemeName; // Make theme optional with a default
}

export function ResumePreview({
  personalInfo,
  workExperience,
  education,
  skills,
  theme = "modern",
}: ResumePreviewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const pageHeight = 297; // height in mm

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const pages = Math.ceil(contentHeight / (pageHeight * 3.779527559)); // Convert mm to px
      setTotalPages(Math.max(1, pages));
    }
  }, [personalInfo, workExperience, education, skills]);

  const generatePdfPreviewWithReactToPrint = useReactToPrint({
    contentRef: contentRef
  });

  const generatePdfPreview = async () => {
    if (!contentRef.current) return;

    const element = contentRef.current;
    const opt = {
      margin: [0, 0],
      filename: `${personalInfo.fullName || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    try {
      const pdf = await html2pdf()
        .set(opt)
        .from(element)
        .output("datauristring");
      setPdfPreviewUrl(pdf);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error("Error generating PDF preview:", error);
      toast.error("Failed to generate PDF preview");
    }
  };

  const handleDownloadPDFWithReactToPrint = useReactToPrint({
    contentRef: contentRef,
    print: async (printIframe) => {
      const document = printIframe.contentDocument;
      if (document) {
        const html = document.getElementsByTagName('html')[0];
        const options = {
          margin: 0,
          filename: `${personalInfo.fullName || "resume"}.pdf`,
        };
        const exporter = new html2pdf(html, options);
        await exporter.getPdf(options);
      }
    }
  });

  const renderLayout = () => {
    const layoutProps = {
      personalInfo,
      workExperience,
      education,
      skills
    };

    switch (theme) {
      case "simple":
        return <SimpleLayout {...layoutProps} />;
      case "modern":
        return <ModernLayout {...layoutProps} />;
      case "centered":
        return <CenteredLayout {...layoutProps} />;
      case "sidebar":
        return <SidebarLayout {...layoutProps} />;
      default:
        return <ModernLayout {...layoutProps} />;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full flex justify-end gap-2 mb-4">
        <Button
          onClick={() => generatePdfPreviewWithReactToPrint()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Eye className="w-4 h-4" /> Preview Download PDF
        </Button>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>PDF Preview</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            {pdfPreviewUrl && (
              <iframe
                src={pdfPreviewUrl}
                className="w-full h-full border-0"
                title="PDF Preview"
              />
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleDownloadPDFWithReactToPrint()}>Download</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card
        className="w-[210mm] h-[297mm] p-8 max-w-full bg-white shadow-lg animate-fade-in relative overflow-hidden"
        style={{
          transform: `translateY(${-(currentPage - 1) * 100}%)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div ref={contentRef} className={`${theme === "sidebar" ? "flex" : ""}`}>
          {renderLayout()}
        </div>
      </Card>

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
