import { describe, it, expect } from 'vitest';
import { exportToJsonResume, importFromJsonResume } from './jsonResume';
import { ResumeDataState, JsonResume as ActualJsonResume } from './jsonResume';
import { ThemeName } from '@/themes/ThemeContext';

// Sample Data for testing export
const sampleResumeDataToExport: ResumeDataState = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    location: 'New York, NY', // maps to basics.location.city
    jobTitle: 'Software Engineer', // maps to basics.jobTitle
    website: 'johndoe.dev', // maps to basics.website
    linkedin: 'linkedin.com/in/johndoe', // maps to basics.linkedin
    github: 'github.com/johndoe', // maps to basics.github
  },
  workExperience: [
    {
      id: 'work1',
      company: 'Tech Solutions Inc.',
      jobTitle: 'Senior Developer', // maps to work.position
      startDate: '2020-01-15',
      endDate: 'Present',
      location: 'San Francisco, CA', // Not explicitly mapped in current export to work item
      description: 'Led development of key features.', // maps to work.summary
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'University of Technology',
      degree: 'M.Sc.', // maps to education.studyType
      field: 'Computer Science', // maps to education.area
      startDate: '2016-09-01', // maps to education.startDate
      graduationDate: '2018-05-31', // maps to education.endDate
      location: 'Cambridge, MA', // Not explicitly mapped in current export to education item
      description: 'Thesis on ML.', // maps to education.summary
    },
  ],
  skills: ['JavaScript', 'React', 'Node.js'],
  extraData: {
    projects: [{ name: 'Portfolio', description: 'Personal site' }],
    languages: [{ language: 'English', fluency: 'Native' }],
  },
};

const sampleThemeForExport: ThemeName = 'Modern';

// Sample Data for testing import
const sampleJsonResumeToImport: ActualJsonResume = {
  basics: {
    name: 'Jane Roe',
    label: 'Product Manager (from Label)', // Fallback for jobTitle
    jobTitle: 'Product Manager (from JobTitle)', // Preferred for jobTitle
    email: 'jane.roe@example.com',
    phone: '098-765-4321',
    website: 'janeroe.co', // maps to personalInfo.website
    location: { city: 'Beverly Hills', countryCode: 'US' }, // location.city maps to personalInfo.location
    // profiles are not directly mapped by current import to dedicated personalInfo fields
    profiles: [{ network: 'LinkedIn', username: 'janeroe' }],
    // other string fields in basics are copied
    summary: "A brief summary of Jane." // e.g. this would be copied to personalInfo.summary
  },
  work: [
    {
      name: 'Innovate Corp', // maps to company
      position: 'Lead Product Manager', // maps to jobTitle
      startDate: '2019-03-01',
      endDate: 'Present',
      summary: 'Defined product strategy.', // maps to description
      location: 'Los Angeles, CA', // Not mapped to workExperience item
    },
  ],
  education: [
    {
      institution: 'State University',
      area: 'Business Administration', // maps to field
      studyType: 'Bachelor', // maps to degree
      startDate: '2013-09-01',
      endDate: '2017-05-31', // maps to graduationDate
      summary: 'Graduated with honors.', // maps to description
      location: 'State College, PA', // Not mapped to education item
    },
  ],
  skills: [{ name: 'Product Management' }, { name: 'Agile' }],
  meta: {
    theme: 'Classic', // Preferred theme source
  },
  // theme: 'Obsolete', // Fallback theme source
  // Top-level extra data
  projects: [{ name: 'App Redesign', details: 'Led UX improvements' }],
  awards: [{ name: 'Top Performer', date: '2021' }],
  // 'custom' is just another top-level field if present
  custom: {
    hobbies: ['Hiking', 'Photography']
  }
};


