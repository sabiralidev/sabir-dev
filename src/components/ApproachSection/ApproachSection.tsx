import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Network, Zap, Shield, GitBranch } from 'lucide-react';
import { SectionHeading, TiltCard } from '../Common/UI';

gsap.registerPlugin(ScrollTrigger);

export const ApproachSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
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
  }, []);

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
      className="py-28 lg:py-48 px-6 md:px-12 lg:px-24 bg-[#080808] border-t border-b border-white/[0.06] relative overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            number="03"
            category="Engineering Methodology"
            title={<>Architectural <br className="hidden sm:inline" /><span className="text-zinc-500 font-light">Rigor.</span></>}
            subtitle="Four core engineering pillars applied to every application to ensure durability, security, and effortless scalability."
          />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {pillars.map((pillar) => (
            <TiltCard
              key={pillar.number}
              className="p-8 sm:p-10 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <span className="mono text-xs font-bold text-zinc-500">
                      PILLAR_{pillar.number}
                    </span>
                    <span className="w-4 h-px bg-white/10" />
                    <span className="mono text-[10px] uppercase tracking-wider text-zinc-400">
                      {pillar.tagline}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:bg-white group-hover:text-black transition-all duration-300">
                    {pillar.icon}
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-8 border-t border-white/[0.05] flex items-center justify-between mono text-[10px] text-zinc-500">
                <span>{pillar.metrics}</span>
                <span className="text-zinc-600">STANDARD</span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
