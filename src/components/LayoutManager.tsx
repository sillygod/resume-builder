
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
  const [selectedLayout, setSelectedLayout] = useState('Simple');
  const [layoutProps, setLayoutProps] = useState({});
  const [customCode, setCustomCode] = useState<string | null>(null);

  return (
    <div className="layout-manager grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LayoutEditor
        selectedLayout={selectedLayout}
        setSelectedLayout={setSelectedLayout}
        layoutProps={layoutProps}
        setLayoutProps={setLayoutProps}
        customCode={customCode}
        setCustomCode={setCustomCode}
        personalInfo={personalInfo}
        workExperience={workExperience}
        education={education}
        skills={skills}
      />
      <LayoutPreview 
        selectedLayout={selectedLayout} 
        layoutProps={layoutProps}
        customCode={customCode}
        personalInfo={personalInfo}
        workExperience={workExperience}
        education={education}
        skills={skills}
      />
    </div>
  );
};

export default LayoutManager;
