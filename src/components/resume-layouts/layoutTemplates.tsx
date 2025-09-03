
import React from "react";
import { themes } from "@/themes/ThemeContext";

export interface ResumeLayoutProps {
  resumeData: any;
}

export const getLayoutJSXString = (layoutName: string) => {
  switch(layoutName) {
    case 'Executive':
      return `// ExecutiveLayout Component
(
  <div className="executive-layout bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-full">
    {/* Executive Header */}
    <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white p-12">
      <div className="relative flex items-start gap-8 max-w-6xl mx-auto">
        {/* Executive Photo */}
        <div className="flex-shrink-0">
          {personalInfo.photoUrl ? (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName || "Executive Profile"}
              className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-2xl"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-4 border-white/20 shadow-2xl flex items-center justify-center text-white">
              Executive
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
                <Mail size={18} />
                <span className="font-light tracking-wide">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center space-x-2">
                <Phone size={18} />
                <span className="font-light tracking-wide">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center space-x-2">
                <MapPin size={18} />
                <span className="font-light tracking-wide">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center space-x-2">
                <Link size={18} />
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
            <section>
              <h2 className="text-2xl font-light tracking-wide text-slate-800 mb-8 pb-3 border-b-2 border-slate-200">
                EXECUTIVE EXPERIENCE
              </h2>
              <div className="space-y-8">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="relative pl-8">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full shadow-md"></div>
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                      <h3 className="text-xl font-semibold text-slate-800 tracking-wide">
                        {exp.position}
                      </h3>
                      <div className="text-lg font-medium text-slate-600 mt-1">
                        {exp.name || exp.company}
                      </div>
                      <div className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium tracking-wide shadow-sm inline-block mt-2">
                        {exp.startDate} - {exp.endDate}
                      </div>
                      <div className="text-slate-700 leading-relaxed font-light mt-4">
                        {exp.description}
                      </div>
                    </div>
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
            <section>
              <h2 className="text-xl font-light tracking-wide text-slate-800 mb-6 pb-2 border-b border-slate-200">
                CORE COMPETENCIES
              </h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-slate-200 p-3">
                    <span className="text-slate-700 font-medium tracking-wide">{skill}</span>
                    <div className="w-2 h-2 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full"></div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Executive Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-light tracking-wide text-slate-800 mb-6 pb-2 border-b border-slate-200">
                EXECUTIVE EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                    <h3 className="font-semibold text-slate-800 tracking-wide">{edu.institution}</h3>
                    <div className="text-slate-600 font-medium mt-1">
                      {edu.degree} in {edu.field}
                    </div>
                    <div className="text-slate-500 text-sm mt-2 font-light">
                      {edu.graduationDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  </div>
)`;
    case 'Simple':
      return `// SimpleLayout Component
(
  <div className="${themes.simple.layout.contentClass}">
    {/* Personal Info Section */}
    <div className="${themes.simple.personalInfo.containerClass}">
      <div className="${themes.simple.personalInfo.gridClass}">
        <div className="${themes.simple.personalInfo.infoContainerClass}">
          <h1 className="${themes.simple.personalInfo.titleClass}">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="${themes.simple.personalInfo.subtitleClass}">
            {personalInfo.jobTitle || "Your Profession"}
          </p>
          
          <div className="${themes.simple.personalInfo.contactContainerClass}">
            {personalInfo.email && (
              <div className="${themes.simple.personalInfo.contactItemClass}">
                <Mail size={16} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="${themes.simple.personalInfo.contactItemClass}">
                <Phone size={16} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="${themes.simple.personalInfo.contactItemClass}">
                <MapPin size={16} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="${themes.simple.personalInfo.contactItemClass}">
                <Link size={16} />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        <div className="${themes.simple.personalInfo.avatarContainerClass}">
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
      </div>
    </div>

    {/* Summary Section */}
    {personalInfo.summary && (
      <section className="${themes.simple.section.containerClass}">
        <h2 className="${themes.simple.section.titleClass}">Summary</h2>
        <div className="${themes.simple.section.contentClass}">
          <p className="text-sm text-gray-600">{personalInfo.summary}</p>
        </div>
      </section>
    )}

    {/* Work Experience Section */}
    {workExperience.length > 0 && (
      <section className="${themes.simple.workExperience.containerClass}">
        <h2 className="${themes.simple.workExperience.titleClass}">Work Experience</h2>
        <div className="space-y-4">
          {workExperience.map((exp) => (
            <div key={exp.id} className="${themes.simple.workExperience.entryClass}">
              <h3 className="${themes.simple.workExperience.jobTitleClass}">{exp.position}</h3>
              <p className="${themes.simple.workExperience.companyClass}">{exp.company}</p>
              <p className="${themes.simple.workExperience.periodClass}">{exp.startDate} - {exp.endDate}</p>
              <p className="${themes.simple.workExperience.descriptionClass}">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Education Section */}
    {education.length > 0 && (
      <section className="${themes.simple.education.containerClass}">
        <h2 className="${themes.simple.education.titleClass}">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="${themes.simple.education.entryClass}">
              <h3 className="${themes.simple.education.institutionClass}">{edu.institution}</h3>
              <p className="${themes.simple.education.degreeClass}">{edu.degree} in {edu.field}</p>
              <p className="${themes.simple.education.periodClass}">Graduated: {edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Skills Section */}
    {skills.length > 0 && (
      <section className="${themes.simple.skills.containerClass}">
        <h2 className="${themes.simple.skills.titleClass}">Skills</h2>
        <div className="${themes.simple.skills.skillsListClass}">
          {skills.map((skill) => (
            <span key={skill} className="${themes.simple.skills.skillItemClass}">
              {skill}
            </span>
          ))}
        </div>
      </section>
    )}
  </div>
)`;
    case 'Modern':
      return `// ModernLayout Component
(
  <div className="${themes.modern.layout.contentClass}">
    {/* Personal Info Section */}
    <div className="${themes.modern.personalInfo.containerClass}">
      <div className="${themes.modern.personalInfo.gridClass}">
        <div className="${themes.modern.personalInfo.avatarContainerClass}">
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

        <div className="${themes.modern.personalInfo.infoContainerClass}">
          <h1 className="${themes.modern.personalInfo.titleClass}">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="${themes.modern.personalInfo.subtitleClass}">
            {personalInfo.jobTitle || "Your Profession"}
          </p>
          
          <div className="${themes.modern.personalInfo.contactContainerClass}">
            {personalInfo.email && (
              <div className="${themes.modern.personalInfo.contactItemClass}">
                <Mail size={16} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="${themes.modern.personalInfo.contactItemClass}">
                <Phone size={16} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="${themes.modern.personalInfo.contactItemClass}">
                <MapPin size={16} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="${themes.modern.personalInfo.contactItemClass}">
                <Link size={16} />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Summary Section */}
    {personalInfo.summary && (
      <section className="${themes.modern.section.containerClass}">
        <h2 className="${themes.modern.section.titleClass}">Summary</h2>
        <div className="${themes.modern.section.contentClass}">
          <p className="text-sm text-gray-600">{personalInfo.summary}</p>
        </div>
      </section>
    )}

    {/* Work Experience Section */}
    {workExperience.length > 0 && (
      <section className="${themes.modern.workExperience.containerClass}">
        <h2 className="${themes.modern.workExperience.titleClass}">Work Experience</h2>
        <div className="space-y-4">
          {workExperience.map((exp) => (
            <div key={exp.id} className="${themes.modern.workExperience.entryClass}">
              <h3 className="${themes.modern.workExperience.jobTitleClass}">{exp.position}</h3>
              <p className="${themes.modern.workExperience.companyClass}">{exp.company}</p>
              <p className="${themes.modern.workExperience.periodClass}">{exp.startDate} - {exp.endDate}</p>
              <p className="${themes.modern.workExperience.descriptionClass}">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Education Section */}
    {education.length > 0 && (
      <section className="${themes.modern.education.containerClass}">
        <h2 className="${themes.modern.education.titleClass}">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="${themes.modern.education.entryClass}">
              <h3 className="${themes.modern.education.institutionClass}">{edu.institution}</h3>
              <p className="${themes.modern.education.degreeClass}">{edu.degree} in {edu.field}</p>
              <p className="${themes.modern.education.periodClass}">Graduated: {edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Skills Section */}
    {skills.length > 0 && (
      <section className="${themes.modern.skills.containerClass}">
        <h2 className="${themes.modern.skills.titleClass}">Skills</h2>
        <div className="${themes.modern.skills.skillsListClass}">
          {skills.map((skill) => (
            <span key={skill} className="${themes.modern.skills.skillItemClass}">
              {skill}
            </span>
          ))}
        </div>
      </section>
    )}
  </div>
)`;
    case 'Sidebar':
      return `// SidebarLayout Component
(
  <>
    {/* Left Sidebar */}
    <div className="${themes.sidebar.personalInfo.containerClass}">
      <div className="${themes.sidebar.personalInfo.avatarContainerClass}">
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

      <div className="${themes.sidebar.personalInfo.infoContainerClass}">
        <h1 className="${themes.sidebar.personalInfo.titleClass}">{personalInfo.fullName || "Your Name"}</h1>
        <p className="${themes.sidebar.personalInfo.subtitleClass}">{personalInfo.jobTitle || "Your Profession"}</p>
        
        <div className="${themes.sidebar.personalInfo.contactContainerClass}">
          {personalInfo.email && (
            <div className="${themes.sidebar.personalInfo.contactItemClass}">
              <Mail size={16} className="flex-shrink-0" />
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="${themes.sidebar.personalInfo.contactItemClass}">
              <Phone size={16} className="flex-shrink-0" />
              <span className="truncate">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="${themes.sidebar.personalInfo.contactItemClass}">
              <MapPin size={16} className="flex-shrink-0" />
              <span className="truncate">{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="${themes.sidebar.personalInfo.contactItemClass}">
              <Link size={16} className="flex-shrink-0" />
              <span className="truncate">{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Skills in sidebar */}
      {skills.length > 0 && (
        <section className="${themes.sidebar.skills.containerClass}">
          <h2 className="${themes.sidebar.skills.titleClass}">Skills</h2>
          <div className="${themes.sidebar.skills.skillsListClass}">
            {skills.map((skill) => (
              <span key={skill} className="${themes.sidebar.skills.skillItemClass}">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>

    {/* Main Content */}
    <div className="flex-1">
      {workExperience.length > 0 && (
        <section className="${themes.sidebar.workExperience.containerClass}">
          <h2 className="${themes.sidebar.workExperience.titleClass}">Work Experience</h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="${themes.sidebar.workExperience.entryClass}">
                <h3 className="${themes.sidebar.workExperience.jobTitleClass}">{exp.position}</h3>
                <p className="${themes.sidebar.workExperience.companyClass}">{exp.company}</p>
                <p className="${themes.sidebar.workExperience.periodClass}">{exp.startDate} - {exp.endDate}</p>
                <p className="${themes.sidebar.workExperience.descriptionClass}">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="${themes.sidebar.workExperience.containerClass}">
          <h2 className="${themes.sidebar.education.titleClass}">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="${themes.sidebar.education.entryClass}">
                <h3 className="${themes.sidebar.education.institutionClass}">{edu.institution}</h3>
                <p className="${themes.sidebar.education.degreeClass}">{edu.degree} in {edu.field}</p>
                <p className="${themes.sidebar.education.periodClass}">Graduated: {edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  </>
)`;
    case 'Centered':
      return `// CenteredLayout Component
(
  <div className="${themes.centered.layout.contentClass}">
    {/* Personal Info Section */}
    <div className="${themes.centered.personalInfo.containerClass}">
      <div className="${themes.centered.personalInfo.gridClass}">
        <div className="${themes.centered.personalInfo.avatarContainerClass}">
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

        <div className="${themes.centered.personalInfo.infoContainerClass}">
          <h1 className="${themes.centered.personalInfo.titleClass}">{personalInfo.fullName || "Your Name"}</h1>
          <p className="${themes.centered.personalInfo.subtitleClass}">{personalInfo.jobTitle || "Your Profession"}</p>
          
          <div className="${themes.centered.personalInfo.contactContainerClass}">
            {personalInfo.email && (
              <div className="${themes.centered.personalInfo.contactItemClass}">
                <Mail size={16} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="${themes.centered.personalInfo.contactItemClass}">
                <Phone size={16} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="${themes.centered.personalInfo.contactItemClass}">
                <MapPin size={16} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="${themes.centered.personalInfo.contactItemClass}">
                <Link size={16} />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Summary Section */}
    {personalInfo.summary && (
      <section className="${themes.centered.section.containerClass}">
        <h2 className="${themes.centered.section.titleClass}">Summary</h2>
        <div className="${themes.centered.section.contentClass}">
          <p className="text-sm text-gray-600">{personalInfo.summary}</p>
        </div>
      </section>
    )}

    {/* Work Experience Section */}
    {workExperience.length > 0 && (
      <section className="${themes.centered.workExperience.containerClass}">
        <h2 className="${themes.centered.workExperience.titleClass}">Work Experience</h2>
        <div className="space-y-4">
          {workExperience.map((exp) => (
            <div key={exp.id} className="${themes.centered.workExperience.entryClass}">
              <h3 className="${themes.centered.workExperience.jobTitleClass}">{exp.position}</h3>
              <p className="${themes.centered.workExperience.companyClass}">{exp.company}</p>
              <p className="${themes.centered.workExperience.periodClass}">{exp.startDate} - {exp.endDate}</p>
              <p className="${themes.centered.workExperience.descriptionClass}">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Education Section */}
    {education.length > 0 && (
      <section className="${themes.centered.education.containerClass}">
        <h2 className="${themes.centered.education.titleClass}">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="${themes.centered.education.entryClass}">
              <h3 className="${themes.centered.education.institutionClass}">{edu.institution}</h3>
              <p className="${themes.centered.education.degreeClass}">{edu.degree} in {edu.field}</p>
              <p className="${themes.centered.education.periodClass}">Graduated: {edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Skills Section */}
    {skills.length > 0 && (
      <section className="${themes.centered.skills.containerClass}">
        <h2 className="${themes.centered.skills.titleClass}">Skills</h2>
        <div className="${themes.centered.skills.skillsListClass}">
          {skills.map((skill) => (
            <span key={skill} className="${themes.centered.skills.skillItemClass}">
              {skill}
            </span>
          ))}
        </div>
      </section>
    )}
  </div>
)`;
    default:
      return '';
  }
};
