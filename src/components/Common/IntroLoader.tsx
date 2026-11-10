import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface IntroLoaderProps {
  onComplete: () => void;
  variant?: 'split' | 'circle';
}

const PRELOADER_CONFIG = {
  background: '#0A0A0B',
  silver: ['#F5F6F8', '#9EA3A8', '#E8EAEC'],
  minimumDuration: 1800,
  maximumDuration: 3500,
  labelDuration: 0.22,
  entryDuration: 0.32,
  labelTransitionDelays: [450, 900],
  progressDuration: 0.35,
  initialProgressDuration: 0.2,
  readyProgressDuration: 0.24,
  logoFadeDuration: 0.35,
  progressPollInterval: 120,
  finishDelay: 260,
  reducedExitDuration: 0.25,
  counterExitDuration: 0.2,
  contentExitDuration: 0.34,
  contentExitOverlap: 0.05,
  chromeExitDuration: 0.22,
  panelExitOverlap: 0.12,
  drawDuration: 1.05,
  fillDuration: 0.4,
  shimmerDuration: 0.85,
  splitDuration: 0.9,
};

const MONOGRAM_PATH =
  'M67 20H43C33 20 27 26 27 36C27 44 32 48 42 51L58 55C68 58 73 63 73 72C73 82 66 88 55 88H31V75H55C59 75 61 74 61 71C61 68 59 67 54 65L38 61C22 57 15 49 15 36C15 19 26 8 43 8H67V20Z';

const LOADING_LABELS = [
  'INITIALIZING',
  'LOADING ASSETS',
  'BUILDING INTERFACE',
  'READY',
];

