import React from 'react';

interface FloralDecorationProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export const FloralDecoration: React.FC<FloralDecorationProps> = ({ position, className = '' }) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0 -translate-x-1/4 -translate-y-1/4';
      case 'top-right':
        return 'top-0 right-0 translate-x-1/4 -translate-y-1/4 rotate-90';
      case 'bottom-left':
        return 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4 -rotate-90';
      case 'bottom-right':
        return 'bottom-0 right-0 translate-x-1/4 translate-y-1/4 rotate-180';
      default:
        return '';
    }
  };

  return (
    <div className={`absolute ${getPositionClasses()} pointer-events-none ${className}`}>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 opacity-60"
      >
        {/* Rose flower */}
        <circle cx="60" cy="60" r="25" fill="hsl(350, 65%, 75%)" opacity="0.7" />
        <circle cx="60" cy="60" r="18" fill="hsl(350, 60%, 80%)" opacity="0.8" />
        <circle cx="60" cy="60" r="10" fill="hsl(350, 55%, 85%)" />
        
        {/* Petals */}
        <ellipse cx="35" cy="55" rx="15" ry="10" fill="hsl(350, 65%, 75%)" opacity="0.6" transform="rotate(-30 35 55)" />
        <ellipse cx="85" cy="55" rx="15" ry="10" fill="hsl(350, 65%, 75%)" opacity="0.6" transform="rotate(30 85 55)" />
        <ellipse cx="55" cy="35" rx="15" ry="10" fill="hsl(350, 65%, 75%)" opacity="0.6" transform="rotate(-60 55 35)" />
        <ellipse cx="65" cy="85" rx="15" ry="10" fill="hsl(350, 65%, 75%)" opacity="0.6" transform="rotate(60 65 85)" />
        
        {/* Leaves */}
        <path d="M90 80 Q120 100 100 130 Q95 100 90 80" fill="hsl(140, 40%, 55%)" opacity="0.7" />
        <path d="M95 85 Q130 95 115 125 Q105 95 95 85" fill="hsl(140, 35%, 60%)" opacity="0.6" />
        
        {/* Small buds */}
        <circle cx="140" cy="50" r="12" fill="hsl(25, 80%, 90%)" opacity="0.7" />
        <circle cx="140" cy="50" r="8" fill="hsl(350, 55%, 85%)" opacity="0.8" />
        
        <circle cx="120" cy="90" r="8" fill="hsl(350, 60%, 80%)" opacity="0.6" />
        
        {/* Decorative dots */}
        <circle cx="160" cy="70" r="4" fill="hsl(38, 70%, 60%)" opacity="0.5" />
        <circle cx="150" cy="85" r="3" fill="hsl(38, 70%, 60%)" opacity="0.4" />
        <circle cx="170" cy="55" r="2" fill="hsl(38, 70%, 60%)" opacity="0.3" />
        
        {/* Stem curves */}
        <path d="M60 85 Q50 120 70 160" stroke="hsl(140, 35%, 50%)" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M140 62 Q145 80 135 100" stroke="hsl(140, 35%, 50%)" strokeWidth="1.5" fill="none" opacity="0.4" />
      </svg>
    </div>
  );
};
