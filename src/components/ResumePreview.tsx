
import { Card } from "@/components/ui/card";
import { PersonalInfoData } from "./PersonalInfo";
import { WorkExperienceEntry } from "./WorkExperience";
import { EducationEntry } from "./Education";

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
  return (
    <div className="flex justify-center">
      <Card className="w-[210mm] h-[297mm] p-8 max-w-full bg-white shadow-lg animate-fade-in overflow-y-auto">
        <div className="space-y-6">
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
    </div>
  );
}
