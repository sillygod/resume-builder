
import { PersonalInfoData } from "../PersonalInfo";
import { WorkExperienceEntry } from "../WorkExperience";
import { EducationEntry } from "../Education";
import { Mail, Phone, MapPin, Link } from "lucide-react";
import { themes } from "@/themes/ThemeContext";

interface SidebarLayoutProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function SidebarLayout({
  personalInfo,
  workExperience,
  education,
  skills,
}: SidebarLayoutProps) {
  const theme = themes.sidebar;

  return (
    <>
      {/* Left Sidebar */}
      <div className={theme.personalInfo.containerClass}>
        <div className={theme.personalInfo.avatarContainerClass}>
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

        <div className={theme.personalInfo.infoContainerClass}>
          <h1 className={theme.personalInfo.titleClass}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className={theme.personalInfo.subtitleClass}>
            {personalInfo.jobTitle || "Your Profession"}
          </p>

          <div className={theme.personalInfo.contactContainerClass}>
            {personalInfo.email && (
              <div className={theme.personalInfo.contactItemClass}>
                <Mail size={12} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className={theme.personalInfo.contactItemClass}>
                <Phone size={12} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className={theme.personalInfo.contactItemClass}>
                <MapPin size={12} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className={theme.personalInfo.contactItemClass}>
                <Link size={12} />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills in sidebar */}
        {skills.length > 0 && (
          <section className={theme.skills.containerClass}>
            <h2 className={theme.skills.titleClass}>Skills</h2>
            <div className={theme.skills.skillsListClass}>
              {skills.map((skill) => (
                <div key={skill} className={theme.skills.skillItemClass}>
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
          <section className={theme.workExperience.containerClass}>
            <h2 className={theme.workExperience.titleClass}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {workExperience.map((exp) => (
                <div key={exp.id} className={theme.workExperience.entryClass}>
                  <h3 className={theme.workExperience.jobTitleClass}>
                    {exp.position}
                  </h3>
                  <p className={theme.workExperience.companyClass}>
                    {exp.company}
                  </p>
                  <p className={theme.workExperience.periodClass}>
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className={theme.workExperience.descriptionClass}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className={theme.workExperience.containerClass}>
            <h2 className={theme.education.titleClass}>Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className={theme.education.entryClass}>
                  <h3 className={theme.education.institutionClass}>
                    {edu.institution}
                  </h3>
                  <p className={theme.education.degreeClass}>
                    {edu.degree} in {edu.field}
                  </p>
                  <p className={theme.education.periodClass}>
                    Graduated: {edu.graduationDate}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
