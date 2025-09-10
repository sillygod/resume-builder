import type { Meta, StoryObj } from '@storybook/react';
import { Education, EducationEntry } from '@/components/Education';

const meta = {
  title: 'Features/Education',
  component: Education,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Education component allows users to add, edit, and manage their educational background. Supports multiple degrees, certifications, and educational achievements.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    entries: {
      control: { type: 'object' },
      description: 'Array of education entries'
    },
    onChange: {
      description: 'Callback function called when entries array changes'
    }
  },
  args: {},
} satisfies Meta<typeof Education>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for stories
const sampleEntries: EducationEntry[] = [
  {
    id: '1',
    institution: 'Stanford University',
    degree: "Master's Degree",
    field: 'Computer Science',
    graduationDate: '2020-06-01'
  },
  {
    id: '2',
    institution: 'University of California, Berkeley',
    degree: "Bachelor's Degree",
    field: 'Electrical Engineering and Computer Science',
    graduationDate: '2018-05-15'
  }
];

const undergraduateOnly: EducationEntry[] = [
  {
    id: '1',
    institution: 'Massachusetts Institute of Technology',
    degree: "Bachelor of Science",
    field: 'Computer Science',
    graduationDate: '2022-06-01'
  }
];

const phdEntry: EducationEntry[] = [
  {
    id: '1',
    institution: 'Harvard University',
    degree: 'Ph.D.',
    field: 'Artificial Intelligence',
    graduationDate: '2024-05-01'
  },
  {
    id: '2',
    institution: 'Harvard University',
    degree: "Master's Degree",
    field: 'Computer Science',
    graduationDate: '2020-05-01'
  },
  {
    id: '3',
    institution: 'University of Michigan',
    degree: "Bachelor's Degree",
    field: 'Mathematics',
    graduationDate: '2018-05-01'
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

// Different education levels
export const UndergraduateOnly: Story = {
  args: {
    entries: undergraduateOnly,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing only undergraduate education'
      }
    }
  }
};

export const PhDLevel: Story = {
  args: {
    entries: phdEntry,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing advanced academic progression through PhD'
      }
    }
  }
};

// Different fields of study
export const EngineeringDegrees: Story = {
  args: {
    entries: [
      {
        id: '1',
        institution: 'Georgia Institute of Technology',
        degree: "Master's Degree",
        field: 'Mechanical Engineering',
        graduationDate: '2021-12-01'
      },
      {
        id: '2',
        institution: 'University of Texas at Austin',
        degree: "Bachelor's Degree",
        field: 'Aerospace Engineering',
        graduationDate: '2019-05-01'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example education background for engineering roles'
      }
    }
  }
};

export const BusinessDegrees: Story = {
  args: {
    entries: [
      {
        id: '1',
        institution: 'Wharton School, University of Pennsylvania',
        degree: 'MBA',
        field: 'Business Administration',
        graduationDate: '2020-05-01'
      },
      {
        id: '2',
        institution: 'New York University',
        degree: "Bachelor's Degree",
        field: 'Economics',
        graduationDate: '2016-05-01'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example education background for business roles'
      }
    }
  }
};

export const DesignDegrees: Story = {
  args: {
    entries: [
      {
        id: '1',
        institution: 'Rhode Island School of Design',
        degree: "Master of Fine Arts",
        field: 'Graphic Design',
        graduationDate: '2019-06-01'
      },
      {
        id: '2',
        institution: 'California College of the Arts',
        degree: "Bachelor of Fine Arts",
        field: 'Visual Communication Design',
        graduationDate: '2017-05-01'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example education background for design roles'
      }
    }
  }
};

export const DataScienceDegrees: Story = {
  args: {
    entries: [
      {
        id: '1',
        institution: 'Carnegie Mellon University',
        degree: "Master's Degree",
        field: 'Machine Learning',
        graduationDate: '2022-05-01'
      },
      {
        id: '2',
        institution: 'University of Washington',
        degree: "Bachelor's Degree",
        field: 'Statistics',
        graduationDate: '2020-06-01'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example education background for data science roles'
      }
    }
  }
};

// International education
export const InternationalDegrees: Story = {
  args: {
    entries: [
      {
        id: '1',
        institution: 'University of Oxford',
        degree: "Master's Degree",
        field: 'Computer Science',
        graduationDate: '2021-07-01'
      },
      {
        id: '2',
        institution: 'Technical University of Munich',
        degree: "Bachelor's Degree",
        field: 'Informatics',
        graduationDate: '2019-09-01'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing international education background'
      }
    }
  }
};

// Non-traditional paths
export const CertificationsAndBootcamp: Story = {
  args: {
    entries: [
      {
        id: '1',
        institution: 'General Assembly',
        degree: 'Certificate',
        field: 'Software Engineering Immersive',
        graduationDate: '2023-03-01'
      },
      {
        id: '2',
        institution: 'AWS',
        degree: 'Certification',
        field: 'Solutions Architect Associate',
        graduationDate: '2022-11-01'
      },
      {
        id: '3',
        institution: 'University of Arizona',
        degree: "Bachelor's Degree",
        field: 'Psychology',
        graduationDate: '2018-05-01'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing career transition through bootcamp and certifications'
      }
    }
  }
};

export const OnlineEducation: Story = {
  args: {
    entries: [
      {
        id: '1',
        institution: 'Stanford Online',
        degree: 'Certificate',
        field: 'Machine Learning',
        graduationDate: '2023-08-01'
      },
      {
        id: '2',
        institution: 'Coursera - University of Michigan',
        degree: 'Specialization Certificate',
        field: 'Python for Everybody',
        graduationDate: '2023-02-01'
      },
      {
        id: '3',
        institution: 'Local Community College',
        degree: "Associate's Degree",
        field: 'Computer Information Systems',
        graduationDate: '2021-06-01'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing combination of online education and traditional degrees'
      }
    }
  }
};

// Current student
export const CurrentStudent: Story = {
  args: {
    entries: [
      {
        id: '1',
        institution: 'University of California, Los Angeles',
        degree: "Bachelor's Degree",
        field: 'Computer Science',
        graduationDate: '2025-06-01' // Future date
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing current student with expected graduation'
      }
    }
  }
};

// Professional development
export const ContinuousLearning: Story = {
  args: {
    entries: [
      {
        id: '1',
        institution: 'MIT Professional Education',
        degree: 'Certificate',
        field: 'Artificial Intelligence: Implications for Business Strategy',
        graduationDate: '2023-11-01'
      },
      {
        id: '2',
        institution: 'Google Cloud',
        degree: 'Professional Certificate',
        field: 'Cloud Architect',
        graduationDate: '2023-09-01'
      },
      {
        id: '3',
        institution: 'University of Illinois',
        degree: "Master's Degree",
        field: 'Computer Science',
        graduationDate: '2015-05-01'
      },
      {
        id: '4',
        institution: 'University of Illinois',
        degree: "Bachelor's Degree",
        field: 'Computer Engineering',
        graduationDate: '2013-05-01'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing continuous professional development and learning'
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
        institution: '',
        degree: '',
        field: '',
        graduationDate: ''
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
        institution: 'University of California, San Diego',
        degree: "Bachelor's Degree",
        field: 'Computer Science',
        graduationDate: ''
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing partially filled education form'
      }
    }
  }
};