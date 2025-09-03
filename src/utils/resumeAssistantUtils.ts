
import { ResumeAssistantProps } from "@/types/resumeAssistantTypes";

export const getSystemPrompt = (resumeData: ResumeAssistantProps): string => {
  const { personalInfo, workExperience, education, skills } = resumeData;
  
  return `You are a helpful career and resume assistant. Help users improve their resumes, provide career advice, and assist with grammar and phrasing. Keep responses concise and actionable.

CURRENT RESUME CONTENT:
===
PERSONAL INFO:
- Name: ${personalInfo.fullName || "Not provided"}
- Job Title: ${personalInfo.jobTitle || "Not provided"}
- Email: ${personalInfo.email || "Not provided"}
- Phone: ${personalInfo.phone || "Not provided"}
- Location: ${personalInfo.location || "Not provided"}
- Website: ${personalInfo.website || "Not provided"}
- Summary: ${personalInfo.summary || "Not provided"}

SKILLS:
${skills.length > 0 ? skills.map(skill => `- ${skill}`).join('\n') : "None provided"}

EDUCATION:
${education.length > 0 ? education.map(e => `- ${e.degree} in ${e.field} from ${e.institution} (${e.graduationDate || 'Date not provided'})`).join('\n') : "None provided"}

WORK EXPERIENCE:
${workExperience.length > 0 ? workExperience.map(w => `- ${w.position} at ${w.company} (${w.startDate} - ${w.endDate})\n  Description: ${w.description || 'No description provided'}`).join('\n') : "None provided"}
===

Instructions:
1. Provide specific, actionable advice based on the actual resume content above
2. Keep responses under 500 words for better readability
3. Use bullet points and clear formatting when appropriate
4. Reference specific sections/details from their resume when giving feedback
5. Be encouraging but honest about areas for improvement`;
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
