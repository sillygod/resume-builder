import React from 'react';
import { Card } from "@/components/ui/card";
import { PersonalInfoData } from "@/components/PersonalInfo";
import { WorkExperienceEntry } from "@/components/WorkExperience";
import { EducationEntry } from "@/components/Education";
import { ThemeName, themes } from "@/themes/ThemeContext";
import { Mail, Phone, MapPin, Link } from 'lucide-react';

interface SimpleResumePreviewProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  theme?: ThemeName;
}

export function SimpleResumePreview({
  personalInfo,
  workExperience,
  education,
  skills,
  theme = "simple"
}: SimpleResumePreviewProps) {
  const themeConfig = themes[theme];

  const renderPersonalInfo = () => (
    <div className={themeConfig.personalInfo.containerClass} data-section="personal-info">
      <div className={themeConfig.personalInfo.gridClass}>
        <div className={themeConfig.personalInfo.infoContainerClass}>
          <h1 className={themeConfig.personalInfo.titleClass}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className={themeConfig.personalInfo.subtitleClass}>
            {personalInfo.jobTitle || 'Your Job Title'}
          </p>
          
          <div className={themeConfig.personalInfo.contactContainerClass}>
            {personalInfo.email && (
              <div className={themeConfig.personalInfo.contactItemClass}>
                <Mail className="w-3 h-3" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className={themeConfig.personalInfo.contactItemClass}>
                <Phone className="w-3 h-3" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className={themeConfig.personalInfo.contactItemClass}>
                <MapPin className="w-3 h-3" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkExperience = () => (
    <div className={themeConfig.workExperience.containerClass} data-section="work-experience">
      <h2 className={themeConfig.workExperience.titleClass}>WORK EXPERIENCE</h2>
      <div className={themeConfig.section.contentClass}>
        {workExperience.map((job) => (
          <div key={job.id} className={themeConfig.workExperience.entryClass}>
            <div className={themeConfig.workExperience.jobTitleClass}>
              {job.position || 'Position'}
            </div>
            <div className={themeConfig.workExperience.companyClass}>
              {job.company || 'Company'}
            </div>
            <div className={themeConfig.workExperience.periodClass}>
              {job.startDate} - {job.endDate || 'Present'}
            </div>
            {job.description && (
              <div className={themeConfig.workExperience.descriptionClass}>
                {job.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className={themeConfig.education.containerClass} data-section="education">
      <h2 className={themeConfig.education.titleClass}>EDUCATION</h2>
      <div className={themeConfig.section.contentClass}>
        {education.map((edu) => (
          <div key={edu.id} className={themeConfig.education.entryClass}>
            <div className={themeConfig.education.institutionClass}>
              {edu.institution || 'Institution'}
            </div>
            <div className={themeConfig.education.degreeClass}>
              {edu.degree} in {edu.field}
            </div>
            <div className={themeConfig.education.periodClass}>
              {edu.graduationDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className={themeConfig.skills.containerClass} data-section="skills">
      <h2 className={themeConfig.skills.titleClass}>SKILLS</h2>
      <div className={themeConfig.skills.skillsListClass}>
        {skills.map((skill, index) => (
          <span key={index} className={themeConfig.skills.skillItemClass}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  if (theme === 'sidebar') {
    return (
      <div className="w-[210mm] h-[297mm] max-w-full overflow-hidden">
        <Card className="w-full h-full bg-white shadow-lg">
          <div className={themeConfig.layout.containerClass}>
            <div className={themeConfig.layout.contentClass}>
              <div className={themeConfig.personalInfo.containerClass}>
                {renderPersonalInfo()}
                {renderSkills()}
              </div>
              <div className={themeConfig.workExperience.containerClass}>
                {renderWorkExperience()}
                {renderEducation()}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-[210mm] h-[297mm] max-w-full overflow-hidden">
      <Card className="w-full h-full bg-white shadow-lg">
        <div className={themeConfig.layout.containerClass}>
          <div className={themeConfig.layout.contentClass}>
            {renderPersonalInfo()}
            {renderWorkExperience()}
            {renderEducation()}
            {renderSkills()}
          </div>
        </div>
      </Card>
    </div>
  );
}