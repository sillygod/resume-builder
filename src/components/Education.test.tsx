import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Education, EducationEntry } from './Education'; // Adjust path if necessary

const mockOnChangeOriginal = vi.fn();

const sampleEntries: EducationEntry[] = [
  {
    id: 'edu1',
    institution: 'State University',
    degree: 'B.Sc. Computer Science',
    field: 'Computer Science',
    graduationDate: '2020-05-31',
    // 'description' is not in the component's EducationEntry interface
  },
  {
    id: 'edu2',
    institution: 'Tech Institute',
    degree: 'M.Sc. Software Engineering',
    field: 'Software Engineering',
    graduationDate: '2023-05-31',
  },
];

const getEntryContainer = (index: number) => {
  const educationHeading = screen.getByText('Education');
  const mainListOfEntriesContainer = educationHeading.parentElement?.querySelector('.space-y-6');

  if (!mainListOfEntriesContainer) {
    throw new Error('Main container for list of education entries (.space-y-6) not found.');
  }
  
  const entryDivs = Array.from(mainListOfEntriesContainer.children).filter(
    (child) => child.tagName === 'DIV' && child.classList.contains('p-4') && child.classList.contains('border')
  ) as HTMLElement[];

  if (entryDivs.length <= index) {
    console.log(`DEBUG: Found ${entryDivs.length} education entry containers (expected at least ${index + 1}).`);
    // console.log('mainListOfEntriesContainer.innerHTML:', mainListOfEntriesContainer.innerHTML); 
    throw new Error(`Education entry container at index ${index} not found. Found ${entryDivs.length} containers.`);
  }
  return entryDivs[index];
};

