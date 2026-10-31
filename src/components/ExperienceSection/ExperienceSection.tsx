import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { SectionHeading } from '../Common/UI';
import { EXPERIENCES } from '../../../data';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

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

      const entries = timelineRef.current?.querySelectorAll('.timeline-entry');
      if (entries) {
        entries.forEach((entry) => {
          gsap.fromTo(
            entry,
            { y: 36, autoAlpha: 0, rotateX: 4, transformPerspective: 900 },
            {
              y: 0,
              autoAlpha: 1,
              rotateX: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: entry,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }

      if (timelineRef.current && progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 72%',
              end: 'bottom 76%',
              scrub: 0.7,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/[0.06] bg-[#090909] px-5 py-24 sm:px-8 sm:py-28 lg:px-16 lg:py-36 xl:px-20"
    >
      <div className="relative z-10 mx-auto max-w-screen-xl">
        <div ref={headingRef}>
          <SectionHeading
            number="05"
            category="Experience"
            title={<>Professional <span className="font-light text-zinc-500">experience.</span></>}
            subtitle="Engineering trajectory defined by mission-critical government systems, startup AI platforms, and high-performance applications."
          />
        </div>

        <div ref={timelineRef} className="relative mx-auto mt-12 max-w-4xl space-y-8 pl-px lg:mt-16 lg:space-y-10">
          <div
            ref={progressRef}
            className="pointer-events-none absolute bottom-0 left-0 top-0 w-px origin-top bg-[#d71920]"
            aria-hidden="true"
          />
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={exp.id}
              className="timeline-entry group relative pb-1 pl-6 sm:pl-9"
            >
              <div className="absolute -left-[4px] top-2 h-2 w-2 bg-[#d71920] ring-4 ring-[#090909]">
              </div>

              <div className="border-b border-white/[0.1] pb-7 sm:pb-9">
                <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="mono text-[9px] text-zinc-500">
                        NODE_0{idx + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium tracking-tight text-[#e5e5e5] sm:text-2xl">
                      {exp.role}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                      <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                        <Briefcase size={13} className="text-zinc-500" />
                        {exp.company}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 self-start sm:self-center">
                    <span className="mono flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-zinc-400">
                      <Calendar size={12} className="text-zinc-500" />
                      {exp.period}
                    </span>
                  </div>
                </div>

                <ul className="mt-5 space-y-3">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="group/item flex items-start gap-3 text-sm font-light leading-relaxed text-zinc-400 sm:text-[15px]"
                    >
                      <CheckCircle
                        size={16}
                        className="mt-1 shrink-0 text-zinc-600 transition-colors group-hover/item:text-[#d71920]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
