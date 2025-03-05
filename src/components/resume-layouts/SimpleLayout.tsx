
import { PersonalInfoData } from "../PersonalInfo";
import { WorkExperienceEntry } from "../WorkExperience";
import { EducationEntry } from "../Education";
import { getSimpleLayoutJSX, ResumeLayoutProps } from "./layoutTemplates";

interface SimpleLayoutProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function SimpleLayout(props: SimpleLayoutProps) {
  return getSimpleLayoutJSX(props);
}
