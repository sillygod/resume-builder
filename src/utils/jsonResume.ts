
import { PersonalInfoData } from "@/components/PersonalInfo";
import { WorkExperienceEntry } from "@/components/WorkExperience";
import { EducationEntry } from "@/components/Education";
import { ThemeName } from "@/themes/ThemeContext";

// Define ResumeDataState interface
export interface ResumeDataState {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  extraData: Record<string, any>;
}

export interface JsonResume {
  theme: ThemeName;
  basics: {
    [key: string]: any;
    name: string;
    email: string;
    phone: string;
    jobTitle?: string;
    location: {
      city?: string;
      countryCode: string;
    };
  };
  work: Array<{
    [key: string]: any;
    name?: string;
    position?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;
  education: Array<{
    [key: string]: any;
    institution?: string;
    area?: string;
    studyType?: string;
    endDate?: string;
  }>;
  skills: Array<{
    [key: string]: any;
    name: string;
  }>;
  [key: string]: any; // Allow for additional top-level properties
}

export const exportToJsonResume = (
  resumeData: ResumeDataState,
  theme: ThemeName
): JsonResume => {
  // Create basics object with all personal info fields
  const basics: JsonResume['basics'] = {
    name: resumeData.personalInfo.fullName,
    email: resumeData.personalInfo.email,
    phone: resumeData.personalInfo.phone,
    location: {
      city: resumeData.personalInfo.location,
      countryCode: "US", // Default countryCode, can be made dynamic if needed
    },
    jobTitle: resumeData.personalInfo.jobTitle, // Ensure jobTitle is included
  };

  // Add any additional fields from personalInfo (excluding already mapped ones and objects)
  Object.entries(resumeData.personalInfo).forEach(([key, value]) => {
    if (!['fullName', 'email', 'phone', 'location', 'jobTitle'].includes(key) && typeof value === 'string') {
      basics[key] = value;
    }
  });

  const result: JsonResume = {
    theme,
    basics,
    work: resumeData.workExperience.map((exp) => ({
      name: exp.company,
      position: exp.jobTitle, 
      startDate: exp.startDate,
      endDate: exp.endDate,
      summary: exp.description, 
    })),
    education: resumeData.education.map((edu) => ({
      institution: edu.institution,
      area: edu.field, 
      studyType: edu.degree, 
      // startDate: edu.startDate, // Removed as per review, EducationEntry likely doesn't have startDate
      endDate: edu.graduationDate, 
      // summary: edu.description, // Removed as per review, EducationEntry likely doesn't have description/summary
    })),
    skills: resumeData.skills.map((skill) => ({
      name: skill,
    })),
  };

  // Add any extra data fields at the top level
  if (resumeData.extraData) {
    Object.entries(resumeData.extraData).forEach(([key, value]) => {
      result[key] = value;
    });
  }

  return result;
};

export const importFromJsonResume = (
  jsonResume: JsonResume
): {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  theme: ThemeName;
  extraData: Record<string, any>;
} => {
  // Create personalInfo object with required fields
  const personalInfo: PersonalInfoData = {
    fullName: jsonResume.basics.name,
    email: jsonResume.basics.email,
    phone: jsonResume.basics.phone,
    location: jsonResume.basics.location?.city || '', // Added safe navigation
    jobTitle: jsonResume.basics.jobTitle || jsonResume.basics.label || "", // Prefer jobTitle, fallback to label
  };

  // Add any additional fields from the JSON
  Object.entries(jsonResume.basics).forEach(([key, value]) => {
    if (!['name', 'email', 'phone', 'location'].includes(key) && typeof value !== 'object') {
      personalInfo[key] = value;
    }
  });

  // Extract work experience
  const workExperience = (jsonResume.work || []).map((work) => ({
    id: Date.now().toString() + Math.random(),
    company: work.name || '',
    jobTitle: work.position || '', // Map 'position' from JSON Resume to 'jobTitle' in WorkExperienceEntry
    startDate: work.startDate || '',
    endDate: work.endDate || '',
    description: work.summary || '', // Map 'summary' from JSON Resume to 'description'
  }));

  // Extract education
  const education = (jsonResume.education || []).map((edu) => ({
    id: Date.now().toString() + Math.random(),
    institution: edu.institution || '',
    field: edu.area || '', 
    degree: edu.studyType || '', 
    // startDate: edu.startDate || '', // Removed, EducationEntry likely doesn't have startDate
    graduationDate: edu.endDate || '', 
    // description: edu.summary || '', // Removed, EducationEntry likely doesn't have description
  }));

  // Extract skills
  const skills = (jsonResume.skills || []).map((skill) => skill.name);

  // Extract extra data (any top-level properties that are not standard)
  const extraData: Record<string, any> = {};
  Object.entries(jsonResume).forEach(([key, value]) => {
    if (!['theme', 'basics', 'work', 'education', 'skills', 'meta'].includes(key)) { // Exclude 'meta' as well
      extraData[key] = value;
    }
  });

  return {
    personalInfo,
    workExperience,
    education,
    skills,
    theme: jsonResume.meta?.theme || jsonResume.theme || 'modern', // Prefer meta.theme
    extraData,
  };
};
