import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronUp, Code2 } from 'lucide-react';
import { MonogramLogo } from '../Common/MonogramLogo';

export const Footer: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Karachi',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Approach', href: '#approach' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative pt-24 pb-12 px-6 md:px-12 lg:px-24 bg-[#050505] border-t border-white/[0.08] text-white overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/[0.08]">
          {/* Brand Signature & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#hero" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-white/30 transition-colors">
                <MonogramLogo size={26} />
              </div>
              <span className="text-2xl font-black tracking-tighter mono text-white">
                SABIR<span className="text-zinc-500">_ALI</span>
              </span>
            </a>

            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-sm">
              Full-Stack Engineer architecting scalable web applications, resilient systems, and high-concurrency architectures for global enterprise delivery.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/sabiralidev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/sabiralidev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://dev.to/sabirsheikh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DEV.to Articles"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all"
              >
                <Code2 size={16} />
              </a>
              <a
                href="mailto:sabirsheik12787@gmail.com"
                aria-label="Email Sabir"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 block">
              // ARCHITECTURE MAP
            </span>
            <ul className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Real-Time Clock (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 block">
              // NODE COORDINATES
            </span>
            <div>
              <p className="text-sm font-bold text-white tracking-tight uppercase">
                Pakistan (PKT)
              </p>
              <p className="mono text-2xl font-black tracking-tight text-zinc-300 mt-2">
                {time || '00:00:00'}
              </p>
              <p className="mono text-[10px] text-zinc-500 mt-1">UTC +05:00</p>
            </div>
          </div>

          {/* Back to Top & Availability (2 cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between items-start lg:items-end space-y-6">
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
            >
              <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
            </button>

            <div className="text-left lg:text-right">
              <span className="mono text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
                SYSTEM AVAILABILITY
              </span>
              <div className="flex items-center gap-2 justify-start lg:justify-end">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Available Q2/Q3
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 mono text-[10px] uppercase tracking-widest">
          <div>
            &copy; {new Date().getFullYear()} SABIR ALI. ALL ARCHITECTURAL NODES SECURED.
          </div>
          <div>
            LAT 33.72° N // LONG 73.04° E // 60 FPS
          </div>
        </div>
      </div>
    </footer>
  );
};
