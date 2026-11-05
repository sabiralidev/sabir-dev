import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ProgressBar } from './components/Common/ProgressBar';
import { SectionNavigator } from './components/Common/SectionNavigator';
import { Navbar } from './components/Common/Navbar';
import { MonochromeCanvas } from './components/Common/MonochromeCanvas';
import { HeroSection } from './components/HeroSection/HeroSection';
import { AboutSection } from './components/AboutSection/AboutSection';
import { SkillsSection } from './components/SkillsSection/SkillsSection';
import { ApproachSection } from './components/ApproachSection/ApproachSection';
import { ProjectsSection } from './components/ProjectsSection/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection/ExperienceSection';
import { ContactSection } from './components/ContactSection/ContactSection';
import { Footer } from './components/Footer/Footer';
import { useReducedMotion } from './hooks/useReducedMotion';
import { Preloader } from './components/Common/IntroLoader';

gsap.registerPlugin(ScrollTrigger);

const INTRO_SESSION_KEY = 'sabir-portfolio-preloader-page';

const shouldShowIntro = () => {
  if (typeof window === 'undefined') return false;

  const shell = document.getElementById('preloader-shell');
  if (shell?.dataset.showIntro === 'true') return true;

  try {
    const pageToken = String(window.performance.timeOrigin);
    if (window.sessionStorage.getItem(INTRO_SESSION_KEY) === pageToken) return false;
    window.sessionStorage.setItem(INTRO_SESSION_KEY, pageToken);
  } catch {
    return true;
  }

  return true;
};

const App: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(shouldShowIntro);
  const lenisRef = useRef<Lenis | null>(null);

  const completeIntro = useCallback(() => {
    setShowIntro(false);
    window.requestAnimationFrame(() => {
      document.getElementById('hero-title')?.focus({ preventScroll: true });
    });
  }, []);

  useLayoutEffect(() => {
    document.getElementById('preloader-shell')?.remove();
  }, []);

  useEffect(() => {
    let isActive = true;
    let lenis: Lenis | null = null;
    const handleLenisScroll = () => ScrollTrigger.update();
    const updateLenis = (time: number) => {
      lenis?.raf(time * 1000);
    };

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenisRef.current = lenis;
      lenis.on('scroll', handleLenisScroll);
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);
    }

    const scrollToCurrentHash = () => {
      const encodedId = window.location.hash.slice(1);
      if (!encodedId) return;

      let id: string;
      try {
        id = decodeURIComponent(encodedId);
      } catch {
        return;
      }

      const target = document.getElementById(id);
      if (!target) return;

      if (lenis) {
        lenis.scrollTo(target, { immediate: true, offset: -96 });
      } else {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };

    const timer1 = window.setTimeout(() => {
      ScrollTrigger.refresh();
      scrollToCurrentHash();
    }, 150);
    const timer2 = window.setTimeout(() => ScrollTrigger.refresh(), 800);

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    const handlePopState = () => scrollToCurrentHash();
    const handleFontsLoaded = () => {
      if (isActive) ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleWindowLoad);
    window.addEventListener('popstate', handlePopState);
    document.fonts?.ready.then(handleFontsLoaded);

    return () => {
      isActive = false;
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('popstate', handlePopState);
      if (lenis) {
        lenis.off('scroll', handleLenisScroll);
        gsap.ticker.remove(updateLenis);
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (showIntro) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [showIntro]);

  const handleAnchorClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link || link.target === '_blank') return;

    let id: string;
    try {
      id = decodeURIComponent(link.hash.slice(1));
    } catch {
      return;
    }

    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    if (window.location.hash !== link.hash) {
      window.history.pushState(null, '', link.hash);
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(section, { offset: -96 });
    } else {
      section.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-clip bg-[#050505] text-white">
      <div
        aria-hidden={showIntro || undefined}
        inert={showIntro}
        onClick={handleAnchorClick}
      >
        <MonochromeCanvas />

        <ProgressBar />
        <SectionNavigator />
        <Navbar />

        <main>
          <HeroSection
            introComplete={!showIntro}
            animateEntrance
          />
          <AboutSection />
          <SkillsSection />
          <ApproachSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
      {showIntro && <Preloader onComplete={completeIntro} variant="split" />}
    </div>
  );
};

export default App;
