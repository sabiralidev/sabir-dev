import React, { useEffect, useId, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const SectionHeading: React.FC<{
  number: string;
  category: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}> = ({ number, category, title, subtitle, className = '' }) => (
  <div className={`mb-12 sm:mb-16 lg:mb-20 ${className}`}>
    <div className="mb-5 flex items-center gap-2">
      <span className="mono text-[10px] font-semibold tracking-[0.18em] text-[#d71920]">
        {number}
      </span>
      <span className="mono text-[10px] uppercase tracking-[0.24em] text-zinc-400">
        {category}
      </span>
    </div>

    <h2 className="max-w-5xl text-[clamp(2.75rem,7.2vw,6.75rem)] font-semibold tracking-[-0.065em] leading-[0.94] text-[#e5e5e5]">
      {title}
    </h2>

    {subtitle && (
      <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-zinc-400 sm:text-base lg:text-lg">
        {subtitle}
      </p>
    )}
  </div>
);

export const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}> = ({ children, className = '', glow = true }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rotateXRef = useRef<((value: number) => void) | null>(null);
  const rotateYRef = useRef<((value: number) => void) | null>(null);
  const liftRef = useRef<((value: number) => void) | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion) return;

    gsap.set(card, { transformPerspective: 1100, transformStyle: 'preserve-3d' });
    rotateXRef.current = gsap.quickTo(card, 'rotationX', {
      duration: 0.45,
      ease: 'power3.out',
    });
    rotateYRef.current = gsap.quickTo(card, 'rotationY', {
      duration: 0.45,
      ease: 'power3.out',
    });
    liftRef.current = gsap.quickTo(card, 'y', {
      duration: 0.45,
      ease: 'power3.out',
    });

    return () => {
      gsap.killTweensOf(card);
      gsap.set(card, {
        clearProps: 'transform,transformPerspective,transformStyle',
      });
      rotateXRef.current = null;
      rotateYRef.current = null;
      liftRef.current = null;
    };
  }, [prefersReducedMotion]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      prefersReducedMotion ||
      event.pointerType !== 'mouse' ||
      !cardRef.current
    ) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    rotateXRef.current?.(((y / rect.height) * 2 - 1) * -4);
    rotateYRef.current?.(((x / rect.width) * 2 - 1) * 4);
    liftRef.current?.(-3);

    if (glareRef.current) {
      glareRef.current.style.background =
        `radial-gradient(circle at ${(x / rect.width) * 100}% ` +
        `${(y / rect.height) * 100}%, rgba(255,255,255,0.12), transparent 58%)`;
      glareRef.current.style.opacity = '1';
    }
  };

  const handlePointerLeave = () => {
    rotateXRef.current?.(0);
    rotateYRef.current?.(0);
    liftRef.current?.(0);
    if (cardRef.current && !prefersReducedMotion) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.4,
        ease: 'power3.out',
      });
    }
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={(event) => {
        if (!prefersReducedMotion && event.pointerType === 'mouse') {
          gsap.to(event.currentTarget, {
            scale: 1.005,
            duration: 0.35,
            ease: 'power2.out',
          });
        }
      }}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101010] shadow-[0_16px_44px_rgba(0,0,0,0.24)] hover:border-white/[0.18] ${className}`}
    >
      {glow && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: 0,
          }}
        />
      )}
      {children}
    </div>
  );
};

type MagneticLinkProps = React.ComponentPropsWithoutRef<'a'> & {
  strength?: number;
};

export const MagneticLink: React.FC<MagneticLinkProps> = ({
  children,
  strength = 0.18,
  ...props
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const link = linkRef.current;
    if (!link || prefersReducedMotion) return;

    const moveX = gsap.quickTo(link, 'x', { duration: 0.35, ease: 'power3.out' });
    const moveY = gsap.quickTo(link, 'y', { duration: 0.35, ease: 'power3.out' });
    let bounds: DOMRect | null = null;
    const handlePointerEnter = (event: PointerEvent) => {
      bounds = event.pointerType === 'mouse' ? link.getBoundingClientRect() : null;
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      bounds ??= link.getBoundingClientRect();
      moveX((event.clientX - bounds.left - bounds.width / 2) * strength);
      moveY((event.clientY - bounds.top - bounds.height / 2) * strength);
    };
    const reset = () => {
      bounds = null;
      moveX(0);
      moveY(0);
    };

    link.addEventListener('pointerenter', handlePointerEnter);
    link.addEventListener('pointermove', handlePointerMove);
    link.addEventListener('pointerleave', reset);
    link.addEventListener('pointercancel', reset);

    return () => {
      link.removeEventListener('pointerenter', handlePointerEnter);
      link.removeEventListener('pointermove', handlePointerMove);
      link.removeEventListener('pointerleave', reset);
      link.removeEventListener('pointercancel', reset);
      gsap.killTweensOf(link);
      gsap.set(link, { clearProps: 'transform' });
    };
  }, [prefersReducedMotion, strength]);

  return (
    <a ref={linkRef} {...props}>
      {children}
    </a>
  );
};

export const Tooltip: React.FC<{ children: React.ReactNode; text: string }> = ({
  children,
  text,
}) => {
  const tooltipId = useId();
  const describedChild = React.isValidElement<{
    'aria-describedby'?: string;
  }>(children)
    ? React.cloneElement(children, {
        'aria-describedby': [
          children.props['aria-describedby'],
          tooltipId,
        ]
          .filter(Boolean)
          .join(' '),
      })
    : children;

  return (
    <span className="group relative inline-flex items-center justify-center">
      {describedChild}
      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute bottom-full z-50 mb-2.5 translate-y-1 whitespace-nowrap rounded-md border border-black/10 bg-[#e5e5e5] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-black opacity-0 shadow-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        {text}
        <span className="absolute left-1/2 top-full -mt-1 -translate-x-1/2 border-4 border-transparent border-t-[#e5e5e5]" />
      </span>
    </span>
  );
};
