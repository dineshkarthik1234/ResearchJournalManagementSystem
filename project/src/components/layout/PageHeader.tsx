import React from 'react';
import Button from '../ui/Button';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  actions 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-5 border-b border-gray-200">
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="mt-2 text-md text-gray-500 max-w-2xl">{description}</p>
        )}
      </div>
      {actions && (
        <div className="mt-4 md:mt-0 flex-shrink-0 flex gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;