describe('Education Component', () => {
  beforeEach(() => {
    mockOnChangeOriginal.mockClear();
  });

  describe('Initial Rendering', () => {
    it('should render all entries passed via the entries prop', () => {
      render(<Education entries={sampleEntries} onChange={mockOnChangeOriginal} />);
      
      expect(screen.getByDisplayValue(sampleEntries[0].institution)).toBeInTheDocument();
      expect(screen.getByDisplayValue(sampleEntries[1].institution)).toBeInTheDocument();
      
      const allButtons = screen.getAllByRole('button');
      const removeButtons = allButtons.filter(btn => btn.querySelector('svg.lucide-trash2'));
      expect(removeButtons).toHaveLength(sampleEntries.length);
    });

    it('should render all relevant fields for each entry with correct initial values', () => {
      render(<Education entries={sampleEntries} onChange={mockOnChangeOriginal} />);
      
      sampleEntries.forEach((entry, index) => {
        const entryContainer = getEntryContainer(index);
        expect(within(entryContainer).getByPlaceholderText('University name')).toHaveValue(entry.institution);
        expect(within(entryContainer).getByPlaceholderText("e.g., Bachelor's, Master's")).toHaveValue(entry.degree);
        expect(within(entryContainer).getByPlaceholderText('e.g., Computer Science')).toHaveValue(entry.field);
        expect(within(entryContainer).getByDisplayValue(entry.graduationDate)).toBeInTheDocument();
      });
    });

    it('should render the "Add Education" button but no entry forms when entries is empty', () => {
      render(<Education entries={[]} onChange={mockOnChangeOriginal} />);
      expect(screen.getByRole('button', { name: /add education/i })).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('University name')).not.toBeInTheDocument();
    });
  });

  describe('Adding a New Education Entry', () => {
    it('should call onChange with a new entry when "Add Education" is clicked', async () => {
      const user = userEvent.setup();
      render(<Education entries={[]} onChange={mockOnChangeOriginal} />);
      await user.click(screen.getByRole('button', { name: /add education/i }));
      
      expect(mockOnChangeOriginal).toHaveBeenCalledTimes(1);
      const newEntries = mockOnChangeOriginal.mock.calls[0][0] as EducationEntry[];
      expect(newEntries).toHaveLength(1);
      expect(newEntries[0]).toEqual(expect.objectContaining({
        id: expect.any(String),
        institution: '',
        degree: '',
        field: '', 
        graduationDate: '',
        // No description field in the component's new entry structure
      }));
    });

    it('should render a new set of input fields after a new entry is added (simulating re-render)', () => {
      const newEntry: EducationEntry = {
        id: 'newEdu1', institution: '', degree: '', field: '', graduationDate: ''
      };
      const { rerender } = render(<Education entries={[]} onChange={mockOnChangeOriginal} />);
      rerender(<Education entries={[newEntry]} onChange={mockOnChangeOriginal} />);
      
      const entryContainer = getEntryContainer(0); 
      expect(within(entryContainer).getByPlaceholderText('University name')).toBeInTheDocument();
      expect(within(entryContainer).getByPlaceholderText("e.g., Bachelor's, Master's")).toBeInTheDocument();
    });
  });

  describe('Updating an Education Entry', () => {
    it('should call onChange with updated entries when a field in an entry is changed', async () => {
      let currentEntries = JSON.parse(JSON.stringify(sampleEntries)); 
      const { rerender } = render(
        <Education 
          entries={currentEntries} 
          onChange={(updatedEntries) => {
            currentEntries = updatedEntries; 
            mockOnChangeOriginal(updatedEntries);
          }} 
        />
      );

      const firstEntryContainer = getEntryContainer(0);
      const institutionInput = within(firstEntryContainer).getByPlaceholderText('University name') as HTMLInputElement;
      const updatedInstitution = 'New University Name';
      
      fireEvent.change(institutionInput, { target: { value: updatedInstitution } });
      
      rerender(
        <Education 
          entries={currentEntries} 
          onChange={(updatedEntries) => { currentEntries = updatedEntries; mockOnChangeOriginal(updatedEntries); }} 
        />
      );
      
      expect(institutionInput.value).toBe(updatedInstitution);
      expect(mockOnChangeOriginal).toHaveBeenCalled();
      const lastCallArgs = mockOnChangeOriginal.mock.calls[mockOnChangeOriginal.mock.calls.length - 1][0] as EducationEntry[];
      expect(lastCallArgs[0].institution).toBe(updatedInstitution);
      expect(lastCallArgs[1].institution).toBe(sampleEntries[1].institution); 
    });
  });

  describe('Removing an Education Entry', () => {
    it('should call onChange with the entry removed when "Remove" is clicked', async () => {
      const user = userEvent.setup();
      render(<Education entries={sampleEntries} onChange={mockOnChangeOriginal} />);
      
      const firstEntryContainer = getEntryContainer(0);
      const removeButton = within(firstEntryContainer).getAllByRole('button')[0]; // Assumes trash icon button is the first/only direct button
      await user.click(removeButton); 
      
      expect(mockOnChangeOriginal).toHaveBeenCalledTimes(1);
      const updatedEntries = mockOnChangeOriginal.mock.calls[0][0] as EducationEntry[];
      expect(updatedEntries).toHaveLength(sampleEntries.length - 1);
      expect(updatedEntries.find(entry => entry.id === sampleEntries[0].id)).toBeUndefined();
      expect(updatedEntries[0].id).toBe(sampleEntries[1].id);
    });

    it('should remove the entry form from UI after re-render', () => {
      const initialEntries = [...sampleEntries];
      const entriesAfterRemove = [initialEntries[1]]; 
      const { rerender } = render(<Education entries={initialEntries} onChange={mockOnChangeOriginal} />);
      
      expect(screen.getAllByPlaceholderText('University name')).toHaveLength(2);
      rerender(<Education entries={entriesAfterRemove} onChange={mockOnChangeOriginal} />);
      expect(screen.getAllByPlaceholderText('University name')).toHaveLength(1);
      expect(screen.getByDisplayValue(initialEntries[1].institution)).toBeInTheDocument();
      expect(screen.queryByDisplayValue(initialEntries[0].institution)).not.toBeInTheDocument();
    });
  });
});
