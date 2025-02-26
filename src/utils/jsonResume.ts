import { PersonalInfoData } from "@/components/PersonalInfo";
import { WorkExperienceEntry } from "@/components/WorkExperience";
import { EducationEntry } from "@/components/Education";
import { ThemeName } from "@/themes/ThemeContext";

export interface JsonResume {
  theme: ThemeName;
  basics: {
    name: string;
    email: string;
    phone: string;
    jobTitle?: string;
    location: {
      city: string;
      countryCode: string;
    };
  };
  work: Array<{
    name: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    area: string;
    studyType: string;
    endDate: string;
  }>;
  skills: Array<{
    name: string;
  }>;
}

export const exportToJsonResume = (
  personalInfo: PersonalInfoData,
  workExperience: WorkExperienceEntry[],
  education: EducationEntry[],
  skills: string[],
  theme: ThemeName
): JsonResume => {
  return {
    theme,
    basics: {
      name: personalInfo.fullName,
      email: personalInfo.email,
      phone: personalInfo.phone,
      location: {
        city: personalInfo.location,
        countryCode: "US", // Default value
      },
    },
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
};

export const importFromJsonResume = (
  jsonResume: JsonResume
): {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  theme: ThemeName;
} => {
  return {
    personalInfo: {
      fullName: jsonResume.basics.name,
      email: jsonResume.basics.email,
      phone: jsonResume.basics.phone,
      location: jsonResume.basics.location.city,
      jobTitle: jsonResume.basics.jobTitle,
    },
    workExperience: jsonResume.work.map((work) => ({
      id: Date.now().toString() + Math.random(),
      company: work.name,
      position: work.position,
      startDate: work.startDate,
      endDate: work.endDate,
      description: work.description,
    })),
    education: jsonResume.education.map((edu) => ({
      id: Date.now().toString() + Math.random(),
      institution: edu.institution,
      field: edu.area,
      degree: edu.studyType,
      graduationDate: edu.endDate,
    })),
    skills: jsonResume.skills.map((skill) => skill.name),
    theme: jsonResume.theme || 'modern', // Default to modern if theme isn't specified
  };
};
