
import { PersonalInfoData } from "../PersonalInfo";
import { WorkExperienceEntry } from "../WorkExperience";
import { EducationEntry } from "../Education";
import { getModernLayoutJSX, ResumeLayoutProps } from "./layoutTemplates";

interface ModernLayoutProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function ModernLayout(props: ModernLayoutProps) {
  return getModernLayoutJSX(props);
}
