import type { Meta, StoryObj } from '@storybook/react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'UI Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component with header, content, and footer sections. Built with semantic HTML elements and styled with Tailwind CSS.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the card'
    }
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic card examples
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent className="pt-6">
        <p>A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const HeaderOnly: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Email notifications</span>
            <input type="checkbox" />
          </div>
          <div className="flex items-center justify-between">
            <span>Push notifications</span>
            <input type="checkbox" />
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

// Resume-specific card examples
export const PersonalInfoCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Basic details about yourself</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <input 
              className="w-full px-3 py-2 border rounded-md" 
              value="John Doe" 
              readOnly
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Title</label>
            <input 
              className="w-full px-3 py-2 border rounded-md" 
              value="Software Engineer" 
              readOnly
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input 
              className="w-full px-3 py-2 border rounded-md" 
              value="john.doe@example.com" 
              readOnly
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <input 
              className="w-full px-3 py-2 border rounded-md" 
              value="+1 (555) 123-4567" 
              readOnly
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Edit Information</Button>
      </CardFooter>
    </Card>
  ),
};

export const WorkExperienceCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>Your professional experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold">Senior Software Engineer</h3>
            <p className="text-sm text-gray-600">Tech Company Inc.</p>
            <p className="text-xs text-gray-500">2022 - Present</p>
            <p className="text-sm mt-2">Led development of web applications using React and Node.js.</p>
          </div>
          <div className="border-l-4 border-gray-300 pl-4">
            <h3 className="font-semibold">Software Engineer</h3>
            <p className="text-sm text-gray-600">StartupCorp</p>
            <p className="text-xs text-gray-500">2020 - 2022</p>
            <p className="text-sm mt-2">Developed full-stack applications and improved system performance.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm">Add Experience</Button>
        <Button variant="ghost" size="sm">Edit</Button>
      </CardFooter>
    </Card>
  ),
};

// Card variations
export const WithLongContent: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Long Content Example</CardTitle>
        <CardDescription>This card demonstrates how it handles longer content</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
          nostrud exercitation ullamco laboris.
        </p>
        <p className="mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <code className="text-sm">
            const example = "This is some code content";
          </code>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  ),
};

export const MultipleActions: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Project Card</CardTitle>
        <CardDescription>Resume Builder Application</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A React-based application for creating professional resumes with multiple layout options.</p>
        <div className="flex gap-2 mt-4">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">React</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">TypeScript</span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Tailwind</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button>View Project</Button>
        <Button variant="outline">Edit</Button>
        <Button variant="ghost" size="sm">Delete</Button>
      </CardFooter>
    </Card>
  ),
};

// Responsive showcase
export const ResponsiveCards: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
          <CardDescription>First card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for the first card.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
          <CardDescription>Second card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for the second card.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
          <CardDescription>Third card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for the third card.</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Cards displayed in a responsive grid layout that adapts to different screen sizes.'
      }
    }
  }
};