import React, { useState, useEffect } from 'react';
import { SimpleLayout } from './resume-layouts/SimpleLayout';
import { PersonalInfoData } from './PersonalInfo';
import { WorkExperienceEntry } from './WorkExperience';
import { EducationEntry } from './Education';
import { ModernLayout } from './resume-layouts/ModernLayout';
import { SidebarLayout } from './resume-layouts/SidebarLayout';
import { CenteredLayout } from './resume-layouts/CenteredLayout';
import { ExecutiveLayout } from './resume-layouts/ExecutiveLayout';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useTheme } from '@/themes/ThemeContext';
import { Maximize2, Minimize2, Move, GripVertical } from 'lucide-react';
import { getLayoutJSXString } from './resume-layouts/layoutTemplates';
import { ResumeDataState } from '../utils/jsonResume'; // Import ResumeDataState
import { ErrorBoundary } from './ErrorBoundary';
import { useCodePreviewMapping } from '../hooks/useCodePreviewMapping';

// @ts-ignore
declare global {
  interface Window {
    __jsonApplyTimeout?: any;
  }
}

const layouts = {
  Simple: SimpleLayout,
  Modern: ModernLayout,
  Sidebar: SidebarLayout,
  Centered: CenteredLayout,
  Executive: ExecutiveLayout,
};

interface LayoutEditorProps {
  selectedLayout: string;
  setSelectedLayout: (layout: string) => void;
  layoutProps: Record<string, any>;
  setLayoutProps: (props: Record<string, any>) => void;
  customCode: string | null;
  setCustomCode: (code: string | null) => void;
  // resumeData and setResumeData are no longer passed from Index.tsx
  onApplyResumeChanges?: (
    newPersonalInfo: PersonalInfoData,
    newWorkExperience: WorkExperienceEntry[],
    newEducation: EducationEntry[],
    newSkills: string[],
    newExtraData?: Record<string, any>
  ) => void;
  // New prop for consolidated resume data
  resumeDataSource: ResumeDataState;
  editorMode: 'preview' | 'code' | 'json';
  setEditorMode: (mode: 'preview' | 'code' | 'json') => void;
  editorValue: string;
  setEditorValue: (value: string) => void;
  jsonValue: string;
  setJsonValue: (value: string) => void;
  onCodeChanging?: (changing: boolean) => void;
}

