import type { Meta, StoryObj } from '@storybook/react';
import { PersonalInfo, PersonalInfoData } from '@/components/PersonalInfo';
import { ThemeProvider } from '@/themes/ThemeContext';

// Create a simplified version for Storybook that doesn't use the complex hooks
const PersonalInfoStoryWrapper = ({ 
  data, 
  onChange 
}: { 
  data: PersonalInfoData; 
  onChange: (data: PersonalInfoData) => void; 
}) => {
  return (
    <ThemeProvider>
      <PersonalInfo data={data} onChange={onChange} />
    </ThemeProvider>
  );
};

const meta = {
  title: 'Features/Personal Info',
  component: PersonalInfoStoryWrapper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Personal Information component allows users to input and manage their basic contact information and personal details for their resume.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: { type: 'object' },
      description: 'Personal information data object'
    },
    onChange: {
      description: 'Callback function called when personal info changes'
    }
  },
  args: {},
} satisfies Meta<typeof PersonalInfoStoryWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for different user types
const sampleData: PersonalInfoData = {
  fullName: 'John Doe',
  jobTitle: 'Senior Software Engineer',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA'
};

const executiveData: PersonalInfoData = {
  fullName: 'Sarah Johnson',
  jobTitle: 'Chief Technology Officer',
  email: 'sarah.johnson@techcorp.com',
  phone: '+1 (555) 987-6543',
  location: 'New York, NY',
  linkedin: 'linkedin.com/in/sarahjohnson',
  website: 'www.sarahjohnson.tech'
};

const freshGraduateData: PersonalInfoData = {
  fullName: 'Alex Smith',
  jobTitle: 'Software Developer',
  email: 'alex.smith@gmail.com',
  phone: '+1 (555) 234-5678',
  location: 'Austin, TX',
  github: 'github.com/alexsmith'
};

const freelancerData: PersonalInfoData = {
  fullName: 'Maria Rodriguez',
  jobTitle: 'Freelance UX/UI Designer',
  email: 'hello@mariadesigns.com',
  phone: '+1 (555) 345-6789',
  location: 'Los Angeles, CA',
  website: 'www.mariadesigns.com',
  portfolio: 'dribbble.com/mariadesigns',
  instagram: '@mariadesigns'
};

const internationalData: PersonalInfoData = {
  fullName: 'Hiroshi Tanaka',
  jobTitle: 'Machine Learning Engineer',
  email: 'h.tanaka@example.jp',
  phone: '+81 90-1234-5678',
  location: 'Tokyo, Japan',
  linkedin: 'linkedin.com/in/hiroshi-tanaka'
};

// Basic states
export const Empty: Story = {
  args: {
    data: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: ''
    },
  },
};

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const PartiallyFilled: Story = {
  args: {
    data: {
      fullName: 'Jane Doe',
      jobTitle: 'Product Manager',
      email: '',
      phone: '',
      location: 'Seattle, WA'
    },
  },
};

// Different professional levels
export const SoftwareEngineer: Story = {
  args: {
    data: sampleData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example personal information for a Software Engineer'
      }
    }
  }
};

export const ExecutiveLevel: Story = {
  args: {
    data: executiveData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example personal information for an executive-level position with additional fields'
      }
    }
  }
};

export const FreshGraduate: Story = {
  args: {
    data: freshGraduateData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example personal information for a recent graduate entering the job market'
      }
    }
  }
};

export const FreelancerCreative: Story = {
  args: {
    data: freelancerData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example personal information for a freelance creative professional with portfolio links'
      }
    }
  }
};

// International examples
export const InternationalProfile: Story = {
  args: {
    data: internationalData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing international phone number and location format'
      }
    }
  }
};

// Different industries
export const MarketingProfessional: Story = {
  args: {
    data: {
      fullName: 'Emma Wilson',
      jobTitle: 'Digital Marketing Manager',
      email: 'emma.wilson@marketingco.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, IL',
      linkedin: 'linkedin.com/in/emmawilson',
      twitter: '@emmawilsonmkt'
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example personal information for a marketing professional'
      }
    }
  }
};

export const DataScientist: Story = {
  args: {
    data: {
      fullName: 'Dr. Michael Chen',
      jobTitle: 'Senior Data Scientist',
      email: 'm.chen@datascience.com',
      phone: '+1 (555) 567-8901',
      location: 'Boston, MA',
      linkedin: 'linkedin.com/in/michaelchen-phd',
      github: 'github.com/mchen-ds',
      researchgate: 'researchgate.net/profile/Michael-Chen'
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example personal information for a data scientist with academic background'
      }
    }
  }
};

export const GraphicDesigner: Story = {
  args: {
    data: {
      fullName: 'Isabella Garcia',
      jobTitle: 'Senior Graphic Designer',
      email: 'isabella@creativestudio.com',
      phone: '+1 (555) 678-9012',
      location: 'Portland, OR',
      website: 'www.isabellagarcia.design',
      behance: 'behance.net/isabellagarcia',
      instagram: '@isabelladesigns'
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example personal information for a graphic designer with creative portfolio links'
      }
    }
  }
};

export const ProjectManager: Story = {
  args: {
    data: {
      fullName: 'Robert Johnson',
      jobTitle: 'Senior Project Manager, PMP',
      email: 'r.johnson@pmconsulting.com',
      phone: '+1 (555) 789-0123',
      location: 'Denver, CO',
      linkedin: 'linkedin.com/in/robertjohnson-pmp',
      certifications: 'PMP, Scrum Master'
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example personal information for a project manager with certifications'
      }
    }
  }
};

// Career transition examples
export const CareerChanger: Story = {
  args: {
    data: {
      fullName: 'Lisa Park',
      jobTitle: 'Junior Full Stack Developer',
      email: 'lisa.park@email.com',
      phone: '+1 (555) 890-1234',
      location: 'Nashville, TN',
      github: 'github.com/lisapark-dev',
      bootcamp: 'Coding Bootcamp Graduate 2024'
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example personal information for someone transitioning into tech'
      }
    }
  }
};

// Different contact preferences
export const MinimalContact: Story = {
  args: {
    data: {
      fullName: 'David Brown',
      jobTitle: 'Software Architect',
      email: 'david.brown@tech.com',
      phone: '',
      location: 'Remote'
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing minimal contact information preference'
      }
    }
  }
};

export const MaximalContact: Story = {
  args: {
    data: {
      fullName: 'Amanda Foster',
      jobTitle: 'Full Stack Developer & Content Creator',
      email: 'amanda@amandafoster.dev',
      phone: '+1 (555) 901-2345',
      location: 'Miami, FL',
      website: 'www.amandafoster.dev',
      linkedin: 'linkedin.com/in/amandafoster',
      github: 'github.com/afoster-dev',
      twitter: '@amanda_codes',
      youtube: 'youtube.com/c/AmandaCodes',
      blog: 'blog.amandafoster.dev'
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing comprehensive contact information for a developer with strong online presence'
      }
    }
  }
};