describe('exportToJsonResume', () => {
  const exportedJson = exportToJsonResume(sampleResumeDataToExport, sampleThemeForExport);

  it('should correctly map PersonalInfo to JsonResume basics', () => {
    const basics = exportedJson.basics;
    const personalInfo = sampleResumeDataToExport.personalInfo;
    expect(basics.name).toBe(personalInfo.fullName);
    expect(basics.jobTitle).toBe(personalInfo.jobTitle);
    expect(basics.email).toBe(personalInfo.email);
    expect(basics.phone).toBe(personalInfo.phone);
    expect(basics.website).toBe(personalInfo.website);
    expect(basics.location?.city).toBe(personalInfo.location);
    expect(basics.location?.countryCode).toBe("US"); // Default
    // Check other string fields from personalInfo are copied
    expect(basics.linkedin).toBe(personalInfo.linkedin);
    expect(basics.github).toBe(personalInfo.github);
  });

  it('should map WorkExperience to JsonResume work array', () => {
    expect(exportedJson.work?.length).toBe(sampleResumeDataToExport.workExperience.length);
    const workJson = exportedJson.work?.[0];
    const workData = sampleResumeDataToExport.workExperience[0];
    expect(workJson?.name).toBe(workData.company);
    expect(workJson?.position).toBe(workData.jobTitle); // jobTitle -> position
    expect(workJson?.startDate).toBe(workData.startDate);
    expect(workJson?.endDate).toBe(workData.endDate);
    expect(workJson?.summary).toBe(workData.description); // description -> summary
  });

  it('should map Education to JsonResume education array', () => {
    expect(exportedJson.education?.length).toBe(sampleResumeDataToExport.education.length);
    const eduJson = exportedJson.education?.[0];
    const eduData = sampleResumeDataToExport.education[0];
    expect(eduJson?.institution).toBe(eduData.institution);
    expect(eduJson?.area).toBe(eduData.field); // field -> area
    expect(eduJson?.studyType).toBe(eduData.degree); // degree -> studyType
    expect(eduJson?.startDate).toBe(eduData.startDate);
    expect(eduJson?.endDate).toBe(eduData.graduationDate); // graduationDate -> endDate
    expect(eduJson?.summary).toBe(eduData.description); // description -> summary
  });
  
  it('should map Skills to JsonResume skills array', () => {
    expect(exportedJson.skills?.length).toBe(sampleResumeDataToExport.skills.length);
    expect(exportedJson.skills?.[0]?.name).toBe(sampleResumeDataToExport.skills[0]);
  });
  
  it('should set the theme (at root level)', () => {
    // Implementation puts theme at root, not in meta for export
    expect(exportedJson.theme).toBe(sampleThemeForExport);
  });

  it('should map extraData to top-level fields in JsonResume', () => {
    expect((exportedJson as any).projects).toEqual(sampleResumeDataToExport.extraData.projects);
    expect((exportedJson as any).languages).toEqual(sampleResumeDataToExport.extraData.languages);
  });

  it('should handle empty/missing data during export', () => {
    const emptyData: ResumeDataState = {
      personalInfo: { fullName: "Only Name", email: "a@b.c" },
      workExperience: [], education: [], skills: [], extraData: {}
    };
    const result = exportToJsonResume(emptyData, 'Minimal');
    expect(result.basics.name).toBe("Only Name");
    expect(result.basics.jobTitle).toBeUndefined();
    expect(result.work?.length).toBe(0);
    expect(result.education?.length).toBe(0);
    expect(result.skills?.length).toBe(0);
    expect((result as any).projects).toBeUndefined();
  });
});

