import { useState, useCallback, useRef } from 'react';
import { editor } from 'monaco-editor';

interface CodeSection {
  id: string;
  type: 'personalInfo' | 'workExperience' | 'education' | 'skills' | 'custom';
  startLine: number;
  endLine: number;
  startColumn: number;
  endColumn: number;
  previewSelector?: string; // CSS selector for the corresponding preview element
}

interface UseCodePreviewMappingReturn {
  highlightedSection: string | null;
  highlightCodeSection: (sectionId: string) => void;
  clearHighlight: () => void;
  registerCodeSection: (section: CodeSection) => void;
  getCodeSections: () => CodeSection[];
  addPreviewHover: (element: HTMLElement, sectionId: string) => void;
  removePreviewHover: (element: HTMLElement) => void;
}

export const useCodePreviewMapping = (
  editorInstance?: editor.IStandaloneCodeEditor | null
): UseCodePreviewMappingReturn => {
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [codeSections, setCodeSections] = useState<Map<string, CodeSection>>(new Map());
  const decorationsRef = useRef<string[]>([]);

  const analyzeCode = useCallback((code: string): CodeSection[] => {
    const sections: CodeSection[] = [];
    const lines = code.split('\n');

    let currentLine = 0;
    let inPersonalInfo = false;
    let inWorkExperience = false;
    let inEducation = false;
    let inSkills = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // Detect personal info sections
      if (/personalInfo|basics/.test(trimmedLine)) {
        if (!inPersonalInfo) {
          inPersonalInfo = true;
          sections.push({
            id: `personalInfo-${i}`,
            type: 'personalInfo',
            startLine: i + 1,
            endLine: i + 1,
            startColumn: 1,
            endColumn: line.length + 1,
            previewSelector: '[data-section="personal-info"]'
          });
        }
      }

      // Detect work experience sections
      if (/workExperience|work\.map/.test(trimmedLine)) {
        if (!inWorkExperience) {
          inWorkExperience = true;
          sections.push({
            id: `workExperience-${i}`,
            type: 'workExperience',
            startLine: i + 1,
            endLine: i + 1,
            startColumn: 1,
            endColumn: line.length + 1,
            previewSelector: '[data-section="work-experience"]'
          });
        }
      }

      // Detect education sections
      if (/education\.map/.test(trimmedLine)) {
        if (!inEducation) {
          inEducation = true;
          sections.push({
            id: `education-${i}`,
            type: 'education',
            startLine: i + 1,
            endLine: i + 1,
            startColumn: 1,
            endColumn: line.length + 1,
            previewSelector: '[data-section="education"]'
          });
        }
      }

      // Detect skills sections
      if (/skills\.map/.test(trimmedLine)) {
        if (!inSkills) {
          inSkills = true;
          sections.push({
            id: `skills-${i}`,
            type: 'skills',
            startLine: i + 1,
            endLine: i + 1,
            startColumn: 1,
            endColumn: line.length + 1,
            previewSelector: '[data-section="skills"]'
          });
        }
      }
    }

    return sections;
  }, []);

  const highlightCodeSection = useCallback((sectionId: string) => {
    if (!editorInstance) return;

    const section = codeSections.get(sectionId);
    if (!section) return;

    // Clear previous decorations
    if (decorationsRef.current.length > 0) {
      editorInstance.removeDecorations(decorationsRef.current);
    }

    // Add new decoration
    const newDecorations = editorInstance.createDecorationsCollection([
      {
        range: {
          startLineNumber: section.startLine,
          startColumn: section.startColumn,
          endLineNumber: section.endLine,
          endColumn: section.endColumn,
        },
        options: {
          className: 'code-preview-highlight',
          glyphMarginClassName: 'code-preview-glyph',
          hoverMessage: {
            value: `This code section corresponds to the **${section.type}** in the preview`
          },
          marginClassName: 'code-preview-margin'
        },
      },
    ]);

    decorationsRef.current = newDecorations.getDecorations().map(d => d.id);
    setHighlightedSection(sectionId);

    // Scroll to the highlighted section
    editorInstance.revealLineInCenter(section.startLine);
  }, [editorInstance, codeSections]);

  const clearHighlight = useCallback(() => {
    if (!editorInstance) return;

    if (decorationsRef.current.length > 0) {
      editorInstance.removeDecorations(decorationsRef.current);
      decorationsRef.current = [];
    }
    setHighlightedSection(null);
  }, [editorInstance]);

  const registerCodeSection = useCallback((section: CodeSection) => {
    setCodeSections(prev => new Map(prev.set(section.id, section)));
  }, []);

  const getCodeSections = useCallback(() => {
    return Array.from(codeSections.values());
  }, [codeSections]);

  const addPreviewHover = useCallback((element: HTMLElement, sectionId: string) => {
    const handleMouseEnter = () => highlightCodeSection(sectionId);
    const handleMouseLeave = () => clearHighlight();

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Store the handlers for cleanup
    (element as any).__codePreviewHandlers = {
      handleMouseEnter,
      handleMouseLeave
    };
  }, [highlightCodeSection, clearHighlight]);

  const removePreviewHover = useCallback((element: HTMLElement) => {
    const handlers = (element as any).__codePreviewHandlers;
    if (handlers) {
      element.removeEventListener('mouseenter', handlers.handleMouseEnter);
      element.removeEventListener('mouseleave', handlers.handleMouseLeave);
      delete (element as any).__codePreviewHandlers;
    }
  }, []);

  return {
    highlightedSection,
    highlightCodeSection,
    clearHighlight,
    registerCodeSection,
    getCodeSections,
    addPreviewHover,
    removePreviewHover
  };
};