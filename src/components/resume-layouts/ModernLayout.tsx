import React from 'react';
import { PersonalInfoData } from '../PersonalInfo';
import { WorkExperienceEntry } from '../WorkExperience';
import { EducationEntry } from '../Education';
import { Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';

interface ModernLayoutProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  extraData?: Record<string, any>; // Add extraData prop
}

export const ModernLayout: React.FC<ModernLayoutProps> = ({
  personalInfo,
  workExperience,
  education,
  skills,
  extraData = {}, // Add default value
}) => {
  return getModernLayoutJSX({
    personalInfo,
    workExperience,
    education,
    skills,
    extraData,
  });
};
