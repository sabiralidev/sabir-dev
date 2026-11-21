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
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SEO } from './components/Common/SEO';
import { ProjectPage } from './components/ProjectsSection/ProjectPage';
import { PROFILE, VERIFIED_SAME_AS } from './config/profile';
import { Analytics } from './components/Common/Analytics';

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

const PortfolioPage: React.FC = () => {
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
      <SEO
        title="Sabir Ali | Full Stack Engineer | SabirAliDev"
        description="Sabir Ali is a Full-Stack Engineer building scalable web applications, modern MERN systems, and AI-integrated solutions."
        canonical="https://sabir-dev.vercel.app/"
        type="profile"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': `${PROFILE.website}/#person`,
            name: PROFILE.name,
            alternateName: PROFILE.alternateName,
            jobTitle: PROFILE.jobTitle,
            url: `${PROFILE.website}/`,
            image: PROFILE.image,
            description: 'Sabir Ali is a Full-Stack Engineer working with MERN technologies, Next.js, backend APIs, databases and AI integrations.',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'PK',
            },
            sameAs: [...VERIFIED_SAME_AS],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            '@id': 'https://sabir-dev.vercel.app/#profile',
            url: 'https://sabir-dev.vercel.app/',
            name: 'Sabir Ali | Full-Stack Engineer',
            description: 'Professional portfolio of Sabir Ali, a Full-Stack Engineer.',
            mainEntity: { '@id': 'https://sabir-dev.vercel.app/#person' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': 'https://sabir-dev.vercel.app/#website',
            url: 'https://sabir-dev.vercel.app/',
            name: 'SabirAliDev',
            inLanguage: 'en',
            publisher: { '@id': 'https://sabir-dev.vercel.app/#person' },
          },
        ]}
      />
      <div
        className={showIntro ? 'invisible' : 'visible'}
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

const App: React.FC = () => (
  <BrowserRouter>
    <Analytics />
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

const NotFoundPage: React.FC = () => (
  <main className="flex min-h-screen items-center justify-center px-5 text-center">
    <SEO
      title="404 | Sabir Ali"
      description="The requested page could not be found."
      canonical="https://sabir-dev.vercel.app/404"
      noindex
    />
    <div className="max-w-lg">
      <p className="mono mb-4 text-xs uppercase tracking-[0.18em] text-zinc-500">404 · Page not found</p>
      <h1 className="text-4xl font-semibold tracking-tight text-white">This page is not available.</h1>
      <p className="mt-4 text-zinc-400">Return to the portfolio to continue exploring Sabir Ali's work.</p>
      <a href="/" className="mt-8 inline-flex border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white">
        Back to portfolio
      </a>
    </div>
  </main>
);

export default App;
