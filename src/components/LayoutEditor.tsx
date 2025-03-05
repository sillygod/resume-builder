import React, { useState, useEffect } from 'react';
import { SimpleLayout } from './resume-layouts/SimpleLayout';
import { ModernLayout } from './resume-layouts/ModernLayout';
import { SidebarLayout } from './resume-layouts/SidebarLayout';
import { CenteredLayout } from './resume-layouts/CenteredLayout';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';
import { themes } from '@/themes/ThemeContext';
import { useTheme } from '@/themes/ThemeContext';
import { exportToJsonResume } from '@/utils/jsonResume';
import { getLayoutJSXString } from './resume-layouts/layoutTemplates';

const layouts = {
  Simple: SimpleLayout,
  Modern: ModernLayout,
  Sidebar: SidebarLayout,
  Centered: CenteredLayout,
};

interface LayoutEditorProps {
  selectedLayout: string;
  setSelectedLayout: (layout: string) => void;
  layoutProps: Record<string, any>;
  setLayoutProps: (props: Record<string, any>) => void;
  customCode: string | null;
  setCustomCode: (code: string | null) => void;
  personalInfo: any;
  workExperience: any[];
  education: any[];
  skills: string[];
}

const LayoutEditor: React.FC<LayoutEditorProps> = ({ 
  selectedLayout, 
  setSelectedLayout, 
  layoutProps, 
  setLayoutProps,
  customCode,
  setCustomCode,
  personalInfo,
  workExperience,
  education,
  skills
}) => {
  const [editorValue, setEditorValue] = useState<string>('');
  const [editorMode, setEditorMode] = useState<'preview' | 'code' | 'json'>('preview');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [prevSelectedLayout, setPrevSelectedLayout] = useState<string>('');
  const [jsonValue, setJsonValue] = useState<string>('');
  const { currentTheme, setTheme } = useTheme();

  // Update editor value when selected layout changes
  useEffect(() => {
    if (selectedLayout && selectedLayout !== prevSelectedLayout) {
      setPrevSelectedLayout(selectedLayout);
      const templateCode = getLayoutJSXString(selectedLayout);
      setEditorValue(templateCode);
      setCustomCode(templateCode);
      
      // Reset any properties when switching layouts
      const LayoutComponent = layouts[selectedLayout];
      if (LayoutComponent) {
        setLayoutProps(LayoutComponent.defaultProps || {});
      }
      
      // Update theme to match the layout for consistency
      setTheme(selectedLayout.toLowerCase() as any);
      
      toast.info(`Layout changed to ${selectedLayout}`);
    }
  }, [selectedLayout, setCustomCode, setLayoutProps, prevSelectedLayout, setTheme]);
  
  // Handle editor mode changes
  useEffect(() => {
    if (editorMode === 'code' && (!editorValue || editorValue.trim() === '')) {
      if (customCode) {
        setEditorValue(customCode);
      } else {
        const templateCode = getLayoutJSXString(selectedLayout);
        setEditorValue(templateCode);
        setCustomCode(templateCode);
      }
    } else if (editorMode === 'json') {
      // Generate JSON from the current resume data
      const jsonResume = exportToJsonResume(personalInfo, workExperience, education, skills, currentTheme);
      setJsonValue(JSON.stringify(jsonResume, null, 2));
    }
  }, [editorMode, customCode, selectedLayout, editorValue, personalInfo, workExperience, education, skills, currentTheme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLayoutProps({ ...layoutProps, [name]: value });
  };

  const handleCodeChange = (editor: any, data: any, value: string) => {
    setEditorValue(value);
    setCustomCode(value);
    
    let codeToValidate = value.trim();
    if (!codeToValidate.startsWith('(') || !codeToValidate.endsWith(')')) {
      setCodeError("Warning: JSX code should be wrapped in parentheses for proper rendering");
    } else {
      setCodeError(null);
    }
  };

  const handleJsonChange = (editor: any, data: any, value: string) => {
    setJsonValue(value);
  };

  const resetCustomCode = () => {
    const templateCode = getLayoutJSXString(selectedLayout);
    setEditorValue(templateCode);
    setCustomCode(templateCode);
    setCodeError(null);
    toast.info("Reset to template layout");
  };

  const applyJsonChanges = () => {
    try {
      // This would be integrated with your import function
      // For now we'll just validate the JSON
      JSON.parse(jsonValue);
      toast.success("JSON is valid! Import functionality would apply changes here.");
      // In a real implementation, you would use importFromJsonResume and update the app state
    } catch (error) {
      toast.error("Invalid JSON format. Please check your syntax.");
    }
  };

  return (
    <Card className="p-4 bg-white rounded shadow-md max-w-full overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Layout Editor</h2>
      
      <div className="mb-4">
        <Label htmlFor="layout-select">Select Layout Template</Label>
        <Select value={selectedLayout} onValueChange={setSelectedLayout}>
          <SelectTrigger id="layout-select" className="w-full">
            <SelectValue placeholder="Select a layout" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(layouts).map((layout) => (
              <SelectItem key={layout} value={layout}>{layout}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="preview" className="mt-6" onValueChange={(value) => setEditorMode(value as 'preview' | 'code' | 'json')}>
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Layout Properties</TabsTrigger>
          <TabsTrigger value="code">Edit Layout Code</TabsTrigger>
          <TabsTrigger value="json">Edit JSON</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Layout Properties</h3>
            {Object.keys(layoutProps).map((key) => (
              <div key={key} className="mb-2">
                <Label htmlFor={key} className="block text-sm font-medium">{key}</Label>
                <Input
                  id={key}
                  type="text"
                  name={key}
                  value={layoutProps[key] || ''}
                  onChange={handleChange}
                  placeholder={`Enter ${key}`}
                  className="mt-1"
                />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="code">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Edit Resume Layout JSX</h3>
            <p className="text-sm text-gray-600 mb-2">
              Edit the JSX code for your resume layout. Your code has access to these variables:
              <code className="mx-1 px-1 bg-gray-100 rounded text-xs">personalInfo</code>
              <code className="mx-1 px-1 bg-gray-100 rounded text-xs">workExperience</code>
              <code className="mx-1 px-1 bg-gray-100 rounded text-xs">education</code>
              <code className="mx-1 px-1 bg-gray-100 rounded text-xs">skills</code>
            </p>
            
            <div className="p-2 mb-3 bg-blue-50 border border-blue-200 rounded text-blue-700 text-sm">
              <strong>Note:</strong> Your JSX code must be wrapped in parentheses like the example below:
              <pre className="mt-1 text-xs overflow-x-auto">{`(\n  <div>\n    <h1>{personalInfo.fullName}</h1>\n  </div>\n)`}</pre>
            </div>
            
            <div className="border rounded overflow-hidden mb-4">
              <CodeMirror
                value={editorValue}
                options={{
                  mode: 'jsx',
                  theme: 'material',
                  lineNumbers: true,
                  lineWrapping: true,
                }}
                onBeforeChange={handleCodeChange}
                className="min-h-[300px]"
              />
            </div>
            
            {codeError && (
              <div className="p-2 mb-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-sm">
                {codeError}
              </div>
            )}
            
            <div className="flex gap-2">
              <Button onClick={resetCustomCode} variant="outline">Reset to Template</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="json">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Edit Resume JSON</h3>
            <p className="text-sm text-gray-600 mb-2">
              Edit the JSON representation of your resume data. You can modify the data and apply changes.
            </p>
            
            <div className="border rounded overflow-hidden mb-4">
              <CodeMirror
                value={jsonValue}
                options={{
                  mode: 'javascript',
                  theme: 'material',
                  lineNumbers: true,
                  lineWrapping: true,
                }}
                onBeforeChange={handleJsonChange}
                className="min-h-[300px]"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={applyJsonChanges} variant="outline">Apply JSON Changes</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default LayoutEditor;
