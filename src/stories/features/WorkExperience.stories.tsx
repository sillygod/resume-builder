import type { Meta, StoryObj } from '@storybook/react';
import { WorkExperience, WorkExperienceEntry } from '@/components/WorkExperience';

const meta = {
  title: 'Features/Work Experience',
  component: WorkExperience,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Work Experience component allows users to add, edit, and manage their professional work history. Features include form validation and dynamic entry management.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    entries: {
      control: { type: 'object' },
      description: 'Array of work experience entries'
    },
    onChange: {
      description: 'Callback function called when entries array changes'
    }
  },
  args: {},
} satisfies Meta<typeof WorkExperience>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for stories
const sampleEntries: WorkExperienceEntry[] = [
  {
    id: '1',
    company: 'Tech Corp Inc.',
    position: 'Senior Software Engineer',
    startDate: '2022-03-01',
    endDate: '2024-01-01',
    description: 'Led development of microservices architecture, improving system performance by 40%. Mentored junior developers and collaborated with cross-functional teams to deliver high-quality software solutions.'
  },
  {
    id: '2',
    company: 'StartupCo',
    position: 'Full Stack Developer',
    startDate: '2020-06-01',
    endDate: '2022-02-28',
    description: 'Built responsive web applications using React and Node.js. Implemented CI/CD pipelines and automated testing processes. Worked directly with clients to gather requirements and deliver solutions.'
  },
  {
    id: '3',
    company: 'Digital Agency',
    position: 'Junior Developer',
    startDate: '2019-01-15',
    endDate: '2020-05-31',
    description: 'Developed and maintained client websites using modern web technologies. Participated in code reviews and learned best practices for web development.'
  }
];

const currentJobEntry: WorkExperienceEntry[] = [
  {
    id: '1',
    company: 'Meta',
    position: 'Principal Software Engineer',
    startDate: '2023-01-01',
    endDate: '', // Current job - no end date
    description: 'Leading the development of next-generation social media features. Architecting scalable systems that serve billions of users. Managing a team of 12 engineers across multiple time zones.'
  }
];

const internshipEntry: WorkExperienceEntry[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Software Engineering Intern',
    startDate: '2018-06-01',
    endDate: '2018-08-31',
    description: 'Worked on the Chrome DevTools team to improve developer experience. Built new debugging features and performance profiling tools. Presented findings to senior engineering leadership.'
  }
];

// Basic states
export const Empty: Story = {
  args: {
    entries: [],
  },
};

export const SingleEntry: Story = {
  args: {
    entries: [sampleEntries[0]],
  },
};

export const MultipleEntries: Story = {
  args: {
    entries: sampleEntries,
  },
};

// Different career stages
export const EntryLevel: Story = {
  args: {
    entries: [
      {
        id: '1',
        company: 'Local Web Studio',
        position: 'Junior Web Developer',
        startDate: '2023-01-01',
        endDate: '',
        description: 'Creating responsive websites for small businesses. Learning modern web development practices and working with senior developers to improve coding skills.'
      },
      {
        id: '2',
        company: 'University IT Department',
        position: 'Web Development Intern',
        startDate: '2022-06-01',
        endDate: '2022-12-31',
        description: 'Assisted with university website maintenance and development. Gained experience with HTML, CSS, JavaScript, and content management systems.'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example work experience for an entry-level developer'
      }
    }
  }
};

export const MidLevel: Story = {
  args: {
    entries: [
      {
        id: '1',
        company: 'TechStart Solutions',
        position: 'Software Engineer',
        startDate: '2021-09-01',
        endDate: '',
        description: 'Developing full-stack applications using React, Node.js, and PostgreSQL. Participating in agile development processes and collaborating with product managers to define requirements.'
      },
      {
        id: '2',
        company: 'Digital Innovations',
        position: 'Frontend Developer',
        startDate: '2020-03-01',
        endDate: '2021-08-31',
        description: 'Built responsive user interfaces for e-commerce platforms. Improved page load times by 30% through code optimization and implemented accessible design patterns.'
      },
      {
        id: '3',
        company: 'Creative Agency',
        position: 'Junior Developer',
        startDate: '2019-06-01',
        endDate: '2020-02-28',
        description: 'Created interactive websites for creative campaigns. Learned modern JavaScript frameworks and responsive design principles.'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example work experience for a mid-level developer'
      }
    }
  }
};

