import React, { useState } from 'react';
import LayoutEditor from './LayoutEditor';
import LayoutPreview from './LayoutPreview';

const LayoutManager = () => {
  const [selectedLayout, setSelectedLayout] = useState('Simple');
  const [layoutProps, setLayoutProps] = useState({});

  return (
    <div className="layout-manager">
      <LayoutEditor
        selectedLayout={selectedLayout}
        setSelectedLayout={setSelectedLayout}
        layoutProps={layoutProps}
        setLayoutProps={setLayoutProps}
      />
      <LayoutPreview selectedLayout={selectedLayout} layoutProps={layoutProps} />
    </div>
  );
};

export default LayoutManager; 