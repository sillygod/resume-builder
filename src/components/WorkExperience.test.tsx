import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WorkExperience, WorkExperienceEntry } from './WorkExperience'; // Adjust path

const mockOnChangeOriginal = vi.fn();

const sampleEntries: WorkExperienceEntry[] = [
  {
    id: 'work1',
    company: 'Tech Solutions Inc.',
    position: 'Senior Developer', 
    startDate: '2020-01-15',
    endDate: 'Present',
    description: 'Led development of key features.',
  },
  {
    id: 'work2',
    company: 'Web Innovations LLC',
    position: 'Junior Developer',
    startDate: '2018-06-01',
    endDate: '2019-12-31',
    description: 'Contributed to client projects.',
  },
];

const getEntryContainer = (index: number) => {
  const workExperienceHeading = screen.getByText('Work Experience');
  // .space-y-4 is the main card for WorkExperience section
  // .space-y-6 is the direct container of the list of experience entries
  const mainListOfEntriesContainer = workExperienceHeading.parentElement?.querySelector('.space-y-6');

  if (!mainListOfEntriesContainer) {
    // Fallback or error if structure is not as expected
    // This might happen if there are no entries, in which case .space-y-6 might not be rendered or found this way.
    // For tests that expect entries, this should ideally be found.
    const noEntriesMessage = "Main container for list of entries (.space-y-6) not found. Are entries rendered?";
    // console.log(workExperienceHeading.parentElement?.innerHTML); // Log parent HTML for context
    throw new Error(noEntriesMessage);
  }
  
  // Get direct children DIV elements that have the expected class for an entry
  const entryDivs = Array.from(mainListOfEntriesContainer.children).filter(
    (child) => child.tagName === 'DIV' && child.classList.contains('p-4') && child.classList.contains('border')
  ) as HTMLElement[];

  if (entryDivs.length <= index) {
    console.log(`DEBUG: Found ${entryDivs.length} entry containers (expected at least ${index + 1}).`);
    // console.log('mainListOfEntriesContainer.innerHTML:', mainListOfEntriesContainer.innerHTML); 
    throw new Error(`Entry container at index ${index} not found. Found ${entryDivs.length} containers.`);
  }
  return entryDivs[index];
};


