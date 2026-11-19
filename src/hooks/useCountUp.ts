import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export interface CountUpOptions {
  duration?: number;
  prefix?: string;
  suffix?: string;
  padZero?: boolean;
}

/**
 * Reusable hook to animate stat counter numbers with a silver gradient and smooth lerp.
 */
export const useCountUp = (
  targetRef: React.RefObject<HTMLElement | null>,
  endValue: number,
  options: CountUpOptions = {}
): void => {
  const prefersReducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const {
      duration = 2.0,
      prefix = '',
      suffix = '',
      padZero = true,
    } = options;

    if (prefersReducedMotion) {
      const formatted = padZero && endValue < 10 ? `0${endValue}` : `${endValue}`;
      el.textContent = `${prefix}${formatted}${suffix}`;
      return;
    }

    const state = { value: 0 };

    const updateText = () => {
      const rounded = Math.round(state.value);
      const formatted = padZero && rounded < 10 ? `0${rounded}` : `${rounded}`;
      el.textContent = `${prefix}${formatted}${suffix}`;
    };

    updateText();

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        gsap.to(state, {
          value: endValue,
          duration,
          ease: 'power3.out',
          onUpdate: updateText,
          onComplete: () => {
            state.value = endValue;
            updateText();
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [endValue, options, prefersReducedMotion, targetRef]);
};

export default useCountUp;
