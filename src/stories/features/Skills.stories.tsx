import type { Meta, StoryObj } from '@storybook/react';
import { Skills } from '@/components/Skills';

const meta = {
  title: 'Features/Skills',
  component: Skills,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Skills component allows users to add, display, and remove skills as tags. Features include duplicate prevention and interactive skill management.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    skills: {
      control: { type: 'object' },
      description: 'Array of skill strings'
    },
    onChange: {
      description: 'Callback function called when skills array changes'
    }
  },
  args: {},
} satisfies Meta<typeof Skills>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic states
export const Empty: Story = {
  args: {
    skills: [],
  },
};

export const WithSkills: Story = {
  args: {
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
  },
};

export const SingleSkill: Story = {
  args: {
    skills: ['JavaScript'],
  },
};

// Different skill sets for various roles
export const FrontendDeveloper: Story = {
  args: {
    skills: [
      'React',
      'Vue.js',
      'Angular',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Sass',
      'Tailwind CSS',
      'Webpack',
      'Vite'
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example skill set for a Frontend Developer role'
      }
    }
  }
};

export const BackendDeveloper: Story = {
  args: {
    skills: [
      'Node.js',
      'Python',
      'Java',
      'Express.js',
      'Django',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'AWS',
      'GraphQL',
      'REST APIs'
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example skill set for a Backend Developer role'
      }
    }
  }
};

export const FullStackDeveloper: Story = {
  args: {
    skills: [
      'React',
      'Node.js',
      'TypeScript',
      'Next.js',
      'Express.js',
      'PostgreSQL',
      'MongoDB',
      'AWS',
      'Docker',
      'Kubernetes',
      'GraphQL',
      'REST APIs',
      'Git',
      'Agile',
      'TDD'
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example skill set for a Full Stack Developer role'
      }
    }
  }
};

export const DataScientist: Story = {
  args: {
    skills: [
      'Python',
      'R',
      'SQL',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'TensorFlow',
      'PyTorch',
      'Jupyter',
      'Matplotlib',
      'Seaborn',
      'Machine Learning',
      'Deep Learning',
      'Statistics'
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example skill set for a Data Scientist role'
      }
    }
  }
};

export const DevOpsEngineer: Story = {
  args: {
    skills: [
      'AWS',
      'Azure',
      'Docker',
      'Kubernetes',
      'Jenkins',
      'Terraform',
      'Ansible',
      'Linux',
      'Bash',
      'Python',
      'CI/CD',
      'Monitoring',
      'Prometheus',
      'Grafana'
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example skill set for a DevOps Engineer role'
      }
    }
  }
};

// Edge cases
export const ManySkills: Story = {
  args: {
    skills: [
      'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js',
      'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'C++', 'C#', '.NET',
      'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch',
      'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI',
      'HTML5', 'CSS3', 'Sass', 'Less', 'Tailwind CSS', 'Bootstrap',
      'Git', 'SVN', 'Agile', 'Scrum', 'Kanban', 'TDD', 'BDD',
      'REST APIs', 'GraphQL', 'gRPC', 'WebSockets', 'Microservices'
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with many skills to test layout and wrapping behavior'
      }
    }
  }
};

export const LongSkillNames: Story = {
  args: {
    skills: [
      'Machine Learning and Artificial Intelligence',
      'Full Stack Web Development',
      'Cloud Infrastructure Management',
      'Database Design and Optimization',
      'Continuous Integration and Deployment',
      'Test Driven Development',
      'Responsive Web Design'
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with longer skill names to test text wrapping and layout'
      }
    }
  }
};

// Interactive examples
export const Interactive: Story = {
  args: {
    skills: ['React', 'TypeScript'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example - try adding and removing skills using the input field and delete buttons'
      }
    }
  }
};

// Creative/Design skills
export const UXDesigner: Story = {
  args: {
    skills: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'Figma',
      'Sketch',
      'Adobe XD',
      'Photoshop',
      'Illustrator',
      'InVision',
      'Usability Testing',
      'Information Architecture',
      'Design Systems'
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example skill set for a UX Designer role'
      }
    }
  }
};

// Soft skills
export const SoftSkills: Story = {
  args: {
    skills: [
      'Leadership',
      'Team Management',
      'Communication',
      'Problem Solving',
      'Critical Thinking',
      'Project Management',
      'Mentoring',
      'Public Speaking',
      'Cross-functional Collaboration',
      'Strategic Planning'
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of soft skills that complement technical abilities'
      }
    }
  }
};