import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResumePreview, ResumePreviewProps } from './ResumePreview'; 
import { PersonalInfoData } from '@/components/PersonalInfo';
import { WorkExperienceEntry } from '@/components/WorkExperience';
import { EducationEntry } from '@/components/Education';
import { ThemeName } from '@/themes/ThemeContext'; 
import React from 'react'; 

// --- Mocks ---
// Revert to @/ alias paths for mocks, assuming Vitest alias config is correct
vi.mock('@/components/resume-layouts/SimpleLayout', () => ({ 
  SimpleLayout: vi.fn(({ resumeData }) => (
    <div data-testid="simple-layout-mock">
      Simple Layout: {resumeData?.basics?.fullName || 'No Name'}
    </div>
  )) 
}));
vi.mock('@/components/resume-layouts/ModernLayout', () => ({ 
  ModernLayout: vi.fn(({ resumeData }) => (
    <div data-testid="modern-layout-mock">
      Modern Layout: {resumeData?.basics?.fullName || 'No Name'}
    </div>
  )) 
}));
vi.mock('@/components/resume-layouts/CenteredLayout', () => ({ 
  CenteredLayout: vi.fn(({ resumeData }) => <div data-testid="centered-layout-mock">Centered</div>)
}));
vi.mock('@/components/resume-layouts/SidebarLayout', () => ({ 
  SidebarLayout: vi.fn(({ resumeData }) => <div data-testid="sidebar-layout-mock">Sidebar</div>)
}));

import { SimpleLayout as SimpleLayoutMocked } from '@/components/resume-layouts/SimpleLayout';
import { ModernLayout as ModernLayoutMocked } from '@/components/resume-layouts/ModernLayout';

vi.mock('@babel/standalone', () => ({
  transform: vi.fn((code: string, options: any) => {
    if (code.includes("ErrorTriggerForBabel")) { 
      throw new Error("Babel transform error from mock factory");
    }
    // Return valid JS code (React.createElement) for the new Function constructor
    return { code: `const CustomLayout = (props) => React.createElement("div", {"data-testid": "custom-layout-success"}, "Custom Layout Rendered: ", props.basics.fullName);` };
  }),
}));
import { transform as babelTransformActualMock } from '@babel/standalone';

const html2pdfInstanceMock = { /* ... (same as before) ... */ };
vi.mock('html2pdf.js', () => ({ /* ... (same as before) ... */ }));
const mockReactToPrintTrigger = vi.fn(); 
vi.mock('react-to-print', () => ({ useReactToPrint: () => mockReactToPrintTrigger }));

const samplePersonalInfo: PersonalInfoData = { fullName: 'John Doe', jobTitle: 'Engineer', email: 'j@e.c', phone: '123', location: 'NY' };
const sampleWorkExperience: WorkExperienceEntry[] = [{ id: 'w1', company: 'Tech Corp', position: 'Dev', startDate: '2020', endDate: 'Now', description: 'Code' }];
const sampleEducation: EducationEntry[] = [{ id: 'e1', institution: 'State Uni', degree: 'BS', field: 'CS', graduationDate: '2020' }];
const sampleSkills: string[] = ['React', 'Node'];
const sampleExtraData = { projects: [{ name: 'P1' }] };

const defaultProps: ResumePreviewProps = {
  personalInfo: samplePersonalInfo, workExperience: sampleWorkExperience, education: sampleEducation,
  skills: sampleSkills, extraData: sampleExtraData, theme: 'Modern', 
  customLayoutCode: null, onPreviewPdf: vi.fn(), 
};

