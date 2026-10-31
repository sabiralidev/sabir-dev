import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Server, Database, Cpu } from 'lucide-react';
import { SectionHeading, TiltCard } from '../Common/UI';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { scale: 0.92, y: 40, opacity: 0 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 lg:py-48 px-6 md:px-12 lg:px-24 bg-[#080808] border-t border-b border-white/[0.06] relative overflow-hidden"
    >
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            number="01"
            category="Philosophy & Systems"
            title={<>Systems-First <br className="hidden sm:inline" /><span className="text-zinc-500 font-light">Engineering.</span></>}
            subtitle="Architecting resilient software systems with sub-millisecond efficiency and structural integrity for full-stack web applications."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center mt-16">
          {/* Left Text & Metrics Column (7 cols) */}
          <div ref={contentRef} className="lg:col-span-7 space-y-10">
            <p className="text-2xl sm:text-3xl lg:text-4xl text-zinc-300 font-light leading-snug">
              I design systems with a rigorous focus on <span className="text-white font-semibold underline decoration-white/30 underline-offset-8">data integrity</span>, long-term stability, and scalable architecture — ensuring applications stay reliable under high concurrency.
            </p>

            <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
              As a dedicated Full-Stack Engineer, I have standardized zero-trust security and high-uptime architectures across mission-critical systems. My work spans decoupled MERN stack platforms, intelligent AI workflows, and high-throughput transaction pipelines that balance velocity with architectural rigor.
            </p>

            {/* Architectural Highlights Pill Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white shrink-0">
                  <Server size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Full-Stack MERN</h4>
                  <p className="text-[11px] text-zinc-500 mono mt-0.5">End-to-End Delivery</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white shrink-0">
                  <Database size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Data Consistency</h4>
                  <p className="text-[11px] text-zinc-500 mono mt-0.5">MongoDB & Postgres</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white shrink-0">
                  <Cpu size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">AI Workflows</h4>
                  <p className="text-[11px] text-zinc-500 mono mt-0.5">Google Gemini Studio</p>
                </div>
              </div>
            </div>

            {/* Real Metrics Counter Row */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/[0.08]">
              <div className="space-y-1">
                <span className="mono text-4xl sm:text-6xl font-black tracking-tighter text-white">
                  02<span className="text-zinc-600">+</span>
                </span>
                <p className="mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                  Years_Active
                </p>
              </div>

              <div className="space-y-1">
                <span className="mono text-4xl sm:text-6xl font-black tracking-tighter text-white">
                  20<span className="text-zinc-600">+</span>
                </span>
                <p className="mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                  Deployments
                </p>
              </div>

              <div className="space-y-1">
                <span className="mono text-4xl sm:text-6xl font-black tracking-tighter text-white">
                  99<span className="text-zinc-600">%</span>
                </span>
                <p className="mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                  Stability%
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Monolith Card (5 cols) */}
          <div ref={cardRef} className="lg:col-span-5">
            <TiltCard className="p-4 bg-gradient-to-b from-[#111111] to-[#0a0a0a] group">
              <div className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden bg-black border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=85&w=1200"
                  alt="Infrastructure & Security"
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 transition-all duration-700 group-hover:scale-105 group-hover:brightness-90"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                {/* Overlaid Security Seal */}
                <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center shrink-0 shadow-xl">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <span className="mono text-[9px] uppercase tracking-widest text-zinc-400 block">
                        ARCHITECTURE PROTOCOL
                      </span>
                      <h4 className="text-lg font-black uppercase tracking-tight text-white">
                        Zero-Trust & High-Uptime
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
