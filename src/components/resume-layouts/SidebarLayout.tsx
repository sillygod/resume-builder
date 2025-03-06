import React from 'react';
import { PersonalInfoData } from '../PersonalInfo';
import { WorkExperienceEntry } from '../WorkExperience';
import { EducationEntry } from '../Education';
import { Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';

interface SidebarLayoutProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  extraData?: Record<string, any>;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  personalInfo,
  workExperience,
  education,
  skills,
  extraData = {},
}) => {
  return getSidebarLayoutJSX({
    personalInfo,
    workExperience,
    education,
    skills,
    extraData,
  });
};
