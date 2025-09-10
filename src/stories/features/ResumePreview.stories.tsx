import type { Meta, StoryObj } from '@storybook/react';
import { ResumePreview } from '@/components/ResumePreview';
import { PersonalInfoData } from '@/components/PersonalInfo';
import { WorkExperienceEntry } from '@/components/WorkExperience';
import { EducationEntry } from '@/components/Education';
import { ThemeName } from '@/themes/ThemeContext';

// Create comprehensive mock data
const mockPersonalInfo: PersonalInfoData = {
  fullName: 'Sarah Johnson',
  jobTitle: 'Senior Software Engineer',
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA'
};

const mockWorkExperience: WorkExperienceEntry[] = [
  {
    id: '1',
    company: 'TechCorp Inc.',
    position: 'Senior Software Engineer',
    startDate: '2022-03-01',
    endDate: '',
    description: 'Led development of microservices architecture, improving system performance by 40%. Mentored junior developers and collaborated with cross-functional teams to deliver high-quality software solutions.'
  },
  {
    id: '2',
    company: 'StartupCo',
    position: 'Full Stack Developer',
    startDate: '2020-06-01',
    endDate: '2022-02-28',
    description: 'Built responsive web applications using React and Node.js. Implemented CI/CD pipelines and automated testing processes.'
  },
  {
    id: '3',
    company: 'Digital Agency',
    position: 'Junior Developer',
    startDate: '2019-01-15',
    endDate: '2020-05-31',
    description: 'Developed and maintained client websites using modern web technologies. Participated in code reviews and learned best practices.'
  }
];

const mockEducation: EducationEntry[] = [
  {
    id: '1',
    institution: 'Stanford University',
    degree: "Master's Degree",
    field: 'Computer Science',
    graduationDate: '2019-06-01'
  },
  {
    id: '2',
    institution: 'UC Berkeley',
    degree: "Bachelor's Degree",
    field: 'Electrical Engineering and Computer Science',
    graduationDate: '2017-05-15'
  }
];

const mockSkills: string[] = [
  'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 
  'GraphQL', 'PostgreSQL', 'MongoDB', 'Git', 'Agile', 'Microservices'
];

const minimalData = {
  personalInfo: {
    fullName: 'John Smith',
    jobTitle: 'Software Developer',
    email: 'john.smith@email.com',
    phone: '+1 (555) 987-6543',
    location: 'Austin, TX'
  },
  workExperience: [{
    id: '1',
    company: 'Tech Solutions',
    position: 'Software Developer',
    startDate: '2023-01-01',
    endDate: '',
    description: 'Developing web applications using modern technologies.'
  }] as WorkExperienceEntry[],
  education: [{
    id: '1',
    institution: 'University of Texas',
    degree: "Bachelor's Degree",
    field: 'Computer Science',
    graduationDate: '2022-12-01'
  }] as EducationEntry[],
  skills: ['JavaScript', 'React', 'HTML', 'CSS']
};

const executiveData = {
  personalInfo: {
    fullName: 'David Chen',
    jobTitle: 'Chief Technology Officer',
    email: 'd.chen@techcorp.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY'
  },
  workExperience: [
    {
      id: '1',
      company: 'Fortune 500 Corp',
      position: 'Chief Technology Officer',
      startDate: '2021-01-01',
      endDate: '',
      description: 'Leading digital transformation initiatives across the organization. Managing technology strategy for 500+ person engineering organization. Driving adoption of cloud-native architectures and DevOps practices.'
    },
    {
      id: '2',
      company: 'ScaleUp Inc',
      position: 'VP of Engineering',
      startDate: '2018-06-01',
      endDate: '2020-12-31',
      description: 'Built engineering team from 15 to 100+ engineers. Led company through Series B and C funding rounds. Implemented scalable architecture supporting 50x user growth.'
    }
  ] as WorkExperienceEntry[],
  education: [{
    id: '1',
    institution: 'MIT',
    degree: 'MBA',
    field: 'Management',
    graduationDate: '2015-06-01'
  }, {
    id: '2',
    institution: 'Stanford University',
    degree: "Master's Degree",
    field: 'Computer Science',
    graduationDate: '2010-06-01'
  }] as EducationEntry[],
  skills: ['Strategic Planning', 'Team Leadership', 'Cloud Architecture', 'Digital Transformation', 'Product Strategy', 'Agile Methodologies']
};

