
import React from 'react';

interface DynamicFieldsProps {
  data: Record<string, any>;
}

const DynamicFields: React.FC<DynamicFieldsProps> = ({ data }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside">
          {value.map((item, index) => (
            <li key={index}>{typeof item === 'object' ? JSON.stringify(item) : String(item)}</li>
          ))}
        </ul>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <div className="pl-4 border-l-2 border-gray-200">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="mb-2">
              <h4 className="text-sm font-medium">{subKey}</h4>
              <div className="text-sm">{renderValue(subValue)}</div>
            </div>
          ))}
        </div>
      );
    } else {
      return <p>{String(value)}</p>;
    }
  };

  return (
    <div className="dynamic-fields">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="mb-4">
          <h3 className="text-lg font-semibold capitalize">{key}</h3>
          {renderValue(value)}
        </div>
      ))}
    </div>
  );
};

export default DynamicFields;
