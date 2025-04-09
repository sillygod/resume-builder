import React from 'react';
import { PersonalInfoData } from '../PersonalInfo';
import { WorkExperienceEntry } from '../WorkExperience';
import { EducationEntry } from '../Education';
import { Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';

interface SimpleLayoutProps {
  resumeData: any;
}

export const SimpleLayout: React.FC<SimpleLayoutProps> = ({
  resumeData,
}) => {
  const personalInfo = resumeData.basics || {};
  const workExperience = resumeData.work || [];
  const education = resumeData.education || [];
  const skills = resumeData.skills || [];
  const extraData = resumeData.extraData || {};
  return (
    <div className="simple-layout">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
        <h2 className="text-xl">{personalInfo.jobTitle}</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <LinkIcon className="h-4 w-4 mr-1" />
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          )}
        </div>
      </header>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Work Experience</h2>
        {workExperience.map((exp) => (
          <div key={exp.id} className="mb-2">
            <h3 className="font-semibold">{exp.position}</h3>
            <p className="text-gray-700">{exp.company}</p>
            <p className="text-sm text-gray-500">
              {exp.startDate} - {exp.endDate || 'Present'}
            </p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Education</h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-2">
            <h3 className="font-semibold">{edu.institution}</h3>
            <p className="text-gray-700">{edu.field}</p>
            <p className="text-sm text-gray-500">
              {edu.degree}, {edu.graduationDate}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <ul className="list-disc list-inside">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};
