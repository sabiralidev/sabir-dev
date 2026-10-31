import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { SectionHeading } from '../Common/UI';
import { EXPERIENCES } from '../../../data';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

      const entries = timelineRef.current?.querySelectorAll('.timeline-entry');
      if (entries) {
        entries.forEach((entry) => {
          gsap.fromTo(
            entry,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-28 lg:py-48 px-6 md:px-12 lg:px-24 bg-[#080808] border-t border-b border-white/[0.06] relative overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            number="05"
            category="Career Path"
            title={<>Professional <br className="hidden sm:inline" /><span className="text-zinc-500 font-light">History.</span></>}
            subtitle="Engineering trajectory defined by mission-critical government systems, startup AI platforms, and high-performance applications."
          />
        </div>

        <div ref={timelineRef} className="max-w-4xl mx-auto mt-16 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={exp.id}
              className="timeline-entry relative pl-8 sm:pl-12 border-l border-white/10 last:border-l-transparent group"
            >
              {/* Timeline Node Marker */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#080808] border-2 border-white/40 group-hover:border-white transition-colors duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-60 group-hover:opacity-100" />
              </div>

              {/* Card Container */}
              <div className="p-8 sm:p-10 rounded-[2rem] bg-[#0c0c0c] border border-white/[0.08] group-hover:border-white/[0.18] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {/* Header Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/[0.08]">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="mono text-[10px] text-zinc-500">
                        NODE_0{idx + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-zinc-400 text-sm">
                      <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                        <Briefcase size={14} className="text-zinc-500" />
                        {exp.company}
                      </span>
                    </div>
                  </div>

                  <div className="self-start sm:self-center shrink-0">
                    <span className="mono text-[10px] font-bold uppercase tracking-wider text-zinc-300 px-4 py-2 bg-white/[0.04] border border-white/10 rounded-full flex items-center gap-2">
                      <Calendar size={12} className="text-zinc-500" />
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Description Bullets */}
                <ul className="mt-6 space-y-3.5">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3.5 text-zinc-400 text-sm sm:text-base font-light leading-relaxed group/item"
                    >
                      <CheckCircle
                        size={16}
                        className="text-zinc-600 mt-1 shrink-0 group-hover/item:text-white transition-colors"
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
