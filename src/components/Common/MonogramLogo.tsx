import React, { useId } from 'react';

interface MonogramLogoProps {
  className?: string;
  size?: number;
}

export const MonogramLogo: React.FC<MonogramLogoProps> = ({ className = '', size = 36 }) => {
  const gradientId = useId().replace(/:/g, '');

  return (
    <div
      className={`relative flex items-center justify-center select-none group/logo ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={`silver-${gradientId}`} x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#b8b8b8" />
          </linearGradient>
        </defs>

        <path
          d="M69 27H45C35 27 29 33 29 42c0 8 5 12 14 14l14 3c8 2 12 6 12 14 0 9-6 15-16 15H31"
          stroke={`url(#silver-${gradientId})`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M73 78h6"
          stroke="#d71920"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
