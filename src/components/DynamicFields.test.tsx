import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DynamicFields from './DynamicFields';

describe('DynamicFields Component', () => {
  it('renders nothing with empty data', () => {
    const { container } = render(<DynamicFields data={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing with null data', () => {
    const { container } = render(<DynamicFields data={null as any} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing with undefined data', () => {
    const { container } = render(<DynamicFields data={undefined as any} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders simple string values', () => {
    const data = {
      website: 'https://example.com',
      bio: 'Software engineer with 5 years experience'
    };

    render(<DynamicFields data={data} />);

    expect(screen.getByText('website')).toBeInTheDocument();
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
    expect(screen.getByText('bio')).toBeInTheDocument();
    expect(screen.getByText('Software engineer with 5 years experience')).toBeInTheDocument();
  });

  it('renders number values as strings', () => {
    const data = {
      yearsExperience: 5,
      age: 30
    };

    render(<DynamicFields data={data} />);

    expect(screen.getByText('yearsExperience')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('age')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('renders boolean values as strings', () => {
    const data = {
      isActive: true,
      isPublic: false
    };

    render(<DynamicFields data={data} />);

    expect(screen.getByText('isActive')).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
    expect(screen.getByText('isPublic')).toBeInTheDocument();
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  it('renders array of strings as list', () => {
    const data = {
      languages: ['English', 'Spanish', 'French']
    };

    render(<DynamicFields data={data} />);

    expect(screen.getByText('languages')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Spanish')).toBeInTheDocument();
    expect(screen.getByText('French')).toBeInTheDocument();
  });

  it('renders array of numbers as list', () => {
    const data = {
      scores: [85, 90, 92]
    };

    render(<DynamicFields data={data} />);

    expect(screen.getByText('scores')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
    expect(screen.getByText('92')).toBeInTheDocument();
  });

  it('renders array of objects as JSON strings', () => {
    const data = {
      projects: [
        { name: 'Project 1', tech: 'React' },
        { name: 'Project 2', tech: 'Vue' }
      ]
    };

    render(<DynamicFields data={data} />);

    expect(screen.getByText('projects')).toBeInTheDocument();
    expect(screen.getByText('{"name":"Project 1","tech":"React"}')).toBeInTheDocument();
    expect(screen.getByText('{"name":"Project 2","tech":"Vue"}')).toBeInTheDocument();
  });

  it('renders nested objects recursively', () => {
    const data = {
      contact: {
        phone: '123-456-7890',
        email: 'test@example.com',
        address: {
          street: '123 Main St',
          city: 'Anytown'
        }
      }
    };

    render(<DynamicFields data={data} />);

    expect(screen.getByText('contact')).toBeInTheDocument();
    expect(screen.getByText('phone')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('address')).toBeInTheDocument();
    expect(screen.getByText('street')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('city')).toBeInTheDocument();
    expect(screen.getByText('Anytown')).toBeInTheDocument();
  });

  it('capitalizes field names', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Developer'
    };

    render(<DynamicFields data={data} />);

    expect(screen.getByText('firstName')).toBeInTheDocument();
    expect(screen.getByText('lastName')).toBeInTheDocument();
    expect(screen.getByText('jobTitle')).toBeInTheDocument();
  });

  it('handles mixed data types', () => {
    const data = {
      name: 'John Doe',
      age: 30,
      isActive: true,
      skills: ['JavaScript', 'React'],
      contact: {
        email: 'john@example.com'
      },
      projects: [
        { name: 'Project 1' }
      ]
    };

    render(<DynamicFields data={data} />);

    // String
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Number
    expect(screen.getByText('age')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();

    // Boolean
    expect(screen.getByText('isActive')).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();

    // Array of strings
    expect(screen.getByText('skills')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();

    // Nested object
    expect(screen.getByText('contact')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();

    // Array of objects
    expect(screen.getByText('projects')).toBeInTheDocument();
    expect(screen.getByText('{"name":"Project 1"}')).toBeInTheDocument();
  });

  it('handles empty arrays', () => {
    const data = {
      emptyArray: []
    };

    render(<DynamicFields data={data} />);

    expect(screen.getByText('emptyArray')).toBeInTheDocument();
    // Should render a ul but with no items
    const container = screen.getByText('emptyArray').nextElementSibling;
    expect(container?.tagName.toLowerCase()).toBe('ul');
    expect(container?.children).toHaveLength(0);
  });

  it('handles null values within objects', () => {
    const data = {
      nullValue: null,
      undefinedValue: undefined
    };

    render(<DynamicFields data={data} />);

    expect(screen.getByText('nullValue')).toBeInTheDocument();
    expect(screen.getByText('null')).toBeInTheDocument();
    expect(screen.getByText('undefinedValue')).toBeInTheDocument();
    expect(screen.getByText('undefined')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const data = {
      simpleField: 'value',
      arrayField: ['item1', 'item2'],
      objectField: { nested: 'value' }
    };

    render(<DynamicFields data={data} />);

    // Check main container has correct class
    const container = screen.getByText('simpleField').closest('.dynamic-fields');
    expect(container).toHaveClass('dynamic-fields');

    // Check field containers have correct classes
    const fieldContainer = screen.getByText('simpleField').closest('.mb-4');
    expect(fieldContainer).toHaveClass('mb-4');

    // Check headings have correct classes
    const heading = screen.getByText('simpleField');
    expect(heading).toHaveClass('text-lg', 'font-semibold', 'capitalize');
  });
});