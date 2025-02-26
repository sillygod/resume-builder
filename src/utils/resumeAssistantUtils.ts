
import { ResumeAssistantProps } from "@/types/resumeAssistantTypes";

export const getSystemPrompt = (resumeData: ResumeAssistantProps): string => {
  const { personalInfo, workExperience, education, skills } = resumeData;
  
  return `You are a helpful career and resume assistant. Help users improve their resumes, provide career advice, and assist with grammar and phrasing.
      
Current resume information:
Name: ${personalInfo.fullName || "Not provided"}
Job Title: ${personalInfo.jobTitle || "Not provided"}
Skills: ${skills.join(", ") || "None provided"}
Education: ${education.map(e => `${e.degree} in ${e.field} from ${e.institution}`).join("; ") || "None provided"}
Work Experience: ${workExperience.map(w => `${w.position} at ${w.company}`).join("; ") || "None provided"}
      
Provide helpful, specific advice related to the user's query. If they ask for improvements or grammar checks, reference specific parts of their resume.`;
};

export const getQuickPrompts = (personalInfo: { jobTitle: string }): { title: string; prompt: string }[] => [
  {
    title: "Resume Review",
    prompt: "Could you review my resume and suggest improvements?",
  },
  {
    title: "Grammar Check",
    prompt: "Can you check my resume for grammatical errors?",
  },
  {
    title: "Enhance Job Descriptions",
    prompt: "Help me enhance the description for my most recent job position.",
  },
  {
    title: "Career Advice",
    prompt: `Based on my experience as a ${personalInfo.jobTitle || "professional"}, what career paths should I consider?`,
  },
  {
    title: "Missing Skills",
    prompt: "What important skills might be missing from my resume?",
  },
  {
    title: "ATS Optimization",
    prompt: "How can I optimize my resume for ATS (Applicant Tracking Systems)?",
  },
];

export const getTemplatePrompts = (workExperience: { position: string }[]): { title: string; prompt: string }[] => [
  {
    title: "Highlight Achievements",
    prompt: "I need help turning my job duties into achievement statements with metrics.",
  },
  {
    title: "Professional Summary",
    prompt: "Write a compelling professional summary for my resume that highlights my key strengths.",
  },
  {
    title: "Career Change Statement",
    prompt: `I'm transitioning from ${workExperience[0]?.position || "my current role"} to a new field. Help me craft a statement explaining this career change.`,
  },
  {
    title: "Skills Section Enhancement",
    prompt: "Reorganize and enhance my skills section to be more impactful.",
  },
  {
    title: "Education Highlighting",
    prompt: "Help me better highlight my educational background in a way that's relevant to my target jobs.",
  },
  {
    title: "Cover Letter Points",
    prompt: "Based on my resume, suggest key points I should include in my cover letter.",
  },
];
