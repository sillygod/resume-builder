import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const meta = {
  title: 'UI Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A styled input component that supports various input types and states. Built with HTML input element and styled with Tailwind CSS.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'date', 'file'],
      description: 'HTML input type'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state of the input'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  },
  args: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic input examples
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Hello, World!',
    placeholder: 'Enter text...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'This input is disabled',
    value: 'Disabled input',
  },
};

// Different input types
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email address',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
};

export const Date: Story = {
  args: {
    type: 'date',
  },
};

export const Telephone: Story = {
  args: {
    type: 'tel',
    placeholder: '+1 (555) 123-4567',
  },
};

export const URL: Story = {
  args: {
    type: 'url',
    placeholder: 'https://example.com',
  },
};

// Input with labels (resume form context)
export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="full-name">Full Name</Label>
      <Input id="full-name" placeholder="Enter your full name" />
    </div>
  ),
};

export const JobTitleInput: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="job-title">Job Title</Label>
      <Input id="job-title" placeholder="e.g. Software Engineer" />
    </div>
  ),
};

export const ContactForm: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" placeholder="Doe" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john.doe@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Example of how inputs are used in a form context, similar to the personal information section of the resume builder.'
      }
    }
  }
};

// File input
export const FileInput: Story = {
  args: {
    type: 'file',
  },
};

// Error state (using custom styling)
export const ErrorState: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="error-input">Email Address</Label>
      <Input 
        id="error-input" 
        type="email" 
        placeholder="Enter your email"
        className="border-red-500 focus-visible:ring-red-500"
        defaultValue="invalid-email"
      />
      <p className="text-sm text-red-500">Please enter a valid email address</p>
    </div>
  ),
};

// Success state
export const SuccessState: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="success-input">Email Address</Label>
      <Input 
        id="success-input" 
        type="email" 
        placeholder="Enter your email"
        className="border-green-500 focus-visible:ring-green-500"
        defaultValue="john.doe@example.com"
      />
      <p className="text-sm text-green-500">✓ Email address is valid</p>
    </div>
  ),
};

// Different sizes
export const SmallSize: Story = {
  args: {
    placeholder: 'Small input',
    className: 'h-8 text-xs',
  },
};

export const LargeSize: Story = {
  args: {
    placeholder: 'Large input',
    className: 'h-12 text-lg px-4',
  },
};

// Work experience form example
export const WorkExperienceForm: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <h3 className="text-lg font-semibold">Work Experience</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Company name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input id="position" placeholder="Job title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Input id="start-date" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">End Date</Label>
          <Input id="end-date" type="date" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Example showing how inputs are used in the work experience form section of the resume builder.'
      }
    }
  }
};

// Input variations showcase
export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <Label>Text Input</Label>
        <Input type="text" placeholder="Text input" />
      </div>
      <div>
        <Label>Email Input</Label>
        <Input type="email" placeholder="email@example.com" />
      </div>
      <div>
        <Label>Password Input</Label>
        <Input type="password" placeholder="Password" />
      </div>
      <div>
        <Label>Number Input</Label>
        <Input type="number" placeholder="123" />
      </div>
      <div>
        <Label>Date Input</Label>
        <Input type="date" />
      </div>
      <div>
        <Label>File Input</Label>
        <Input type="file" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'All supported input types displayed together for comparison.'
      }
    }
  }
};