
import React, { useState, useEffect } from 'react';
import LayoutPreview from './LayoutPreview';
import { PersonalInfoData } from './PersonalInfo';
import { WorkExperienceEntry } from './WorkExperience';
import { EducationEntry } from './Education';

interface LayoutManagerProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  extraData?: Record<string, any>;
}

const LayoutManager: React.FC<LayoutManagerProps> = ({ 
  personalInfo,
  workExperience,
  education,
  skills,
  extraData = {}
}) => {
  // Initialize with a default layout - this ensures we always have a selected layout
  const [selectedLayout, setSelectedLayout] = useState('Simple');
  const [layoutProps, setLayoutProps] = useState({});
  const [customCode, setCustomCode] = useState<string | null>(null);

  // Add states for edited resume data
  const [editedPersonalInfo, setEditedPersonalInfo] = useState<PersonalInfoData>(personalInfo);
  const [editedWorkExperience, setEditedWorkExperience] = useState<WorkExperienceEntry[]>(workExperience);
  const [editedEducation, setEditedEducation] = useState<EducationEntry[]>(education);
  const [editedSkills, setEditedSkills] = useState<string[]>(skills);
  const [editedExtraData, setEditedExtraData] = useState<Record<string, any>>(extraData);

  // Update local state when props change
  useEffect(() => {
    setEditedPersonalInfo(personalInfo);
    setEditedWorkExperience(workExperience);
    setEditedEducation(education);
    setEditedSkills(skills);
    setEditedExtraData(extraData);
  }, [personalInfo, workExperience, education, skills, extraData]);

  return (
    <div className="layout-manager">
      <LayoutPreview 
        selectedLayout={selectedLayout} 
        layoutProps={layoutProps}
        customCode={customCode}
        personalInfo={editedPersonalInfo}
        workExperience={editedWorkExperience}
        education={editedEducation}
        skills={editedSkills}
        extraData={editedExtraData}
      />
    </div>
  );
};

export default LayoutManager;
