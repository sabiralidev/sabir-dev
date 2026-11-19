import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Desktop-only luxury custom cursor:
 * - Small precision silver dot
 * - Outer silver ring with smooth lerp
 * - Magnetic expansion on links/buttons
 * - Red accent glow on CTAs
 * - Dynamic "VIEW" badge on project previews
 * - Hidden on touch devices and when off-screen
 */
export const CustomCursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power3.out' });

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setIsVisible(true);
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);

      // Check hovered elements
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest<HTMLElement>('[data-cursor]');
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor') || 'VIEW');
        setIsHoveringLink(true);
        setIsHoveringCTA(false);
        return;
      } else {
        setCursorText(null);
      }

      const interactive = target.closest('a, button, [role="button"], input, textarea, select');
      const isCta = target.closest('[data-cta], a[href="#contact"], a[href="#projects"], .cta-btn');

      setIsHoveringLink(Boolean(interactive));
      setIsHoveringCTA(Boolean(isCta));
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
      setIsHoveringLink(false);
      setIsHoveringCTA(false);
      setCursorText(null);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      gsap.killTweensOf([dot, ring]);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  const isViewMode = Boolean(cursorText);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 flex items-center justify-center"
        style={{
          width: isHoveringLink ? (isHoveringCTA ? 48 : 42) : 28,
          height: isHoveringLink ? (isHoveringCTA ? 48 : 42) : 28,
          borderColor: isHoveringCTA
          width: isViewMode ? 72 : isHoveringLink ? (isHoveringCTA ? 48 : 42) : 28,
          height: isViewMode ? 72 : isHoveringLink ? (isHoveringCTA ? 48 : 42) : 28,
          borderColor: isViewMode
            ? '#e5192b'
            : isHoveringCTA
            ? 'rgba(229, 25, 43, 0.6)'
            : isHoveringLink
            ? 'rgba(242, 243, 245, 0.45)'
            : 'rgba(141, 145, 153, 0.28)',
          backgroundColor: isHoveringCTA
          backgroundColor: isViewMode
            ? 'rgba(5, 5, 5, 0.85)'
            : isHoveringCTA
            ? 'rgba(229, 25, 43, 0.08)'
            : isHoveringLink
            ? 'rgba(255, 255, 255, 0.04)'
            : 'transparent',
          backdropFilter: isHoveringLink ? 'blur(1px)' : 'none',
          backdropFilter: isHoveringLink || isViewMode ? 'blur(2px)' : 'none',
        }}
      />
      >
        {isViewMode && (
          <span
            ref={labelRef}
            className="mono text-[9px] font-bold tracking-[0.16em] text-white flex items-center gap-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#e5192b] shadow-[0_0_6px_#e5192b]" />
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-150"
        style={{
          width: isHoveringCTA ? 8 : isHoveringLink ? 6 : 4,
          height: isHoveringCTA ? 8 : isHoveringLink ? 6 : 4,
          backgroundColor: isHoveringCTA ? '#e5192b' : '#f2f3f5',
          boxShadow: isHoveringCTA
            ? '0 0 10px #e5192b, 0 0 20px rgba(229, 25, 43, 0.6)'
            : '0 0 6px rgba(255, 255, 255, 0.4)',
        }}
      />
      {!isViewMode && (
        <div
          ref={dotRef}
          className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-150"
          style={{
            width: isHoveringCTA ? 8 : isHoveringLink ? 6 : 4,
            height: isHoveringCTA ? 8 : isHoveringLink ? 6 : 4,
            backgroundColor: isHoveringCTA ? '#e5192b' : '#f2f3f5',
            boxShadow: isHoveringCTA
              ? '0 0 10px #e5192b, 0 0 20px rgba(229, 25, 43, 0.6)'
              : '0 0 6px rgba(255, 255, 255, 0.4)',
          }}
        />
      )}
    </div>
  );
};

export default CustomCursor;

