import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MonogramLogo } from './MonogramLogo';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: '01' },
    { name: 'Skills', href: '#skills', id: '02' },
    { name: 'Approach', href: '#approach', id: '03' },
    { name: 'Projects', href: '#projects', id: '04' },
    { name: 'Experience', href: '#experience', id: '05' },
    { name: 'Contact', href: '#contact', id: '06' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-2xl border-b border-white/[0.08] py-4'
          : 'bg-transparent py-6 lg:py-8'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-white/30 transition-colors">
            <MonogramLogo size={24} />
          </div>
          <span className="text-lg font-black tracking-tighter mono text-white">
            SABIR<span className="text-zinc-500">_ALI</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
            >
              <span className="mono text-[9px] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                {link.id}
              </span>
              <span>{link.name}</span>
            </a>
          ))}

          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-white text-black text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-200 transition-all duration-200 active:scale-95"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={14} />
          </a>
        </nav>

        {/* Mobile Hamburger Trigger */}
        <div className="lg:hidden flex items-center space-x-4">
          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-widest"
          >
            Connect
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-[#080808]/98 backdrop-blur-3xl border-b border-white/10 p-8 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-black tracking-tight uppercase text-white hover:text-zinc-400 transition-colors flex items-center justify-between border-b border-white/5 pb-4"
            >
              <span>{link.name}</span>
              <span className="mono text-xs text-zinc-600">{link.id}</span>
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-4">
            <a
              href="/Sabir CV.pdf"
              download
              className="py-4 text-center border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest text-zinc-300"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="py-4 text-center bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest"
            >
              Initiate Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
