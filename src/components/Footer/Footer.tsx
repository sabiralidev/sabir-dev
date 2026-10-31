import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ChevronUp, Code2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MonogramLogo } from '../Common/MonogramLogo';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);
  const clockRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const updateTime = () => {
      if (clockRef.current) {
        clockRef.current.textContent = new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Karachi',
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current?.querySelectorAll('[data-footer-reveal]') ?? [],
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
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
    <footer ref={footerRef} className="relative overflow-hidden border-t border-white/[0.08] bg-[#050505] px-5 pb-8 pt-16 text-white sm:px-8 sm:pt-20 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 gap-10 border-b border-white/[0.08] pb-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12 lg:pb-12">
          <div data-footer-reveal className="space-y-5 sm:col-span-2 lg:col-span-5">
            <a href="#hero" className="flex items-center gap-3 group w-fit">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden border border-white/10 transition-colors group-hover:border-white/30">
                <MonogramLogo size={24} />
              </div>
              <span className="mono text-lg font-semibold tracking-[-0.06em] text-white">
                SABIR<span className="text-zinc-500">_ALI</span>
              </span>
            </a>

            <p className="max-w-sm text-sm font-light leading-relaxed text-zinc-400">
              Full-Stack Engineer architecting scalable web applications, resilient systems, and high-concurrency architectures for global enterprise delivery.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/sabiralidev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-400 transition-colors hover:border-white/30 hover:text-white"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/sabiralidev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-400 transition-colors hover:border-white/30 hover:text-white"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://dev.to/sabirsheikh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DEV.to Articles"
                className="flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-400 transition-colors hover:border-white/30 hover:text-white"
              >
                <Code2 size={16} />
              </a>
              <a
                href="mailto:sabirsheik12787@gmail.com"
                aria-label="Email Sabir"
                className="flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-400 transition-colors hover:border-white/30 hover:text-white"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div data-footer-reveal className="space-y-4 lg:col-span-3">
            <span className="mono block text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-500">
              Navigation
            </span>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-reveal className="space-y-4 lg:col-span-2">
            <span className="mono block text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-500">
              Location
            </span>
            <div>
              <p className="text-sm font-medium tracking-tight text-white">
                Pakistan (PKT)
              </p>
              <p ref={clockRef} className="mono mt-2 text-xl font-medium tracking-tight text-zinc-300">
                --:--:--
              </p>
              <p className="mono mt-1 text-[9px] text-zinc-500">UTC +05:00</p>
            </div>
          </div>

          <div data-footer-reveal className="flex flex-col items-start justify-between gap-6 sm:col-span-2 sm:flex-row lg:col-span-2 lg:flex-col lg:items-end">
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="flex h-11 w-11 items-center justify-center border border-white/10 transition-colors hover:border-white hover:bg-white hover:text-black group"
            >
              <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
            </button>

            <div className="text-left lg:text-right">
              <span className="mono mb-1 block text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                SYSTEM AVAILABILITY
              </span>
              <div className="flex items-center gap-2 justify-start lg:justify-end">
                <span className="h-1.5 w-1.5 bg-[#d71920]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-200">
                  Available Q2/Q3
                </span>
              </div>
            </div>
          </div>
        </div>

        <div data-footer-reveal className="mono flex flex-col items-start justify-between gap-3 pt-6 text-[8px] uppercase tracking-[0.12em] text-zinc-600 sm:flex-row sm:items-center sm:text-[9px]">
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
