import { describe, it, expect } from 'vitest';
import {
  getSystemPrompt,
  getQuickPrompts,
  getTemplatePrompts,
} from './resumeAssistantUtils';
import { PersonalInfoData } from '@/components/PersonalInfo';
import { WorkExperienceEntry } from '@/components/WorkExperience';
import { EducationEntry } from '@/components/Education';

// Actual ResumeAssistantProps structure used by getSystemPrompt
interface ResumeAssistantPropsForSystemPrompt {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[]; // These have jobTitle, company, description etc.
  education: EducationEntry[]; // These have degree, field, institution etc.
  skills: string[];
}

describe('getSystemPrompt', () => {
  const baseProps: ResumeAssistantPropsForSystemPrompt = {
    personalInfo: {
      fullName: 'John Doe',
      jobTitle: 'Software Engineer',
      email: 'john.doe@example.com', // Not used in current system prompt impl
      phone: '123-456-7890',   // Not used
      location: 'New York, NY', // Not used
      website: 'johndoe.dev', // Not used
      linkedin: 'linkedin.com/johndoe', // Not used
      github: 'github.com/johndoe',   // Not used
    },
    workExperience: [
      {
        id: 'work1',
        company: 'Tech Corp',
        jobTitle: 'Senior Developer', // In ResumeAssistantProps, this is likely the source for 'position'
        position: 'Senior Developer', // Actual implementation uses w.position
        startDate: '2020-01-01',
        endDate: 'Present',
        description: 'Developed cool stuff.', // Not directly used in summary string by current impl.
        location: 'San Francisco, CA',
      },
    ],
    education: [
      {
        id: 'edu1',
        institution: 'State University',
        degree: 'B.Sc. Computer Science',
        field: 'Computer Science',
        startDate: '2016-09-01',
        graduationDate: '2020-05-31', // Not directly used in summary string by current impl.
        description: 'Studied hard.', // Not directly used
        location: 'State College, PA',
      },
    ],
    skills: ['JavaScript', 'React', 'Node.js'],
  };

  it('should generate a system prompt incorporating key resume data', () => {
    const prompt = getSystemPrompt(baseProps);
    expect(prompt).toContain('Current resume information:');
    expect(prompt).toContain('Name: John Doe');
    expect(prompt).toContain('Job Title: Software Engineer');
    // Work Experience: position at company
    expect(prompt).toContain('Work Experience: Senior Developer at Tech Corp');
    // Education: degree in field from institution
    expect(prompt).toContain('Education: B.Sc. Computer Science in Computer Science from State University');
    expect(prompt).toContain('Skills: JavaScript, React, Node.js');
  });

  it('should handle missing optional personal info fields with "Not provided"', () => {
    const propsWithMissingInfo: ResumeAssistantPropsForSystemPrompt = {
      ...baseProps,
      personalInfo: {
        fullName: 'Jane Doe', 
        // jobTitle is missing
      },
    };
    const prompt = getSystemPrompt(propsWithMissingInfo);
    expect(prompt).toContain('Name: Jane Doe');
    expect(prompt).toContain('Job Title: Not provided');
  });

  it('should handle empty work experience array with "None provided"', () => {
    const propsWithNoWork: ResumeAssistantPropsForSystemPrompt = {
      ...baseProps,
      workExperience: [],
    };
    const prompt = getSystemPrompt(propsWithNoWork);
    expect(prompt).toContain('Work Experience: None provided');
  });

  it('should handle empty education array with "None provided"', () => {
    const propsWithNoEducation: ResumeAssistantPropsForSystemPrompt = {
      ...baseProps,
      education: [],
    };
    const prompt = getSystemPrompt(propsWithNoEducation);
    expect(prompt).toContain('Education: None provided');
  });

  it('should handle empty skills array with "None provided"', () => {
    const propsWithNoSkills: ResumeAssistantPropsForSystemPrompt = {
      ...baseProps,
      skills: [],
    };
    const prompt = getSystemPrompt(propsWithNoSkills);
    expect(prompt).toContain('Skills: None provided');
  });
  
  it('should handle missing fields within work experience entries (e.g. position undefined)', () => {
    const propsWithPartialWork: ResumeAssistantPropsForSystemPrompt = {
      ...baseProps,
      workExperience: [
        // Actual implementation uses w.position. If jobTitle from ResumeAssistantProps is the source,
        // then it should be mapped to 'position' before getSystemPrompt if that's the design.
        // Assuming getSystemPrompt receives entries that might have undefined position.
        { company: 'Incomplete Corp', jobTitle: undefined } as unknown as WorkExperienceEntry,
      ],
    };
    const prompt = getSystemPrompt(propsWithPartialWork);
    // Expects "undefined at Incomplete Corp" based on current impl: `${w.position} at ${w.company}`
    expect(prompt).toContain('Work Experience: undefined at Incomplete Corp');
  });

  it('should handle missing fields within education entries (e.g. degree undefined)', () => {
    const propsWithPartialEducation: ResumeAssistantPropsForSystemPrompt = {
      ...baseProps,
      education: [
        { institution: 'Incomplete Uni', degree: undefined, field: undefined } as unknown as EducationEntry,
      ],
    };
    const prompt = getSystemPrompt(propsWithPartialEducation);
    // Expects "undefined in undefined from Incomplete Uni" based on: `${e.degree} in ${e.field} from ${e.institution}`
    expect(prompt).toContain('Education: undefined in undefined from Incomplete Uni');
  });
});

