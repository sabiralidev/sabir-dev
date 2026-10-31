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

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after DOM settling & image loads
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 150);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 800);

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleWindowLoad);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('load', handleWindowLoad);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black relative">
      {/* Ambient Monochrome Canvas */}
      <MonochromeCanvas />

      {/* Persistent Global Nav & Rails */}
      <ProgressBar />
      <SectionNavigator />
      <Navbar />

      {/* Main Structural Storytelling Sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ApproachSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Cinematic Footer */}
      <Footer />
    </div>
  );
};

export default App;
