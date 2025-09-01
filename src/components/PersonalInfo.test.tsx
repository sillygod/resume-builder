import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Still use for clicks
import { PersonalInfo, PersonalInfoData } from './PersonalInfo'; // Adjust path as needed

// Mock JSDOM methods for Radix UI AlertDialog
beforeEach(() => {
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = vi.fn(() => false);
  }
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = vi.fn();
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = vi.fn();
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = vi.fn();
  }
});

// Mock useDynamicFormFields hook
vi.mock('../hooks/useDynamicFormFields', () => ({
  useDynamicFormFields: ({ initialData, defaultFields, onAddField }: any) => ({
    fields: [...defaultFields, ...Object.keys(initialData || {})],
    isDialogOpen: false,
    newFieldName: '',
    openDialog: vi.fn(),
    closeDialog: vi.fn(),
    handleAddField: vi.fn(),
    setNewFieldName: vi.fn(),
    formatFieldLabel: (field: string) => field.replace(/([A-Z])/g, ' $1').replace(/^./, (str: string) => str.toUpperCase()).trim(),
    getInputType: (field: string) => field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text',
    shouldUseTextarea: (field: string) => ['summary', 'description', 'bio'].includes(field.toLowerCase())
  })
}));

const mockOnChangeOriginal = vi.fn();

const defaultData: PersonalInfoData = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  location: 'New York, NY',
  jobTitle: 'Software Engineer',
  website: 'johndoe.dev',
  linkedin: 'linkedin.com/johndoe',
  github: 'github.com/johndoe',
};

describe('PersonalInfo Component', () => {
  beforeEach(() => {
    mockOnChangeOriginal.mockClear();
  });

  describe('Initial Rendering', () => {
    it('should render all fields from initial data with correct labels and values', () => {
      render(<PersonalInfo data={defaultData} onChange={mockOnChangeOriginal} />);
      expect(screen.getByLabelText('Full Name')).toHaveValue(defaultData.fullName);
      // ... other initial rendering assertions ...
      expect(screen.getByLabelText('Email')).toHaveValue(defaultData.email);
      expect(screen.getByLabelText('Phone')).toHaveValue(defaultData.phone);
      expect(screen.getByLabelText('Location')).toHaveValue(defaultData.location);
      expect(screen.getByLabelText('Job Title')).toHaveValue(defaultData.jobTitle);
      expect(screen.getByLabelText('Website')).toHaveValue(defaultData.website);
      expect(screen.getByLabelText('Linkedin')).toHaveValue(defaultData.linkedin);
      expect(screen.getByLabelText('Github')).toHaveValue(defaultData.github);
    });

    it('should render specific input types for email and phone', () => {
      render(<PersonalInfo data={defaultData} onChange={mockOnChangeOriginal} />);
      expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
      expect(screen.getByLabelText('Phone')).toHaveAttribute('type', 'tel');
    });
    
    it('should render textarea for fields "summary", "description", "bio"', () => {
      const dataWithLongFields: PersonalInfoData = { ...defaultData, summary: 'S', description: 'D', bio: 'B' };
      render(<PersonalInfo data={dataWithLongFields} onChange={mockOnChangeOriginal} />);
      expect(screen.getByLabelText('Summary').tagName).toBe('TEXTAREA');
      expect(screen.getByLabelText('Description').tagName).toBe('TEXTAREA');
      expect(screen.getByLabelText('Bio').tagName).toBe('TEXTAREA');
    });

    it('should render input for field "about" if not specified as textarea', () => {
      const dataWithAbout: PersonalInfoData = { ...defaultData, about: 'About me' };
      render(<PersonalInfo data={dataWithAbout} onChange={mockOnChangeOriginal} />);
      expect(screen.getByLabelText('About').tagName).toBe('INPUT');
    });
  });

  describe('Input Interaction (onChange)', () => {
    it('should call onChange with updated data when an input field value changes', async () => {
      let currentData = { ...defaultData };
      const { rerender } = render(
        <PersonalInfo 
          data={currentData} 
          onChange={(newData) => { currentData = newData; mockOnChangeOriginal(newData); }} 
        />
      );

      const fullNameInput = screen.getByLabelText('Full Name') as HTMLInputElement;
      const newFullName = 'Jane Doe';
      
      // Use fireEvent.change for direct value setting
      fireEvent.change(fullNameInput, { target: { value: newFullName } });
      rerender(
        <PersonalInfo 
          data={currentData} 
          onChange={(newData) => { currentData = newData; mockOnChangeOriginal(newData); }} 
        />
      );
      expect(fullNameInput.value).toBe(newFullName); // Check input value after re-render
      expect(mockOnChangeOriginal).toHaveBeenCalledWith({ ...defaultData, fullName: newFullName });


      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const newEmail = 'jane.doe@example.com';
      fireEvent.change(emailInput, { target: { value: newEmail } });
      rerender(
        <PersonalInfo 
          data={currentData} // currentData now includes previous fullName change
          onChange={(newData) => { currentData = newData; mockOnChangeOriginal(newData); }} 
        />
      );
      expect(emailInput.value).toBe(newEmail);
      expect(mockOnChangeOriginal).toHaveBeenCalledWith({ ...defaultData, fullName: newFullName, email: newEmail });
    });

    it('should call onChange with updated data for a textarea field', async () => {
        const initialSummary = 'Initial summary.';
        const updatedSummary = 'Updated summary text.';
        let currentData: PersonalInfoData = { ...defaultData, summary: initialSummary };
        
        const { rerender } = render(
          <PersonalInfo 
            data={currentData} 
            onChange={(newData) => { currentData = newData; mockOnChangeOriginal(newData); }} 
          />
        );

        const summaryTextarea = screen.getByLabelText('Summary') as HTMLTextAreaElement;
        fireEvent.change(summaryTextarea, { target: { value: updatedSummary } });
        
        rerender(
          <PersonalInfo 
            data={currentData} 
            onChange={(newData) => { currentData = newData; mockOnChangeOriginal(newData); }} 
          />
        );
        expect(summaryTextarea.value).toBe(updatedSummary);
        expect(mockOnChangeOriginal).toHaveBeenCalledWith({ ...defaultData, summary: updatedSummary });
    });
  });

  describe('Adding a New Field', () => {
    it('should simulate adding a new field with mock', () => {
      // Since we're mocking useDynamicFormFields, we can test that the component 
      // properly renders fields from the hook's return value
      const dataWithCustomField = { ...defaultData, customField: '' };
      render(<PersonalInfo data={dataWithCustomField} onChange={mockOnChangeOriginal} />);
      
      const customFieldInput = screen.getByLabelText('Custom Field');
      expect(customFieldInput).toBeInTheDocument();
      expect(customFieldInput).toHaveValue('');
    });

    it('should render textarea for bio field', () => {
      const dataWithBio = { ...defaultData, bio: 'My bio text' };
      render(<PersonalInfo data={dataWithBio} onChange={mockOnChangeOriginal} />);
      
      const bioTextarea = screen.getByLabelText('Bio');
      expect(bioTextarea.tagName).toBe('TEXTAREA');
      expect(bioTextarea).toHaveValue('My bio text');
    });
  });
});
