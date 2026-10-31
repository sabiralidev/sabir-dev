import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MonogramLogo } from './MonogramLogo';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    skipButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const mark = markRef.current;
    const reveal = revealRef.current;
    const sheen = sheenRef.current;
    const progress = progressRef.current;
    const percentage = percentageRef.current;

    if (!overlay || !mark || !reveal || !sheen || !progress || !percentage) {
      onComplete();
      return;
    }

    let active = true;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    let imageTimeout = 0;
    let resolveImageReady: (() => void) | null = null;
    const imageReady = new Promise<void>((resolve) => {
      resolveImageReady = resolve;
      const image = new Image();
      const settle = () => {
        window.clearTimeout(imageTimeout);
        image.onload = null;
        image.onerror = null;
        resolve();
      };

      image.onload = settle;
      image.onerror = settle;
      imageTimeout = window.setTimeout(settle, 2800);
      image.src = '/Sabir.png';
      if (image.complete) settle();
    });

    const finish = () => {
      if (!active || completedRef.current) return;
      completedRef.current = true;
      setIsExiting(true);
      skipButtonRef.current?.blur();
      gsap.to(overlay, {
        autoAlpha: 0,
        duration: prefersReducedMotion ? 0 : 0.55,
        ease: 'power2.inOut',
        onComplete: () => {
          if (!active) return;
          onComplete();
          window.requestAnimationFrame(() => {
            document.getElementById('hero-title')?.focus({ preventScroll: true });
          });
        },
      });
    };

    const completeAfterReady = async () => {
      await imageReady;
      if (!active || completedRef.current) return;

      gsap.to(progress, {
        scaleX: 1,
        duration: 0.28,
        ease: 'power2.out',
        onUpdate: () => {
          percentage.textContent = '100';
        },
        onComplete: finish,
      });
    };

    const context = gsap.context(() => {
      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(mark, {
        autoAlpha: 0,
        scale: 0.82,
        rotateX: 18,
        rotateY: -24,
        z: -45,
        transformPerspective: 800,
      });
      gsap.set(reveal, { clipPath: 'inset(0 100% 0 0)' });
      gsap.set(sheen, { xPercent: -180, autoAlpha: 0 });
      gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });

      const timeline = gsap.timeline({
        onComplete: () => void completeAfterReady(),
      });

      timeline
        .to(overlay, { autoAlpha: 1, duration: 0.35, ease: 'power1.out' })
        .to(mark, {
          autoAlpha: 1,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          duration: 1.05,
          ease: 'power3.out',
        }, '-=0.08')
        .to(reveal, {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
          ease: 'power2.inOut',
        }, '-=0.56')
        .to(sheen, {
          xPercent: 210,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power2.inOut',
        }, '-=0.35')
        .to(sheen, { autoAlpha: 0, duration: 0.22 }, '-=0.12')
        .to(progress, {
          scaleX: 0.82,
          duration: 1.55,
          ease: 'power2.inOut',
          onUpdate: () => {
            const value = Math.min(82, Math.round(Number(gsap.getProperty(progress, 'scaleX')) * 100));
            percentage.textContent = `${value}`;
          },
        }, '-=1.05');
    }, overlay);

    return () => {
      active = false;
      completedRef.current = false;
      window.clearTimeout(imageTimeout);
      resolveImageReady?.();
      context.revert();
    };
  }, [onComplete, prefersReducedMotion]);

  const skipIntro = () => {
    if (completedRef.current || !overlayRef.current) return;
    completedRef.current = true;
    gsap.killTweensOf(overlayRef.current);
    onComplete();
    window.requestAnimationFrame(() => {
      document.getElementById('hero-title')?.focus({ preventScroll: true });
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505] px-6"
      role={isExiting ? undefined : 'dialog'}
      aria-modal={isExiting ? undefined : true}
      aria-label={isExiting ? undefined : 'Portfolio introduction'}
      aria-hidden={isExiting || undefined}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          skipButtonRef.current?.focus();
        } else if (event.key === 'Escape') {
          skipIntro();
        }
      }}
    >
      {!isExiting && (
        <button
          ref={skipButtonRef}
          type="button"
          onClick={skipIntro}
          className="absolute right-6 top-6 z-10 border border-white/15 px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:border-white/35 hover:text-white sm:right-10 sm:top-10"
        >
          Skip intro
        </button>
      )}

      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <div
          ref={markRef}
          className="relative mb-8 flex h-28 w-28 items-center justify-center border border-white/15 bg-[#101010] [transform-style:preserve-3d]"
          aria-hidden="true"
        >
          <div
            ref={revealRef}
            className="intro-logo-reveal absolute inset-3 flex items-center justify-center"
          >
            <MonogramLogo size={84} className="relative z-10 drop-shadow-[0_5px_18px_rgba(255,255,255,0.2)]" />
          </div>
          <span
            ref={sheenRef}
            className="intro-logo-sheen pointer-events-none absolute -inset-y-4 z-20 w-10 -skew-x-12"
          />
          <span className="absolute bottom-2 right-2 h-1.5 w-1.5 bg-[#d71920]" />
        </div>

        {!isExiting && (
          <>
            <p className="mono text-[10px] font-medium uppercase tracking-[0.26em] text-zinc-200">
              SABIR ALI
            </p>
            <p className="mt-2 text-[9px] font-light uppercase tracking-[0.18em] text-zinc-500">
              Full-Stack Engineer
            </p>

            <div
              className="mt-10 flex w-full items-center gap-3"
              role="status"
              aria-live="polite"
              aria-label="Loading portfolio"
            >
              <div className="h-px flex-1 overflow-hidden bg-white/10">
                <div ref={progressRef} className="h-full w-full bg-[#c0c0c0]" />
              </div>
              <span className="mono w-8 text-right text-[9px] tabular-nums text-zinc-500">
                <span ref={percentageRef}>00</span>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
