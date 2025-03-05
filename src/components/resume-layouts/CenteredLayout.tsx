
import { PersonalInfoData } from "../PersonalInfo";
import { WorkExperienceEntry } from "../WorkExperience";
import { EducationEntry } from "../Education";
import { getCenteredLayoutJSX, ResumeLayoutProps } from "./layoutTemplates";

interface CenteredLayoutProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function CenteredLayout(props: CenteredLayoutProps) {
  return getCenteredLayoutJSX(props);
}
