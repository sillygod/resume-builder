
import { PersonalInfoData } from "../PersonalInfo";
import { WorkExperienceEntry } from "../WorkExperience";
import { EducationEntry } from "../Education";
import { getSidebarLayoutJSX, ResumeLayoutProps } from "./layoutTemplates";

interface SidebarLayoutProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function SidebarLayout(props: SidebarLayoutProps) {
  return getSidebarLayoutJSX(props);
}