export const Senior: Story = {
  args: {
    entries: [
      {
        id: '1',
        company: 'Enterprise Corp',
        position: 'Principal Software Engineer',
        startDate: '2022-01-01',
        endDate: '',
        description: 'Leading architecture decisions for enterprise-scale applications. Mentoring team of 8 engineers and driving technical strategy across multiple product lines. Reduced system downtime by 90% through improved monitoring and reliability practices.'
      },
      {
        id: '2',
        company: 'Cloud Solutions Inc',
        position: 'Senior Software Engineer',
        startDate: '2019-08-01',
        endDate: '2021-12-31',
        description: 'Designed and implemented microservices architecture serving 10M+ daily users. Led migration from monolithic to cloud-native architecture. Established CI/CD practices and automated testing frameworks.'
      },
      {
        id: '3',
        company: 'StartupUnicorn',
        position: 'Technical Lead',
        startDate: '2017-03-01',
        endDate: '2019-07-31',
        description: 'Built engineering team from 3 to 15 developers. Architected scalable backend systems that supported company growth from Series A to Series C. Implemented engineering best practices and code review processes.'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example work experience for a senior-level engineer'
      }
    }
  }
};

// Special cases
export const CurrentJob: Story = {
  args: {
    entries: currentJobEntry,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing current employment (no end date)'
      }
    }
  }
};

export const Internship: Story = {
  args: {
    entries: internshipEntry,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing internship experience'
      }
    }
  }
};

export const CareerChange: Story = {
  args: {
    entries: [
      {
        id: '1',
        company: 'Tech Solutions',
        position: 'Software Developer',
        startDate: '2022-01-01',
        endDate: '',
        description: 'Transitioned into software development from marketing. Building web applications and learning new technologies. Contributing to open source projects and participating in code reviews.'
      },
      {
        id: '2',
        company: 'Marketing Agency',
        position: 'Digital Marketing Specialist',
        startDate: '2019-06-01',
        endDate: '2021-12-31',
        description: 'Managed digital marketing campaigns for B2B clients. Analyzed campaign performance data and optimized conversion rates. Developed interest in automation and data analysis tools.'
      },
      {
        id: '3',
        company: 'Retail Corporation',
        position: 'Marketing Coordinator',
        startDate: '2018-01-01',
        endDate: '2019-05-31',
        description: 'Coordinated marketing campaigns and events. Created content for social media and email marketing. Gained experience with analytics tools and customer data analysis.'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing career transition from marketing to software development'
      }
    }
  }
};

// Freelance/Contract work
export const FreelanceConsultant: Story = {
  args: {
    entries: [
      {
        id: '1',
        company: 'Independent Consultant',
        position: 'Full Stack Developer',
        startDate: '2023-01-01',
        endDate: '',
        description: 'Providing web development services to small and medium businesses. Built e-commerce platforms, business websites, and custom web applications. Managing client relationships and project timelines.'
      },
      {
        id: '2',
        company: 'Various Clients',
        position: 'Freelance Web Developer',
        startDate: '2021-06-01',
        endDate: '2022-12-31',
        description: 'Completed 20+ projects for diverse clients including restaurants, real estate agencies, and non-profit organizations. Specialized in WordPress development and custom PHP applications.'
      },
      {
        id: '3',
        company: 'Tech Startup',
        position: 'Contract Developer',
        startDate: '2020-09-01',
        endDate: '2021-05-31',
        description: 'Developed MVP for fintech startup. Built React frontend and Node.js API. Worked closely with founders to iterate on product features based on user feedback.'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing freelance and contract work history'
      }
    }
  }
};

// Form states
export const EmptyForm: Story = {
  args: {
    entries: [
      {
        id: '1',
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing empty form ready for user input'
      }
    }
  }
};

export const PartiallyFilled: Story = {
  args: {
    entries: [
      {
        id: '1',
        company: 'Awesome Company',
        position: 'Software Engineer',
        startDate: '2023-01-01',
        endDate: '',
        description: ''
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing partially filled form'
      }
    }
  }
};