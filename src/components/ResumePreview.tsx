import { Card } from "@/components/ui/card";
import { PersonalInfoData } from "./PersonalInfo";
import { WorkExperienceEntry } from "./WorkExperience";
import { EducationEntry } from "./Education";
import { useState, useRef, useEffect } from "react";
import { ThemeName, themes } from "@/themes/ThemeContext";
import { Button } from "./ui/button";
import { Download, Eye, Mail, Phone, MapPin, Link } from "lucide-react";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import { useReactToPrint } from "react-to-print";
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
  theme?: ThemeName; // Make theme optional with a default
}

export function ResumePreview({
  personalInfo,
  workExperience,
  education,
  skills,
  theme = "modern",
}: ResumePreviewProps) {
  const currentTheme = themes[theme];
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
    contentRef: contentRef});

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
        // await html2pdf(html, options).set(options).from(html).save();
        const exporter = new html2pdf(html, options);
        await exporter.getPdf(options);
      }
    }
  });

  // NOTE: issue, html2pdf will misalign the icon and text
  const handleDownloadPDF = async () => {
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
      toast.promise(html2pdf().set(opt).from(element).save(), {
        loading: "Generating PDF...",
        success: "PDF downloaded successfully!",
        error: "Failed to generate PDF",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };

  const isSidebarLayout = theme === "sidebar";

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
        {/* <Button
          onClick={() =>handleDownloadPDFWithReactToPrint()}
          variant="default"
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Download PDF
        </Button> */}
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
            <Button onClick={() =>handleDownloadPDFWithReactToPrint()}>Download</Button>
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
        <div ref={contentRef} className={currentTheme.layout.containerClass}>
          {isSidebarLayout ? (
            // Sidebar Layout
            <>
              {/* Left Sidebar */}
              <div className={currentTheme.personalInfo.containerClass}>
                <div className={currentTheme.personalInfo.avatarContainerClass}>
                  {personalInfo.photoUrl ? (
                    <img
                      src={personalInfo.photoUrl}
                      alt={personalInfo.fullName || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                      Photo
                    </div>
                  )}
                </div>

                <div className={currentTheme.personalInfo.infoContainerClass}>
                  <h1 className={currentTheme.personalInfo.titleClass}>
                    {personalInfo.fullName || "Your Name"}
                  </h1>
                  <p className={currentTheme.personalInfo.subtitleClass}>
                    {personalInfo.jobTitle || "Your Profession"}
                  </p>

                  <div
                    className={currentTheme.personalInfo.contactContainerClass}
                  >
                    {personalInfo.email && (
                      <div
                        className={currentTheme.personalInfo.contactItemClass}
                      >
                        <Mail size={12} />
                        <span>{personalInfo.email}</span>
                      </div>
                    )}
                    {personalInfo.phone && (
                      <div
                        className={currentTheme.personalInfo.contactItemClass}
                      >
                        <Phone size={12} />
                        <span>{personalInfo.phone}</span>
                      </div>
                    )}
                    {personalInfo.location && (
                      <div
                        className={currentTheme.personalInfo.contactItemClass}
                      >
                        <MapPin size={12} />
                        <span>{personalInfo.location}</span>
                      </div>
                    )}
                    {personalInfo.website && (
                      <div
                        className={currentTheme.personalInfo.contactItemClass}
                      >
                        <Link size={12} />
                        <span>{personalInfo.website}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills in sidebar */}
                {skills.length > 0 && (
                  <section className={currentTheme.skills.containerClass}>
                    <h2 className={currentTheme.skills.titleClass}>Skills</h2>
                    <div className={currentTheme.skills.skillsListClass}>
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className={currentTheme.skills.skillItemClass}
                        >
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {workExperience.length > 0 && (
                  <section
                    className={currentTheme.workExperience.containerClass}
                  >
                    <h2 className={currentTheme.workExperience.titleClass}>
                      Work Experience
                    </h2>
                    <div className="space-y-4">
                      {workExperience.map((exp) => (
                        <div
                          key={exp.id}
                          className={currentTheme.workExperience.entryClass}
                        >
                          <h3
                            className={
                              currentTheme.workExperience.jobTitleClass
                            }
                          >
                            {exp.position}
                          </h3>
                          <p
                            className={currentTheme.workExperience.companyClass}
                          >
                            {exp.company}
                          </p>
                          <p
                            className={currentTheme.workExperience.periodClass}
                          >
                            {exp.startDate} - {exp.endDate}
                          </p>
                          <p
                            className={
                              currentTheme.workExperience.descriptionClass
                            }
                          >
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {education.length > 0 && (
                  <section
                    className={currentTheme.workExperience.containerClass}
                  >
                    <h2 className={currentTheme.education.titleClass}>
                      Education
                    </h2>
                    <div className="space-y-4">
                      {education.map((edu) => (
                        <div
                          key={edu.id}
                          className={currentTheme.education.entryClass}
                        >
                          <h3
                            className={currentTheme.education.institutionClass}
                          >
                            {edu.institution}
                          </h3>
                          <p className={currentTheme.education.degreeClass}>
                            {edu.degree} in {edu.field}
                          </p>
                          <p className={currentTheme.education.periodClass}>
                            Graduated: {edu.graduationDate}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </>
          ) : (
            // Standard Layouts (Simple, Centered, Modern)
            <div className={currentTheme.layout.contentClass}>
              {/* Personal Info Section */}
              <div className={currentTheme.personalInfo.containerClass}>
                <div className={currentTheme.personalInfo.gridClass}>
                  {theme !== "simple" && (
                    <div
                      className={currentTheme.personalInfo.avatarContainerClass}
                    >
                      {personalInfo.photoUrl ? (
                        <img
                          src={personalInfo.photoUrl}
                          alt={personalInfo.fullName || "Profile"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                          Photo
                        </div>
                      )}
                    </div>
                  )}

                  <div className={currentTheme.personalInfo.infoContainerClass}>
                    <h1 className={currentTheme.personalInfo.titleClass}>
                      {personalInfo.fullName || "Your Name"}
                    </h1>
                    <p className={currentTheme.personalInfo.subtitleClass}>
                      {personalInfo.jobTitle || "Your Profession"}
                    </p>

                    <div
                      className={
                        currentTheme.personalInfo.contactContainerClass
                      }
                    >
                      {personalInfo.email && (
                        <div
                          className={currentTheme.personalInfo.contactItemClass}
                        >
                          <Mail size={12} />
                          <span>{personalInfo.email}</span>
                        </div>
                      )}
                      {personalInfo.phone && (
                        <div
                          className={currentTheme.personalInfo.contactItemClass}
                        >
                          <Phone size={12} />
                          <span>{personalInfo.phone}</span>
                        </div>
                      )}
                      {personalInfo.location && (
                        <div
                          className={currentTheme.personalInfo.contactItemClass}
                        >
                          <MapPin size={12} />
                          <span>{personalInfo.location}</span>
                        </div>
                      )}
                      {personalInfo.website && (
                        <div
                          className={currentTheme.personalInfo.contactItemClass}
                        >
                          <Link size={12} />
                          <span>{personalInfo.website}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {theme === "simple" && (
                    <div
                      className={currentTheme.personalInfo.avatarContainerClass}
                    >
                      {personalInfo.photoUrl ? (
                        <img
                          src={personalInfo.photoUrl}
                          alt={personalInfo.fullName || "Profile"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                          Photo
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Summary Section */}
              {personalInfo.summary && (
                <section className={currentTheme.section.containerClass}>
                  <h2 className={currentTheme.section.titleClass}>Summary</h2>
                  <div className={currentTheme.section.contentClass}>
                    <p className="text-sm text-gray-600">
                      {personalInfo.summary}
                    </p>
                  </div>
                </section>
              )}

              {/* Work Experience Section */}
              {workExperience.length > 0 && (
                <section className={currentTheme.workExperience.containerClass}>
                  <h2 className={currentTheme.workExperience.titleClass}>
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {workExperience.map((exp) => (
                      <div
                        key={exp.id}
                        className={currentTheme.workExperience.entryClass}
                      >
                        <h3
                          className={currentTheme.workExperience.jobTitleClass}
                        >
                          {exp.position}
                        </h3>
                        <p className={currentTheme.workExperience.companyClass}>
                          {exp.company}
                        </p>
                        <p className={currentTheme.workExperience.periodClass}>
                          {exp.startDate} - {exp.endDate}
                        </p>
                        <p
                          className={
                            currentTheme.workExperience.descriptionClass
                          }
                        >
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education Section */}
              {education.length > 0 && (
                <section className={currentTheme.education.containerClass}>
                  <h2 className={currentTheme.education.titleClass}>
                    Education
                  </h2>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div
                        key={edu.id}
                        className={currentTheme.education.entryClass}
                      >
                        <h3 className={currentTheme.education.institutionClass}>
                          {edu.institution}
                        </h3>
                        <p className={currentTheme.education.degreeClass}>
                          {edu.degree} in {edu.field}
                        </p>
                        <p className={currentTheme.education.periodClass}>
                          Graduated: {edu.graduationDate}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills Section */}
              {skills.length > 0 && (
                <section className={currentTheme.skills.containerClass}>
                  <h2 className={currentTheme.skills.titleClass}>Skills</h2>
                  <div className={currentTheme.skills.skillsListClass}>
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className={currentTheme.skills.skillItemClass}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
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