const meta = {
  title: 'Features/Resume Preview',
  component: ResumePreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Resume Preview component renders a complete resume using various layout themes. Displays personal information, work experience, education, and skills in a print-ready format.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    personalInfo: {
      control: { type: 'object' },
      description: 'Personal information data'
    },
    workExperience: {
      control: { type: 'object' },
      description: 'Array of work experience entries'
    },
    education: {
      control: { type: 'object' },
      description: 'Array of education entries'
    },
    skills: {
      control: { type: 'object' },
      description: 'Array of skills'
    },
    theme: {
      control: { type: 'select' },
      options: ['simple', 'centered', 'sidebar', 'modern', 'executive'],
      description: 'Resume layout theme'
    }
  },
  args: {
    personalInfo: mockPersonalInfo,
    workExperience: mockWorkExperience,
    education: mockEducation,
    skills: mockSkills,
    customLayoutCode: undefined, // Ensure we don't use custom layout code
  },
} satisfies Meta<typeof ResumePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

// Different themes
export const SimpleTheme: Story = {
  args: {
    theme: 'simple' as ThemeName,
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple theme with clean, minimal design and clear section divisions'
      }
    }
  }
};

export const ModernTheme: Story = {
  args: {
    theme: 'modern' as ThemeName,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modern theme with gradient header and card-based sections'
      }
    }
  }
};

export const CenteredTheme: Story = {
  args: {
    theme: 'centered' as ThemeName,
  },
  parameters: {
    docs: {
      description: {
        story: 'Centered theme with bold header section and centered content layout'
      }
    }
  }
};

export const SidebarTheme: Story = {
  args: {
    theme: 'sidebar' as ThemeName,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar theme with two-column layout - personal info in dark sidebar, content on the right'
      }
    }
  }
};

export const ExecutiveTheme: Story = {
  args: {
    theme: 'executive' as ThemeName,
  },
  parameters: {
    docs: {
      description: {
        story: 'Executive theme with sophisticated styling for senior-level positions'
      }
    }
  }
};

// Different data sets
export const MinimalData: Story = {
  args: {
    personalInfo: minimalData.personalInfo,
    workExperience: minimalData.workExperience,
    education: minimalData.education,
    skills: minimalData.skills,
    theme: 'simple' as ThemeName,
  },
  parameters: {
    docs: {
      description: {
        story: 'Resume with minimal data - good for entry-level or career starters'
      }
    }
  }
};

export const ExecutiveProfile: Story = {
  args: {
    personalInfo: executiveData.personalInfo,
    workExperience: executiveData.workExperience,
    education: executiveData.education,
    skills: executiveData.skills,
    theme: 'executive' as ThemeName,
  },
  parameters: {
    docs: {
      description: {
        story: 'Resume with executive-level experience and sophisticated theme'
      }
    }
  }
};

// Empty states
export const EmptyResume: Story = {
  args: {
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: ''
    },
    workExperience: [],
    education: [],
    skills: [],
    theme: 'simple' as ThemeName,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty resume showing how the layout handles missing data'
      }
    }
  }
};

// Different professional levels
export const FreshGraduate: Story = {
  args: {
    personalInfo: {
      fullName: 'Alex Rodriguez',
      jobTitle: 'Recent Computer Science Graduate',
      email: 'alex.rodriguez@university.edu',
      phone: '+1 (555) 345-6789',
      location: 'Boston, MA'
    },
    workExperience: [
      {
        id: '1',
        company: 'Google',
        position: 'Software Engineering Intern',
        startDate: '2023-06-01',
        endDate: '2023-08-31',
        description: 'Developed features for Google Search using Java and internal tools. Collaborated with senior engineers on performance optimization projects.'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Massachusetts Institute of Technology',
        degree: "Bachelor's Degree",
        field: 'Computer Science',
        graduationDate: '2023-06-01'
      }
    ],
    skills: ['Java', 'Python', 'C++', 'Algorithm Design', 'Data Structures', 'Git'],
    theme: 'modern' as ThemeName,
  },
  parameters: {
    docs: {
      description: {
        story: 'Resume for a fresh graduate with internship experience'
      }
    }
  }
};

export const MidLevel: Story = {
  args: {
    personalInfo: mockPersonalInfo,
    workExperience: mockWorkExperience,
    education: mockEducation,
    skills: mockSkills,
    theme: 'modern' as ThemeName,
  },
  parameters: {
    docs: {
      description: {
        story: 'Resume for a mid-level professional with several years of experience'
      }
    }
  }
};

