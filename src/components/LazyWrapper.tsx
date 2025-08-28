import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const DefaultFallback: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <div className="flex items-center space-x-3">
      <Loader2 className="h-6 w-6 text-cyan-400 animate-spin" />
      <span className="text-cyan-400 font-orbitron">Loading advanced features...</span>
    </div>
  </div>
);

const LazyWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallback = <DefaultFallback /> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export default LazyWrapper;