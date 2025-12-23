import React from 'react';
import { Heart } from 'lucide-react';

interface HeartDividerProps {
  className?: string;
}

export const HeartDivider: React.FC<HeartDividerProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-4 py-8 ${className}`}>
      <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-rose" />
      <Heart className="w-5 h-5 text-rose fill-rose animate-heartbeat" />
      <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-rose" />
    </div>
  );
};
