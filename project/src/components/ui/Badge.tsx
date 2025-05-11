import React from 'react';
import { PaperStatus } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'filled';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray' | 'purple' | 'teal';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  color = 'blue',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  
  const variantClasses = {
    default: {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      gray: 'bg-gray-100 text-gray-800',
      purple: 'bg-purple-100 text-purple-800',
      teal: 'bg-teal-100 text-teal-800',
    },
    outline: {
      blue: 'border border-blue-500 text-blue-700',
      green: 'border border-green-500 text-green-700',
      red: 'border border-red-500 text-red-700',
      yellow: 'border border-yellow-500 text-yellow-700',
      gray: 'border border-gray-500 text-gray-700',
      purple: 'border border-purple-500 text-purple-700',
      teal: 'border border-teal-500 text-teal-700',
    },
    filled: {
      blue: 'bg-blue-600 text-white',
      green: 'bg-green-600 text-white',
      red: 'bg-red-600 text-white',
      yellow: 'bg-yellow-600 text-white',
      gray: 'bg-gray-600 text-white',
      purple: 'bg-purple-600 text-white',
      teal: 'bg-teal-600 text-white',
    },
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
  };
  
  return (
    <span
      className={`
        ${baseClasses}
        ${variantClasses[variant][color]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: PaperStatus }> = ({ status }) => {
  const statusConfig: Record<PaperStatus, { label: string; color: BadgeProps['color'] }> = {
    'draft': { label: 'Draft', color: 'gray' },
    'submitted': { label: 'Submitted', color: 'blue' },
    'under-review': { label: 'Under Review', color: 'purple' },
    'revision-requested': { label: 'Revision Requested', color: 'yellow' },
    'accepted': { label: 'Accepted', color: 'green' },
    'rejected': { label: 'Rejected', color: 'red' },
    'published': { label: 'Published', color: 'teal' },
  };
  
  const { label, color } = statusConfig[status];
  
  return <Badge variant="default" color={color}>{label}</Badge>;
};

export default Badge;