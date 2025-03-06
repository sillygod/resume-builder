
import { PersonalInfoData } from "@/components/PersonalInfo";
import { WorkExperienceEntry } from "@/components/WorkExperience";
import { EducationEntry } from "@/components/Education";
import { ThemeName } from "@/themes/ThemeContext";

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
  personalInfo: PersonalInfoData,
  workExperience: WorkExperienceEntry[],
  education: EducationEntry[],
  skills: string[],
  theme: ThemeName,
  extraData?: Record<string, any>
): JsonResume => {
  // Create basics object with all personal info fields
  const basics: any = {
    name: personalInfo.fullName,
    email: personalInfo.email,
    phone: personalInfo.phone,
    location: {
      city: personalInfo.location,
      countryCode: "US",
    },
  };

  // Add any additional fields from personalInfo
  Object.entries(personalInfo).forEach(([key, value]) => {
    if (!['fullName', 'email', 'phone', 'location'].includes(key)) {
      basics[key] = value;
    }
  });

  const result: JsonResume = {
    theme,
    basics,
    work: workExperience.map((exp) => ({
      name: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
    })),
    education: education.map((edu) => ({
      institution: edu.institution,
      area: edu.field,
      studyType: edu.degree,
      endDate: edu.graduationDate,
    })),
    skills: skills.map((skill) => ({
      name: skill,
    })),
  };

  // Add any extra data fields at the top level
  if (extraData) {
    Object.entries(extraData).forEach(([key, value]) => {
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
    location: jsonResume.basics.location.city || '',
    jobTitle: jsonResume.basics.jobTitle || "",
  };

  // Add any additional fields from the JSON
  Object.entries(jsonResume.basics).forEach(([key, value]) => {
    if (!['name', 'email', 'phone', 'location'].includes(key) && typeof value !== 'object') {
      personalInfo[key] = value;
    }
  });

  // Extract work experience
  const workExperience = jsonResume.work.map((work) => ({
    id: Date.now().toString() + Math.random(),
    company: work.name || '',
    position: work.position || '',
    startDate: work.startDate || '',
    endDate: work.endDate || '',
    description: work.description || '',
  }));

  // Extract education
  const education = jsonResume.education.map((edu) => ({
    id: Date.now().toString() + Math.random(),
    institution: edu.institution || '',
    field: edu.area || '',
    degree: edu.studyType || '',
    graduationDate: edu.endDate || '',
  }));

  // Extract skills
  const skills = jsonResume.skills.map((skill) => skill.name);

  // Extract extra data (any top-level properties that are not standard)
  const extraData: Record<string, any> = {};
  Object.entries(jsonResume).forEach(([key, value]) => {
    if (!['theme', 'basics', 'work', 'education', 'skills'].includes(key)) {
      extraData[key] = value;
    }
  });

  return {
    personalInfo,
    workExperience,
    education,
    skills,
    theme: jsonResume.theme || 'modern',
    extraData,
  };
};