describe('importFromJsonResume', () => {
  const importedData = importFromJsonResume(sampleJsonResumeToImport);

  it('should correctly map JsonResume basics to PersonalInfo', () => {
    const personalInfo = importedData.personalInfo;
    const basicsJson = sampleJsonResumeToImport.basics;
    expect(personalInfo.fullName).toBe(basicsJson.name);
    // Prefers jobTitle, then label
    expect(personalInfo.jobTitle).toBe(basicsJson.jobTitle); 
    expect(personalInfo.email).toBe(basicsJson.email);
    expect(personalInfo.phone).toBe(basicsJson.phone);
    expect(personalInfo.website).toBe(basicsJson.website);
    expect(personalInfo.location).toBe(basicsJson.location?.city);
    // Check if other string fields are copied
    expect(personalInfo.summary).toBe(basicsJson.summary);
  });

  it('should map JsonResume work array to WorkExperience', () => {
    expect(importedData.workExperience.length).toBe(sampleJsonResumeToImport.work?.length);
    const workImported = importedData.workExperience[0];
    const workJson = sampleJsonResumeToImport.work?.[0];
    expect(workImported.company).toBe(workJson?.name);
    expect(workImported.jobTitle).toBe(workJson?.position); // position -> jobTitle
    expect(workImported.startDate).toBe(workJson?.startDate);
    expect(workImported.endDate).toBe(workJson?.endDate);
    expect(workImported.description).toBe(workJson?.summary); // summary -> description
  });

  it('should map JsonResume education array to Education', () => {
    expect(importedData.education.length).toBe(sampleJsonResumeToImport.education?.length);
    const eduImported = importedData.education[0];
    const eduJson = sampleJsonResumeToImport.education?.[0];
    expect(eduImported.institution).toBe(eduJson?.institution);
    expect(eduImported.field).toBe(eduJson?.area); // area -> field
    expect(eduImported.degree).toBe(eduJson?.studyType); // studyType -> degree
    expect(eduImported.startDate).toBe(eduJson?.startDate);
    expect(eduImported.graduationDate).toBe(eduJson?.endDate); // endDate -> graduationDate
    expect(eduImported.description).toBe(eduJson?.summary); // summary -> description
  });

  it('should map JsonResume skills array to skills (string array)', () => {
    expect(importedData.skills.length).toBe(sampleJsonResumeToImport.skills?.length);
    expect(importedData.skills[0]).toBe(sampleJsonResumeToImport.skills?.[0]?.name);
  });

  it('should import theme correctly (preferring meta.theme)', () => {
    expect(importedData.theme).toBe(sampleJsonResumeToImport.meta?.theme);
  });
  
  it('should import top-level fields from JsonResume as extraData, excluding standard ones and meta', () => {
    expect(importedData.extraData?.projects).toEqual(sampleJsonResumeToImport.projects);
    expect(importedData.extraData?.awards).toEqual(sampleJsonResumeToImport.awards);
    expect(importedData.extraData?.custom).toEqual(sampleJsonResumeToImport.custom); // 'custom' is just another field
    expect(importedData.extraData?.meta).toBeUndefined(); // meta should be excluded
    expect(importedData.extraData?.basics).toBeUndefined(); // standard fields should be excluded
  });

  it('should handle missing optional fields and empty arrays gracefully during import', () => {
    const minimalJson: Partial<ActualJsonResume> = { // Use Partial for easier minimal construction
      basics: { name: "Minimal Person" } // email, phone, location, jobTitle etc. are missing
      // work, education, skills, meta are missing
    };
    const importedMinimal = importFromJsonResume(minimalJson as ActualJsonResume);

    expect(importedMinimal.personalInfo.fullName).toBe("Minimal Person");
    expect(importedMinimal.personalInfo.email).toBeUndefined();
    expect(importedMinimal.personalInfo.jobTitle).toBe(""); // Fallback to ""
    expect(importedMinimal.personalInfo.phone).toBeUndefined();
    expect(importedMinimal.personalInfo.location).toBe(''); // basics.location is undefined, so location?.city is undefined, then || ''
    
    expect(importedMinimal.workExperience.length).toBe(0);
    expect(importedMinimal.education.length).toBe(0);
    expect(importedMinimal.skills.length).toBe(0);
    expect(importedMinimal.theme).toBe('modern'); // Default theme
    expect(importedMinimal.extraData).toEqual({});
  });
});
