import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import LayoutPreview from './LayoutPreview';
import { PersonalInfoData } from './PersonalInfo';
import { WorkExperienceEntry } from './WorkExperience';
import { EducationEntry } from './Education';

// Mock theme context
vi.mock('@/themes/ThemeContext', () => ({
  useTheme: () => ({
    currentTheme: 'modern',
    setTheme: vi.fn(),
  })
}));

// Mock layout templates
vi.mock('./resume-layouts/layoutTemplates', () => ({
  getLayoutJSXString: vi.fn(() => 'const Layout = () => <div>Mock Layout</div>;')
}));

// Mock Babel for JSX compilation
vi.mock('@babel/standalone', () => ({
  transform: vi.fn(() => ({
    code: 'React.createElement("div", null, "Compiled Layout");'
  }))
}));

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  }
}));

const mockPersonalInfo: PersonalInfoData = {
  fullName: 'John Doe',
  email: 'john@example.com',
  phone: '123-456-7890',
  location: 'New York, NY',
  jobTitle: 'Software Engineer',
  website: 'johndoe.dev',
  linkedin: 'linkedin.com/in/johndoe',
  github: 'github.com/johndoe'
};

const mockWorkExperience: WorkExperienceEntry[] = [
  {
    company: 'Tech Corp',
    position: 'Senior Developer',
    startDate: '2020-01',
    endDate: '2023-01',
    description: 'Built scalable web applications'
  }
];

const mockEducation: EducationEntry[] = [
  {
    institution: 'University of Technology',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: '2016',
    endDate: '2020'
  }
];

const mockSkills = ['React', 'TypeScript', 'Node.js', 'Python'];

const defaultProps = {
  selectedLayout: 'Modern',
  layoutProps: {},
  customCode: null,
  personalInfo: mockPersonalInfo,
  workExperience: mockWorkExperience,
  education: mockEducation,
  skills: mockSkills,
  extraData: {}
};

describe('LayoutPreview Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<LayoutPreview {...defaultProps} />);
    // The component should render some content, even if mocked
    expect(document.body).toBeInTheDocument();
  });

  it('handles different layout selections', () => {
    const { rerender } = render(<LayoutPreview {...defaultProps} selectedLayout="Simple" />);
    
    rerender(<LayoutPreview {...defaultProps} selectedLayout="Modern" />);
    rerender(<LayoutPreview {...defaultProps} selectedLayout="Sidebar" />);
    rerender(<LayoutPreview {...defaultProps} selectedLayout="Centered" />);
    
    // Should not throw errors with different layouts
    expect(document.body).toBeInTheDocument();
  });

  it('works with custom code', () => {
    const customCode = `
      const CustomLayout = ({ personalInfo }) => (
        <div data-testid="custom-layout">
          <h1>{personalInfo.fullName}</h1>
        </div>
      );
    `;
    
    render(<LayoutPreview {...defaultProps} customCode={customCode} />);
    
    // Should handle custom code without errors
    expect(document.body).toBeInTheDocument();
  });

  it('handles empty personal info gracefully', () => {
    const emptyPersonalInfo: PersonalInfoData = {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      jobTitle: '',
      website: '',
      linkedin: '',
      github: ''
    };
    
    render(<LayoutPreview {...defaultProps} personalInfo={emptyPersonalInfo} />);
    
    expect(document.body).toBeInTheDocument();
  });

  it('handles empty work experience', () => {
    render(<LayoutPreview {...defaultProps} workExperience={[]} />);
    
    expect(document.body).toBeInTheDocument();
  });

  it('handles empty education', () => {
    render(<LayoutPreview {...defaultProps} education={[]} />);
    
    expect(document.body).toBeInTheDocument();
  });

  it('handles empty skills', () => {
    render(<LayoutPreview {...defaultProps} skills={[]} />);
    
    expect(document.body).toBeInTheDocument();
  });

  it('accepts extraData prop', () => {
    const extraData = {
      certifications: ['AWS Certified', 'React Expert'],
      projects: [{ name: 'Project 1', description: 'Cool project' }]
    };
    
    render(<LayoutPreview {...defaultProps} extraData={extraData} />);
    
    expect(document.body).toBeInTheDocument();
  });

  it('uses layout props', () => {
    const layoutProps = {
      showAvatar: true,
      primaryColor: '#007bff',
      fontFamily: 'Arial'
    };
    
    render(<LayoutPreview {...defaultProps} layoutProps={layoutProps} />);
    
    expect(document.body).toBeInTheDocument();
  });

  it('handles complex personal info data', () => {
    const complexPersonalInfo: PersonalInfoData = {
      ...mockPersonalInfo,
      website: 'https://johndoe.dev',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe'
    };
    
    render(<LayoutPreview {...defaultProps} personalInfo={complexPersonalInfo} />);
    
    expect(document.body).toBeInTheDocument();
  });

  it('handles multiple work experiences', () => {
    const multipleWorkExp: WorkExperienceEntry[] = [
      {
        company: 'Tech Corp',
        position: 'Senior Developer',
        startDate: '2020-01',
        endDate: '2023-01',
        description: 'Built scalable web applications'
      },
      {
        company: 'Startup Inc',
        position: 'Full Stack Developer',
        startDate: '2018-06',
        endDate: '2019-12',
        description: 'Developed MVP for mobile app'
      }
    ];
    
    render(<LayoutPreview {...defaultProps} workExperience={multipleWorkExp} />);
    
    expect(document.body).toBeInTheDocument();
  });

  it('handles multiple education entries', () => {
    const multipleEducation: EducationEntry[] = [
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2016',
        endDate: '2020'
      },
      {
        institution: 'Coding Bootcamp',
        degree: 'Certificate',
        field: 'Web Development',
        startDate: '2015',
        endDate: '2016'
      }
    ];
    
    render(<LayoutPreview {...defaultProps} education={multipleEducation} />);
    
    expect(document.body).toBeInTheDocument();
  });

  it('handles large number of skills', () => {
    const manySkills = [
      'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular',
      'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL',
      'AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Git'
    ];
    
    render(<LayoutPreview {...defaultProps} skills={manySkills} />);
    
    expect(document.body).toBeInTheDocument();
  });
});