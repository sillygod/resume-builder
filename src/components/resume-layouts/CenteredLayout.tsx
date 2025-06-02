import React from 'react';
import { Mail, Phone, MapPin, Link } from 'lucide-react';

interface CenteredLayoutProps {
  resumeData: any;
}

export const CenteredLayout: React.FC<CenteredLayoutProps> = ({
  resumeData,
}) => {
  resumeData = resumeData || {};
  const personalInfo = resumeData.basics || {};
  const workExperience = resumeData.work || [];
  const education = resumeData.education || [];
  const skills = resumeData.skills || [];
  const extraData = resumeData.extraData || {};
  return (
    <div className="flex flex-col items-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">{personalInfo.fullName}</h1>
        {personalInfo.jobTitle && <h2 className="text-xl text-gray-600">{personalInfo.jobTitle}</h2>}
        <div className="flex items-center justify-center mt-2">
          {personalInfo.email && (
            <div className="flex items-center mr-4">
              <Mail className="h-4 w-4 mr-1" />
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center mr-4">
              <Phone className="h-4 w-4 mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center mr-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {typeof personalInfo.location === 'object' && personalInfo.location.city
                  ? personalInfo.location.city
                  : typeof personalInfo.location === 'string'
                  ? personalInfo.location
                  : ''}
              </span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Link className="h-4 w-4 mr-1" />
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          )}
        </div>
      </header>

      <section className="mb-6 w-full">
        <h2 className="text-2xl font-semibold mb-3">Work Experience</h2>
        {workExperience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <h3 className="font-semibold">{exp.position}</h3>
            <p className="text-gray-700">{exp.company}</p>
            <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
            <p className="mt-1">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-6 w-full">
        <h2 className="text-2xl font-semibold mb-3">Education</h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <h3 className="font-semibold">{edu.institution}</h3>
            <p className="text-gray-700">{edu.field}</p>
            <p className="text-sm text-gray-500">{edu.graduationDate}</p>
            <p>{edu.degree}</p>
          </div>
        ))}
      </section>

      <section className="mb-6 w-full">
        <h2 className="text-2xl font-semibold mb-3">Skills</h2>
        <ul className="list-disc list-inside">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};