const LayoutEditor: React.FC<LayoutEditorProps> = ({
  selectedLayout,
  setSelectedLayout,
  layoutProps,
  setLayoutProps,
  customCode,
  setCustomCode,
  // resumeData, // No longer a direct prop
  // setResumeData = () => {}, // No longer a direct prop
  onApplyResumeChanges,
  resumeDataSource,
  editorMode,
  setEditorMode,
  editorValue,
  setEditorValue,
  jsonValue,
  setJsonValue,
  onCodeChanging,
}) => {

  // Extract data from resumeDataSource, providing fallbacks for robustness
  const currentPersonalInfo = React.useMemo(
    () =>
      resumeDataSource.personalInfo ||
      ({ fullName: "", email: "", phone: "", jobTitle: "", location: "" } as PersonalInfoData),
    [resumeDataSource.personalInfo]
  );
  const currentWorkExperience = React.useMemo(() => resumeDataSource.workExperience || [], [resumeDataSource.workExperience]);
  const currentEducation = React.useMemo(() => resumeDataSource.education || [], [resumeDataSource.education]);
  const currentSkills = React.useMemo(() => resumeDataSource.skills || [], [resumeDataSource.skills]);
  const currentExtraData = React.useMemo(() => resumeDataSource.extraData || {}, [resumeDataSource.extraData]);

  const [codeError, setCodeError] = useState<string | null>(null);
  const [prevSelectedLayout, setPrevSelectedLayout] = useState<string>('');
  const [isCodeChanged, setIsCodeChanged] = useState(false);
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const [editorInstance, setEditorInstance] = useState<editor.IStandaloneCodeEditor | null>(null);
  const [currentEditorTheme, setCurrentEditorTheme] = useState<string>('resume-editor-dark');
  
  // Floating editor states
  const [isFloatingExpanded, setIsFloatingExpanded] = useState(false);
  const [floatingPosition, setFloatingPosition] = useState({ x: 20, y: 100 });
  const [floatingSize, setFloatingSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [validationResults, setValidationResults] = useState<{
    errors: string[];
    warnings: string[];
    suggestions: string[];
    codeQuality: {
      complexity: 'low' | 'medium' | 'high';
      maintainability: number; // 0-100
      dataUsage: string[];
    };
  }>({ errors: [], warnings: [], suggestions: [], codeQuality: { complexity: 'low', maintainability: 100, dataUsage: [] } });
  
  // Code-preview mapping
  const {
    highlightedSection,
    highlightCodeSection,
    clearHighlight,
    registerCodeSection,
    getCodeSections
  } = useCodePreviewMapping(editorInstance);
  const { currentTheme, setTheme } = useTheme();
  
  // Monaco Editor configuration
  const configureMonacoEditor = (monaco: Monaco) => {
    // Configure TypeScript for JSX support
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
      jsxImportSource: 'react',
      allowJs: true,
      strict: false,
      skipLibCheck: true,
      allowSyntheticDefaultImports: true,
      lib: ['dom', 'es2020'],
    });

    // Also configure JavaScript defaults for better JSX support
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
      jsxImportSource: 'react',
      allowJs: true,
      strict: false,
      skipLibCheck: true,
      allowSyntheticDefaultImports: true,
    });

    // Add React and JSX types
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `
      declare namespace React {
        interface FC<P = {}> {
          (props: P, context?: any): ReactElement<any, any> | null;
        }
        interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
          type: T;
          props: P;
          key: Key | null;
        }
        type Key = string | number;
        type JSXElementConstructor<P> = ((props: P) => ReactElement<any, any> | null) | (new (props: P) => Component<any, any>);
        class Component<P, S> {
          constructor(props: P, context?: any);
          props: Readonly<P>;
          state: Readonly<S>;
        }
        namespace JSX {
          interface Element extends ReactElement<any, any> {}
          interface IntrinsicElements {
            div: any;
            span: any;
            h1: any;
            h2: any;
            h3: any;
            h4: any;
            h5: any;
            h6: any;
            p: any;
            a: any;
            img: any;
            section: any;
            header: any;
            footer: any;
            main: any;
            nav: any;
            ul: any;
            ol: any;
            li: any;
            table: any;
            thead: any;
            tbody: any;
            tr: any;
            td: any;
            th: any;
            form: any;
            input: any;
            button: any;
            label: any;
            select: any;
            option: any;
            textarea: any;
            [elemName: string]: any;
          }
        }
      }
      declare const React: {
        createElement: any;
        Fragment: any;
        FC: any;
      };
      `,
      'react.d.ts'
    );

    // Also add to javascript defaults for broader compatibility
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      `
      declare namespace React {
        interface FC<P = {}> {
          (props: P, context?: any): ReactElement<any, any> | null;
        }
        interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
          type: T;
          props: P;
          key: Key | null;
        }
        type Key = string | number;
        type JSXElementConstructor<P> = ((props: P) => ReactElement<any, any> | null) | (new (props: P) => Component<any, any>);
        class Component<P, S> {
          constructor(props: P, context?: any);
          props: Readonly<P>;
          state: Readonly<S>;
        }
        namespace JSX {
          interface Element extends ReactElement<any, any> {}
          interface IntrinsicElements {
            div: any;
            span: any;
            h1: any;
            h2: any;
            h3: any;
            h4: any;
            h5: any;
            h6: any;
            p: any;
            a: any;
            img: any;
            section: any;
            header: any;
            footer: any;
            main: any;
            nav: any;
            ul: any;
            ol: any;
            li: any;
            table: any;
            thead: any;
            tbody: any;
            tr: any;
            td: any;
            th: any;
            form: any;
            input: any;
            button: any;
            label: any;
            select: any;
            option: any;
            textarea: any;
            [elemName: string]: any;
          }
        }
      }
      declare const React: {
        createElement: any;
        Fragment: any;
        FC: any;
      };
      `,
      'react-js.d.ts'
    );

    // Add comprehensive resume data types and utility functions
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `
      interface PersonalInfoData {
        /** Full name of the person */
        fullName: string;
        /** Email address */
        email: string;
        /** Phone number */
        phone: string;
        /** Current job title or desired position */
        jobTitle: string;
        /** Current location (city, state) */
        location: string;
        /** Professional summary or objective */
        summary?: string;
        /** URL to profile photo */
        photoUrl?: string;
        /** Personal website or portfolio URL */
        website?: string;
        /** LinkedIn profile URL */
        linkedin?: string;
        /** GitHub profile URL */
        github?: string;
      }
      
      interface WorkExperienceEntry {
        /** Unique identifier */
        id: string;
        /** Job position/title */
        position: string;
        /** Company name */
        company: string;
        /** Start date (e.g., "January 2020" or "2020-01") */
        startDate: string;
        /** End date or "Present" for current position */
        endDate: string;
        /** Job description and achievements */
        description: string;
        /** Company location */
        location?: string;
        /** Employment type (Full-time, Part-time, Contract, etc.) */
        employmentType?: string;
      }
      
      interface EducationEntry {
        /** Unique identifier */
        id: string;
        /** School/University name */
        institution: string;
        /** Degree type (Bachelor's, Master's, etc.) */
        degree: string;
        /** Field of study */
        field: string;
        /** Graduation date */
        graduationDate: string;
        /** GPA (optional) */
        gpa?: string;
        /** Honors or distinctions */
        honors?: string[];
      }
      
      interface ThemeClasses {
        /** Layout container classes */
        layout: {
          containerClass: string;
          contentClass: string;
        };
        /** Personal info section classes */
        personalInfo: {
          containerClass: string;
          titleClass: string;
          subtitleClass: string;
          gridClass: string;
          infoContainerClass: string;
          avatarContainerClass: string;
          contactContainerClass: string;
          contactItemClass: string;
        };
        /** Work experience section classes */
        workExperience: {
          containerClass: string;
          titleClass: string;
          entryClass: string;
          jobTitleClass: string;
          companyClass: string;
          periodClass: string;
          descriptionClass: string;
        };
        /** Education section classes */
        education: {
          containerClass: string;
          titleClass: string;
          entryClass: string;
          institutionClass: string;
          degreeClass: string;
          periodClass: string;
        };
        /** Skills section classes */
        skills: {
          containerClass: string;
          titleClass: string;
          skillsListClass: string;
          skillItemClass: string;
        };
      }
      
      // Resume data variables available in custom layouts
      /** Personal information (alias: basics) */
      declare const personalInfo: PersonalInfoData;
      /** Work experience entries */
      declare const workExperience: WorkExperienceEntry[];
      /** Education entries */
      declare const education: EducationEntry[];
      /** Array of skill names */
      declare const skills: string[];
      /** Additional custom data */
      declare const extraData: Record<string, any>;
      
      // Aliases for JSON Resume compatibility
      /** Alias for personalInfo */
      declare const basics: PersonalInfoData;
      /** Alias for workExperience */
      declare const work: WorkExperienceEntry[];
      
      // Lucide React icons available
      /** Mail icon component */
      declare const Mail: React.ComponentType<{ size?: number; className?: string }>;
      /** Phone icon component */
      declare const Phone: React.ComponentType<{ size?: number; className?: string }>;
      /** Map pin icon component */
      declare const MapPin: React.ComponentType<{ size?: number; className?: string }>;
      /** Link icon component */
      declare const Link: React.ComponentType<{ size?: number; className?: string }>;
      
      // Theme classes (example structure - actual values from themes)
      declare const theme: ThemeClasses;
      
      // Utility functions for common resume formatting
      declare const formatDate: (date: string) => string;
      declare const formatPeriod: (start: string, end: string) => string;
      declare const truncateText: (text: string, maxLength: number) => string;
      `,
      'resume-types.d.ts'
    );

    // Also add resume data types to JavaScript defaults
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      `
      interface PersonalInfoData {
        /** Full name of the person */
        fullName: string;
        /** Email address */
        email: string;
        /** Phone number */
        phone: string;
        /** Current job title or desired position */
        jobTitle: string;
        /** Current location (city, state) */
        location: string;
        /** Professional summary or objective */
        summary?: string;
        /** URL to profile photo */
        photoUrl?: string;
        /** Personal website or portfolio URL */
        website?: string;
        /** LinkedIn profile URL */
        linkedin?: string;
        /** GitHub profile URL */
        github?: string;
      }
      
      interface WorkExperienceEntry {
        /** Unique identifier */
        id: string;
        /** Job position/title */
        position: string;
        /** Company name */
        company: string;
        /** Start date (e.g., "January 2020" or "2020-01") */
        startDate: string;
        /** End date or "Present" for current position */
        endDate: string;
        /** Job description and achievements */
        description: string;
        /** Company location */
        location?: string;
        /** Employment type (Full-time, Part-time, Contract, etc.) */
        employmentType?: string;
      }
      
      interface EducationEntry {
        /** Unique identifier */
        id: string;
        /** School/University name */
        institution: string;
        /** Degree type (Bachelor's, Master's, etc.) */
        degree: string;
        /** Field of study */
        field: string;
        /** Graduation date */
        graduationDate: string;
        /** GPA (optional) */
        gpa?: string;
        /** Honors or distinctions */
        honors?: string[];
      }
      
      // Resume data variables available in custom layouts
      /** Personal information (alias: basics) */
      declare const personalInfo: PersonalInfoData;
      /** Work experience entries */
      declare const workExperience: WorkExperienceEntry[];
      /** Education entries */
      declare const education: EducationEntry[];
      /** Array of skill names */
      declare const skills: string[];
      /** Additional custom data */
      declare const extraData: Record<string, any>;
      
      // Aliases for JSON Resume compatibility
      /** Alias for personalInfo */
      declare const basics: PersonalInfoData;
      /** Alias for workExperience */
      declare const work: WorkExperienceEntry[];
      `,
      'resume-types-js.d.ts'
    );

    // Add code snippets and completion providers
    monaco.languages.registerCompletionItemProvider('typescriptreact', {
      provideCompletionItems: (model, position, context, token) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions = [
          // Resume data snippets
          {
            label: 'personalInfo.fullName',
            kind: monaco.languages.CompletionItemKind.Field,
            insertText: 'personalInfo.fullName',
            documentation: 'Full name from personal information',
            range,
          },
          {
            label: 'personalInfo.email',
            kind: monaco.languages.CompletionItemKind.Field,
            insertText: 'personalInfo.email',
            documentation: 'Email address from personal information',
            range,
          },
          {
            label: 'workExperience.map',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'workExperience.map((exp) => (',
              '  <div key={exp.id} className="mb-4">',
              '    <h3 className="font-semibold">{exp.position}</h3>',
              '    <p className="text-gray-600">{exp.company}</p>',
              '    <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>',
              '    <p>{exp.description}</p>',
              '  </div>',
              '))',
            ].join('\n'),
            documentation: 'Map over work experience entries',
            insertTextFormat: 2, // Snippet format
            range,
          },
          {
            label: 'education.map',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'education.map((edu) => (',
              '  <div key={edu.id} className="mb-4">',
              '    <h3 className="font-semibold">{edu.institution}</h3>',
              '    <p className="text-gray-600">{edu.degree} in {edu.field}</p>',
              '    <p className="text-sm text-gray-500">Graduated: {edu.graduationDate}</p>',
              '  </div>',
              '))',
            ].join('\n'),
            documentation: 'Map over education entries',
            insertTextFormat: 2, // Snippet format
            range,
          },
          {
            label: 'skills.map',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'skills.map((skill) => (',
              '  <span key={skill} className="inline-block bg-gray-200 rounded px-2 py-1 text-sm mr-2 mb-2">',
              '    {skill}',
              '  </span>',
              '))',
            ].join('\n'),
            documentation: 'Map over skills array',
            insertTextFormat: 2, // Snippet format
            range,
          },
          {
            label: 'Resume Section Template',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              '<section className="mb-6" data-section="${1:section-name}" data-section-label="${2:Section Label}">',
              '  <h2 className="text-2xl font-bold mb-4">${3:Section Title}</h2>',
              '  <div>',
              '    ${4:// Content goes here}',
              '  </div>',
              '</section>',
            ].join('\n'),
            documentation: 'Template for a resume section with proper data attributes for code-preview mapping',
            insertTextFormat: 2, // Snippet format
            range,
          },
          {
            label: 'Contact Info Template',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              '<div className="flex items-center space-x-4">',
              '  {personalInfo.email && (',
              '    <div className="flex items-center">',
              '      <Mail size={16} className="mr-2" />',
              '      <span>{personalInfo.email}</span>',
              '    </div>',
              '  )}',
              '  {personalInfo.phone && (',
              '    <div className="flex items-center">',
              '      <Phone size={16} className="mr-2" />',
              '      <span>{personalInfo.phone}</span>',
              '    </div>',
              '  )}',
              '  {personalInfo.location && (',
              '    <div className="flex items-center">',
              '      <MapPin size={16} className="mr-2" />',
              '      <span>{personalInfo.location}</span>',
              '    </div>',
              '  )}',
              '</div>',
            ].join('\n'),
            documentation: 'Template for contact information with icons',
            insertTextFormat: 2, // Snippet format
            range,
          },
        ];

        return { suggestions };
      },
    });

    // Add hover provider for better documentation
    monaco.languages.registerHoverProvider('typescriptreact', {
      provideHover: (model, position) => {
        const word = model.getWordAtPosition(position);
        if (!word) return null;

        const hoverMap: Record<string, string> = {
          personalInfo: '**Personal Information Object**\n\nContains: fullName, email, phone, jobTitle, location, summary, photoUrl, website, linkedin, github',
          workExperience: '**Work Experience Array**\n\nArray of work experience entries with: id, position, company, startDate, endDate, description, location, employmentType',
          education: '**Education Array**\n\nArray of education entries with: id, institution, degree, field, graduationDate, gpa, honors',
          skills: '**Skills Array**\n\nArray of skill names as strings',
          extraData: '**Extra Data Object**\n\nCustom data object for additional resume information',
          basics: '**Basics Object (Alias)**\n\nAlias for personalInfo - contains basic personal information',
          work: '**Work Array (Alias)**\n\nAlias for workExperience - contains work history',
        };

        const documentation = hoverMap[word.word];
        if (documentation) {
          return {
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn,
            },
            contents: [{ value: documentation }],
          };
        }
        return null;
      },
    });

    // Define custom dark theme with comprehensive syntax highlighting
    monaco.editor.defineTheme('resume-editor-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        // Comments
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'comment.line', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'comment.block', foreground: '6A9955', fontStyle: 'italic' },
        
        // Keywords
        { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
        { token: 'keyword.control', foreground: '569CD6', fontStyle: 'bold' },
        { token: 'keyword.operator', foreground: 'D4D4D4' },
        { token: 'keyword.other', foreground: '569CD6' },
        
        // Strings and literals
        { token: 'string', foreground: 'CE9178' },
        { token: 'string.quoted', foreground: 'CE9178' },
        { token: 'string.template', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'regexp', foreground: 'D16969' },
        
        // Types and classes
        { token: 'type', foreground: '4EC9B0' },
        { token: 'type.identifier', foreground: '4EC9B0' },
        { token: 'class', foreground: '4EC9B0' },
        { token: 'class.name', foreground: '4EC9B0' },
        
        // Functions and methods
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'function.call', foreground: 'DCDCAA' },
        { token: 'method', foreground: 'DCDCAA' },
        
        // Variables and identifiers
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'variable.name', foreground: '9CDCFE' },
        { token: 'variable.parameter', foreground: '9CDCFE' },
        { token: 'identifier', foreground: '9CDCFE' },
        
        // JSX/HTML Tags
        { token: 'tag', foreground: '569CD6' },
        { token: 'tag.name', foreground: '569CD6' },
        { token: 'tag.bracket', foreground: '808080' },
        { token: 'metatag', foreground: '569CD6' },
        { token: 'metatag.content.html', foreground: '9CDCFE' },
        { token: 'metatag.html', foreground: '569CD6' },
        
        // JSX/HTML Attributes
        { token: 'attribute.name', foreground: '92C5F7' },
        { token: 'attribute.value', foreground: 'CE9178' },
        { token: 'attribute.value.number', foreground: 'B5CEA8' },
        { token: 'attribute.value.unit', foreground: 'B5CEA8' },
        { token: 'attribute.value.html', foreground: 'CE9178' },
        
        // Operators and punctuation
        { token: 'operator', foreground: 'D4D4D4' },
        { token: 'delimiter', foreground: 'D4D4D4' },
        { token: 'delimiter.bracket', foreground: 'FFD700' },
        { token: 'delimiter.parenthesis', foreground: 'FFD700' },
        { token: 'delimiter.square', foreground: 'FFD700' },
        { token: 'delimiter.angle', foreground: '808080' },
        
        // TypeScript/JavaScript specific
        { token: 'support.type.primitive', foreground: '569CD6' },
        { token: 'support.function', foreground: 'DCDCAA' },
        { token: 'support.class', foreground: '4EC9B0' },
        { token: 'storage.type', foreground: '569CD6' },
        { token: 'storage.modifier', foreground: '569CD6' },
        
        // JSX specific
        { token: 'punctuation.definition.tag.jsx', foreground: '569CD6' },
        { token: 'entity.name.tag.jsx', foreground: '569CD6' },
        { token: 'punctuation.definition.tag.begin.jsx', foreground: '808080' },
        { token: 'punctuation.definition.tag.end.jsx', foreground: '808080' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2d2d30',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41',
        'editorIndentGuide.background': '#404040',
        'editorIndentGuide.activeBackground': '#707070',
        'editor.selectionHighlightBackground': '#ADD6FF26',
        'editor.wordHighlightBackground': '#575757B8',
        'editor.wordHighlightStrongBackground': '#004972B8',
        'editorCursor.foreground': '#AEAFAD',
        'editorWhitespace.foreground': '#404040',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#c6c6c6',
      },
    });

    // Define light theme as well for consistency
    monaco.editor.defineTheme('resume-editor-light', {
      base: 'vs',
      inherit: true,
      rules: [
        // Comments
        { token: 'comment', foreground: '008000', fontStyle: 'italic' },
        { token: 'comment.line', foreground: '008000', fontStyle: 'italic' },
        { token: 'comment.block', foreground: '008000', fontStyle: 'italic' },
        
        // Keywords
        { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
        { token: 'keyword.control', foreground: '0000FF', fontStyle: 'bold' },
        { token: 'keyword.operator', foreground: '000000' },
        { token: 'keyword.other', foreground: '0000FF' },
        
        // Strings and literals
        { token: 'string', foreground: 'A31515' },
        { token: 'string.quoted', foreground: 'A31515' },
        { token: 'string.template', foreground: 'A31515' },
        { token: 'number', foreground: '098658' },
        { token: 'regexp', foreground: 'D16969' },
        
        // Types and classes
        { token: 'type', foreground: '267F99' },
        { token: 'type.identifier', foreground: '267F99' },
        { token: 'class', foreground: '267F99' },
        { token: 'class.name', foreground: '267F99' },
        
        // Functions and methods
        { token: 'function', foreground: '795E26' },
        { token: 'function.call', foreground: '795E26' },
        { token: 'method', foreground: '795E26' },
        
        // Variables and identifiers
        { token: 'variable', foreground: '001080' },
        { token: 'variable.name', foreground: '001080' },
        { token: 'variable.parameter', foreground: '001080' },
        { token: 'identifier', foreground: '001080' },
        
        // JSX/HTML Tags
        { token: 'tag', foreground: '800000' },
        { token: 'tag.name', foreground: '800000' },
        { token: 'tag.bracket', foreground: '383838' },
        { token: 'metatag', foreground: '800000' },
        { token: 'metatag.content.html', foreground: '0000FF' },
        { token: 'metatag.html', foreground: '800000' },
        
        // JSX/HTML Attributes
        { token: 'attribute.name', foreground: 'FF0000' },
        { token: 'attribute.value', foreground: '0000FF' },
        { token: 'attribute.value.number', foreground: '098658' },
        { token: 'attribute.value.unit', foreground: '098658' },
        { token: 'attribute.value.html', foreground: '0000FF' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#000000',
      },
    });
  };

  useEffect(() => {
    if (selectedLayout && selectedLayout !== prevSelectedLayout) {
      setPrevSelectedLayout(selectedLayout);
      const templateCode = getLayoutJSXString(selectedLayout);
      setEditorValue(templateCode);
      setCustomCode(templateCode);

      const LayoutComponent = layouts[selectedLayout];
      if (LayoutComponent) {
        setLayoutProps(LayoutComponent.defaultProps || {});
      }

      setTheme(selectedLayout.toLowerCase() as any);

      toast.info(`Layout changed to ${selectedLayout}`);
    }
  }, [selectedLayout, setCustomCode, setLayoutProps, prevSelectedLayout, setTheme]);

  // Effect to handle Monaco editor theme changes and ensure theme is applied correctly
  useEffect(() => {
    if (editorInstance && monaco) {
      // For now, always use dark theme for better visibility
      // In the future, this could be based on a global app theme
      const themeToApply = 'resume-editor-dark';
      setCurrentEditorTheme(themeToApply);
      monaco.editor.setTheme(themeToApply);
      
      // Force refresh to ensure theme is applied properly
      setTimeout(() => {
        editorInstance.updateOptions({});
      }, 100);
    }
  }, [editorInstance, monaco, editorMode]);

  // Additional effect to ensure theme is applied when switching between tabs
  useEffect(() => {
    if (editorInstance && monaco && editorMode === 'code') {
      // Small delay to ensure tab switch is complete
      setTimeout(() => {
        const themeToApply = 'resume-editor-dark';
        monaco.editor.setTheme(themeToApply);
        editorInstance.updateOptions({});
        // Trigger layout to refresh the editor
        editorInstance.layout();
      }, 150);
    }
  }, [editorMode, editorInstance, monaco]);

  // Floating editor drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - floatingPosition.x,
      y: e.clientY - floatingPosition.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setFloatingPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleResizeMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const rect = document.getElementById('floating-editor-container')?.getBoundingClientRect();
      if (rect) {
        const newWidth = Math.max(400, e.clientX - rect.left);
        const newHeight = Math.max(300, e.clientY - rect.top);
        setFloatingSize({ width: newWidth, height: newHeight });
      }
    }
  };

  const handleResizeMouseUp = () => {
    setIsResizing(false);
  };

  // Add event listeners for drag and resize
  useEffect(() => {
    if (isDragging || isResizing) {
      const moveHandler = isDragging ? handleMouseMove : handleResizeMouseMove;
      const upHandler = isDragging ? handleMouseUp : handleResizeMouseUp;
      
      document.addEventListener('mousemove', moveHandler);
      document.addEventListener('mouseup', upHandler);
      
      return () => {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
      };
    }
  }, [isDragging, isResizing, dragOffset]);

  // Handle scroll following
  useEffect(() => {
    if (isFloatingExpanded) {
      const handleScroll = () => {
        // Keep the floating editor in a visible position relative to viewport
        const scrollY = window.scrollY;
        const maxY = window.innerHeight - floatingSize.height - 20;
        const targetY = Math.min(Math.max(20, 100 + scrollY * 0.1), maxY);
        
        setFloatingPosition(prev => ({
          ...prev,
          y: targetY
        }));
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isFloatingExpanded, floatingSize.height]);

  useEffect(() => {
    if (editorMode === 'code' && (!editorValue || editorValue.trim() === '')) {
      if (customCode) {
        setEditorValue(customCode);
      } else {
        const templateCode = getLayoutJSXString(selectedLayout);
        setEditorValue(templateCode);
        setCustomCode(templateCode);
      }
    } else if (editorMode === 'json' && jsonValue.trim() === '') {
      // Construct jsonToEdit from individual props passed from Index.tsx

      const currentResumeStructure = {
        basics: currentPersonalInfo,

        work: currentWorkExperience,
        education: currentEducation,
        skills: currentSkills,
        extraData: currentExtraData,
        theme: currentTheme,
      };
      setJsonValue(JSON.stringify(currentResumeStructure, null, 2));
    }
  }, [
    editorMode,
    customCode,
    selectedLayout,
    editorValue,
    resumeDataSource,
    currentTheme,
    jsonValue,
    setEditorValue,
    setCustomCode,
    setJsonValue,
    currentPersonalInfo,
    currentWorkExperience,
    currentEducation,
    currentSkills,
    currentExtraData
  ]);
  // Note: resumeDataSource is added to dependency array of above useEffect

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLayoutProps({ ...layoutProps, [name]: value });
  };

  const validateJSXStructure = (code: string) => {
    const trimmedCode = code.trim();
    
    if (!trimmedCode) {
      setCodeError(null);
      return;
    }
    
    // Check for common JSX structure issues
    if (!trimmedCode.startsWith('(') || !trimmedCode.endsWith(')')) {
      setCodeError("Warning: JSX code should be wrapped in parentheses for proper rendering");
      return;
    }
    
    // Check for unmatched JSX tags
    const openTags = (trimmedCode.match(/<[^/][^>]*>/g) || []).length;
    const closeTags = (trimmedCode.match(/<\/[^>]*>/g) || []).length;
    const selfClosingTags = (trimmedCode.match(/<[^>]*\/>/g) || []).length;
    
    if (openTags !== closeTags + selfClosingTags) {
      setCodeError("Error: Unmatched JSX tags detected. Check that all opening tags have corresponding closing tags.");
      return;
    }
    
    // Check for missing React Fragment wrapper
    const jsxElements = trimmedCode.match(/<[^>]+>/g);
    if (jsxElements && jsxElements.length > 1) {
      const rootElements = trimmedCode.match(/^\s*\([^<]*<[^>]+>/);
      if (rootElements && !trimmedCode.includes('React.Fragment') && !trimmedCode.includes('<>')) {
        setCodeError("Warning: Multiple root elements detected. Consider wrapping in React.Fragment or <> </>.");
        return;
      }
    }
    
    // Check for common variable usage
    const hasPersonalInfo = /personalInfo\\./.test(trimmedCode);
    const hasWorkExperience = /workExperience\\./.test(trimmedCode);
    const hasBasics = /basics\\./.test(trimmedCode);
    const hasWork = /work\\./.test(trimmedCode);
    
    if (!hasPersonalInfo && !hasBasics && !hasWorkExperience && !hasWork) {
      setCodeError("Info: No resume data variables detected. Use personalInfo, workExperience, education, skills, or their aliases (basics, work).");
      return;
    }
    
    setCodeError(null);
  };

  const analyzeCodeSections = (code: string) => {
    const lines = code.split('\n');

    // Clear existing sections
    getCodeSections().forEach(section => {
      // Implementation would clear existing sections
    });

    // Analyze and register new sections
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // Personal Info detection
      if (/personalInfo|basics/.test(trimmedLine) && /fullName|email|phone/.test(code.substring(code.indexOf(trimmedLine)))) {
        registerCodeSection({
          id: `personalInfo-${i}`,
          type: 'personalInfo',
          startLine: i + 1,
          endLine: i + 1,
          startColumn: 1,
          endColumn: line.length + 1,
          previewSelector: '[data-section="personal-info"]'
        });
      }
      
      // Work Experience detection
      if (/workExperience|work\.map/.test(trimmedLine)) {
        registerCodeSection({
          id: `workExperience-${i}`,
          type: 'workExperience', 
          startLine: i + 1,
          endLine: i + 1,
          startColumn: 1,
          endColumn: line.length + 1,
          previewSelector: '[data-section="work-experience"]'
        });
      }
      
      // Education detection
      if (/education\.map/.test(trimmedLine)) {
        registerCodeSection({
          id: `education-${i}`,
          type: 'education',
          startLine: i + 1,
          endLine: i + 1, 
          startColumn: 1,
          endColumn: line.length + 1,
          previewSelector: '[data-section="education"]'
        });
      }
      
      // Skills detection
      if (/skills\.map/.test(trimmedLine)) {
        registerCodeSection({
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
    
    toast.info(`Analyzed ${getCodeSections().length} code sections`);
  };

  const resetCustomCode = () => {
    const templateCode = getLayoutJSXString(selectedLayout);
    setEditorValue(templateCode);
    setCustomCode(templateCode);
    setCodeError(null);
    setIsCodeChanged(false);
    toast.info("Reset to template layout");
  };


  const renderLayout = () => {
    try {
      // Always use custom JSX code if present and valid, regardless of editorMode
      if (editorValue && editorValue.trim().startsWith('(')) {
        // Scope for custom code execution using resumeDataSource
        const scope = {
          basics: resumeDataSource.personalInfo,
          work: resumeDataSource.workExperience,
          education: resumeDataSource.education,
          skills: resumeDataSource.skills,
          extraData: resumeDataSource.extraData,
          // For backward compatibility
          personalInfo: resumeDataSource.personalInfo,
          workExperience: resumeDataSource.workExperience,
        };
        const func = new Function('React', ...Object.keys(scope), `return ${editorValue}`);
        return func(React, ...Object.values(scope));
      } else {
        // Default rendering if not custom code
        const LayoutComponent = layouts[selectedLayout] || layouts['Simple'];

        // Standard layouts expect a single resumeData prop with basics, work, etc.
        const resumeDataForLayout = {
          basics: resumeDataSource.personalInfo,
          work: resumeDataSource.workExperience,
          education: resumeDataSource.education,
          skills: resumeDataSource.skills,
          extraData: resumeDataSource.extraData,
        };
        return <LayoutComponent resumeData={resumeDataForLayout} />;
      }
    } catch (err) {
      return (
        <div className="p-4 border border-red-200 bg-red-50 rounded-md">
          <h3 className="text-red-800 font-semibold mb-2">Code Execution Error</h3>
          <p className="text-red-700 text-sm mb-2">
            There was an error executing your custom layout code.
          </p>
          <details className="text-xs text-red-600">
            <summary className="cursor-pointer font-medium">Error Details</summary>
            <pre className="mt-2 whitespace-pre-wrap">{(err as Error).message}</pre>
          </details>
        </div>
      );
    }
  };

  return (
    <Card className="p-3 bg-white rounded shadow-md max-w-full overflow-x-auto">
      {/* Compact header with inline layout selection */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">Layout Editor</h2>
        <div className="flex items-center gap-2">
          <Label htmlFor="layout-select" className="text-sm">Template:</Label>
          <Select value={selectedLayout} onValueChange={setSelectedLayout}>
            <SelectTrigger id="layout-select" className="w-32">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(layouts).map((layout) => (
                <SelectItem key={layout} value={layout}>{layout}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="code" className="mt-2" onValueChange={(value) => setEditorMode(value as any)}>
        <TabsList className="mb-2 h-8">
          <TabsTrigger value="code" className="text-xs px-3 py-1">Code</TabsTrigger>
          <TabsTrigger value="json" className="text-xs px-3 py-1">JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="code">
          <div className="mb-2">
            {/* Compact info section */}
            <div className="p-2 mb-2 bg-blue-50 border border-blue-200 rounded text-blue-700 text-xs">
              <strong>Variables:</strong> <code>personalInfo</code>, <code>workExperience</code>, <code>education</code>, <code>skills</code>
              <br /><strong>Note:</strong> Wrap JSX in parentheses: <code>(&lt;div&gt;...&lt;/div&gt;)</code>
            </div>

            <div className={`border rounded overflow-hidden mb-2 relative transition-all duration-300 ${
              isFloatingExpanded ? 'opacity-30 pointer-events-none' : 'opacity-100'
            }`}>
              {/* Floating Editor Toggle Button */}
              <Button
                onClick={() => setIsFloatingExpanded(true)}
                className={`absolute top-2 right-2 z-10 p-2 h-8 w-8 text-white transition-all duration-200 ${
                  isFloatingExpanded 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                size="sm"
                title={isFloatingExpanded ? "Floating editor is active" : "Open floating editor"}
                disabled={isFloatingExpanded}
              >
                <Maximize2 size={14} />
              </Button>
              
              {/* Overlay message when floating editor is active */}
              {isFloatingExpanded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-5">
                  <div className="text-center text-white p-4 rounded-lg bg-black bg-opacity-50">
                    <div className="text-lg font-semibold mb-2">Floating Editor Active</div>
                    <div className="text-sm opacity-90">Use the floating window to edit code</div>
                  </div>
                </div>
              )}
              
              <MonacoEditor
                height="600px"
                defaultLanguage="typescriptreact"
                language="typescriptreact"
                theme={currentEditorTheme}
                value={editorValue}
                onMount={(editor, monaco) => {
                  setEditorInstance(editor);
                  setMonaco(monaco);
                  configureMonacoEditor(monaco);
                  
                  // Add custom actions
                  editor.addAction({
                    id: 'format-code',
                    label: 'Format Code',
                    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF],
                    run: () => {
                      editor.getAction('editor.action.formatDocument')?.run();
                    },
                  });
                  
                  editor.addAction({
                    id: 'validate-jsx',
                    label: 'Validate JSX Structure',
                    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK],
                    run: () => {
                      const code = editor.getValue();
                      validateJSXStructure(code);
                    },
                  });
                  
                  editor.addAction({
                    id: 'analyze-code-sections',
                    label: 'Analyze Code Sections',
                    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyM],
                    run: () => {
                      const code = editor.getValue();
                      analyzeCodeSections(code);
                    },
                  });
                }}
                onChange={(value) => {
                  const code = value ?? '';
                  setEditorValue(code);
                  setCustomCode(code);
                  setIsCodeChanged(true);
                  onCodeChanging?.(true);
                  
                  // Debounced validation
                  setTimeout(() => {
                    validateJSXStructure(code);
                    setIsCodeChanged(false);
                    onCodeChanging?.(false);
                  }, 500);
                }}
                options={{
                  wordWrap: 'on',
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  suggestOnTriggerCharacters: true,
                  acceptSuggestionOnEnter: 'on',
                  tabCompletion: 'on',
                  parameterHints: {
                    enabled: true,
                  },
                  hover: {
                    enabled: true,
                  },
                  folding: true,
                  showFoldingControls: 'always',
                  foldingStrategy: 'indentation',
                  bracketPairColorization: {
                    enabled: true,
                  },
                  guides: {
                    indentation: true,
                    bracketPairs: true,
                  },
                  // lightbulb: {
                  //   enabled: true,
                  // },
                  quickSuggestions: {
                    other: true,
                    comments: false,
                    strings: true,
                  },
                }}
              />
              
              {/* Code change indicator */}
              {isCodeChanged && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium animate-pulse">
                  Code Changed
                </div>
              )}
            </div>

            {codeError && (
              <div className={`p-3 mb-2 rounded text-sm border-l-4 ${
                codeError.startsWith('Error:') 
                  ? 'bg-red-50 border-red-400 text-red-700'
                  : codeError.startsWith('Warning:')
                  ? 'bg-yellow-50 border-yellow-400 text-yellow-700'
                  : 'bg-blue-50 border-blue-400 text-blue-700'
              }`}>
                <div className="flex items-start gap-2">
                  <div className="font-medium">
                    {codeError.startsWith('Error:') ? '🚨' : codeError.startsWith('Warning:') ? '⚠️' : 'ℹ️'}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium mb-1">
                      {codeError.startsWith('Error:') ? 'Syntax Error' : 
                       codeError.startsWith('Warning:') ? 'Warning' : 'Info'}
                    </div>
                    <div>{codeError}</div>
                  </div>
                </div>
              </div>
            )}

            <div className={`flex gap-2 items-center flex-wrap transition-opacity duration-300 ${
              isFloatingExpanded ? 'opacity-50 pointer-events-none' : 'opacity-100'
            }`}>
              <Button 
                onClick={resetCustomCode} 
                variant="outline" 
                size="sm"
                disabled={isFloatingExpanded}
              >
                Reset to Template
              </Button>
              <Button 
                onClick={() => editorInstance?.getAction('editor.action.formatDocument')?.run()}
                variant="outline" 
                size="sm"
                disabled={!editorInstance || isFloatingExpanded}
              >
                Format Code
              </Button>
              <Button 
                onClick={() => {
                  const code = editorInstance?.getValue() || '';
                  analyzeCodeSections(code);
                }}
                variant="outline" 
                size="sm"
                disabled={!editorInstance || isFloatingExpanded}
              >
                Analyze Sections
              </Button>
              <div className="ml-auto text-xs text-gray-500">
                Ctrl+Shift+F to format • Ctrl+K to validate • Ctrl+M to analyze
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="json">
          <div className="mb-2">
            <div className="p-2 mb-2 bg-gray-50 border border-gray-200 rounded text-gray-600 text-xs">
              Edit resume data JSON. Changes auto-apply after 500ms.
            </div>

            <div className="border rounded overflow-hidden mb-2">
              <MonacoEditor
                height="600px"
                defaultLanguage="json"
                language="json"
                theme="vs-dark"
                value={jsonValue}
                onChange={(value) => {
                  setJsonValue(value ?? '');
                  // Debounce auto-apply
                  if (window.__jsonApplyTimeout) clearTimeout(window.__jsonApplyTimeout);
                  window.__jsonApplyTimeout = setTimeout(() => {
                    try {
                      const cleaned = (value ?? '').trim();
                      const fixed = cleaned.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
                      const parsedJson = JSON.parse(fixed);

                      if (onApplyResumeChanges) {
                        const parsedBasics = parsedJson.basics || {};
                        const parsedWork = parsedJson.work || [];
                        const parsedEducation = parsedJson.education || [];
                        const parsedSkills = parsedJson.skills || [];
                        const parsedExtraData = parsedJson.extraData || {};
                        
                        // Reconstruct PersonalInfoData, passing through all fields from basics
                        const {
                          name,
                          email,
                          phone,
                          location, // This is an object { city, countryCode } in JSON resume spec
                          jobTitle,
                          ...otherBasics // Capture any other fields in basics
                        } = parsedBasics;
                        
                        const updatedPersonalInfo: PersonalInfoData = {
                          fullName: name || "",
                          email: email || "",
                          phone: phone || "",
                          // Assuming PersonalInfoData expects location as a string (city)
                          // and jsonResume spec has location as { city, countryCode }
                          location: typeof location === 'object' ? location?.city || "" : typeof location === 'string' ? location : "",
                          jobTitle: jobTitle || "",
                          ...otherBasics, // Spread remaining fields from basics
                        };

                        onApplyResumeChanges(
                          updatedPersonalInfo,
                          parsedWork,
                          parsedEducation,
                          parsedSkills,
                          parsedExtraData
                        );
                      }
                    } catch (error) {
                      // Ignore parse errors, don't apply
                    }
                  }, 500);
                }}
                options={{
                  wordWrap: 'on',
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
            {/* Button removed: now auto-applies */}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Floating Editor Overlay */}
      {isFloatingExpanded && (
        <div
          id="floating-editor-container"
          className="fixed bg-white border-2 border-gray-300 rounded-lg shadow-2xl z-50"
          style={{
            left: `${floatingPosition.x}px`,
            top: `${floatingPosition.y}px`,
            width: `${floatingSize.width}px`,
            height: `${floatingSize.height}px`,
          }}
        >
          {/* Floating Editor Header */}
          <div 
            className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-b cursor-move select-none shadow-sm"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <Move size={16} className="text-blue-100" />
              <span className="text-sm font-semibold">Code Editor (Active)</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Active editor"></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-800 bg-opacity-50 px-2 py-1 rounded text-blue-100">
                Floating Mode
              </span>
              <Button
                onClick={() => setIsFloatingExpanded(false)}
                className="p-1 h-6 w-6 bg-transparent hover:bg-blue-800 text-blue-100 hover:text-white"
                size="sm"
                variant="ghost"
                title="Close floating editor and return to normal mode"
              >
                <Minimize2 size={12} />
              </Button>
            </div>
          </div>
          
          {/* Floating Editor Content */}
          <div className="relative" style={{ height: `${floatingSize.height - 48}px` }}>
            <MonacoEditor
              height="100%"
              defaultLanguage="typescriptreact"
              language="typescriptreact"
              theme={currentEditorTheme}
              value={editorValue}
              onChange={(value) => {
                const code = value ?? '';
                setEditorValue(code);
                setCustomCode(code);
                setIsCodeChanged(true);
                onCodeChanging?.(true);
                
                // Debounced validation
                setTimeout(() => {
                  validateJSXStructure(code);
                  setIsCodeChanged(false);
                  onCodeChanging?.(false);
                }, 500);
              }}
              options={{
                wordWrap: 'on',
                minimap: { enabled: true },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnEnter: 'on',
                tabCompletion: 'on',
                parameterHints: {
                  enabled: true,
                },
                hover: {
                  enabled: true,
                },
                folding: true,
                showFoldingControls: 'always',
                foldingStrategy: 'indentation',
                bracketPairColorization: {
                  enabled: true,
                },
                guides: {
                  indentation: true,
                  bracketPairs: true,
                },
                quickSuggestions: {
                  other: true,
                  comments: false,
                  strings: true,
                },
              }}
            />
            
            {/* Resize Handle */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-300 hover:bg-gray-400"
              onMouseDown={handleResizeMouseDown}
              title="Resize editor"
            >
              <GripVertical size={12} className="text-gray-600 rotate-45 absolute bottom-0.5 right-0.5" />
            </div>
            
            {/* Floating Editor Action Buttons */}
            <div className="absolute top-2 left-2 flex gap-1 z-10">
              <Button
                onClick={resetCustomCode}
                className="p-1 h-6 text-xs bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
                size="sm"
                variant="outline"
                title="Reset to template"
              >
                Reset
              </Button>
              <Button
                onClick={() => editorInstance?.getAction('editor.action.formatDocument')?.run()}
                className="p-1 h-6 text-xs bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
                size="sm"
                variant="outline"
                title="Format code (Ctrl+Shift+F)"
              >
                Format
              </Button>
            </div>
            
            {/* Code change indicator for floating editor */}
            {isCodeChanged && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium animate-pulse">
                Code Changed
              </div>
            )}
          </div>
          
          {/* Floating Editor Error Display */}
          {codeError && (
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-red-50 border-t border-red-200 text-xs text-red-700 max-h-20 overflow-y-auto">
              <div className="font-medium mb-1">
                {codeError.startsWith('Error:') ? '🚨 Syntax Error' : 
                 codeError.startsWith('Warning:') ? '⚠️ Warning' : 'ℹ️ Info'}
              </div>
              <div>{codeError}</div>
            </div>
          )}
        </div>
      )}
      
      {/* Backdrop overlay when dragging */}
      {(isDragging || isResizing) && (
        <div className="fixed inset-0 z-40 pointer-events-none" />
      )}
    </Card>
  );
};

export default LayoutEditor;
