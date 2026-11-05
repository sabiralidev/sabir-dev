import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ArrowDown,
  ArrowRight,
  Atom,
  Code2,
  Database,
  Download,
  FileCode2,
  Github,
  Layers,
  Linkedin,
  Network,
  Server,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticLink, Tooltip } from '../Common/UI';

interface HeroSectionProps {
  introComplete?: boolean;
  animateEntrance?: boolean;
}

const nameLetters = (word: string) =>
  Array.from(word).map((letter, index) => (
    <span
      key={`${word}-${index}`}
      className="hero-name-letter inline-block"
      aria-hidden="true"
    >
      {letter}
    </span>
  ));

const stats = [
  { value: 2, suffix: '+', label: 'Years experience' },
  { value: 15, suffix: '+', label: 'Projects delivered' },
  { value: 100, suffix: '%', label: 'Client satisfaction' },
];

const technologies: { name: string; Icon: LucideIcon }[] = [
  { name: 'React', Icon: Atom },
  { name: 'Next.js', Icon: Layers },
  { name: 'Node.js', Icon: Server },
  { name: 'MongoDB', Icon: Database },
  { name: 'Express', Icon: Network },
  { name: 'Tailwind', Icon: Wind },
  { name: 'TypeScript', Icon: FileCode2 },
];

