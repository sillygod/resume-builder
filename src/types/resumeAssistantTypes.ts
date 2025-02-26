
export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export interface ResumeAssistantProps {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    [key: string]: string;
  };
  workExperience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
  }[];
  skills: string[];
}
