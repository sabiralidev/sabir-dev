import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Binary, Globe, Cpu, Award, GraduationCap } from 'lucide-react';
import { SectionHeading, TiltCard } from '../Common/UI';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SKILLS, CERTIFICATIONS, EDUCATION } from '../../../data';

gsap.registerPlugin(ScrollTrigger);

export const SkillsSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { z: -130, rotateX: 10, rotateY: -4, scale: 0.96, opacity: 0.35, transformPerspective: 1100 },
          {
            z: 0,
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              end: 'top 38%',
              scrub: 0.7,
            },
          }
        );
      }

      const cards = cardsRef.current?.querySelectorAll('.skills-card-depth');
      if (cards) {
        gsap.fromTo(
          cards,
          {
            z: -190,
            autoAlpha: 0.25,
            rotateX: window.matchMedia('(hover: hover) and (pointer: fine)').matches
              ? 14
              : 7,
            rotateY: window.matchMedia('(hover: hover) and (pointer: fine)').matches
              ? -7
              : 0,
            scale: 0.88,
            transformPerspective: 1200,
            transformOrigin: 'center center',
          },
          {
            z: 0,
            autoAlpha: 1,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            stagger: 0.14,
            ease: 'none',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 88%',
              end: 'bottom 52%',
              scrub: 0.7,
            },
          }
        );
      }

      const skillIcons = cardsRef.current?.querySelectorAll('.skills-card-depth svg');
      skillIcons?.forEach((icon, index) => {
        const card = icon.closest('.skills-card-depth');
        if (!card) return;

        gsap.fromTo(
          icon,
          {
            z: -80,
            rotateX: index % 2 === 0 ? 42 : -42,
            rotateY: index % 2 === 0 ? -48 : 48,
            rotateZ: index % 2 === 0 ? -12 : 12,
            scale: 0.72,
            transformPerspective: 700,
          },
          {
            z: 18,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 42%',
              scrub: 0.6,
            },
          }
        );
      });

      if (certsRef.current) {
        gsap.fromTo(
          certsRef.current.children,
          { z: -140, rotateY: 8, rotateX: 5, scale: 0.94, autoAlpha: 0.25, transformPerspective: 1100 },
          {
            z: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            autoAlpha: 1,
            stagger: 0.12,
            ease: 'none',
            scrollTrigger: {
              trigger: certsRef.current,
              start: 'top 88%',
              end: 'bottom 55%',
              scrub: 0.7,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

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
      className="relative overflow-hidden bg-[#050505] px-5 py-24 sm:px-8 sm:py-28 lg:px-16 lg:py-36 xl:px-20"
    >
      <div className="relative z-10 mx-auto max-w-screen-xl">
        <div ref={headingRef}>
          <SectionHeading
            number="02"
            category="Technical Expertise"
            title={<>The production <span className="font-light text-zinc-500">ecosystem.</span></>}
            subtitle="Curated full-stack technologies standardized for high-concurrency systems, low latency, and robust deployment pipelines."
          />
        </div>

        <div ref={cardsRef} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:gap-5">
          {SKILLS.map((cat, idx) => (
            <TiltCard
              key={cat.title}
              className="group flex flex-col justify-between p-6 sm:p-7"
            >
              <div className="skills-card-depth relative z-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                  <div className="flex items-center gap-3">
                    <span className="mono text-[10px] text-[#d71920]">0{idx + 1}</span>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-white sm:text-base">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center border border-white/10 text-zinc-300 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white">
                    {getCategoryIcon(idx)}
                  </div>
                </div>

                <ul className="grid grid-cols-1 gap-x-4 gap-y-3 pt-6 sm:grid-cols-2">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center justify-between gap-2 text-zinc-400 transition-colors group/item hover:text-white"
                    >
                      <span className="text-xs font-medium tracking-tight sm:text-sm">
                        {skill}
                      </span>
                      <div className="h-1 w-1 shrink-0 rounded-full bg-zinc-700 transition-colors group-hover/item:bg-[#d71920]" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mono mt-7 flex items-center justify-between border-t border-white/[0.05] pt-5 text-[9px] text-zinc-600">
                <span>SKILLS / 0{idx + 1}</span>
                <span>{cat.skills.length} TECHNOLOGIES</span>
              </div>
              </div>
            </TiltCard>
          ))}
        </div>

        <div
          ref={certsRef}
          className="mt-16 grid grid-cols-1 gap-8 border-t border-white/[0.08] pt-10 lg:mt-20 lg:grid-cols-2 lg:gap-12 lg:pt-12"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Award size={17} className="text-zinc-300" />
              <h4 className="mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                Accreditations & Certifications
              </h4>
            </div>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div>
                    <h5 className="text-sm font-medium tracking-tight text-white">
                      {cert.name}
                    </h5>
                    <p className="mono mt-1 text-[10px] text-zinc-500">
                      {cert.issuer}
                    </p>
                  </div>
                  <span className="mono shrink-0 text-[9px] text-zinc-500">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <GraduationCap size={17} className="text-zinc-300" />
              <h4 className="mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                Education & Background
              </h4>
            </div>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.institution}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div>
                    <h5 className="text-sm font-medium tracking-tight text-white">
                      {edu.institution}
                    </h5>
                    <p className="mono mt-1 text-[10px] text-zinc-500">
                      {edu.degree}
                    </p>
                  </div>
                  <span className="mono shrink-0 text-[9px] text-zinc-500">
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
