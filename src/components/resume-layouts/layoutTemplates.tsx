
import React from "react";
import { themes } from "@/themes/ThemeContext";

export interface ResumeLayoutProps {
  resumeData: any;
}

export const getLayoutJSXString = (layoutName: string) => {
  switch(layoutName) {
    case 'Executive':
      return `// Cyber-Executive Layout Component
(
  <div className="${themes.executive.layout.containerClass}">
    <div className="${themes.executive.layout.contentClass}">
      {/* Personal Info Section */}
      <div className="${themes.executive.personalInfo.containerClass}">
        <div className="${themes.executive.personalInfo.gridClass}">
          <div className="${themes.executive.personalInfo.avatarContainerClass}">
            {personalInfo.photoUrl ? (
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: "url(" + personalInfo.photoUrl + ")",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              >
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName || "Profile"}
                  className="w-full h-full"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center"
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/30 font-mono text-sm uppercase">

              </div>
            )}
          </div>

          <div className="${themes.executive.personalInfo.infoContainerClass}">
            <h1 className="${themes.executive.personalInfo.titleClass}">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="${themes.executive.personalInfo.subtitleClass}">
              {personalInfo.jobTitle || "Your Profession"}
            </p>

            <div className="${themes.executive.personalInfo.contactContainerClass}">
              {personalInfo.email && (
                <div className="${themes.executive.personalInfo.contactItemClass}">
                  <span className="${themes.executive.personalInfo.labelClass}">COM.EMAIL</span>
                  <span className="${themes.executive.personalInfo.valueClass}">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="${themes.executive.personalInfo.contactItemClass}">
                  <span className="${themes.executive.personalInfo.labelClass}">COM.VOICE</span>
                  <span className="${themes.executive.personalInfo.valueClass}">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="${themes.executive.personalInfo.contactItemClass}">
                  <span className="${themes.executive.personalInfo.labelClass}">LOC.COORD</span>
                  <span className="${themes.executive.personalInfo.valueClass}">{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="${themes.executive.personalInfo.contactItemClass}">
                  <span className="${themes.executive.personalInfo.labelClass}">NET.LINK</span>
                  <span className="${themes.executive.personalInfo.valueClass}">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {personalInfo.summary && (
        <section className="${themes.executive.section.containerClass}">
          <h2 className="${themes.executive.section.titleClass}">Executive Summary</h2>
          <div className="${themes.executive.section.contentClass}">
            <p className="${themes.executive.workExperience.descriptionClass}">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      {/* Work Experience Section */}
      {workExperience.length > 0 && (
        <section className="${themes.executive.workExperience.containerClass}">
          <h2 className="${themes.executive.workExperience.titleClass}">Experience Core</h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="${themes.executive.workExperience.entryClass}">
                <div className="${themes.executive.workExperience.periodClass}">
                  {exp.startDate} - {exp.endDate}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="${themes.executive.workExperience.jobTitleClass}">{exp.position}</h3>
                  <p className="${themes.executive.workExperience.companyClass}">{exp.company}</p>
                  <p className="${themes.executive.workExperience.descriptionClass}">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="${themes.executive.education.containerClass}">
          <h2 className="${themes.executive.education.titleClass}">Knowledge Base</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="${themes.executive.education.entryClass}">
                <div className="${themes.executive.education.periodClass}">
                  GRAD: {edu.graduationDate}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="${themes.executive.education.institutionClass}">{edu.institution}</h3>
                  <p className="${themes.executive.education.degreeClass}">{edu.degree} in {edu.field}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="${themes.executive.skills.containerClass}">
          <h2 className="${themes.executive.skills.titleClass}">Systems Competency</h2>
          <div className="${themes.executive.skills.skillsListClass}">
            {skills.map((skill) => (
              <span key={skill} className="${themes.executive.skills.skillItemClass}">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
)`;
    case 'Simple':
      return `// Netrunner Core Layout Component
(
  <div className="${themes.simple.layout.containerClass}">
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
                  <span className="${themes.simple.personalInfo.labelClass}">COM.EMAIL</span>
                  <span className="${themes.simple.personalInfo.valueClass}">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="${themes.simple.personalInfo.contactItemClass}">
                  <span className="${themes.simple.personalInfo.labelClass}">COM.VOICE</span>
                  <span className="${themes.simple.personalInfo.valueClass}">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="${themes.simple.personalInfo.contactItemClass}">
                  <span className="${themes.simple.personalInfo.labelClass}">LOC.COORD</span>
                  <span className="${themes.simple.personalInfo.valueClass}">{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="${themes.simple.personalInfo.contactItemClass}">
                  <span className="${themes.simple.personalInfo.labelClass}">NET.LINK</span>
                  <span className="${themes.simple.personalInfo.valueClass}">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          <div className="${themes.simple.personalInfo.avatarContainerClass}">
            {personalInfo.photoUrl ? (
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: "url(" + personalInfo.photoUrl + ")",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              >
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName || "Profile"}
                  className="w-full h-full grayscale"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center"
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/50 font-mono text-xs">

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
            <p className="${themes.simple.workExperience.descriptionClass}">{personalInfo.summary}</p>
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
  </div>
)`;
    case 'Modern':
      return `// Wasteland Tech Layout Component
(
  <div className="${themes.modern.layout.containerClass}">
    <div className="${themes.modern.layout.contentClass}">
      {/* Personal Info Section */}
      <div className="${themes.modern.personalInfo.containerClass}">
        <div className="${themes.modern.personalInfo.gridClass}">
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
                  <span className="${themes.modern.personalInfo.labelClass}">EMAIL</span>
                  <span className="${themes.modern.personalInfo.valueClass}">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="${themes.modern.personalInfo.contactItemClass}">
                  <span className="${themes.modern.personalInfo.labelClass}">COMM</span>
                  <span className="${themes.modern.personalInfo.valueClass}">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="${themes.modern.personalInfo.contactItemClass}">
                  <span className="${themes.modern.personalInfo.labelClass}">BASE</span>
                  <span className="${themes.modern.personalInfo.valueClass}">{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="${themes.modern.personalInfo.contactItemClass}">
                  <span className="${themes.modern.personalInfo.labelClass}">NODE</span>
                  <span className="${themes.modern.personalInfo.valueClass}">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          <div className="${themes.modern.personalInfo.avatarContainerClass}">
            {personalInfo.photoUrl ? (
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: "url(" + personalInfo.photoUrl + ")",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              >
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName || "Profile"}
                  className="w-full h-full grayscale sepia-[0.2]"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center"
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[white]/50 font-mono text-sm uppercase">

              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {personalInfo.summary && (
        <section className="${themes.modern.section.containerClass}">
          <h2 className="${themes.modern.section.titleClass}">Profile Data</h2>
          <div className="${themes.modern.section.contentClass}">
            <p className="${themes.modern.workExperience.descriptionClass}">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      {/* Work Experience Section */}
      {workExperience.length > 0 && (
        <section className="${themes.modern.workExperience.containerClass}">
          <h2 className="${themes.modern.workExperience.titleClass}">Mission Logs</h2>
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
          <h2 className="${themes.modern.education.titleClass}">Training Base</h2>
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
          <h2 className="${themes.modern.skills.titleClass}">Capabilities</h2>
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
  </div>
)`;
    case 'Sidebar':
      return `// Linear Sidebar Layout Component
(
  <>
    {/* Left Sidebar */}
    <div className="${themes.sidebar.personalInfo.containerClass}">
      <div className="${themes.sidebar.personalInfo.avatarContainerClass}">
        {personalInfo.photoUrl ? (
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: "url(" + personalInfo.photoUrl + ")",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          >
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName || "Profile"}
              className="w-full h-full object-cover grayscale"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-white/[0.05] flex items-center justify-center text-white/50 font-mono text-sm uppercase">


          </div>
        )}
      </div>

      <div className="${themes.sidebar.personalInfo.infoContainerClass}">
        <div>
          <h1 className="${themes.sidebar.personalInfo.titleClass}">{personalInfo.fullName || "Your Name"}</h1>
          <p className="${themes.sidebar.personalInfo.subtitleClass}">{personalInfo.jobTitle || "Your Profession"}</p>
        </div>
        
        <div className="${themes.sidebar.personalInfo.contactContainerClass}">
          {personalInfo.email && (
            <div className="${themes.sidebar.personalInfo.contactItemClass}">
              <span className="${themes.sidebar.personalInfo.labelClass}">COM.EMAIL</span>
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="${themes.sidebar.personalInfo.contactItemClass}">
              <span className="${themes.sidebar.personalInfo.labelClass}">COM.VOICE</span>
              <span className="truncate">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="${themes.sidebar.personalInfo.contactItemClass}">
              <span className="${themes.sidebar.personalInfo.labelClass}">LOC.COORD</span>
              <span className="truncate">{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="${themes.sidebar.personalInfo.contactItemClass}">
              <span className="${themes.sidebar.personalInfo.labelClass}">NET.LINK</span>
              <span className="truncate">{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Skills in sidebar */}
      {skills.length > 0 && (
        <section className="${themes.sidebar.skills.containerClass}">
          <h2 className="\${themes.sidebar.skills.titleClass}">Skills</h2>
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
    <div className="${themes.sidebar.workExperience.containerClass}">
      {personalInfo.summary && (
        <section className="${themes.sidebar.section.containerClass}">
          <h2 className="\${themes.sidebar.section.titleClass}">Summary</h2>
          <div className="${themes.sidebar.section.contentClass}">
            <p className="${themes.sidebar.workExperience.descriptionClass}">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="${themes.sidebar.section.containerClass}">
          <h2 className="\${themes.sidebar.workExperience.titleClass}">Experience</h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="${themes.sidebar.workExperience.entryClass}">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="${themes.sidebar.workExperience.jobTitleClass}">{exp.position}</h3>
                  <span className="${themes.sidebar.workExperience.periodClass}">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="${themes.sidebar.workExperience.companyClass}">{exp.company}</p>
                <p className="${themes.sidebar.workExperience.descriptionClass}">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="${themes.sidebar.section.containerClass}">
          <h2 className="\${themes.sidebar.education.titleClass}">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="${themes.sidebar.education.entryClass}">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="${themes.sidebar.education.institutionClass}">{edu.institution}</h3>
                  <span className="${themes.sidebar.education.periodClass}">Graduated: {edu.graduationDate}</span>
                </div>
                <p className="${themes.sidebar.education.degreeClass}">{edu.degree} in {edu.field}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  </>
)`;
    case 'Centered':
      return `// Linear Centered Layout Component
(
  <div className="${themes.centered.layout.containerClass}">
    <div className="${themes.centered.layout.contentClass}">
      {/* Personal Info Section */}
      <div className="${themes.centered.personalInfo.containerClass}">
        <div className="${themes.centered.personalInfo.gridClass}">
          <div className="${themes.centered.personalInfo.avatarContainerClass}">
            {personalInfo.photoUrl ? (
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: "url(" + personalInfo.photoUrl + ")",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              >
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName || "Profile"}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-white/[0.05] flex items-center justify-center text-white/50 font-mono text-sm uppercase">



              </div>
            )}
          </div>

          <div className="${themes.centered.personalInfo.infoContainerClass}">
            <h1 className="${themes.centered.personalInfo.titleClass}">{personalInfo.fullName || "Your Name"}</h1>
            <p className="${themes.centered.personalInfo.subtitleClass}">{personalInfo.jobTitle || "Your Profession"}</p>

            <div className="${themes.centered.personalInfo.contactContainerClass}">
              {personalInfo.email && (
                <div className="${themes.centered.personalInfo.contactItemClass}">
                  <span className="${themes.centered.personalInfo.labelClass}">COM.EMAIL</span>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="${themes.centered.personalInfo.contactItemClass}">
                  <span className="${themes.centered.personalInfo.labelClass}">COM.VOICE</span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="${themes.centered.personalInfo.contactItemClass}">
                  <span className="${themes.centered.personalInfo.labelClass}">LOC.COORD</span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="${themes.centered.personalInfo.contactItemClass}">
                  <span className="${themes.centered.personalInfo.labelClass}">NET.LINK</span>
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
          <h2 className="\${themes.centered.section.titleClass}">Summary</h2>
          <div className="${themes.centered.section.contentClass}">
            <p className="${themes.centered.workExperience.descriptionClass} text-center">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      {/* Work Experience Section */}
      {workExperience.length > 0 && (
        <section className="${themes.centered.workExperience.containerClass}">
          <h2 className="\${themes.centered.workExperience.titleClass}">Experience</h2>
          <div className="${themes.centered.section.contentClass}">
            {workExperience.map((exp) => (
              <div key={exp.id} className="${themes.centered.workExperience.entryClass}">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                  <h3 className="${themes.centered.workExperience.jobTitleClass}">{exp.position}</h3>
                  <span className="${themes.centered.workExperience.periodClass}">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="${themes.centered.workExperience.companyClass} mb-4">{exp.company}</p>
                <p className="${themes.centered.workExperience.descriptionClass}">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="${themes.centered.education.containerClass}">
          <h2 className="\${themes.centered.education.titleClass}">Education</h2>
          <div className="${themes.centered.section.contentClass}">
            {education.map((edu) => (
              <div key={edu.id} className="${themes.centered.education.entryClass}">
                <h3 className="${themes.centered.education.institutionClass}">{edu.institution}</h3>
                <p className="${themes.centered.education.degreeClass}">{edu.degree} in {edu.field}</p>
                <span className="${themes.centered.education.periodClass}">Graduated: {edu.graduationDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="${themes.centered.skills.containerClass}">
          <h2 className="\${themes.centered.skills.titleClass}">Skills</h2>
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
  </div>
)`;
    default:
      return '';
  }
};
