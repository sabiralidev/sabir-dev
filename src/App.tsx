import React, { useEffect } from 'react';
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

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let isActive = true;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const handleLenisScroll = () => ScrollTrigger.update();
    lenis.on('scroll', handleLenisScroll);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const timer1 = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    const timer2 = window.setTimeout(() => ScrollTrigger.refresh(), 800);

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    const handleFontsLoaded = () => {
      if (isActive) ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleWindowLoad);
    document.fonts?.ready.then(handleFontsLoaded);

    return () => {
      isActive = false;
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
      window.removeEventListener('load', handleWindowLoad);
      lenis.off('scroll', handleLenisScroll);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative min-h-screen overflow-clip bg-[#050505] text-white selection:bg-[#d71920] selection:text-white">
      <MonochromeCanvas />

      <ProgressBar />
      <SectionNavigator />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ApproachSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
