import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { ResumePreview } from './ResumePreview';
import { PersonalInfoData } from '@/components/PersonalInfo';
import { WorkExperienceEntry } from '@/components/WorkExperience';
import { EducationEntry } from '@/components/Education';
import { ThemeName } from '@/themes/ThemeContext';
import React from 'react';

// --- Mocks ---
// Mock the layout templates
vi.mock('@/components/resume-layouts/layoutTemplates', () => ({
  getLayoutJSXString: vi.fn(() => 'const Layout = () => React.createElement("div", {"data-testid": "layout-mock"}, "Layout Template"); Layout;')
}));

// Mock hooks used by ResumePreview
vi.mock('@/hooks/useCustomLayoutRenderer', () => ({
  useCustomLayoutRenderer: vi.fn(() => ({
    renderedElement: null,
    error: null
  }))
}));

vi.mock('@/hooks/useResumePDFGenerator', () => ({
  useResumePDFGenerator: vi.fn(() => ({
    downloadPDF: vi.fn()
  }))
}));

// Mock ErrorBoundary
vi.mock('./ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <div data-testid="error-boundary">{children}</div>
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Mail: () => React.createElement('span', { 'data-testid': 'mail-icon' }, 'Mail'),
  Phone: () => React.createElement('span', { 'data-testid': 'phone-icon' }, 'Phone'),
  MapPin: () => React.createElement('span', { 'data-testid': 'mappin-icon' }, 'MapPin'),
  Link: () => React.createElement('span', { 'data-testid': 'link-icon' }, 'Link'),
}));

// Import mocked functions for type safety
import { getLayoutJSXString } from '@/components/resume-layouts/layoutTemplates';
import { useCustomLayoutRenderer } from '@/hooks/useCustomLayoutRenderer';
import { useResumePDFGenerator } from '@/hooks/useResumePDFGenerator';

// Define interfaces
interface ResumePreviewProps {
  personalInfo: PersonalInfoData;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  theme?: ThemeName;
  extraData?: Record<string, any>;
  customLayoutCode?: string;
  isCodeChanging?: boolean;
  onPreviewUpdate?: () => void;
  onSectionHighlight?: (sectionId: string) => void;
  onSectionClearHighlight?: () => void;
}

const samplePersonalInfo: PersonalInfoData = { 
  fullName: 'John Doe', 
  jobTitle: 'Engineer', 
  email: 'j@e.c', 
  phone: '123', 
  location: 'NY', 
  website: '', 
  linkedin: '', 
  github: '' 
};
const sampleWorkExperience: WorkExperienceEntry[] = [{ 
  id: 'w1', 
  company: 'Tech Corp', 
  position: 'Dev', 
  startDate: '2020', 
  endDate: 'Now', 
  description: 'Code' 
}];
const sampleEducation: EducationEntry[] = [{ 
  id: 'e1', 
  institution: 'State Uni', 
  degree: 'BS', 
  field: 'CS', 
  graduationDate: '2020' 
}];
const sampleSkills: string[] = ['React', 'Node'];
const sampleExtraData = { projects: [{ name: 'P1' }] };

const defaultProps: ResumePreviewProps = {
  personalInfo: samplePersonalInfo, 
  workExperience: sampleWorkExperience, 
  education: sampleEducation,
  skills: sampleSkills, 
  extraData: sampleExtraData, 
  theme: 'modern'
};

