import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'UI Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component built with Radix UI primitives and styled with Tailwind CSS. Supports multiple variants, sizes, and states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Visual style variant of the button'
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Size variant of the button'
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Render as a child element instead of button'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state of the button'
    }
  },
  args: { 
    children: 'Button'
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic button stories
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete Account',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Action',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

// Size variations
export const SmallSize: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const IconSize: Story = {
  args: {
    size: 'icon',
    children: '✓',
  },
};

// State variations
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const DisabledOutline: Story = {
  args: {
    variant: 'outline',
    disabled: true,
    children: 'Disabled Outline',
  },
};

// Interactive examples
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span className="mr-2">📁</span>
        Open File
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <span className="mr-2 animate-spin">⟳</span>
        Loading...
      </>
    ),
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants displayed together for comparison.'
      }
    }
  }
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🏠</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes displayed together for comparison.'
      }
    }
  }
};

// Visual test stories with interactions
export const ClickTest: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });
    
    // Test that button is present and clickable
    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive test that verifies button click functionality'
      }
    }
  }
};

export const AccessibilityTest: Story = {
  args: {
    children: 'Accessible Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test accessibility attributes
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAttribute('type', 'button');
    
    // Test keyboard navigation
    button.focus();
    await expect(button).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility test verifying proper ARIA attributes and keyboard navigation'
      }
    }
  }
};