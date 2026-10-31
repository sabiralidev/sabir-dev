import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Stack' },
  { id: 'approach', label: 'Systems' },
  { id: 'projects', label: 'Works' },
  { id: 'experience', label: 'History' },
  { id: 'contact', label: 'Connect' },
];

export const SectionNavigator: React.FC = () => {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-6 select-none">
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={`Jump to ${label}`}
            className="group relative flex items-center"
          >
            <div
              className={`transition-all duration-300 ${
                isActive
                  ? 'h-[2px] w-6 bg-[#d71920]'
                  : 'w-2 h-[1px] bg-zinc-700 group-hover:w-4 group-hover:bg-zinc-400'
              }`}
            />
            <span
              className={`absolute left-9 mono text-[9px] uppercase tracking-widest transition-all duration-200 pointer-events-none whitespace-nowrap ${
                isActive
                  ? 'opacity-100 text-white font-bold translate-x-0'
                  : 'opacity-0 text-zinc-500 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {label}
            </span>
          </a>
        );
      })}
    </div>
  );
};
