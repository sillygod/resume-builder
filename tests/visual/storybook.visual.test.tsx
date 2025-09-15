import { test, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';
// Import all stories from Button component
import * as ButtonStories from '../../src/stories/ui/Button.stories';
import * as ResumePreviewStories from '../../src/stories/features/ResumePreview.stories';

// Compose all stories for Button component
const {
  Default,
  Destructive,
  Outline,
  Secondary,
  Ghost,
  Link,
  AllVariants,
  AllSizes,
  ClickTest,
  AccessibilityTest
} = composeStories(ButtonStories);

// Compose key stories for ResumePreview component
const {
  SimpleTheme,
  ModernTheme,
  CenteredTheme,
  SidebarTheme,
  ExecutiveTheme,
  MinimalData,
  ExecutiveProfile
} = composeStories(ResumePreviewStories);

describe('Button Component Stories Visual Tests', () => {
  test('Default button renders correctly', () => {
    const { container } = render(<Default />);
    expect(container.firstChild).toMatchSnapshot('button-default.html');
  });

  test('Destructive button renders correctly', () => {
    const { container } = render(<Destructive />);
    expect(container.firstChild).toMatchSnapshot('button-destructive.html');
  });

  test('Outline button renders correctly', () => {
    const { container } = render(<Outline />);
    expect(container.firstChild).toMatchSnapshot('button-outline.html');
  });

  test('Secondary button renders correctly', () => {
    const { container } = render(<Secondary />);
    expect(container.firstChild).toMatchSnapshot('button-secondary.html');
  });

  test('Ghost button renders correctly', () => {
    const { container } = render(<Ghost />);
    expect(container.firstChild).toMatchSnapshot('button-ghost.html');
  });

  test('Link button renders correctly', () => {
    const { container } = render(<Link />);
    expect(container.firstChild).toMatchSnapshot('button-link.html');
  });

  test('All variants showcase renders correctly', () => {
    const { container } = render(<AllVariants />);
    expect(container.firstChild).toMatchSnapshot('button-all-variants.html');
  });

  test('All sizes showcase renders correctly', () => {
    const { container } = render(<AllSizes />);
    expect(container.firstChild).toMatchSnapshot('button-all-sizes.html');
  });
});

describe('Resume Preview Stories Visual Tests', () => {
  test('Simple theme renders correctly', () => {
    const { container } = render(<SimpleTheme />);
    expect(container.firstChild).toMatchSnapshot('resume-simple-theme.html');
  });

  test('Modern theme renders correctly', () => {
    const { container } = render(<ModernTheme />);
    expect(container.firstChild).toMatchSnapshot('resume-modern-theme.html');
  });

  test('Centered theme renders correctly', () => {
    const { container } = render(<CenteredTheme />);
    expect(container.firstChild).toMatchSnapshot('resume-centered-theme.html');
  });

  test('Sidebar theme renders correctly', () => {
    const { container } = render(<SidebarTheme />);
    expect(container.firstChild).toMatchSnapshot('resume-sidebar-theme.html');
  });

  test('Executive theme renders correctly', () => {
    const { container } = render(<ExecutiveTheme />);
    expect(container.firstChild).toMatchSnapshot('resume-executive-theme.html');
  });

  test('Minimal data resume renders correctly', () => {
    const { container } = render(<MinimalData />);
    expect(container.firstChild).toMatchSnapshot('resume-minimal-data.html');
  });

  test('Executive profile resume renders correctly', () => {
    const { container } = render(<ExecutiveProfile />);
    expect(container.firstChild).toMatchSnapshot('resume-executive-profile.html');
  });
});

describe('Story Interaction Tests', () => {
  test('Button click interaction works', async () => {
    // This test will run the play function from the ClickTest story
    const { container } = render(<ClickTest />);
    const button = container.querySelector('button');
    
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe('Click me');
  });

  test('Button accessibility test passes', async () => {
    // This test will run the play function from the AccessibilityTest story
    const { container } = render(<AccessibilityTest />);
    const button = container.querySelector('button');

    expect(button).toBeTruthy();
    // Check that the button has proper accessibility attributes
    expect(button?.tagName.toLowerCase()).toBe('button');
    expect(button?.textContent).toContain('Accessible Button');
  });
});