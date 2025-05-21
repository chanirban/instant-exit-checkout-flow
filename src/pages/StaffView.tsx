
import React from 'react';
import StoreDashboard from '@/components/StoreDashboard';

const StaffView = () => {
  return (
    <div className="container max-w-md mx-auto p-4">
      <div className="mb-4">
        <div className="flex justify-center items-center mb-2">
          {/* Updated PwC logo */}
          <img 
            src="/lovable-uploads/ca080a7b-6063-430c-9814-9473f5dfa883.png" 
            alt="PwC Logo" 
            className="h-12 w-auto" 
          />
        </div>
        <h1 className="text-2xl font-bold text-center">
          Store Management
          <span className="ml-2 text-xs uppercase bg-primary/10 text-primary px-2 py-0.5 rounded">
            Staff
          </span>
        </h1>
      </div>
      
      <StoreDashboard />
    </div>
  );
};

export default StaffView;