// Career transition
export const CareerChanger: Story = {
  args: {
    personalInfo: {
      fullName: 'Maria Garcia',
      jobTitle: 'Full Stack Developer',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Denver, CO'
    },
    workExperience: [
      {
        id: '1',
        company: 'Tech Solutions',
        position: 'Junior Full Stack Developer',
        startDate: '2023-01-01',
        endDate: '',
        description: 'Developing web applications using React and Node.js. Completed career transition bootcamp and applying new technical skills in professional environment.'
      },
      {
        id: '2',
        company: 'Marketing Agency',
        position: 'Digital Marketing Manager',
        startDate: '2018-03-01',
        endDate: '2022-12-31',
        description: 'Led digital marketing campaigns for B2B clients. Managed budgets up to $500K annually. Developed interest in web analytics and automation tools.'
      }
    ],
    education: [
      {
        id: '1',
        company: 'General Assembly',
        degree: 'Certificate',
        field: 'Software Engineering Immersive',
        graduationDate: '2022-12-01'
      },
      {
        id: '2',
        institution: 'University of Colorado',
        degree: "Bachelor's Degree",
        field: 'Marketing',
        graduationDate: '2017-05-01'
      }
    ] as EducationEntry[],
    skills: ['React', 'Node.js', 'JavaScript', 'HTML/CSS', 'Digital Marketing', 'Analytics', 'Project Management'],
    theme: 'centered' as ThemeName,
  },
  parameters: {
    docs: {
      description: {
        story: 'Resume showing career transition from marketing to software development'
      }
    }
  }
};

// Specialized roles
export const DataScientist: Story = {
  args: {
    personalInfo: {
      fullName: 'Dr. Jennifer Kim',
      jobTitle: 'Senior Data Scientist',
      email: 'j.kim@datascience.com',
      phone: '+1 (555) 567-8901',
      location: 'Seattle, WA'
    },
    workExperience: [
      {
        id: '1',
        company: 'Amazon',
        position: 'Senior Data Scientist',
        startDate: '2021-03-01',
        endDate: '',
        description: 'Leading ML initiatives for recommendation systems serving 300M+ users. Built ensemble models improving click-through rates by 15%. Mentoring junior data scientists and collaborating with product teams.'
      },
      {
        id: '2',
        company: 'Spotify',
        position: 'Data Scientist',
        startDate: '2019-06-01',
        endDate: '2021-02-28',
        description: 'Developed music recommendation algorithms and A/B testing frameworks. Analyzed user behavior data to improve playlist generation and user engagement metrics.'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Stanford University',
        degree: 'Ph.D.',
        field: 'Statistics',
        graduationDate: '2019-06-01'
      },
      {
        id: '2',
        institution: 'UC Berkeley',
        degree: "Master's Degree",
        field: 'Mathematics',
        graduationDate: '2015-05-01'
      }
    ],
    skills: ['Python', 'R', 'SQL', 'TensorFlow', 'PyTorch', 'AWS', 'Spark', 'Statistics', 'Machine Learning', 'Deep Learning'],
    theme: 'executive' as ThemeName,
  },
  parameters: {
    docs: {
      description: {
        story: 'Resume for a senior data scientist with advanced academic background'
      }
    }
  }
};

// Theme comparison showcase
export const AllThemes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Resume Theme Comparison</h2>
        <p className="text-gray-600 mb-8">Same resume data displayed in different themes</p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">Simple Theme</h3>
          <div className="transform scale-50 origin-top">
            <ResumePreview
              personalInfo={mockPersonalInfo}
              workExperience={mockWorkExperience}
              education={mockEducation}
              skills={mockSkills}
              theme="simple"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">Modern Theme</h3>
          <div className="transform scale-50 origin-top">
            <ResumePreview
              personalInfo={mockPersonalInfo}
              workExperience={mockWorkExperience}
              education={mockEducation}
              skills={mockSkills}
              theme="modern"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">Centered Theme</h3>
          <div className="transform scale-50 origin-top">
            <ResumePreview
              personalInfo={mockPersonalInfo}
              workExperience={mockWorkExperience}
              education={mockEducation}
              skills={mockSkills}
              theme="centered"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">Executive Theme</h3>
          <div className="transform scale-50 origin-top">
            <ResumePreview
              personalInfo={mockPersonalInfo}
              workExperience={mockWorkExperience}
              education={mockEducation}
              skills={mockSkills}
              theme="executive"
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comparison of all available resume themes with the same data set'
      }
    }
  }
};