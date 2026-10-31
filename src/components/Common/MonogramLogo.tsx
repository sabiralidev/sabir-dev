import React from 'react';

interface MonogramLogoProps {
  className?: string;
  size?: number;
}

export const MonogramLogo: React.FC<MonogramLogoProps> = ({ className = '', size = 36 }) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none group/logo ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
      >
        <defs>
          <linearGradient id="silverBevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#d0d0d0" />
            <stop offset="70%" stopColor="#8a8a8a" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="metalFrame" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#333333" />
            <stop offset="50%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#444444" />
          </linearGradient>
          <linearGradient id="lightSheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Diamond Outer Frame */}
        <polygon
          points="50,6 94,50 50,94 6,50"
          fill="url(#metalFrame)"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="3"
        />

        {/* Inner Chamfer Layer */}
        <polygon
          points="50,14 86,50 50,86 14,50"
          fill="#0c0c0c"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1.5"
        />

        {/* Signature Architectural S Monogram */}
        <path
          d="M 32,32 L 68,32 L 68,44 L 56,44 L 56,40 L 44,40 L 44,48 L 68,48 L 68,68 L 32,68 L 32,56 L 44,56 L 44,60 L 56,60 L 56,52 L 32,52 Z"
          fill="url(#silverBevel)"
          stroke="rgba(0, 0, 0, 0.5)"
          strokeWidth="1"
        />

        {/* Specular Corner Glint */}
        <circle cx="50" cy="14" r="2.5" fill="#ffffff" opacity="0.9" />
        <circle cx="50" cy="86" r="1.5" fill="#ffffff" opacity="0.4" />
      </svg>
    </div>
  );
};
