import { Card } from "@/components/ui/card";
import { PersonalInfoData } from "./PersonalInfo";
import { WorkExperienceEntry } from "./WorkExperience";
import { EducationEntry } from "./Education";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Download, Eye } from "lucide-react";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ResumePreviewProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function ResumePreview({
  personalInfo,
  workExperience,
  education,
  skills,
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

  const generatePdfPreview = async () => {
    if (!contentRef.current) return;

    const element = contentRef.current;
    const opt = {
      margin: [0, 0],
      filename: `${personalInfo.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    };

    try {
      const pdf = await html2pdf().set(opt).from(element).output('datauristring');
      setPdfPreviewUrl(pdf);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error('Error generating PDF preview:', error);
      toast.error('Failed to generate PDF preview');
    }
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    const element = contentRef.current;
    const opt = {
      margin: [0, 0],
      filename: `${personalInfo.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    };

    try {
      toast.promise(
        html2pdf().set(opt).from(element).save(),
        {
          loading: 'Generating PDF...',
          success: 'PDF downloaded successfully!',
          error: 'Failed to generate PDF'
        }
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full flex justify-end gap-2 mb-4">
        <Button
          onClick={generatePdfPreview}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Eye className="w-4 h-4" /> Preview PDF
        </Button>
        <Button
          onClick={handleDownloadPDF}
          variant="default"
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Download PDF
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
            <Button onClick={handleDownloadPDF}>Download</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card
        className="w-[210mm] h-[297mm] p-8 max-w-full bg-white shadow-lg animate-fade-in relative overflow-hidden"
        style={{
          transform: `translateY(${-(currentPage - 1) * 100}%)`,
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <div ref={contentRef} className="space-y-6">
          <div className="text-center border-b pb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{personalInfo.email}</p>
              <p>{personalInfo.phone}</p>
              <p>{personalInfo.location}</p>
            </div>
          </div>

          {workExperience.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-primary mb-4">
                Work Experience
              </h2>
              <div className="space-y-4">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="border-b pb-4">
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-sm text-gray-600">
                      {exp.company} | {exp.startDate} - {exp.endDate}
                    </p>
                    <p className="mt-2 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-primary mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-b pb-4">
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <p className="text-sm text-gray-600">
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="text-sm text-gray-600">
                      Graduated: {edu.graduationDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-primary mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
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
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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