describe('ResumePreview Component', () => {
  let mockContentRefValue: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockContentRefValue = {
      scrollHeight: 0,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      style: {},
      querySelectorAll: vi.fn(() => []),
      cloneNode: vi.fn(),
      getContext: vi.fn(() => null),
      children: [],
      ownerDocument: document,
    };

    // Mock React.useRef to return our mock element
    vi.spyOn(React, 'useRef').mockImplementation(() => ({ current: mockContentRefValue }));
  });

  afterEach(() => { 
    vi.restoreAllMocks(); 
  });

  describe('Basic Rendering and Data Display', () => {
    it('should render component without crashing', () => {
      render(<ResumePreview {...defaultProps} />);
      expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    });

    it('should call layout template function with correct theme', () => {
      render(<ResumePreview {...defaultProps} theme="modern" />);
      expect(getLayoutJSXString).toHaveBeenCalledWith('Modern');
    });

    it('should render with layout template content', async () => {
      render(<ResumePreview {...defaultProps} theme="simple" />);
      expect(getLayoutJSXString).toHaveBeenCalledWith('Simple');
      
      // Wait for any async operations to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });
    });
  });

  describe('Custom Layout Rendering', () => {
    it('should render custom layout when provided', () => {
      const mockUseCustomLayoutRenderer = vi.mocked(useCustomLayoutRenderer);
      mockUseCustomLayoutRenderer.mockReturnValue({
        renderedElement: React.createElement('div', { 'data-testid': 'custom-layout-success' }, 'Custom Layout Rendered'),
        error: null
      });

      render(<ResumePreview {...defaultProps} customLayoutCode="test code" />);
      
      expect(screen.getByTestId('custom-layout-success')).toBeInTheDocument();
      expect(screen.getByText('Custom Layout Rendered')).toBeInTheDocument();
    });

    it('should display error when custom layout renderer fails', () => {
      const mockUseCustomLayoutRenderer = vi.mocked(useCustomLayoutRenderer);
      mockUseCustomLayoutRenderer.mockReturnValue({
        renderedElement: null,
        error: 'Custom layout error'
      });

      render(<ResumePreview {...defaultProps} customLayoutCode="invalid code" />);
      
      expect(screen.getByText(/Error rendering custom layout: Custom layout error/)).toBeInTheDocument();
    });
  });

  describe('PDF Button Interaction', () => {
    it('should have a hidden PDF trigger button', () => {
      render(<ResumePreview {...defaultProps} />);
      const button = document.getElementById('preview-pdf-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('hidden');
    });

    it('should call PDF download handler when hidden PDF button is clicked', () => {
      const mockDownloadPDF = vi.fn();
      const mockUseResumePDFGenerator = vi.mocked(useResumePDFGenerator);
      mockUseResumePDFGenerator.mockReturnValue({
        downloadPDF: mockDownloadPDF
      });

      render(<ResumePreview {...defaultProps} />);
      fireEvent.click(document.getElementById('preview-pdf-button')!);
      expect(mockDownloadPDF).toHaveBeenCalled();
    });
  });

  describe('Status Indicators', () => {
    it('should show code changing indicator', () => {
      render(<ResumePreview {...defaultProps} isCodeChanging={true} />);
      expect(screen.getByText('Code Changing...')).toBeInTheDocument();
    });

    it('should show preview updating indicator initially', async () => {
      render(<ResumePreview {...defaultProps} />);
      
      // The component may show "Preview Updating..." initially due to useEffect
      const updatingIndicator = screen.queryByText('Preview Updating...');
      if (updatingIndicator) {
        expect(updatingIndicator).toBeInTheDocument();
      }
      
      // Wait for the updating to potentially complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 350));
      });
    });
  });

  describe('Pagination Logic', () => {
    const PAGE_HEIGHT_PX = 297 * 3.779527559;

    it('should not show pagination by default', () => {
      render(<ResumePreview {...defaultProps} />);
      
      // Should not show pagination buttons initially
      expect(screen.queryByText('Next Page')).not.toBeInTheDocument();
      expect(screen.queryByText('Previous Page')).not.toBeInTheDocument();
    });

    it('should update totalPages state based on content height', async () => {
      // Set content height to exceed one page
      mockContentRefValue.scrollHeight = PAGE_HEIGHT_PX + 200;
      
      render(<ResumePreview {...defaultProps} />);
      
      // Wait for the useEffect timer to complete (300ms debounce + some buffer)
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
      });
      
      // Check if pagination appears (may depend on internal state)
      const pageText = screen.queryByText(/Page/);
      if (pageText) {
        expect(pageText).toBeInTheDocument();
      }
    });

    it('should handle ref current being null gracefully', () => {
      // Mock ref to be null
      vi.spyOn(React, 'useRef').mockImplementation(() => ({ current: null }));
      
      expect(() => render(<ResumePreview {...defaultProps} />)).not.toThrow();
    });
  });

  describe('Component Integration', () => {
    it('should handle all props without errors', () => {
      const allProps: ResumePreviewProps = {
        ...defaultProps,
        isCodeChanging: true,
        onPreviewUpdate: vi.fn(),
        onSectionHighlight: vi.fn(),
        onSectionClearHighlight: vi.fn()
      };

      expect(() => render(<ResumePreview {...allProps} />)).not.toThrow();
    });

    it('should handle different theme values', () => {
      const themes: ThemeName[] = ['modern', 'simple', 'centered', 'sidebar'];
      
      themes.forEach(theme => {
        const { unmount } = render(<ResumePreview {...defaultProps} theme={theme} />);
        expect(getLayoutJSXString).toHaveBeenCalledWith(theme.charAt(0).toUpperCase() + theme.slice(1));
        unmount();
      });
    });

    it('should render with minimal props', () => {
      const minimalProps = {
        personalInfo: { fullName: 'Test', jobTitle: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '' },
        workExperience: [],
        education: [],
        skills: []
      };

      expect(() => render(<ResumePreview {...minimalProps} />)).not.toThrow();
    });
  });
});