import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Still use for clicks
import { PersonalInfo, PersonalInfoData } from './PersonalInfo'; // Adjust path as needed

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
    it('should add a new text input field when "Add New Field" is clicked and field name is submitted', async () => {
      const user = userEvent.setup(); // userEvent for clicks
      let currentData = { ...defaultData };
      const { rerender } = render(
        <PersonalInfo 
          data={currentData} 
          onChange={(newData) => { currentData = newData; mockOnChangeOriginal(newData); }} 
        />
      );

      await user.click(screen.getByRole('button', { name: /add new field/i }));
      await user.type(await screen.findByPlaceholderText('Enter new field name'), 'customField');
      await user.click(await screen.findByRole('button', { name: 'Add' }));
      
      rerender(
        <PersonalInfo 
          data={currentData} 
          onChange={(newData) => { currentData = newData; mockOnChangeOriginal(newData); }} 
        />
      );

      const newCustomFieldInput = await screen.findByLabelText('Custom Field');
      expect(newCustomFieldInput).toBeInTheDocument();
      expect(newCustomFieldInput).toHaveValue('');
      expect(mockOnChangeOriginal).toHaveBeenCalledWith({ ...defaultData, customField: '' });
    });

    it('should add a new textarea field if the new field name suggests long text (e.g. "myBio")', async () => {
      const user = userEvent.setup();
      let currentData = { ...defaultData };
      const { rerender } = render(
        <PersonalInfo 
          data={currentData} 
          onChange={(newData) => { currentData = newData; mockOnChangeOriginal(newData); }} 
        />
      );

      await user.click(screen.getByRole('button', { name: /add new field/i }));
      await user.type(await screen.findByPlaceholderText('Enter new field name'), 'myBio');
      await user.click(await screen.findByRole('button', { name: 'Add' }));
      
      rerender(
        <PersonalInfo 
          data={currentData} 
          onChange={(newData) => { currentData = newData; mockOnChangeOriginal(newData); }} 
        />
      );
      
      const newTextArea = await screen.findByLabelText('My Bio');
      expect(newTextArea.tagName).toBe('TEXTAREA');
      expect(newTextArea).toHaveValue('');
      expect(mockOnChangeOriginal).toHaveBeenCalledWith({ ...defaultData, myBio: '' });
    });
  });
});
