import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../Common/UI';
import { PROJECTS } from '../../../data';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectListRef = useRef<HTMLDivElement>(null);

  const projectImages = [
    '/Ecommerce.png',
    '/AIworldTech.png',
  ];

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

      const items = projectListRef.current?.children;
      if (items) {
        Array.from(items).forEach((item) => {
          gsap.fromTo(
            item,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
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
      id="projects"
      ref={sectionRef}
      className="py-28 lg:py-48 px-6 md:px-12 lg:px-24 bg-[#050505] relative overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <SectionHeading
            number="04"
            category="Case Studies"
            title={<>Selected <br className="hidden sm:inline" /><span className="text-zinc-500 font-light">Works.</span></>}
            subtitle="Deep architectural analysis of production systems, solving concurrency, transaction resilience, and data consistency."
            className="mb-0 lg:mb-0"
          />

          <a
            href="https://github.com/sabiralidev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/30 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 self-start md:self-end transition-all duration-300 hover:bg-white/[0.08]"
          >
            <Github size={16} />
            <span>View All on GitHub</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Project Showcase List */}
        <div ref={projectListRef} className="space-y-24 lg:space-y-36 mt-16">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="p-8 sm:p-12 lg:p-16 rounded-[2.5rem] bg-[#0c0c0c] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Visual Column (6 cols) */}
                <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[16/10] rounded-[1.75rem] overflow-hidden bg-black border border-white/10 group-hover:border-white/20 transition-all duration-500">
                    <img
                      src={projectImages[idx] || projectImages[0]}
                      alt={project.title}
                      className="w-full h-full object-cover filter grayscale contrast-105 brightness-90 transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:brightness-100"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Quick Action Badges */}
                    <div className="absolute bottom-6 right-6 flex items-center gap-3">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub repo for ${project.title}`}
                          className="p-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white hover:bg-white hover:text-black transition-all duration-300 shadow-xl"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.links?.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live site for ${project.title}`}
                          className="px-5 py-3.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-200 transition-all duration-300 shadow-xl"
                        >
                          <span>Live Site</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details Column (6 cols) */}
                <div className={`lg:col-span-6 space-y-8 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="mono text-xs font-bold text-zinc-500">
                      CASE_0{idx + 1}
                    </span>
                    <span className="w-6 h-px bg-white/20" />
                    <span className="mono text-[10px] uppercase tracking-widest text-zinc-400">
                      Full-Stack Architecture
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white">
                    {project.title}
                  </h3>

                  {/* Architecture & Problem Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-white/[0.08]">
                    <div className="space-y-2">
                      <span className="mono text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">
                        Problem Scenario
                      </span>
                      <p className="text-sm text-zinc-400 font-light leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="mono text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">
                        Engineering Solution
                      </span>
                      <p className="text-sm text-zinc-400 font-light leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Architectural Blueprint Detail */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                    <span className="mono text-[9px] uppercase tracking-widest text-zinc-500 block">
                      SYSTEM ARCHITECTURE & CHALLENGES
                    </span>
                    <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                      {project.architecture} — {project.challenges}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-medium mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
