import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MonogramLogo } from '../Common/MonogramLogo';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const SignatureReveal: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        logoWrapperRef.current,
        {
          scale: 0.72,
          opacity: 0,
          z: -55,
          rotateY: -28,
          rotateX: 10,
          transformPerspective: 750,
        },
        {
          scale: 1,
          opacity: 1,
          z: 0,
          rotateY: 0,
          rotateX: 0,
          duration: 1.05,
          delay: 0.1,
        }
      )
        .fromTo(
          textRef.current,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          statusRef.current,
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9 },
          '-=0.7'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col items-center justify-between gap-5 border-b border-white/[0.08] pb-6 sm:flex-row sm:pb-7"
    >
      <div className="flex items-center gap-6">
        <div
          ref={logoWrapperRef}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14"
        >
          <MonogramLogo size={46} className="drop-shadow-[0_2px_12px_rgba(255,255,255,0.12)]" />
        </div>

        <div ref={textRef} className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="mono text-base font-semibold tracking-[-0.06em] text-white sm:text-lg">
              SABIR<span className="text-zinc-400">_ALI</span>
            </span>
            <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-zinc-400 bg-white/[0.04] border border-white/[0.08] rounded-full">
              EST. 2024
            </span>
          </div>
          <span className="mono mt-0.5 text-[9px] uppercase tracking-[0.2em] text-zinc-400">
            Full-Stack Systems & Architecture
          </span>
        </div>
      </div>

      <div ref={statusRef} className="flex items-center gap-6">
        <div className="flex items-center gap-3 border border-white/[0.08] px-3 py-2">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d71920]"></span>
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-300">
            Open for Worldwide Roles
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 mono text-[10px] text-zinc-400">
          <span>LAT: 33.72° N</span>
          <span className="text-zinc-700">|</span>
          <span>SYSTEMS READY</span>
        </div>
      </div>
    </div>
  );
};
