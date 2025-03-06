
import React, { useState } from 'react';
import LayoutEditor from './LayoutEditor';
import LayoutPreview from './LayoutPreview';
import { PersonalInfoData } from './PersonalInfo';
import { WorkExperienceEntry } from './WorkExperience';
import { EducationEntry } from './Education';

interface LayoutManagerProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

const LayoutManager: React.FC<LayoutManagerProps> = ({ 
  personalInfo,
  workExperience,
  education,
  skills 
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

  // Update local state when props change
  React.useEffect(() => {
    setEditedPersonalInfo(personalInfo);
    setEditedWorkExperience(workExperience);
    setEditedEducation(education);
    setEditedSkills(skills);
  }, [personalInfo, workExperience, education, skills]);

  // Apply resume changes from the editor to our local state
  const handleApplyResumeChanges = (
    newPersonalInfo: PersonalInfoData,
    newWorkExperience: WorkExperienceEntry[],
    newEducation: EducationEntry[],
    newSkills: string[]
  ) => {
    setEditedPersonalInfo(newPersonalInfo);
    setEditedWorkExperience(newWorkExperience);
    setEditedEducation(newEducation);
    setEditedSkills(newSkills);
  };

  return (
    <div className="layout-manager grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LayoutEditor
        selectedLayout={selectedLayout}
        setSelectedLayout={setSelectedLayout}
        layoutProps={layoutProps}
        setLayoutProps={setLayoutProps}
        customCode={customCode}
        setCustomCode={setCustomCode}
        personalInfo={editedPersonalInfo}
        workExperience={editedWorkExperience}
        education={editedEducation}
        skills={editedSkills}
        onApplyResumeChanges={handleApplyResumeChanges}
      />
      <LayoutPreview 
        selectedLayout={selectedLayout} 
        layoutProps={layoutProps}
        customCode={customCode}
        personalInfo={editedPersonalInfo}
        workExperience={editedWorkExperience}
        education={editedEducation}
        skills={editedSkills}
      />
    </div>
  );
};

export default LayoutManager;
