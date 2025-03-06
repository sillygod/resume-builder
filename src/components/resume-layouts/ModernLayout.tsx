
import React from 'react';
import { PersonalInfoData } from '../PersonalInfo';
import { WorkExperienceEntry } from '../WorkExperience';
import { EducationEntry } from '../Education';
import { Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';
import { themes } from '@/themes/ThemeContext';

interface ModernLayoutProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  extraData?: Record<string, any>;
}

export const ModernLayout: React.FC<ModernLayoutProps> = ({
  personalInfo,
  workExperience,
  education,
  skills,
  extraData = {},
}) => {
  const theme = themes.modern;

  return (
    <div className={theme.layout.contentClass}>
      {/* Personal Info Section */}
      <div className={theme.personalInfo.containerClass}>
        <div className={theme.personalInfo.gridClass}>
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
                  <LinkIcon size={12} />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {personalInfo.summary && (
        <section className={theme.section.containerClass}>
          <h2 className={theme.section.titleClass}>Summary</h2>
          <div className={theme.section.contentClass}>
            <p className="text-sm text-gray-600">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      {/* Work Experience Section */}
      {workExperience.length > 0 && (
        <section className={theme.workExperience.containerClass}>
          <h2 className={theme.workExperience.titleClass}>Work Experience</h2>
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

      {/* Education Section */}
      {education.length > 0 && (
        <section className={theme.education.containerClass}>
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

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className={theme.skills.containerClass}>
          <h2 className={theme.skills.titleClass}>Skills</h2>
          <div className={theme.skills.skillsListClass}>
            {skills.map((skill) => (
              <span key={skill} className={theme.skills.skillItemClass}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Display extraData if available */}
      {extraData && Object.keys(extraData).length > 0 && (
        <section className={theme.section.containerClass}>
          <h2 className={theme.section.titleClass}>Additional Information</h2>
          <div className="space-y-2">
            {Object.entries(extraData).map(([key, value]) => (
              <div key={key}>
                <h3 className="text-sm font-semibold capitalize">{key}</h3>
                {Array.isArray(value) ? (
                  <ul className="list-disc pl-4 text-xs">
                    {value.map((item, index) => (
                      <li key={index}>
                        {typeof item === 'object' 
                          ? Object.entries(item).map(([k, v]) => `${k}: ${v}`).join(', ')
                          : item.toString()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs">{value.toString()}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
