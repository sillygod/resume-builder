
import { Card } from "@/components/ui/card";
import { PersonalInfoData } from "./PersonalInfo";
import { WorkExperienceEntry } from "./WorkExperience";
import { EducationEntry } from "./Education";
import { useState, useRef, useEffect } from "react";

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
  const pageHeight = 297; // height in mm

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const pages = Math.ceil(contentHeight / (pageHeight * 3.779527559)); // Convert mm to px (1mm ≈ 3.779527559px)
      setTotalPages(Math.max(1, pages));
    }
  }, [personalInfo, workExperience, education, skills]);

  return (
    <div className="flex flex-col items-center gap-4">
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