describe('ResumePreview Component', () => {
  let mockContentRefValue: any; 

  beforeEach(() => {
    vi.clearAllMocks(); 
    SimpleLayoutMocked.mockClear(); 
    ModernLayoutMocked.mockClear();
    (babelTransformActualMock as vi.Mock).mockClear().mockImplementation((code: string) => {
        if (code.includes("ErrorTriggerForBabel")) { throw new Error("Babel transform error"); }
        return { code: `const CustomLayout = (props) => React.createElement("div", {"data-testid": "custom-layout-success"}, "Custom Layout Rendered: ", props.basics.fullName);` };
    });
    
    mockContentRefValue = {
        scrollHeight: 0, addEventListener: vi.fn(), removeEventListener: vi.fn(), style: {},
        cloneNode: vi.fn(function(this: any, deep: boolean) { /* ... more detailed cloneNode ... */ 
            const el = document.createElement(this.tagName || 'div');
            el.innerHTML = this.innerHTML || '';
            Object.defineProperty(el, 'scrollHeight', { value: this.scrollHeight || 0 });
            Object.defineProperty(el, 'scrollWidth', { value: this.scrollWidth || 0 });
            Object.defineProperty(el, 'offsetHeight', { value: this.offsetHeight || 0 });
            Object.defineProperty(el, 'offsetWidth', { value: this.offsetWidth || 0 });
            el.getContext = () => ({ fillRect: vi.fn(), drawImage: vi.fn() });
            return el;
        }),
        getContext: vi.fn(() => null), 
        children: [], ownerDocument: document,
    };
    vi.spyOn(React, 'useRef').mockReturnValue({ current: mockContentRefValue });
  });

  afterEach(() => { vi.restoreAllMocks(); });

  describe('Basic Rendering and Data Display', () => {
    it('should invoke ModernLayout when theme is "Modern" and pass correct data', () => {
      render(<ResumePreview {...defaultProps} theme="Modern" />);
      expect(ModernLayoutMocked).toHaveBeenCalled();
      const propsPassedToLayout = (ModernLayoutMocked as vi.Mock).mock.calls[0][0];
      expect(propsPassedToLayout.resumeData.basics.fullName).toBe(samplePersonalInfo.fullName);
    });

    it('should invoke SimpleLayout when theme is "simple" (lowercase)', () => {
      render(<ResumePreview {...defaultProps} theme="simple" />); 
      expect(SimpleLayoutMocked).toHaveBeenCalled();
      expect(screen.getByTestId('simple-layout-mock')).toBeInTheDocument();
    });
  });

  describe('Custom Layout Rendering', () => {
    const rawJsxCode = '({ basics }) => <div data-testid="custom-layout-success">Custom Layout Rendered: {basics.fullName}</div>';
    
    it('should render customLayoutCode when theme is "Custom"', async () => {
      render(<ResumePreview {...defaultProps} customLayoutCode={rawJsxCode} theme="Custom" />);
      await waitFor(() => {
        expect(screen.getByTestId('custom-layout-success')).toBeInTheDocument();
      });
    });

    it('should display an error if Babel transform fails', async () => {
      (babelTransformActualMock as vi.Mock).mockImplementation(() => { throw new Error('Babel Fail Test'); });
      render(<ResumePreview {...defaultProps} customLayoutCode="ErrorTriggerForBabel" theme="Custom" />);
      await waitFor(() => {
        expect(screen.getByText(/Error rendering custom layout: Babel Fail Test/i)).toBeInTheDocument();
      });
    });
    
    it('should display an error if transformed code does not yield a valid component', async () => {
      (babelTransformActualMock as vi.Mock).mockReturnValue({ code: 'const CustomLayout = null;' }); 
      render(<ResumePreview {...defaultProps} customLayoutCode="const CustomLayout = null;" theme="Custom" />);
      await waitFor(() => {
        // Check for the component's custom error message part
        expect(screen.getByText(/Error rendering custom layout/i)).toBeInTheDocument();
        // And check for the specific React error message part that the component includes
        expect(screen.getByText(/Element type is invalid/i)).toBeInTheDocument();
      });
    });
  });

  describe('Pagination Logic', () => {
    const PAGE_HEIGHT_PX = 297 * 3.779527559; 

    it('should not show pagination if content is less than one page', async () => {
      mockContentRefValue.scrollHeight = PAGE_HEIGHT_PX - 100;
      render(<ResumePreview {...defaultProps} />);
      await waitFor(() => { 
        expect(screen.queryByRole('button', { name: /next page/i })).not.toBeInTheDocument();
      });
    });

    it('should show "Next Page" if content is more than one page', async () => {
      mockContentRefValue.scrollHeight = PAGE_HEIGHT_PX + 100;
      render(<ResumePreview {...defaultProps} />);
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument();
      });
    });
  });

  describe('PDF Button Interaction', () => {
    it('should have a hidden PDF trigger button', () => {
      render(<ResumePreview {...defaultProps} />);
      expect(document.getElementById('preview-pdf-button')).toBeInTheDocument();
    });

    it('should call react-to-print handler when hidden PDF button is clicked', async () => {
      render(<ResumePreview {...defaultProps} />);
      fireEvent.click(document.getElementById('preview-pdf-button')!);
      expect(mockReactToPrintTrigger).toHaveBeenCalled();
    });
  });
});
