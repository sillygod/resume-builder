
import React from "react";
import { themes } from "@/themes/ThemeContext";
import { Mail, Phone, MapPin, Link } from "lucide-react";
import { PersonalInfoData } from "../PersonalInfo";
import { WorkExperienceEntry } from "../WorkExperience";
import { EducationEntry } from "../Education";

export interface ResumeLayoutProps {
  resumeData: any;
}

export const getSimpleLayoutJSX = (props: ResumeLayoutProps) => {
  const resumeData = props.resumeData;
  const personalInfo = resumeData.basics || {};
  const workExperience = resumeData.work || [];
  const education = resumeData.education || [];
  const skills = resumeData.skills || [];
  const theme = themes.simple;

  return (
    <div className={theme.layout.contentClass}>
      {/* Personal Info Section */}
      <div className={theme.personalInfo.containerClass}>
        <div className={theme.personalInfo.gridClass}>
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
                  <span>
                    {typeof personalInfo.location === 'object' && personalInfo.location.city
                      ? personalInfo.location.city
                      : typeof personalInfo.location === 'string'
                      ? personalInfo.location
                      : ''}
                  </span>
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
    </div>
  );
};

export const getModernLayoutJSX = (props: ResumeLayoutProps) => {
  const resumeData = props.resumeData;
  const personalInfo = resumeData.basics || {};
  const workExperience = resumeData.work || [];
  const education = resumeData.education || [];
  const skills = resumeData.skills || [];
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
                  <Link size={12} />
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
    </div>
  );
};

export const getSidebarLayoutJSX = (props: ResumeLayoutProps) => {
  const resumeData = props.resumeData;
  const personalInfo = resumeData.basics || {};
  const workExperience = resumeData.work || [];
  const education = resumeData.education || [];
  const skills = resumeData.skills || [];
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
};

export const getCenteredLayoutJSX = (props: ResumeLayoutProps) => {
  const resumeData = props.resumeData;
  const personalInfo = resumeData.basics || {};
  const workExperience = resumeData.work || [];
  const education = resumeData.education || [];
  const skills = resumeData.skills || [];
  const theme = themes.centered;

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
                  <Link size={12} />
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
    </div>
  );
};

// Generate JSX strings for use in the code editor
export const getLayoutSourceCode = (layoutName: string) => {
  const theme = themes[layoutName.toLowerCase() as keyof typeof themes];
  
  switch(layoutName) {
    case 'Simple':
      return `// SimpleLayout Component
(
  ${React.createElement('div', {}, 'loading')}
)`;
    case 'Modern':
      return `// ModernLayout Component
(
  ${React.createElement('div', {}, 'loading')}
)`;
    case 'Sidebar':
      return `// SidebarLayout Component
(
  ${React.createElement('div', {}, 'loading')}
)`;
    case 'Centered':
      return `// CenteredLayout Component
(
  ${React.createElement('div', {}, 'loading')}
)`;
    default:
      return '';
  }
};

// Helper function to convert a JSX component to its string representation for display
export const getLayoutJSXString = (layoutName: string) => {
  switch(layoutName) {
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
                <Mail size={12} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="${themes.simple.personalInfo.contactItemClass}">
                <Phone size={12} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="${themes.simple.personalInfo.contactItemClass}">
                <MapPin size={12} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="${themes.simple.personalInfo.contactItemClass}">
                <Link size={12} />
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
                <Mail size={12} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="${themes.modern.personalInfo.contactItemClass}">
                <Phone size={12} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="${themes.modern.personalInfo.contactItemClass}">
                <MapPin size={12} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="${themes.modern.personalInfo.contactItemClass}">
                <Link size={12} />
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
              <Mail size={12} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="${themes.sidebar.personalInfo.contactItemClass}">
              <Phone size={12} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="${themes.sidebar.personalInfo.contactItemClass}">
              <MapPin size={12} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="${themes.sidebar.personalInfo.contactItemClass}">
              <Link size={12} />
              <span>{personalInfo.website}</span>
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
              <div key={skill} className="${themes.sidebar.skills.skillItemClass}">
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
                <Mail size={12} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="${themes.centered.personalInfo.contactItemClass}">
                <Phone size={12} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="${themes.centered.personalInfo.contactItemClass}">
                <MapPin size={12} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="${themes.centered.personalInfo.contactItemClass}">
                <Link size={12} />
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