describe('WorkExperience Component', () => {
  beforeEach(() => {
    mockOnChangeOriginal.mockClear();
  });

  describe('Initial Rendering', () => {
    it('should render all entries passed via the entries prop', () => {
      render(<WorkExperience entries={sampleEntries} onChange={mockOnChangeOriginal} />);
      
      expect(screen.getByDisplayValue(sampleEntries[0].company)).toBeInTheDocument();
      expect(screen.getByDisplayValue(sampleEntries[1].company)).toBeInTheDocument();
      
      const allButtons = screen.getAllByRole('button');
      const removeButtons = allButtons.filter(btn => btn.querySelector('svg.lucide-trash2'));
      expect(removeButtons).toHaveLength(sampleEntries.length);
    });

    it('should render all fields for each entry with correct initial values', () => {
      render(<WorkExperience entries={sampleEntries} onChange={mockOnChangeOriginal} />);
      
      sampleEntries.forEach((entry, index) => {
        const entryContainer = getEntryContainer(index);
        expect(within(entryContainer).getByPlaceholderText('Company name')).toHaveValue(entry.company);
        expect(within(entryContainer).getByPlaceholderText('Job title')).toHaveValue(entry.position);
        
        const startDateInput = within(entryContainer).getByDisplayValue(entry.startDate) as HTMLInputElement;
        expect(startDateInput.type).toBe('date');

        const allDateInputsInEntry = Array.from(entryContainer.querySelectorAll('input[type="date"]'));
        let endDateInput: HTMLInputElement | undefined;

        // Determine which input is the end date input. Assumes Start Date is always first.
        if (allDateInputsInEntry.length > 1) {
            endDateInput = allDateInputsInEntry[1];
        } else if (allDateInputsInEntry.length === 1) {
            // If only one date input, and we are checking endDate, this might be an issue
            // or it could mean start date is not rendered or this is the only date field.
            // For this component, we expect two date fields per entry.
            // This path indicates a problem if reached for endDate check unless startDate is not a date type.
            endDateInput = allDateInputsInEntry[0]; // This might be start date if only one present
        } else {
            throw new Error(`No date inputs found for entry ${index}`);
        }
        
        if (entry.endDate === "Present") {
          // If start date and end date inputs are the same due to only one being found,
          // and endDate is "Present", then its value should be empty.
          if (startDateInput === endDateInput) {
             // This situation implies that the "Present" value for endDate means the input field is the same as startDate,
             // which is not typical. More likely, the second date input is targeted and its value is empty.
             // The logic above for allDateInputsInEntry.length > 1 should handle the typical case.
             // This specific check is if only one date input was found in the entire entry.
             expect(endDateInput.value).toBe(""); 
          } else {
             expect(endDateInput.value).toBe(""); // For "Present", the date input value is empty
          }
        } else {
          expect(endDateInput.value).toBe(entry.endDate);
        }
        expect(endDateInput.type).toBe('date');
        
        expect(within(entryContainer).getByPlaceholderText('Describe your responsibilities and achievements')).toHaveValue(entry.description);
      });
    });

    it('should render the "Add Experience" button but no entry forms when entries is empty', () => {
      render(<WorkExperience entries={[]} onChange={mockOnChangeOriginal} />);
      expect(screen.getByRole('button', { name: /add experience/i })).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Company name')).not.toBeInTheDocument();
    });
  });

  describe('Adding a New Experience', () => {
    it('should call onChange with a new entry when "Add Experience" is clicked', async () => {
      const user = userEvent.setup();
      render(<WorkExperience entries={[]} onChange={mockOnChangeOriginal} />);
      await user.click(screen.getByRole('button', { name: /add experience/i }));
      
      expect(mockOnChangeOriginal).toHaveBeenCalledTimes(1);
      const newEntries = mockOnChangeOriginal.mock.calls[0][0] as WorkExperienceEntry[];
      expect(newEntries).toHaveLength(1);
      expect(newEntries[0]).toEqual(expect.objectContaining({
        id: expect.any(String), company: '', position: '', startDate: '', endDate: '', description: '',
      }));
    });

    it('should render a new set of input fields after a new entry is added and component is re-rendered', () => {
      const newEntry: WorkExperienceEntry = {
        id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: ''
      };
      const { rerender } = render(<WorkExperience entries={[]} onChange={mockOnChangeOriginal} />);
      rerender(<WorkExperience entries={[newEntry]} onChange={mockOnChangeOriginal} />);
      // After re-render, the new entry's form should be there.
      const entryContainer = getEntryContainer(0); // Get the first (and only) entry container
      expect(within(entryContainer).getByPlaceholderText('Company name')).toBeInTheDocument();
      expect(within(entryContainer).getByPlaceholderText('Job title')).toBeInTheDocument();
    });
  });

  describe('Updating an Experience Entry', () => {
    it('should call onChange with updated entries when a field in an entry is changed', async () => {
      let currentEntries = JSON.parse(JSON.stringify(sampleEntries));
      const { rerender } = render(
        <WorkExperience entries={currentEntries} onChange={(updatedEntries) => {
            currentEntries = updatedEntries; mockOnChangeOriginal(updatedEntries);
        }} />
      );

      const firstEntryContainer = getEntryContainer(0);
      const companyInput = within(firstEntryContainer).getByPlaceholderText('Company name') as HTMLInputElement;
      const updatedCompany = 'New Company Name';
      fireEvent.change(companyInput, { target: { value: updatedCompany } });
      
      rerender(<WorkExperience entries={currentEntries} onChange={(updatedEntries) => {
          currentEntries = updatedEntries; mockOnChangeOriginal(updatedEntries);
      }} />);
      
      expect(companyInput.value).toBe(updatedCompany);
      expect(mockOnChangeOriginal).toHaveBeenCalled();
      const lastCallArgs = mockOnChangeOriginal.mock.calls[mockOnChangeOriginal.mock.calls.length - 1][0] as WorkExperienceEntry[];
      expect(lastCallArgs[0].company).toBe(updatedCompany);
      expect(lastCallArgs[1].company).toBe(sampleEntries[1].company); 
    });
  });

  describe('Removing an Experience Entry', () => {
    it('should call onChange with the entry removed when "Remove" is clicked', async () => {
      const user = userEvent.setup();
      // Need to re-render to ensure the button is interactive after initial render
      const { rerender } = render(<WorkExperience entries={sampleEntries} onChange={mockOnChangeOriginal} />);
      rerender(<WorkExperience entries={sampleEntries} onChange={mockOnChangeOriginal} />);


      const firstEntryContainer = getEntryContainer(0);
      const removeButton = within(firstEntryContainer).getByRole('button'); 
      await user.click(removeButton); 
      
      expect(mockOnChangeOriginal).toHaveBeenCalledTimes(1);
      const updatedEntries = mockOnChangeOriginal.mock.calls[0][0] as WorkExperienceEntry[];
      expect(updatedEntries).toHaveLength(sampleEntries.length - 1);
      expect(updatedEntries.find(entry => entry.id === sampleEntries[0].id)).toBeUndefined();
      expect(updatedEntries[0].id).toBe(sampleEntries[1].id);
    });

    it('should remove the entry form from UI after re-render', () => {
      const initialEntries = [...sampleEntries];
      const entriesAfterRemove = [initialEntries[1]]; 
      const { rerender } = render(<WorkExperience entries={initialEntries} onChange={mockOnChangeOriginal} />);
      
      // Verify initial state (2 entries)
      let companyInputs = screen.getAllByPlaceholderText('Company name');
      expect(companyInputs).toHaveLength(2);

      // Re-render with one entry removed
      rerender(<WorkExperience entries={entriesAfterRemove} onChange={mockOnChangeOriginal} />);
      
      // Verify updated state (1 entry)
      companyInputs = screen.getAllByPlaceholderText('Company name');
      expect(companyInputs).toHaveLength(1);
      expect(screen.getByDisplayValue(initialEntries[1].company)).toBeInTheDocument();
      expect(screen.queryByDisplayValue(initialEntries[0].company)).not.toBeInTheDocument();
    });
  });
});
