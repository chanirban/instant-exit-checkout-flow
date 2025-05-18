
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon, XIcon } from 'lucide-react';

interface StatusBadgeProps {
  status: boolean;
  label: string;
  className?: string;
}

const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  return (
    <div className={cn(
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
      status 
        ? 'bg-success/15 text-success' 
        : 'bg-destructive/15 text-destructive',
      className
    )}>
      {status ? (
        <CheckIcon className="h-3.5 w-3.5" />
      ) : (
        <XIcon className="h-3.5 w-3.5" />
      )}
      {label}
    </div>
  );
};

export default StatusBadge;