export const Preloader: React.FC<IntroLoaderProps> = ({
  onComplete,
  variant = 'split',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isExiting, setIsExiting] = React.useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const mark = markRef.current;
    const fill = fillRef.current;
    const shimmer = shimmerRef.current;
    const progress = progressRef.current;
    const counter = counterRef.current;
    const topPanel = topPanelRef.current;
    const bottomPanel = bottomPanelRef.current;
    const backdrop = backdropRef.current;
    if (!root || !mark || !fill || !shimmer || !progress || !counter || !backdrop) {
      onComplete();
      return;
    }

    let active = true;
    let exitStarted = false;
    let readyTimer = 0;
    let maximumTimer = 0;
    let finishTimer = 0;
    let loadHandler: (() => void) | null = null;
    const labelTimers: number[] = [];
    const startedAt = performance.now();
    const phaseLabels = labelRefs.current.filter(
      (label): label is HTMLSpanElement => label !== null
    );
    const setLabel = (index: number) => {
      phaseLabels.forEach((label, labelIndex) => {
        gsap.to(label, {
          autoAlpha: labelIndex === index ? 1 : 0,
          y: labelIndex === index ? 0 : -4,
          duration: PRELOADER_CONFIG.labelDuration,
          overwrite: true,
        });
      });
    };

    const progressState = { value: 0 };
    let progressTween: gsap.core.Tween | null = null;
    const setProgress = (
      value: number,
      duration = PRELOADER_CONFIG.progressDuration
    ) => {
      progressTween?.kill();
      progressTween = gsap.to(progressState, {
        value: Math.max(progressState.value, value),
        duration: prefersReducedMotion ? 0 : duration,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: () => {
          const current = Math.round(progressState.value);
          progress.style.transform = `scaleX(${current / 100})`;
          counter.textContent = String(current).padStart(3, '0');
        },
      });
    };

    const runExit = () => {
      if (!active || exitStarted) return;
      exitStarted = true;
      setIsExiting(true);
      window.clearTimeout(readyTimer);
      setLabel(3);
      const exit = gsap.timeline({
        defaults: { ease: 'expo.inOut' },
        onComplete: () => {
          if (!active) return;
          onComplete();
        },
      });

      if (prefersReducedMotion) {
        exit.to(root, {
          autoAlpha: 0,
          duration: PRELOADER_CONFIG.reducedExitDuration,
        });
        return;
      }

      exit
        .to([counter, progress.parentElement], {
          autoAlpha: 0,
          duration: PRELOADER_CONFIG.counterExitDuration,
          ease: 'power2.out',
        })
        .to(
          root.querySelector('[data-preloader-content]'),
          {
            scale: 1.08,
            autoAlpha: 0,
            duration: PRELOADER_CONFIG.contentExitDuration,
            ease: 'power2.in',
          },
          `-=${PRELOADER_CONFIG.contentExitOverlap}`
        )
        .to(
          root.querySelectorAll('[data-preloader-chrome]'),
          {
            autoAlpha: 0,
            duration: PRELOADER_CONFIG.chromeExitDuration,
            ease: 'power2.out',
          },
          '<'
        );

      if (variant === 'circle') {
        exit.to(
          backdrop,
          { '--reveal-radius': '150vmax', duration: PRELOADER_CONFIG.splitDuration },
          `-=${PRELOADER_CONFIG.panelExitOverlap}`
        );
      } else {
        const topPanel = topPanelRef.current;
        const bottomPanel = bottomPanelRef.current;
        if (!topPanel || !bottomPanel) return;
        exit
          .to(
            topPanel,
            { yPercent: -100, duration: PRELOADER_CONFIG.splitDuration },
            `-=${PRELOADER_CONFIG.panelExitOverlap}`
          )
          .to(bottomPanel, { yPercent: 100, duration: PRELOADER_CONFIG.splitDuration }, '<');
      }
    };

    const completeWhenReady = () => {
      if (exitStarted) return;
      const remaining = Math.max(
        0,
        PRELOADER_CONFIG.minimumDuration - (performance.now() - startedAt)
      );
      readyTimer = window.setTimeout(() => {
        setProgress(100, PRELOADER_CONFIG.readyProgressDuration);
        finishTimer = window.setTimeout(runExit, PRELOADER_CONFIG.finishDelay);
      }, remaining);
    };

    const waitForDocument = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        loadHandler = () => resolve();
        window.addEventListener('load', loadHandler, { once: true });
      }
    });

    const waitForFonts = document.fonts?.ready.then(() => undefined) ?? Promise.resolve();
    const waitForImage = new Promise<void>((resolve) => {
      const image = new Image();
      const settle = () => {
        image.onload = null;
        image.onerror = null;
        resolve();
      };
      image.onload = settle;
      image.onerror = settle;
      image.src = '/Sabir.png';
      if (image.complete) settle();
    });

    let lastProgressSignal = 0;
    const signalProgress = () => {
      let value = 8;
      if (document.readyState === 'complete') value = 30;
      if (document.fonts?.status === 'loaded') value = Math.max(value, 56);
      if (document.querySelector<HTMLImageElement>('img[src="/Sabir.png"]')?.complete) {
        value = Math.max(value, 82);
      }
      if (value > lastProgressSignal) {
        lastProgressSignal = value;
        setProgress(value);
      }
    };

    const context = gsap.context(() => {
      const pathLength = mark.getTotalLength();
      gsap.set(mark, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
      gsap.set(fill, { autoAlpha: 0 });
      gsap.set(shimmer, { xPercent: -150, autoAlpha: 0 });
      gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(phaseLabels, { autoAlpha: 0, y: 4 });
      gsap.set(backdrop, { '--reveal-radius': '0vmax' });
      if (topPanel && bottomPanel) gsap.set([topPanel, bottomPanel], { yPercent: 0 });
      gsap.set(root, { autoAlpha: prefersReducedMotion ? 1 : 0 });
      if (!prefersReducedMotion) {
        gsap.to(root, {
          autoAlpha: 1,
          duration: PRELOADER_CONFIG.entryDuration,
          ease: 'power2.out',
        });
      }
      setLabel(0);
      setProgress(8, PRELOADER_CONFIG.initialProgressDuration);

      if (prefersReducedMotion) {
        gsap.to([mark, fill], {
          autoAlpha: 1,
          duration: PRELOADER_CONFIG.logoFadeDuration,
          ease: 'power1.out',
        });
        labelTimers.push(
          window.setTimeout(
            () => setLabel(1),
            PRELOADER_CONFIG.labelTransitionDelays[0]
          ),
          window.setTimeout(
            () => setLabel(2),
            PRELOADER_CONFIG.labelTransitionDelays[1]
          )
        );
      } else {
        const reveal = gsap.timeline();
        reveal
          .to(mark, {
            strokeDashoffset: 0,
            duration: PRELOADER_CONFIG.drawDuration,
            ease: 'power2.inOut',
          })
          .to(fill, {
            autoAlpha: 1,
            duration: PRELOADER_CONFIG.fillDuration,
            ease: 'power2.out',
          })
          .to(shimmer, {
            xPercent: 250,
            autoAlpha: 0.85,
            duration: PRELOADER_CONFIG.shimmerDuration,
            ease: 'power2.inOut',
          }, '-=0.18')
          .to(shimmer, { autoAlpha: 0, duration: 0.18 }, '-=0.12');

        reveal.call(() => setLabel(1), undefined, 0.48);
        reveal.call(() => setLabel(2), undefined, 0.96);
      }
    }, root);

    signalProgress();
    const progressInterval = window.setInterval(
      signalProgress,
      PRELOADER_CONFIG.progressPollInterval
    );
    const maximumWait = new Promise<void>((resolve) => {
      const animatedExitDuration =
        PRELOADER_CONFIG.counterExitDuration * 1000 +
        (PRELOADER_CONFIG.contentExitDuration -
          PRELOADER_CONFIG.contentExitOverlap) *
          1000 +
        PRELOADER_CONFIG.splitDuration * 1000 -
        PRELOADER_CONFIG.panelExitOverlap * 1000;
      const exitAllowance =
        PRELOADER_CONFIG.finishDelay +
        (prefersReducedMotion
          ? PRELOADER_CONFIG.reducedExitDuration * 1000
          : animatedExitDuration);
      maximumTimer = window.setTimeout(
        resolve,
        Math.max(0, PRELOADER_CONFIG.maximumDuration - exitAllowance)
      );
    });

    Promise.race([
      Promise.all([waitForDocument, waitForFonts, waitForImage]),
      maximumWait,
    ]).then(() => {
      if (!active) return;
      setProgress(94, 0.32);
      completeWhenReady();
    });

    return () => {
      active = false;
      window.clearInterval(progressInterval);
      window.clearTimeout(readyTimer);
      window.clearTimeout(maximumTimer);
      window.clearTimeout(finishTimer);
      labelTimers.forEach(window.clearTimeout);
      if (loadHandler) window.removeEventListener('load', loadHandler);
      progressTween?.kill();
      gsap.killTweensOf(root);
      gsap.killTweensOf(root.querySelectorAll('*'));
      context.revert();
    };
  }, [onComplete, prefersReducedMotion, variant]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] overflow-hidden"
      style={{ color: PRELOADER_CONFIG.silver[0] }}
      role="status"
      aria-live={isExiting ? undefined : 'polite'}
      aria-label={isExiting ? undefined : 'Loading portfolio'}
      aria-hidden={isExiting || undefined}
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 z-0 bg-[#0A0A0B]"
        style={
          variant === 'circle'
            ? {
                backgroundColor: PRELOADER_CONFIG.background,
                maskImage:
                  'radial-gradient(circle at center, transparent calc(var(--reveal-radius) - 1px), black var(--reveal-radius))',
                WebkitMaskImage:
                  'radial-gradient(circle at center, transparent calc(var(--reveal-radius) - 1px), black var(--reveal-radius))',
              }
            : { backgroundColor: PRELOADER_CONFIG.background }
        }
        aria-hidden="true"
      />
      <div data-preloader-chrome className="preloader-noise pointer-events-none absolute inset-0 z-10 opacity-[0.12]" aria-hidden="true" />
      <div
        data-preloader-chrome
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[min(70vw,34rem)] w-[min(70vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(210,216,224,0.12)_0%,rgba(158,163,168,0.05)_36%,transparent_72%)] blur-2xl"
        aria-hidden="true"
      />

      <div
        data-preloader-content
        className="absolute left-1/2 top-1/2 z-30 w-[min(78vw,22rem)] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative mx-auto mb-10 aspect-square w-[clamp(5rem,16vw,8rem)]">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="preloader-silver" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor={PRELOADER_CONFIG.silver[0]} />
                <stop offset="52%" stopColor={PRELOADER_CONFIG.silver[1]} />
                <stop offset="100%" stopColor={PRELOADER_CONFIG.silver[2]} />
              </linearGradient>
            </defs>
            <path
              ref={markRef}
              d={MONOGRAM_PATH}
              fill="url(#preloader-silver)"
              fillOpacity="0"
              stroke="url(#preloader-silver)"
              strokeWidth="1.25"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              ref={fillRef}
              d={MONOGRAM_PATH}
              fill="url(#preloader-silver)"
              fillOpacity="0.96"
            />
          </svg>
          <span
            ref={shimmerRef}
            className="intro-logo-sheen pointer-events-none absolute -inset-y-[8%] left-[42%] z-10 w-[18%] -skew-x-12"
          />
        </div>

        <div className="h-px w-full overflow-hidden bg-white/[0.12]">
          <div
            ref={progressRef}
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(90deg, ${PRELOADER_CONFIG.silver.join(', ')})`,
            }}
          />
        </div>
      </div>

      <div data-preloader-chrome className="absolute bottom-6 left-5 right-5 z-30 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
        <div
          className="relative h-4 overflow-hidden font-tech text-[8px] tracking-[0.16em] text-white/45 sm:text-[10px]"
          aria-hidden="true"
        >
          {LOADING_LABELS.map((label, index) => (
            <span
              key={label}
              ref={(element) => {
                labelRefs.current[index] = element;
              }}
              className="absolute inset-0 whitespace-nowrap"
            >
              {label}
            </span>
          ))}
        </div>
        <span
          ref={counterRef}
          className="font-tech text-2xl font-light tabular-nums tracking-[-0.06em] text-[#E8EAEC] sm:text-4xl"
          aria-hidden="true"
        >
          000
        </span>
      </div>

      {variant === 'split' && (
        <>
          <div
            ref={topPanelRef}
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/2 bg-[#0A0A0B]"
            style={{ backgroundColor: PRELOADER_CONFIG.background }}
            aria-hidden="true"
          />
          <div
            ref={bottomPanelRef}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 bg-[#0A0A0B]"
            style={{ backgroundColor: PRELOADER_CONFIG.background }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
};
