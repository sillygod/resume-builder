import React, { useState, useEffect } from 'react';
import { SimpleLayout } from './resume-layouts/SimpleLayout';
import { ModernLayout } from './resume-layouts/ModernLayout';
import { SidebarLayout } from './resume-layouts/SidebarLayout';
import { CenteredLayout } from './resume-layouts/CenteredLayout';
import { Select, SelectItem, SelectContent } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/jsx/jsx';

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
}

const LayoutEditor: React.FC<LayoutEditorProps> = ({ selectedLayout, setSelectedLayout, layoutProps, setLayoutProps }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const LayoutComponent = layouts[selectedLayout];
    if (LayoutComponent) {
      setLayoutProps(LayoutComponent.defaultProps || {});
      setCode(getRawJSX(LayoutComponent));
    }
  }, [selectedLayout]);

  const getRawJSX = (LayoutComponent) => {
    return `<LayoutComponent {...props} />`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLayoutProps({ ...layoutProps, [name]: value });
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleSaveCode = () => {
    console.log("New Code:", code);
  };

  // Function to render JSX code
  const renderJSX = () => {
    try {
      console.log("Evaluating JSX Code:", code);
      const Component = new Function('React', `return ${code}`)(React);
      console.log("Rendered Component:", Component);
      return <Component {...layoutProps} />;
    } catch (error) {
      return <div>Error rendering JSX: {error.message}</div>;
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Resume Layout</h2>
      <Select value={selectedLayout} onValueChange={setSelectedLayout}>
        <SelectContent>
          {Object.keys(layouts).map((layout) => (
            <SelectItem key={layout} value={layout}>{layout}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Layout Properties</h3>
        {Object.keys(layoutProps).map((key) => (
          <div key={key} className="mb-2">
            <label className="block text-sm font-medium">{key}</label>
            <Input
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
      <h3 className="text-lg font-semibold">Edit Component Code</h3>
      <Textarea
        value={code}
        onChange={handleCodeChange}
        className="mt-1"
      />
      <Button onClick={handleSaveCode} className="mt-4">Save Changes</Button>
      <h3 className="text-lg font-semibold mt-4">Resume Preview</h3>
      <div className="border p-4 rounded mt-2">
        {renderJSX()}
      </div>
    </div>
  );
};

export default LayoutEditor; 