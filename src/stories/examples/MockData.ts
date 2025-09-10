// Mock data for Storybook stories
export const mockProfiles = {
  softwareEngineer: {
    personalInfo: {
      fullName: 'Sarah Johnson',
      jobTitle: 'Senior Software Engineer',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      github: 'github.com/sarahjohnson',
      linkedin: 'linkedin.com/in/sarahjohnson'
    },
    workExperience: [
      {
        id: '1',
        company: 'TechCorp Inc.',
        position: 'Senior Software Engineer',
        startDate: '2022-03-01',
        endDate: '',
        description: 'Led development of microservices architecture, improving system performance by 40%. Mentored junior developers and collaborated with cross-functional teams to deliver high-quality software solutions using React, Node.js, and AWS.'
      },
      {
        id: '2',
        company: 'StartupCo',
        position: 'Full Stack Developer',
        startDate: '2020-06-01',
        endDate: '2022-02-28',
        description: 'Built responsive web applications using React and Node.js. Implemented CI/CD pipelines and automated testing processes. Worked directly with clients to gather requirements and deliver solutions on time and within budget.'
      },
      {
        id: '3',
        company: 'Digital Agency',
        position: 'Junior Developer',
        startDate: '2019-01-15',
        endDate: '2020-05-31',
        description: 'Developed and maintained client websites using modern web technologies. Participated in code reviews and learned best practices for web development. Collaborated with design team to implement pixel-perfect UI components.'
      }
    ],
    education: [
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
    ],
    skills: [
      'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 
      'GraphQL', 'PostgreSQL', 'MongoDB', 'Git', 'Agile', 'Microservices', 'REST APIs'
    ]
  },

  dataScientist: {
    personalInfo: {
      fullName: 'Dr. Michael Chen',
      jobTitle: 'Senior Data Scientist',
      email: 'm.chen@datascience.com',
      phone: '+1 (555) 234-5678',
      location: 'Boston, MA',
      linkedin: 'linkedin.com/in/michaelchen-phd',
      github: 'github.com/mchen-ds'
    },
    workExperience: [
      {
        id: '1',
        company: 'Amazon',
        position: 'Senior Data Scientist',
        startDate: '2021-03-01',
        endDate: '',
        description: 'Leading ML initiatives for recommendation systems serving 300M+ users. Built ensemble models improving click-through rates by 15%. Published 3 papers in top-tier conferences and mentored junior data scientists.'
      },
      {
        id: '2',
        company: 'Spotify',
        position: 'Data Scientist',
        startDate: '2019-06-01',
        endDate: '2021-02-28',
        description: 'Developed music recommendation algorithms and A/B testing frameworks. Analyzed user behavior data to improve playlist generation. Collaborated with product teams to define success metrics and KPIs.'
      },
      {
        id: '3',
        company: 'Research Lab',
        position: 'Research Assistant',
        startDate: '2017-09-01',
        endDate: '2019-05-31',
        description: 'Conducted research in machine learning and natural language processing. Published 5 peer-reviewed papers and presented findings at international conferences. Developed novel algorithms for text classification.'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'MIT',
        degree: 'Ph.D.',
        field: 'Computer Science (Machine Learning)',
        graduationDate: '2019-06-01'
      },
      {
        id: '2',
        institution: 'Stanford University',
        degree: "Master's Degree",
        field: 'Statistics',
        graduationDate: '2015-05-01'
      },
      {
        id: '3',
        institution: 'UC Berkeley',
        degree: "Bachelor's Degree",
        field: 'Mathematics',
        graduationDate: '2013-05-01'
      }
    ],
    skills: [
      'Python', 'R', 'SQL', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy',
      'AWS', 'Spark', 'Hadoop', 'Statistics', 'Machine Learning', 'Deep Learning', 'NLP'
    ]
  },

  uxDesigner: {
    personalInfo: {
      fullName: 'Isabella Garcia',
      jobTitle: 'Senior UX Designer',
      email: 'isabella@creativestudio.com',
      phone: '+1 (555) 345-6789',
      location: 'Portland, OR',
      portfolio: 'isabellagarcia.design',
      linkedin: 'linkedin.com/in/isabellagarcia',
      dribbble: 'dribbble.com/isabellagarcia'
    },
    workExperience: [
      {
        id: '1',
        company: 'Apple',
        position: 'Senior UX Designer',
        startDate: '2022-01-01',
        endDate: '',
        description: 'Leading design for iOS native applications used by millions of users. Conducting user research and usability testing to inform design decisions. Collaborating with engineering teams to ensure design feasibility and quality implementation.'
      },
      {
        id: '2',
        company: 'Airbnb',
        position: 'UX Designer',
        startDate: '2020-03-01',
        endDate: '2021-12-31',
        description: 'Designed user experiences for host and guest platforms. Created design systems and interaction patterns that improved user engagement by 25%. Led cross-functional workshops and design sprints.'
      },
      {
        id: '3',
        company: 'Design Agency',
        position: 'Junior UX Designer',
        startDate: '2018-06-01',
        endDate: '2020-02-28',
        description: 'Worked on diverse client projects ranging from e-commerce to fintech. Created wireframes, prototypes, and high-fidelity designs. Participated in client presentations and stakeholder meetings.'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Rhode Island School of Design',
        degree: "Master of Fine Arts",
        field: 'Digital + Media',
        graduationDate: '2018-05-01'
      },
      {
        id: '2',
        institution: 'California College of the Arts',
        degree: "Bachelor of Fine Arts",
        field: 'Graphic Design',
        graduationDate: '2016-05-01'
      }
    ],
    skills: [
      'User Research', 'Wireframing', 'Prototyping', 'Figma', 'Sketch', 'Adobe Creative Suite',
      'InVision', 'Principle', 'Usability Testing', 'Information Architecture', 'Design Systems'
    ]
  },

  productManager: {
    personalInfo: {
      fullName: 'David Park',
      jobTitle: 'Senior Product Manager',
      email: 'd.park@productcorp.com',
      phone: '+1 (555) 456-7890',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/davidpark-pm'
    },
    workExperience: [
      {
        id: '1',
        company: 'Google',
        position: 'Senior Product Manager',
        startDate: '2021-08-01',
        endDate: '',
        description: 'Leading product strategy for Google Workspace collaboration tools. Defined product roadmap and prioritized features based on user research and business goals. Managed cross-functional teams of 20+ engineers, designers, and analysts.'
      },
      {
        id: '2',
        company: 'Slack',
        position: 'Product Manager',
        startDate: '2019-02-01',
        endDate: '2021-07-31',
        description: 'Owned enterprise features serving 500K+ organizations. Launched 5 major features that increased user retention by 30%. Collaborated with sales and customer success teams to understand enterprise customer needs.'
      },
      {
        id: '3',
        company: 'StartupCorp',
        position: 'Associate Product Manager',
        startDate: '2017-06-01',
        endDate: '2019-01-31',
        description: 'First product hire at early-stage startup. Built product from 0 to 10K users. Conducted user interviews and market research to validate product-market fit. Worked directly with founders on company strategy.'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Stanford Graduate School of Business',
        degree: 'MBA',
        field: 'Strategy & Entrepreneurship',
        graduationDate: '2017-06-01'
      },
      {
        id: '2',
        institution: 'Northwestern University',
        degree: "Bachelor's Degree",
        field: 'Industrial Engineering',
        graduationDate: '2013-06-01'
      }
    ],
    skills: [
      'Product Strategy', 'User Research', 'Data Analysis', 'A/B Testing', 'Roadmap Planning',
      'Stakeholder Management', 'Agile Methodologies', 'SQL', 'Tableau', 'Figma', 'JIRA'
    ]
  },

  marketingManager: {
    personalInfo: {
      fullName: 'Emma Wilson',
      jobTitle: 'Digital Marketing Manager',
      email: 'emma.wilson@marketingco.com',
      phone: '+1 (555) 567-8901',
      location: 'Chicago, IL',
      linkedin: 'linkedin.com/in/emmawilson',
      website: 'emmawilson.marketing'
    },
    workExperience: [
      {
        id: '1',
        company: 'HubSpot',
        position: 'Senior Digital Marketing Manager',
        startDate: '2021-09-01',
        endDate: '',
        description: 'Leading digital marketing campaigns for B2B SaaS product. Managing $2M+ annual marketing budget and driving 40% year-over-year growth in qualified leads. Built and optimized marketing automation workflows.'
      },
      {
        id: '2',
        company: 'Salesforce',
        position: 'Digital Marketing Specialist',
        startDate: '2019-03-01',
        endDate: '2021-08-31',
        description: 'Executed multi-channel marketing campaigns across email, social media, and paid advertising. Analyzed campaign performance and optimized for conversion rate improvements. Collaborated with sales team on lead qualification.'
      },
      {
        id: '3',
        company: 'Marketing Agency',
        position: 'Marketing Coordinator',
        startDate: '2017-06-01',
        endDate: '2019-02-28',
        description: 'Supported marketing campaigns for 15+ clients across various industries. Created content for social media, email newsletters, and blog posts. Managed client relationships and campaign reporting.'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Northwestern University',
        degree: "Master's Degree",
        field: 'Integrated Marketing Communications',
        graduationDate: '2017-06-01'
      },
      {
        id: '2',
        institution: 'University of Illinois',
        degree: "Bachelor's Degree",
        field: 'Marketing',
        graduationDate: '2015-05-01'
      }
    ],
    skills: [
      'Digital Marketing', 'Content Marketing', 'SEO/SEM', 'Email Marketing', 'Social Media Marketing',
      'Marketing Automation', 'Google Analytics', 'A/B Testing', 'CRM Management', 'Campaign Analysis'
    ]
  },

  freshGraduate: {
    personalInfo: {
      fullName: 'Alex Rodriguez',
      jobTitle: 'Recent Computer Science Graduate',
      email: 'alex.rodriguez@university.edu',
      phone: '+1 (555) 678-9012',
      location: 'Austin, TX',
      github: 'github.com/alexrodriguez',
      linkedin: 'linkedin.com/in/alexrodriguez'
    },
    workExperience: [
      {
        id: '1',
        company: 'Google',
        position: 'Software Engineering Intern',
        startDate: '2023-06-01',
        endDate: '2023-08-31',
        description: 'Developed features for Google Search using Java and internal tools. Collaborated with senior engineers on performance optimization projects. Presented final project to team of 50+ engineers.'
      },
      {
        id: '2',
        company: 'University IT Department',
        position: 'Student Developer',
        startDate: '2022-09-01',
        endDate: '2023-05-31',
        description: 'Built and maintained university web applications used by 40K+ students. Learned full-stack development using React, Node.js, and PostgreSQL. Worked in agile environment with weekly sprints.'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University of Texas at Austin',
        degree: "Bachelor's Degree",
        field: 'Computer Science',
        graduationDate: '2023-12-01'
      }
    ],
    skills: [
      'Java', 'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'Algorithm Design',
      'Data Structures', 'Object-Oriented Programming', 'Agile Methodologies'
    ]
  }
};

export const allProfiles = Object.values(mockProfiles);