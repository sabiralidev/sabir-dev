import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Server, Database, Cpu } from 'lucide-react';
import { SectionHeading, TiltCard } from '../Common/UI';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            y: 54,
            autoAlpha: 0,
            rotateX: 6,
            transformPerspective: 1000,
            transformOrigin: 'left bottom',
          },
          {
            y: 0,
            autoAlpha: 1,
            rotateX: 0,
            duration: 1.1,
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
        const content = contentRef.current;
        const copy = content.children;
        const contentTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: content,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });

        contentTimeline.fromTo(
          copy,
          { y: 34, autoAlpha: 0, rotateX: 3, transformPerspective: 900 },
          {
            y: 0,
            autoAlpha: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.13,
            ease: 'power3.out',
          }
        );
        contentTimeline.fromTo(
          content.querySelectorAll('.about-stat'),
          { y: 18, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '-=0.25'
        );
      }

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            rotateY: 10,
            rotateX: 5,
            y: 30,
            autoAlpha: 0,
            transformPerspective: 1200,
            transformOrigin: 'center center',
          },
          {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            autoAlpha: 1,
            duration: 1.1,
            ease: 'power3.out',
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
  }, [prefersReducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/[0.06] bg-[#090909] px-5 py-24 sm:px-8 sm:py-28 lg:px-16 lg:py-36 xl:px-20"
    >
      <div className="relative z-10 mx-auto max-w-screen-xl">
        <div ref={headingRef}>
          <SectionHeading
            number="01"
            category="About / Engineering"
            title={<>Systems-first <span className="font-light text-zinc-500">engineering.</span></>}
            subtitle="Architecting resilient software systems with sub-millisecond efficiency and structural integrity for full-stack web applications."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <div ref={contentRef} className="space-y-8 lg:col-span-7 lg:space-y-9">
            <p className="text-xl font-light leading-snug text-zinc-300 sm:text-2xl lg:text-3xl">
              I design systems with a rigorous focus on <span className="text-white font-semibold underline decoration-white/30 underline-offset-8">data integrity</span>, long-term stability, and scalable architecture — ensuring applications stay reliable under high concurrency.
            </p>

            <p className="max-w-3xl text-sm font-light leading-relaxed text-zinc-400 sm:text-base">
              As a dedicated Full-Stack Engineer, I have standardized zero-trust security and high-uptime architectures across mission-critical systems. My work spans decoupled MERN stack platforms, intelligent AI workflows, and high-throughput transaction pipelines that balance velocity with architectural rigor.
            </p>

            <div className="grid grid-cols-1 gap-3 border-y border-white/[0.08] py-5 sm:grid-cols-3 sm:gap-4">
              <div className="flex items-center gap-3 py-1">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-zinc-200">
                  <Server size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white">Full-Stack MERN</h4>
                  <p className="mono mt-1 text-[9px] text-zinc-500">End-to-End Delivery</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-1">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-zinc-200">
                  <Database size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white">Data Consistency</h4>
                  <p className="mono mt-1 text-[9px] text-zinc-500">MongoDB & Postgres</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-1">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-zinc-200">
                  <Cpu size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white">AI Workflows</h4>
                  <p className="mono mt-1 text-[9px] text-zinc-500">Google Gemini Studio</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 sm:gap-6">
              <div className="about-stat space-y-1">
                <span className="mono text-3xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
                  02<span className="text-zinc-600">+</span>
                </span>
                <p className="mono text-[8px] font-medium uppercase tracking-[0.12em] text-zinc-500 sm:text-[9px] sm:tracking-[0.18em]">
                  Years_Active
                </p>
              </div>

              <div className="about-stat space-y-1">
                <span className="mono text-3xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
                  20<span className="text-zinc-600">+</span>
                </span>
                <p className="mono text-[8px] font-medium uppercase tracking-[0.12em] text-zinc-500 sm:text-[9px] sm:tracking-[0.18em]">
                  Deployments
                </p>
              </div>

              <div className="about-stat space-y-1">
                <span className="mono text-3xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
                  99<span className="text-zinc-600">%</span>
                </span>
                <p className="mono text-[8px] font-medium uppercase tracking-[0.12em] text-zinc-500 sm:text-[9px] sm:tracking-[0.18em]">
                  Stability%
                </p>
              </div>
            </div>
          </div>

          <div ref={cardRef} className="lg:col-span-5">
            <TiltCard className="min-h-[360px] p-7 sm:p-9" glow={false}>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:36px_36px] opacity-40" />
              <div className="relative flex min-h-[300px] flex-col justify-between">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <span className="mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">Engineering focus</span>
                  <span className="h-1.5 w-1.5 bg-[#d71920]" />
                </div>
                <div className="py-10">
                  <p className="mono mb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Reliable by design</p>
                  <h3 className="max-w-sm text-3xl font-medium leading-tight tracking-[-0.05em] text-[#e5e5e5] sm:text-4xl">
                    From data integrity to scalable delivery.
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                  <div>
                    <p className="mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">Core stack</p>
                    <p className="mt-2 text-sm text-zinc-200">MERN / Next.js</p>
                  </div>
                  <div>
                    <p className="mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">Focus</p>
                    <p className="mt-2 text-sm text-zinc-200">Security / performance</p>
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
