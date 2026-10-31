import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MonogramLogo } from './MonogramLogo';
import { MagneticLink } from './UI';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'approach', 'projects', 'experience', 'contact']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Approach', href: '#approach' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/[0.08] bg-[#050505]/95 py-3 backdrop-blur-xl'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-5 sm:px-8 lg:px-16 xl:px-20">
        <a
          href="#hero"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden border border-white/10 transition-colors group-hover:border-white/30">
            <MonogramLogo size={22} />
          </div>
          <span className="flex flex-col gap-0.5">
            <span className="mono text-sm font-semibold leading-none tracking-[-0.06em] text-white sm:text-base">
              SABIR<span className="text-zinc-400">_ALI</span>
            </span>
            <span className="mono text-[11px] font-medium uppercase leading-tight tracking-[0.1em] text-zinc-300">
              Full-Stack Engineer
            </span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
              className={`group relative flex items-center py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 hover:text-white ${
                activeSection === link.href.slice(1) ? 'text-white' : 'text-zinc-400'
              }`}
            >
              <span>{link.name}</span>
              <span
                className={`absolute inset-x-0 -bottom-1 h-px origin-left bg-[#d71920] transition-transform duration-300 ${
                  activeSection === link.href.slice(1) ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}

          <MagneticLink
            href="#contact"
            className="inline-flex min-h-10 items-center gap-2 bg-[#e5e5e5] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-white"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={14} />
          </MagneticLink>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <MagneticLink
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="border border-white/15 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-zinc-200"
          >
            Connect
          </MagneticLink>
          <button
            ref={menuButtonRef}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center text-zinc-300 transition-colors hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100svh-4rem)] overflow-y-auto border-b border-white/10 bg-[#080808] px-5 py-5 sm:px-8 lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between border-b border-white/[0.08] py-4 text-base font-medium transition-colors hover:text-white ${
                  activeSection === link.href.slice(1) ? 'text-white' : 'text-zinc-400'
                }`}
                >
                  <span>{link.name}</span>
                </a>
            ))}
          </nav>
          <div className="flex gap-3 pt-5">
            <a
              href="/Sabir%20Resume.pdf"
              download
              className="flex min-h-11 flex-1 items-center justify-center border border-white/15 text-[9px] font-semibold uppercase tracking-[0.12em] text-zinc-300"
            >
              Download resume
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex min-h-11 flex-1 items-center justify-center bg-[#e5e5e5] text-[9px] font-bold uppercase tracking-[0.12em] text-black"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
