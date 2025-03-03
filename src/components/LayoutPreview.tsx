import React from 'react';
import { SimpleLayout } from './resume-layouts/SimpleLayout';
import { ModernLayout } from './resume-layouts/ModernLayout';
import { SidebarLayout } from './resume-layouts/SidebarLayout';
import { CenteredLayout } from './resume-layouts/CenteredLayout';

const layouts = {
  Simple: SimpleLayout,
  Modern: ModernLayout,
  Sidebar: SidebarLayout,
  Centered: CenteredLayout,
};

const LayoutPreview = ({ selectedLayout, layoutProps }) => {
  const LayoutComponent = layouts[selectedLayout];

  return (
    <div className="preview">
      <h2>Resume Preview</h2>
      {LayoutComponent ? <LayoutComponent {...layoutProps} /> : <p>Select a layout to preview.</p>}
    </div>
  );
};

export default LayoutPreview; 