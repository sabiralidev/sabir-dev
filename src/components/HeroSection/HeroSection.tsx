import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowDown, Github, Linkedin, Code2, Download } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticLink } from '../Common/UI';

gsap.registerPlugin(ScrollTrigger);

const Hero3DScene = lazy(() =>
  import('./Hero3DScene').then(({ Hero3DScene: Scene }) => ({
    default: Scene,
  }))
);

interface HeroSectionProps {
  introComplete?: boolean;
  animateEntrance?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  introComplete = true,
  animateEntrance = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [shouldLoadScene, setShouldLoadScene] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !introComplete) return;

    const ctx = gsap.context(() => {
      if (animateEntrance) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          badgeRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, delay: 0.15 }
        )
          .fromTo(
            titleLine1Ref.current,
            { y: 70, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1 },
            '-=0.6'
          )
          .fromTo(
            titleLine2Ref.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9 },
            '-=0.7'
          )
          .fromTo(
            subtitleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9 },
            '-=0.7'
          )
          .fromTo(
            ctaGroupRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            '-=0.6'
          )
          .fromTo(
            visualRef.current,
            { scale: 0.88, y: 40, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 1.3, ease: 'power2.out' },
            '-=1.0'
          )
          .fromTo(
            scrollIndicatorRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            '-=0.5'
          );
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
        .to(
          [badgeRef.current, titleLine1Ref.current, titleLine2Ref.current],
          {
            yPercent: -12,
            rotateX: -5,
            transformPerspective: 1100,
            transformOrigin: 'center top',
            ease: 'none',
          },
          0
        )
        .to(subtitleRef.current, { yPercent: -7, opacity: 0.45, ease: 'none' }, 0)
        .to(visualRef.current, { yPercent: 9, rotateY: 4, scale: 0.96, ease: 'none' }, 0)
        .to(scrollIndicatorRef.current, { opacity: 0, ease: 'none' }, 0);
    }, heroRef);

    return () => ctx.revert();
  }, [animateEntrance, introComplete, prefersReducedMotion]);

  useEffect(() => {
    if (!introComplete || prefersReducedMotion) return;

    let active = true;
    let idleCallbackId: number | null = null;
    let fallbackTimeoutId: number | null = null;
    const requestIdle = Reflect.get(window, 'requestIdleCallback') as
      | ((callback: () => void, options?: { timeout: number }) => number)
      | undefined;
    const cancelIdle = Reflect.get(window, 'cancelIdleCallback') as
      | ((handle: number) => void)
      | undefined;
    const interactionEvents = ['pointerdown', 'scroll', 'touchstart', 'keydown'] as const;

    const removeInteractionListeners = () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, handleInteraction);
      });
    };

    const startScene = () => {
      if (active) setShouldLoadScene(true);
    };

    const scheduleScene = (timeout: number) => {
      if (idleCallbackId !== null) cancelIdle?.call(window, idleCallbackId);
      if (fallbackTimeoutId !== null) window.clearTimeout(fallbackTimeoutId);

      if (requestIdle) {
        idleCallbackId = requestIdle.call(window, startScene, { timeout });
      } else {
        fallbackTimeoutId = window.setTimeout(startScene, timeout);
      }
    };

    const handleInteraction = () => {
      removeInteractionListeners();
      scheduleScene(300);
    };

    interactionEvents.forEach((event) => {
      window.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    const initialTimeoutId = window.setTimeout(() => scheduleScene(2000), 900);

    return () => {
      active = false;
      window.clearTimeout(initialTimeoutId);
      if (idleCallbackId !== null) cancelIdle?.call(window, idleCallbackId);
      if (fallbackTimeoutId !== null) window.clearTimeout(fallbackTimeoutId);
      removeInteractionListeners();
    };
  }, [introComplete, prefersReducedMotion]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-[min(100svh,950px)] flex-col justify-between overflow-hidden bg-[#050505] px-5 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-32 lg:px-16 xl:px-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-45">
        {shouldLoadScene ? (
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center" aria-hidden="true">
                <div className="h-48 w-48 rounded-full border border-white/10" />
              </div>
            }
          >
            <Hero3DScene />
          </Suspense>
        ) : (
          <div className="flex h-full items-center justify-center" aria-hidden="true">
            <div className="flex h-72 w-72 items-center justify-center rounded-full border border-white/10">
              <div className="flex h-48 w-48 items-center justify-center rounded-full border border-white/20">
                <div className="h-24 w-24 rounded-full border border-white/10 bg-white/[0.03]" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mx-auto my-auto grid w-full max-w-screen-xl flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="z-10 flex flex-col justify-center lg:col-span-7">
          <div ref={badgeRef} className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#d71920]" />
            <span className="mono text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-300 sm:text-xs">
              Full-Stack Engineer
            </span>
          </div>

          <h1
            id="hero-title"
            ref={titleLine1Ref}
            tabIndex={-1}
            className="text-[clamp(3.6rem,10vw,8.5rem)] font-semibold leading-[0.84] tracking-[-0.075em] text-[#e5e5e5]"
          >
            SABIR <span className="font-light text-[#c0c0c0]">ALI</span>
          </h1>

          <div
            ref={titleLine2Ref}
            className="mt-5 max-w-2xl text-2xl font-medium leading-tight tracking-[-0.04em] text-zinc-300 sm:text-3xl lg:text-4xl"
          >
            Engineering scalable web architectures.
          </div>

          <p
            ref={subtitleRef}
            className="mt-6 max-w-xl text-base font-light leading-relaxed text-zinc-400 sm:text-lg"
          >
            Building scalable web applications, sophisticated digital experiences, and reliable software systems with precision and performance.
          </p>

          <div
            ref={ctaGroupRef}
            className="mt-9 flex flex-wrap items-center gap-3 pt-2 sm:mt-10 sm:gap-4"
          >
            <MagneticLink
              href="#projects"
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#e5e5e5] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-black transition-colors hover:bg-white active:scale-[0.98] sm:px-7"
            >
              Explore My Work
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </MagneticLink>

            <MagneticLink
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center border border-white/15 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-200 transition-colors hover:border-white/35 hover:text-white sm:px-7"
            >
              Let's Connect
            </MagneticLink>

            <MagneticLink
              href="/Sabir CV.pdf"
              download
              className="inline-flex min-h-12 items-center px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-white"
            >
              <Download size={15} className="mr-2" />
              Resume
            </MagneticLink>

            <div className="flex items-center gap-2 border-l border-white/10 pl-3 sm:pl-4">
              <a
                href="https://github.com/sabiralidev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-transparent text-zinc-400 transition-colors hover:border-white/15 hover:text-white"
                aria-label="GitHub Profile"
              >
                <Github size={17} />
              </a>
              <a
                href="https://www.linkedin.com/in/sabiralidev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-transparent text-zinc-400 transition-colors hover:border-white/15 hover:text-white"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="https://dev.to/sabirsheikh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-transparent text-zinc-400 transition-colors hover:border-white/15 hover:text-white"
                aria-label="DEV.to Articles"
              >
                <Code2 size={17} />
              </a>
            </div>
          </div>
        </div>

        <div ref={visualRef} className="relative flex w-full items-center justify-center lg:col-span-5">
          <div className="group relative z-10 aspect-[4/5] w-full max-w-[340px] border border-white/15 bg-[#101010] p-2.5 sm:max-w-[390px] lg:max-w-[420px]">
            <div className="relative h-full w-full overflow-hidden bg-zinc-950">
              <img
                src="/Sabir.png"
                alt="Sabir Ali - Full-Stack Engineer"
                className="h-full w-full object-cover object-center transition-[filter,transform] duration-700 group-hover:scale-[1.025] group-hover:brightness-100"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={992}
                height={1030}
                sizes="(max-width: 375px) 280px, (max-width: 639px) 340px, (max-width: 1023px) 390px, 420px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between border-t border-white/20 bg-black/75 px-4 py-3 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
                <div>
                  <span className="mono block text-[9px] uppercase tracking-[0.16em] text-zinc-400">
                    Identity // Engineer
                  </span>
                  <span className="text-sm font-black tracking-tight text-white">
                    Sabir Ali
                  </span>
                </div>
                <div className="mono border-l border-[#d71920] pl-2.5 text-[10px] text-zinc-300">
                  MERN / NEXT
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -left-1 -top-1 h-3 w-3 border-l border-t border-[#d71920]/70" />
            <div className="pointer-events-none absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-white/40" />
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="mx-auto flex w-full max-w-screen-xl items-center justify-between pt-10 font-mono text-xs text-zinc-400 sm:pt-12"
      >
        <a
          href="#about"
          className="group flex items-center gap-3 transition-colors duration-200 hover:text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center border border-white/15 transition-colors group-hover:border-[#d71920]">
            <ArrowDown size={12} />
          </span>
          <span className="text-[9px] uppercase tracking-[0.22em] text-zinc-400">
            Scroll to explore
          </span>
        </a>

        <div className="hidden sm:flex items-center gap-6 text-[10px] uppercase tracking-widest">
          <span>01 // PROVEN ARCHITECTURE</span>
          <span className="text-zinc-700">/</span>
          <span>02 // HIGH PERFORMANCE</span>
        </div>
      </div>
    </section>
  );
};
