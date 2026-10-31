import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Binary, Globe, Cpu, Award, GraduationCap } from 'lucide-react';
import { SectionHeading, TiltCard } from '../Common/UI';
import { SKILLS, CERTIFICATIONS, EDUCATION } from '../../../data';

gsap.registerPlugin(ScrollTrigger);

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (certsRef.current) {
        gsap.fromTo(
          certsRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.16,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: certsRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCategoryIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Layers size={20} />;
      case 1:
        return <Binary size={20} />;
      case 2:
        return <Globe size={20} />;
      case 3:
      default:
        return <Cpu size={20} />;
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-28 lg:py-48 px-6 md:px-12 lg:px-24 bg-[#050505] relative overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            number="02"
            category="Technical Stack"
            title={<>The Production <br className="hidden sm:inline" /><span className="text-zinc-500 font-light">Ecosystem.</span></>}
            subtitle="Curated full-stack technologies standardized for high-concurrency systems, low latency, and robust deployment pipelines."
          />
        </div>

        {/* 4 Category Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {SKILLS.map((cat, idx) => (
            <TiltCard
              key={cat.title}
              className="p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-8 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <span className="mono text-xs text-zinc-500">0{idx + 1}</span>
                    <h3 className="font-black text-xl tracking-tight uppercase text-white">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:bg-white group-hover:text-black transition-all duration-300">
                    {getCategoryIcon(idx)}
                  </div>
                </div>

                <ul className="space-y-4 pt-8">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center justify-between text-zinc-400 group/item hover:text-white transition-colors"
                    >
                      <span className="text-sm font-medium tracking-tight">
                        {skill}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover/item:bg-white group-hover/item:scale-125 transition-all" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-white/[0.05] flex items-center justify-between text-zinc-600 text-[10px] mono">
                <span>STATUS: VERIFIED</span>
                <span>ENTERPRISE</span>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Certifications & Education Sub-Grid */}
        <div
          ref={certsRef}
          className="mt-20 pt-16 border-t border-white/[0.08] grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {/* Certifications */}
          <div className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-6">
              <Award size={20} className="text-zinc-300" />
              <h4 className="mono text-xs uppercase tracking-[0.3em] text-zinc-400">
                Accreditations & Certifications
              </h4>
            </div>

            <div className="space-y-6">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.name}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-base font-bold text-white tracking-tight">
                      {cert.name}
                    </h5>
                    <p className="text-xs text-zinc-400 mt-1 mono">
                      {cert.issuer}
                    </p>
                  </div>
                  <span className="mono text-[10px] font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-400">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap size={20} className="text-zinc-300" />
              <h4 className="mono text-xs uppercase tracking-[0.3em] text-zinc-400">
                Education & Background
              </h4>
            </div>

            <div className="space-y-6">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.institution}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-base font-bold text-white tracking-tight">
                      {edu.institution}
                    </h5>
                    <p className="text-xs text-zinc-400 mt-1 mono">
                      {edu.degree}
                    </p>
                  </div>
                  <span className="mono text-[10px] font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-400">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