const socialLinks: { name: string; href: string; Icon: LucideIcon }[] = [
  { name: 'GitHub', href: 'https://github.com/sabiralidev', Icon: Github },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sabiralidev/',
    Icon: Linkedin,
  },
  { name: 'DEV Community', href: 'https://dev.to/sabirsheikh', Icon: Code2 },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  introComplete = true,
  animateEntrance = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !introComplete || !animateEntrance || prefersReducedMotion) return;

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timeline
      .fromTo(
        hero.querySelectorAll<HTMLElement>('[data-hero-reveal]'),
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1, clearProps: 'all' }
      )
      .fromTo(
        hero.querySelectorAll<HTMLElement>('.hero-name-letter'),
        { yPercent: 110, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.045,
          clearProps: 'all',
        },
        '-=0.55'
      )
      .fromTo(
        photoRef.current,
        { scale: 0.96, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1, clearProps: 'all' },
        '-=0.65'
      );

    const counters = hero.querySelectorAll<HTMLElement>('[data-stat-count]');
    counters.forEach((element) => {
      const target = Number(element.dataset.statCount);
      const suffix = element.dataset.statSuffix ?? '';
      const counter = { value: 0 };
      element.textContent = `0${suffix}`;
      timeline.to(
        counter,
        {
          value: target,
          duration: 1.1,
          ease: 'power2.out',
          onUpdate: () => {
            element.textContent = `${Math.round(counter.value)}${suffix}`;
          },
        },
        '-=0.75'
      );
    });

    return () => {
      timeline.kill();
    };
  }, [animateEntrance, introComplete, prefersReducedMotion]);

  const handlePhotoPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const photo = photoRef.current;
    if (!photo || prefersReducedMotion || event.pointerType !== 'mouse') return;

    const bounds = photo.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    gsap.to(photo, {
      rotateY: x * 4,
      rotateX: y * -3,
      transformPerspective: 1000,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: true,
    });
  };

  const resetPhotoTilt = () => {
    if (!photoRef.current || prefersReducedMotion) return;
    gsap.to(photoRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: true,
    });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0A0A0B] px-5 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28 lg:justify-center lg:px-16 lg:pt-28 xl:px-20"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(226,230,235,0.12) 0.7px, transparent 0.9px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse at 54% 46%, black 0%, rgba(0,0,0,0.45) 52%, transparent 82%)',
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] h-[28rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(210,216,224,0.11)_0%,rgba(160,166,174,0.045)_36%,transparent_72%)] blur-2xl lg:left-[43%] lg:top-1/2"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-screen-xl flex-1 grid-cols-1 items-center gap-5 sm:gap-8 lg:flex-none lg:grid-cols-12 lg:gap-8 xl:gap-12">
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:col-span-7 lg:items-start lg:text-left">
          <div
            data-hero-reveal
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-tech text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-200 sm:text-[10px]">
              Available for work
            </span>
          </div>

          <p
            data-hero-reveal
            className="mb-2 font-tech text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 sm:text-xs"
          >
            Full-Stack Engineer
          </p>

          <h1
            id="hero-title"
            tabIndex={-1}
            aria-label="Sabir Ali"
            className="font-display flex flex-wrap items-baseline justify-center gap-x-[0.16em] bg-gradient-to-b from-[#F5F6F8] via-[#9EA3A8] to-[#E8EAEC] bg-clip-text text-[clamp(4rem,10vw,7.8rem)] font-bold leading-[0.88] tracking-[-0.075em] text-transparent outline-none focus-visible:ring-2 focus-visible:ring-white/80 lg:justify-start"
          >
            <span className="inline-flex overflow-hidden pb-[0.08em]">
              {nameLetters('SABIR')}
            </span>
            <span className="inline-flex overflow-hidden pb-[0.08em] font-light">
              {nameLetters('ALI')}
            </span>
          </h1>

          <h2
            data-hero-reveal
            className="font-display mt-5 max-w-2xl text-balance text-xl font-medium leading-[1.16] tracking-[-0.04em] text-[#D9DCE0] sm:text-2xl md:text-3xl lg:mt-6 lg:text-[2.4rem]"
          >
            Engineering scalable web architectures.
          </h2>

          <p
            data-hero-reveal
            className="mt-4 max-w-xl text-sm font-light leading-relaxed text-zinc-300 sm:text-base lg:mt-5"
          >
            Building scalable web applications, sophisticated digital experiences, and reliable
            software systems with precision and performance.
          </p>

          <div
            data-hero-reveal
            className="mt-7 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center lg:mt-8"
          >
            <MagneticLink
              href="#projects"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-gradient-to-br from-[#F5F6F8] via-[#D4D7DB] to-[#B7BCC2] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#111214] shadow-[0_8px_28px_rgba(220,225,232,0.12)] transition-[filter,box-shadow] hover:brightness-110 hover:shadow-[0_10px_32px_rgba(220,225,232,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-7"
            >
              Explore My Work
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </MagneticLink>

            <MagneticLink
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/20 bg-white/[0.035] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E8EAEC] backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-7"
            >
              Let&apos;s Connect
            </MagneticLink>

            <MagneticLink
              href="/Sabir%20Resume.pdf"
              download
              className="inline-flex min-h-12 items-center justify-center gap-2 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Download size={15} aria-hidden="true" />
              Resume
            </MagneticLink>
          </div>

          <div
            data-hero-reveal
            className="mt-3 flex items-center justify-center gap-1 text-zinc-400 lg:justify-start"
            role="group"
            aria-label="Social profiles"
          >
            <span className="mr-2 font-tech text-[9px] uppercase tracking-[0.12em] text-zinc-500">
              Find me
            </span>
            {socialLinks.map(({ name, href, Icon }) => (
              <Tooltip key={name} text={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} profile`}
                  className="rounded-sm p-2 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              </Tooltip>
            ))}
          </div>

          <div
            data-hero-reveal
            className="mt-8 grid w-full max-w-xl grid-cols-3 border-y border-white/[0.11] py-4 sm:mt-9 sm:py-5"
            role="group"
            aria-label="Professional highlights"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center px-1 text-center lg:items-start lg:text-left ${
                  index > 0 ? 'border-l border-white/[0.11]' : ''
                }`}
              >
                <span
                  className="font-display text-xl font-semibold leading-none tracking-tight text-[#F0F1F3] sm:text-2xl"
                  data-stat-count={stat.value}
                  data-stat-suffix={stat.suffix}
                >
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="mt-2 text-[9px] leading-tight text-zinc-400 sm:text-[10px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div
            data-hero-reveal
            className="mt-5 flex w-full max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-3 lg:justify-start"
            role="group"
            aria-label="Technologies: React, Next.js, Node.js, MongoDB, Express, Tailwind CSS, TypeScript"
          >
            {technologies.map(({ name, Icon }) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 text-[9px] font-medium text-zinc-400 transition-colors hover:text-[#F5F6F8] sm:text-[10px]"
              >
                <Icon size={13} strokeWidth={1.7} aria-hidden="true" />
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="order-1 flex w-full justify-center py-1 lg:order-2 lg:col-span-5 lg:py-0">
          <div
            ref={photoRef}
            onPointerMove={handlePhotoPointerMove}
            onPointerLeave={resetPhotoTilt}
            className="hero-photo isolate relative aspect-[4/4.5] w-[min(66vw,270px)] sm:w-[min(54vw,320px)] lg:w-full lg:max-w-[430px]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/Sabir.png"
                alt="Sabir Ali, Full-Stack Engineer"
                className="h-full w-full object-cover object-[center_30%] grayscale-[0.3] contrast-[1.04] brightness-[0.9]"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 0%, black 54%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 0%, black 54%, transparent 100%)',
                }}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={992}
                height={1030}
                sizes="(max-width: 639px) 270px, (max-width: 1023px) 320px, 430px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0A0A0B_0%,transparent_15%,transparent_85%,#0A0A0B_100%)]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0A0A0B] to-transparent"
                aria-hidden="true"
              />
            </div>

            <div
              className="pointer-events-none absolute -inset-x-5 inset-y-[16%] -z-10 rounded-[50%] bg-[radial-gradient(ellipse,rgba(220,225,232,0.2)_0%,rgba(174,181,190,0.08)_42%,transparent_72%)] blur-2xl"
              aria-hidden="true"
            />

            <div className="pointer-events-none absolute -left-1 -top-1 h-8 w-8 border-l border-t border-white/50" />
            <div className="pointer-events-none absolute -right-1 -top-1 h-8 w-8 border-r border-t border-white/35" />
            <div className="pointer-events-none absolute -bottom-1 -left-1 h-8 w-8 border-b border-l border-white/35" />
            <div className="pointer-events-none absolute -bottom-1 -right-1 h-8 w-8 border-b border-r border-white/50" />

            <div className="hero-float-slow absolute -left-5 top-[17%] inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#111214]/75 px-3 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:-left-10">
              <Layers size={15} className="text-[#E8EAEC]" aria-hidden="true" />
              <span className="font-tech text-[9px] font-medium text-zinc-100 sm:text-[10px]">
                MERN &amp; Next.js
              </span>
            </div>

            <div className="hero-float-delayed absolute -bottom-1 right-[-8px] max-w-[190px] rounded-lg border border-white/15 bg-[#111214]/80 px-3.5 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:right-[-18px]">
              <span className="block font-tech text-[8px] uppercase tracking-[0.14em] text-zinc-400">
                Engineering focus
              </span>
              <span className="mt-1 block text-[10px] font-medium leading-snug text-zinc-100">
                Clean code · Scalable systems
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 flex w-full max-w-screen-xl justify-center lg:mt-10 lg:justify-start">
        <a
          href="#about"
          className="group inline-flex items-center gap-3 rounded-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          aria-label="Scroll to About section"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white/50">
            <ArrowDown
              size={13}
              aria-hidden="true"
              className="animate-bounce"
            />
          </span>
          <span className="font-tech text-[9px] uppercase tracking-[0.16em]">
            Scroll to explore
          </span>
        </a>
      </div>
    </section>
  );
};
