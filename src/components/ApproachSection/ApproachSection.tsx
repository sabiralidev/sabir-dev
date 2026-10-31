import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Network, Zap, Shield, GitBranch } from 'lucide-react';
import { SectionHeading, TiltCard } from '../Common/UI';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const ApproachSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            y: 45,
            autoAlpha: 0,
            rotateX: 5,
            transformPerspective: 1000,
            transformOrigin: 'left bottom',
          },
          {
            y: 0,
            autoAlpha: 1,
            rotateX: 0,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          {
            y: 46,
            autoAlpha: 0,
            rotateY: window.matchMedia('(hover: hover) and (pointer: fine)').matches
              ? 5
              : 0,
            transformPerspective: 1000,
            transformOrigin: 'center center',
          },
          {
            y: 0,
            autoAlpha: 1,
            rotateY: 0,
            duration: 0.85,
            stagger: 0.13,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const pillars = [
    {
      number: '01',
      title: 'Architectural Decoupling',
      tagline: 'MERN & Next.js Modular Systems',
      description:
        'Enforcing clean separation between UI layers, API endpoints, and persistence services. Designing decoupled microservices and serverless functions that allow independent scaling without monolithic bottlenecks.',
      icon: <Network size={22} />,
      metrics: 'Zero tight-coupling // Domain boundaries',
    },
    {
      number: '02',
      title: 'Performance By Default',
      tagline: 'Sub-second Latency & Atomic State',
      description:
        'Achieving sub-second initial loads through server rendering, smart asset delivery, atomic state management with Redux Toolkit and TanStack Query, and database query optimization with MongoDB & PostgreSQL.',
      icon: <Zap size={22} />,
      metrics: '<100ms API response // 60 FPS UX',
    },
    {
      number: '03',
      title: 'Zero-Trust Security',
      tagline: 'Hardened Authentication & RBAC',
      description:
        'Implementing strict cryptographic authentication with JWT/OAuth, role-based access control, parameterized queries to prevent injections, and secure payment pipelines with Stripe for enterprise workflows.',
      icon: <Shield size={22} />,
      metrics: 'Encrypted payloads // Audit logging',
    },
    {
      number: '04',
      title: 'Maintainable Codecraft',
      tagline: 'Strict TypeScript & CI/CD Pipelines',
      description:
        'Writing strictly typed, self-documenting TypeScript with comprehensive error boundaries, reproducible builds, and GitOps workflows that guarantee reliable continuous delivery to production.',
      icon: <GitBranch size={22} />,
      metrics: 'Type-safe contracts // Zero regression',
    },
  ];

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/[0.06] bg-[#090909] px-5 py-24 sm:px-8 sm:py-28 lg:px-16 lg:py-36 xl:px-20"
    >
      <div className="relative z-10 mx-auto max-w-screen-xl">
        <div ref={headingRef}>
          <SectionHeading
            number="03"
            category="How I Work"
            title={<>Architecture with <span className="font-light text-zinc-500">intent.</span></>}
            subtitle="Four core engineering pillars applied to every application to ensure durability, security, and effortless scalability."
          />
        </div>

        <div ref={gridRef} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:gap-5">
          {pillars.map((pillar) => (
            <TiltCard
              key={pillar.number}
              className="group flex flex-col justify-between p-6 sm:p-8"
              glow={false}
            >
              <div>
                <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
                  <div className="flex items-center gap-2">
                    <span className="mono text-[10px] font-medium text-[#d71920]">
                      {pillar.number}
                    </span>
                    <span className="mono text-[9px] uppercase tracking-[0.12em] text-zinc-400">
                      {pillar.tagline}
                    </span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center border border-white/10 text-zinc-300 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white">
                    {pillar.icon}
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="mb-3 text-xl font-medium tracking-tight text-white sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-zinc-400">
                    {pillar.description}
                  </p>
                </div>
              </div>

              <div className="mono mt-6 flex items-start justify-between gap-4 border-t border-white/[0.05] pt-5 text-[9px] text-zinc-500">
                <span>{pillar.metrics}</span>
                <span className="shrink-0 text-zinc-600">METHOD</span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
