import React from 'react';
import { Mail, Phone, MapPin, Link, Globe, Award, BookOpen, Users, Calendar } from 'lucide-react';

interface ExecutiveLayoutProps {
  resumeData: any;
}

export const ExecutiveLayout: React.FC<ExecutiveLayoutProps> = ({ resumeData }) => {
  resumeData = resumeData || {};
  const personalInfo = resumeData.basics || {};
  const workExperience = resumeData.work || [];
  const education = resumeData.education || [];
  const skills = resumeData.skills || [];
  const extraData = resumeData.extraData || {};

  // Extract additional sections from extraData
  const projects = extraData.projects || [];
  const certifications = extraData.certifications || [];
  const languages = extraData.languages || [];
  const awards = extraData.awards || [];
  const volunteer = extraData.volunteer || [];
  const interests = extraData.interests || [];

  return (
    <div className="executive-layout bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-full">
      {/* Executive Header */}
      <div 
        className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white p-12 preview-section-hoverable"
        data-section="personal-info"
        data-section-label="Executive Profile"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #334155 100%)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent"></div>
        <div className="relative flex items-start gap-8 max-w-6xl mx-auto">
          {/* Executive Photo */}
          <div className="flex-shrink-0">
            {personalInfo.photoUrl ? (
              <div className="relative">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName || "Executive Profile"}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                />
                <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-4 border-white/20 shadow-2xl flex items-center justify-center">
                <Users className="w-16 h-16 text-white/60" />
              </div>
            )}
          </div>

          {/* Executive Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-light tracking-wide text-white mb-2 leading-tight">
              {personalInfo.fullName || "Executive Name"}
            </h1>
            <div className="text-xl font-light text-slate-200 mb-6 tracking-wide">
              {personalInfo.jobTitle || "Chief Executive Officer"}
            </div>

            {/* Executive Summary */}
            {personalInfo.summary && (
              <div className="text-slate-300 text-lg leading-relaxed mb-6 max-w-3xl font-light">
                {personalInfo.summary}
              </div>
            )}

            {/* Executive Contact */}
            <div className="grid grid-cols-2 gap-4 text-slate-300">
              {personalInfo.email && (
                <div className="flex items-center space-x-2">
                  <Mail size={18} className="text-slate-400" />
                  <span className="font-light tracking-wide">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center space-x-2">
                  <Phone size={18} className="text-slate-400" />
                  <span className="font-light tracking-wide">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center space-x-2">
                  <MapPin size={18} className="text-slate-400" />
                  <span className="font-light tracking-wide">
                    {typeof personalInfo.location === 'object' && personalInfo.location.city
                      ? personalInfo.location.city
                      : typeof personalInfo.location === 'string'
                      ? personalInfo.location
                      : ''}
                  </span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center space-x-2">
                  <Globe size={18} className="text-slate-400" />
                  <span className="font-light tracking-wide">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="col-span-2 space-y-12">
            {/* Executive Experience */}
            {workExperience.length > 0 && (
              <section 
                className="preview-section-hoverable"
                data-section="work-experience"
                data-section-label="Executive Experience"
              >
                <h2 className="text-2xl font-light tracking-wide text-slate-800 mb-8 pb-3 border-b-2 border-slate-200">
                  EXECUTIVE EXPERIENCE
                </h2>
                <div className="space-y-8">
                  {workExperience.map((exp, index) => (
                    <div key={exp.id || index} className="relative pl-8">
                      <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full shadow-md"></div>
                      <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gradient-to-b from-slate-300 to-transparent"></div>
                      
                      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-800 tracking-wide">
                              {exp.position}
                            </h3>
                            <div className="text-lg font-medium text-slate-600 mt-1">
                              {exp.name || exp.company}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium tracking-wide shadow-sm">
                              {exp.startDate} - {exp.endDate}
                            </div>
                            {exp.location && (
                              <div className="text-slate-500 text-sm mt-2 font-light">
                                {exp.location}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-slate-700 leading-relaxed font-light">
                          {exp.description || exp.summary}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Strategic Projects */}
            {projects.length > 0 && (
              <section className="preview-section-hoverable">
                <h2 className="text-2xl font-light tracking-wide text-slate-800 mb-8 pb-3 border-b-2 border-slate-200">
                  STRATEGIC PROJECTS
                </h2>
                <div className="grid gap-6">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold text-slate-800 tracking-wide mb-2">
                        {project.name}
                      </h3>
                      <p className="text-slate-700 leading-relaxed font-light mb-4">
                        {project.description}
                      </p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm font-medium tracking-wide">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Executive Sidebar */}
          <div className="space-y-10">
            {/* Core Competencies */}
            {skills.length > 0 && (
              <section 
                className="preview-section-hoverable"
                data-section="skills"
                data-section-label="Core Competencies"
              >
                <h2 className="text-xl font-light tracking-wide text-slate-800 mb-6 pb-2 border-b border-slate-200">
                  CORE COMPETENCIES
                </h2>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-slate-200 p-3 hover:shadow-md transition-shadow">
                      <span className="text-slate-700 font-medium tracking-wide">
                        {typeof skill === 'object' ? skill.name : skill}
                      </span>
                      <div className="w-2 h-2 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section 
                className="preview-section-hoverable"
                data-section="education"
                data-section-label="Executive Education"
              >
                <h2 className="text-xl font-light tracking-wide text-slate-800 mb-6 pb-2 border-b border-slate-200">
                  EXECUTIVE EDUCATION
                </h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={edu.id || index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-slate-800 tracking-wide">
                        {edu.institution}
                      </h3>
                      <div className="text-slate-600 font-medium mt-1">
                        {edu.studyType || edu.degree} {edu.area && `in ${edu.area}`}
                        {edu.field && !edu.area && `in ${edu.field}`}
                      </div>
                      <div className="text-slate-500 text-sm mt-2 font-light">
                        {edu.endDate || edu.graduationDate}
                      </div>
                      {edu.gpa && (
                        <div className="text-slate-500 text-sm font-light">
                          GPA: {edu.gpa}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Professional Certifications */}
            {certifications.length > 0 && (
              <section className="preview-section-hoverable">
                <h2 className="text-xl font-light tracking-wide text-slate-800 mb-6 pb-2 border-b border-slate-200">
                  CERTIFICATIONS
                </h2>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <Award size={16} className="text-slate-500 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-slate-800 tracking-wide">
                            {cert.name}
                          </h3>
                          <div className="text-slate-600 text-sm font-medium">
                            {cert.issuer}
                          </div>
                          <div className="text-slate-500 text-sm font-light">
                            {cert.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section className="preview-section-hoverable">
                <h2 className="text-xl font-light tracking-wide text-slate-800 mb-6 pb-2 border-b border-slate-200">
                  LANGUAGES
                </h2>
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center bg-white rounded-lg shadow-sm border border-slate-200 p-3 hover:shadow-md transition-shadow">
                      <span className="text-slate-700 font-medium tracking-wide">
                        {lang.language}
                      </span>
                      <span className="text-slate-500 text-sm font-light">
                        {lang.fluency}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Awards & Recognition */}
            {awards.length > 0 && (
              <section className="preview-section-hoverable">
                <h2 className="text-xl font-light tracking-wide text-slate-800 mb-6 pb-2 border-b border-slate-200">
                  RECOGNITION
                </h2>
                <div className="space-y-4">
                  {awards.map((award, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <Award size={16} className="text-slate-500 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-slate-800 tracking-wide">
                            {award.title}
                          </h3>
                          <div className="text-slate-600 text-sm font-medium">
                            {award.awarder}
                          </div>
                          <div className="text-slate-500 text-sm font-light">
                            {award.date}
                          </div>
                          {award.summary && (
                            <div className="text-slate-700 text-sm mt-2 font-light">
                              {award.summary}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Board & Volunteer Experience */}
            {volunteer.length > 0 && (
              <section className="preview-section-hoverable">
                <h2 className="text-xl font-light tracking-wide text-slate-800 mb-6 pb-2 border-b border-slate-200">
                  BOARD EXPERIENCE
                </h2>
                <div className="space-y-4">
                  {volunteer.map((vol, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-slate-800 tracking-wide">
                        {vol.position}
                      </h3>
                      <div className="text-slate-600 font-medium mt-1">
                        {vol.organization}
                      </div>
                      {vol.startDate && (
                        <div className="text-slate-500 text-sm font-light">
                          Since {vol.startDate}
                        </div>
                      )}
                      {vol.summary && (
                        <div className="text-slate-700 text-sm mt-2 font-light">
                          {vol.summary}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Professional Interests */}
            {interests.length > 0 && (
              <section className="preview-section-hoverable">
                <h2 className="text-xl font-light tracking-wide text-slate-800 mb-6 pb-2 border-b border-slate-200">
                  INTERESTS
                </h2>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <span key={index} className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-3 py-2 rounded-full text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-shadow">
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ExecutiveLayout.defaultProps = {};

export default ExecutiveLayout;