// For getQuickPrompts, the function expects { jobTitle: string }
interface QuickPromptInfo {
  jobTitle?: string; // Make it optional for testing missing case
}

describe('getQuickPrompts', () => {
  it('should return an array of prompt objects with title and prompt strings', () => {
    const personalInfo: QuickPromptInfo = { jobTitle: 'Software Developer' };
    const prompts = getQuickPrompts(personalInfo as { jobTitle: string }); // Cast for strictness
    expect(Array.isArray(prompts)).toBe(true);
    prompts.forEach(p => {
      expect(p).toHaveProperty('title');
      expect(p).toHaveProperty('prompt');
      expect(typeof p.title).toBe('string');
      expect(typeof p.prompt).toBe('string');
    });
  });

  it('should insert jobTitle into relevant prompts', () => {
    const jobTitle = 'Product Manager';
    const personalInfo: QuickPromptInfo = { jobTitle };
    const prompts = getQuickPrompts(personalInfo as { jobTitle: string });
    
    // Using exact titles from implementation
    const careerAdvicePrompt = prompts.find(p => p.title === 'Career Advice');
    expect(careerAdvicePrompt?.prompt).toContain(`Based on my experience as a ${jobTitle}`);
  });

  it('should handle missing or empty jobTitle gracefully with "professional" fallback', () => {
    const personalInfoMissingJobTitle: QuickPromptInfo = {};
    let prompts = getQuickPrompts(personalInfoMissingJobTitle as { jobTitle: string });
    let careerAdvicePrompt = prompts.find(p => p.title === 'Career Advice');
    expect(careerAdvicePrompt?.prompt).toContain('Based on my experience as a professional');

    const personalInfoEmptyJobTitle: QuickPromptInfo = { jobTitle: '' };
    prompts = getQuickPrompts(personalInfoEmptyJobTitle as { jobTitle: string });
    careerAdvicePrompt = prompts.find(p => p.title === 'Career Advice');
    expect(careerAdvicePrompt?.prompt).toContain('Based on my experience as a professional');
  });
});

// For getTemplatePrompts, the function expects { position: string }[]
interface TemplateWorkExperience {
  position?: string; // Make it optional for testing
  // Add other fields if they become relevant to template prompts
}

describe('getTemplatePrompts', () => {
  const sampleWorkExperienceForTemplates: TemplateWorkExperience[] = [
    { position: 'Lead Engineer' },
    { position: 'Support Engineer' }
  ];

  it('should return an array of prompt objects with title and prompt strings', () => {
    const prompts = getTemplatePrompts(sampleWorkExperienceForTemplates as { position: string }[]);
    expect(Array.isArray(prompts)).toBe(true);
    expect(prompts.length).toBeGreaterThan(0);
    prompts.forEach(p => {
      expect(p).toHaveProperty('title');
      expect(p).toHaveProperty('prompt');
      expect(typeof p.title).toBe('string');
      expect(typeof p.prompt).toBe('string');
    });
  });

  it('should insert position from the first work experience into relevant prompts', () => {
    const prompts = getTemplatePrompts(sampleWorkExperienceForTemplates as { position: string }[]);
    const expectedPosition = sampleWorkExperienceForTemplates[0].position;

    // Using exact titles from implementation
    const careerChangePrompt = prompts.find(p => p.title === 'Career Change Statement');
    expect(careerChangePrompt?.prompt).toContain(`I'm transitioning from ${expectedPosition} to a new field.`);
  });

  it('should handle empty workExperience array gracefully with "my current role" fallback', () => {
    const prompts = getTemplatePrompts([]);
    const careerChangePrompt = prompts.find(p => p.title === 'Career Change Statement');
    expect(careerChangePrompt?.prompt).toContain("I'm transitioning from my current role to a new field.");
  });

  it('should handle work experience where the first entry has no position with "my current role" fallback', () => {
    const workExperienceNoPosition: TemplateWorkExperience[] = [
      { position: undefined }, // First entry, position is undefined
      sampleWorkExperienceForTemplates[1]
    ];
    const prompts = getTemplatePrompts(workExperienceNoPosition as { position: string }[]);
    const careerChangePrompt = prompts.find(p => p.title === 'Career Change Statement');
    expect(careerChangePrompt?.prompt).toContain("I'm transitioning from my current role to a new field.");

    const workExperienceEmptyPosition: TemplateWorkExperience[] = [
      { position: '' }, // First entry, position is empty string
      sampleWorkExperienceForTemplates[1]
    ];
    const prompts2 = getTemplatePrompts(workExperienceEmptyPosition as { position: string }[]);
    const careerChangePrompt2 = prompts2.find(p => p.title === 'Career Change Statement');
    expect(careerChangePrompt2?.prompt).toContain("I'm transitioning from my current role to a new field.");
  });
});
