import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Logo3D } from './Logo3D';

export const SignatureReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        logoWrapperRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.0, delay: 0.1 }
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.08]"
    >
      <div className="flex items-center gap-6">
        <div
          ref={logoWrapperRef}
          className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 flex items-center justify-center"
        >
          <Logo3D size={80} className="scale-75 md:scale-90" />
        </div>

        <div ref={textRef} className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="mono text-lg md:text-xl font-black tracking-tighter text-white">
              SABIR<span className="text-zinc-500">_ALI</span>
            </span>
            <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-zinc-400 bg-white/[0.04] border border-white/[0.08] rounded-full">
              EST. 2024
            </span>
          </div>
          <span className="text-[10px] mono uppercase tracking-[0.25em] text-zinc-500 mt-0.5">
            Full-Stack Systems & Architecture
          </span>
        </div>
      </div>

      <div ref={statusRef} className="flex items-center gap-6">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
            Open for Worldwide Roles
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 mono text-[10px] text-zinc-500">
          <span>LAT: 33.72° N</span>
          <span className="text-zinc-700">|</span>
          <span>SYSTEMS READY</span>
        </div>
      </div>
    </div>
  );
};
