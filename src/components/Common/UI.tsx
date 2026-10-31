import React, { useRef, useState } from 'react';

export const SectionHeading: React.FC<{
  number: string;
  category: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}> = ({ number, category, title, subtitle, className = '' }) => (
  <div className={`mb-16 lg:mb-24 ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      <span className="mono text-xs font-bold text-zinc-500 tracking-wider">
        {number}
      </span>
      <span className="w-6 h-px bg-white/20" />
      <span className="mono text-xs uppercase tracking-[0.3em] text-zinc-400">
        {category}
      </span>
    </div>

    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] text-white">
      {title}
    </h2>

    {subtitle && (
      <p className="mt-6 text-zinc-400 max-w-2xl text-base sm:text-lg lg:text-xl font-light leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

export const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}> = ({ children, className = '', glow = true }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.25s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.25s ease',
      }}
      className={`relative overflow-hidden rounded-[2rem] bg-[#0c0c0c] border border-white/[0.08] hover:border-white/[0.22] shadow-[0_10px_40px_rgba(0,0,0,0.6)] ${className}`}
    >
      {glow && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.25) 0%, transparent 60%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};

export const Tooltip: React.FC<{ children: React.ReactNode; text: string }> = ({
  children,
  text,
}) => (
  <div className="group relative flex items-center justify-center">
    {children}
    <div className="absolute bottom-full mb-2.5 px-3 py-1 bg-white text-black text-[9px] font-black tracking-widest uppercase rounded-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white" />
    </div>
  </div>
);
