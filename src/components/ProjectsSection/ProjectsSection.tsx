import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { MagneticLink, SectionHeading, TiltCard } from '../Common/UI';
import { PROJECTS } from '../../../data';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectListRef = useRef<HTMLDivElement>(null);

  const projectImages = [
    '/Ecommerce.png',
    '/AIworldTech.png',
  ];

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

      const items = projectListRef.current?.children;
      if (items) {
        Array.from(items).forEach((item) => {
          gsap.fromTo(
            item,
            {
              y: 52,
              autoAlpha: 0,
              rotateX: 4,
              transformPerspective: 1100,
              transformOrigin: 'center bottom',
            },
            {
              y: 0,
              autoAlpha: 1,
              rotateX: 0,
              duration: 0.95,
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

      const imageLayers =
        projectListRef.current?.querySelectorAll('.project-image-depth');
      imageLayers?.forEach((imageLayer) => {
        gsap.fromTo(
          imageLayer,
          { yPercent: 4 },
          {
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: imageLayer,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] px-5 py-24 sm:px-8 sm:py-28 lg:px-16 lg:py-36 xl:px-20"
    >
      <div className="relative z-10 mx-auto max-w-screen-xl">
        <div ref={headingRef} className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between lg:mb-16">
          <SectionHeading
            number="04"
            category="Selected Projects"
            title={<>Selected <span className="font-light text-zinc-500">work.</span></>}
            subtitle="Deep architectural analysis of production systems, solving concurrency, transaction resilience, and data consistency."
            className="mb-0 lg:mb-0"
          />

          <a
            href="https://github.com/sabiralidev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 self-start border-b border-white/20 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-300 transition-colors hover:border-[#d71920] hover:text-white md:self-end"
          >
            <Github size={16} />
            <span>View All on GitHub</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div ref={projectListRef} className="mt-10 space-y-16 [perspective:1200px] lg:mt-12 lg:space-y-24">
          {PROJECTS.map((project, idx) => (
            <TiltCard
              key={project.id}
              className="group !overflow-visible !rounded-none !border-x-0 !border-y-white/[0.1] !bg-transparent !py-6 !shadow-none sm:!py-8"
              glow={false}
            >
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="project-preview relative aspect-[16/10] overflow-hidden border border-white/10 bg-[#101010] transition-colors duration-500 group-hover:border-white/25">
                    <div className="project-image-depth absolute inset-0">
                      <img
                        src={projectImages[idx] || projectImages[0]}
                        alt={project.title}
                        className="h-full w-full object-cover grayscale contrast-105 brightness-90 transition-[filter,transform] duration-700 group-hover:scale-[1.025] group-hover:grayscale-0 group-hover:brightness-100"
                        loading="lazy"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 right-6 flex items-center gap-3">
                      {project.links?.github && (
                        <MagneticLink
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub repo for ${project.title}`}
                          className="flex h-11 w-11 items-center justify-center border border-white/25 bg-black/80 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
                        >
                          <Github size={18} />
                        </MagneticLink>
                      )}
                      {project.links?.live && (
                        <MagneticLink
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live site for ${project.title}`}
                          className="inline-flex min-h-11 items-center gap-2 bg-[#e5e5e5] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-black transition-colors duration-300 hover:bg-white"
                        >
                          <span>Live Site</span>
                          <ExternalLink size={14} />
                        </MagneticLink>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`space-y-6 lg:col-span-6 lg:space-y-7 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="mono text-[10px] font-medium text-[#d71920]">
                      CASE_0{idx + 1}
                    </span>
                    <span className="h-px w-6 bg-white/20" />
                    <span className="mono text-[9px] uppercase tracking-[0.16em] text-zinc-400">
                      Full-Stack Architecture
                    </span>
                  </div>

                  <h3 className="text-2xl font-medium leading-tight tracking-[-0.05em] text-[#e5e5e5] sm:text-3xl lg:text-4xl">
                    {project.title}
                  </h3>

                  <div className="grid grid-cols-1 gap-5 border-t border-white/[0.08] pt-5 sm:grid-cols-2 sm:gap-6">
                    <div className="space-y-2">
                      <span className="mono block text-[9px] font-medium uppercase tracking-[0.15em] text-zinc-500">
                        Problem Scenario
                      </span>
                      <p className="mt-2 text-sm font-light leading-relaxed text-zinc-400">
                        {project.problem}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="mono block text-[9px] font-medium uppercase tracking-[0.15em] text-zinc-500">
                        Engineering Solution
                      </span>
                      <p className="mt-2 text-sm font-light leading-relaxed text-zinc-400">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 border-l border-white/15 pl-4">
                    <span className="mono block text-[9px] uppercase tracking-[0.14em] text-zinc-500">
                      Architecture & challenges
                    </span>
                    <p className="text-xs font-light leading-relaxed text-zinc-300 sm:text-sm">
                      {project.architecture} — {project.challenges}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="mono border-b border-white/10 pb-1 text-[10px] text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
