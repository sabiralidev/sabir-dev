import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, ArrowDown, Github, Linkedin, Code2, Download } from 'lucide-react';
import { SignatureReveal } from '../LogoReveal/SignatureReveal';
import { Hero3DScene } from './Hero3DScene';

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-32 pb-16 overflow-hidden bg-[#050505]"
    >
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Signature Reveal Bar */}
      <div className="w-full max-w-screen-2xl mx-auto mb-12">
        <SignatureReveal />
      </div>

      {/* Main Hero Content */}
      <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1 my-auto">
        {/* Left Column: Typography & CTAs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10">
          <div ref={badgeRef} className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-zinc-600" />
            <span className="mono text-[11px] font-bold uppercase tracking-[0.35em] text-zinc-400">
              Full-Stack Engineer
            </span>
          </div>

          <h1
            ref={titleLine1Ref}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.88] text-white"
          >
            SABIR <span className="text-zinc-600 font-light italic">ALI</span>
          </h1>

          <div
            ref={titleLine2Ref}
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-400"
          >
            Engineering scalable web architectures.
          </div>

          <p
            ref={subtitleRef}
            className="mt-8 text-lg sm:text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl"
          >
            Building scalable web applications, sophisticated digital experiences, and reliable software systems with precision and performance.
          </p>

          {/* Action CTAs */}
          <div
            ref={ctaGroupRef}
            className="mt-12 flex flex-wrap items-center gap-5 pt-4"
          >
            <a
              href="#projects"
              className="group px-8 py-4 bg-white text-black font-extrabold text-xs uppercase tracking-widest2 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.03] active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Explore My Work
              <ArrowRight
                size={16}
                className="ml-3 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#contact"
              className="px-8 py-4 bg-zinc-900 text-white font-extrabold text-xs uppercase tracking-widest2 rounded-full flex items-center justify-center border border-white/10 transition-all duration-300 hover:border-white/30 hover:bg-zinc-800 active:scale-95"
            >
              Let's Connect
            </a>

            <a
              href="/Sabir CV.pdf"
              download
              className="px-6 py-4 text-zinc-400 hover:text-white font-semibold text-xs uppercase tracking-wider flex items-center transition-colors duration-200"
            >
              <Download size={15} className="mr-2" />
              Resume
            </a>

            {/* Social Protocols */}
            <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-white/10">
              <a
                href="https://github.com/sabiralidev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <Github size={17} />
              </a>
              <a
                href="https://www.linkedin.com/in/sabiralidev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="https://dev.to/sabirsheikh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all duration-300"
                aria-label="DEV.to Articles"
              >
                <Code2 size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Architectural Scene & Editorial Photo Bezel (5 cols) */}
        <div ref={visualRef} className="lg:col-span-5 relative w-full flex items-center justify-center">
          {/* Three.js 3D Sculptural Scene in background of visual */}
          <div className="absolute -inset-10 z-0 opacity-80 pointer-events-none">
            <Hero3DScene />
          </div>

          {/* Editorial Portrait Presentation with High-End Monochrome Bezel */}
          <div className="relative z-10 w-full max-w-[380px] lg:max-w-[420px] aspect-[4/5] rounded-[3rem] p-3 bg-gradient-to-b from-white/10 via-white/5 to-white/[0.02] border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.9)] backdrop-blur-md group">
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-zinc-950 border border-white/10">
              <img
                src="/Sabir.jpg"
                alt="Sabir Ali — Full-Stack Engineer"
                className="w-full h-full object-cover filter grayscale contrast-110 brightness-95 transition-all duration-700 group-hover:scale-105 group-hover:contrast-100 group-hover:brightness-105"
                loading="eager"
              />

              {/* Monochromatic Studio Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Architectural Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                <div>
                  <span className="mono text-[9px] uppercase tracking-widest text-zinc-400 block">
                    Identity // Engineer
                  </span>
                  <span className="text-sm font-black tracking-tight text-white">
                    Sabir Ali
                  </span>
                </div>
                <div className="mono text-[10px] text-zinc-400 px-2.5 py-1 rounded bg-white/5 border border-white/10">
                  MERN / NEXT
                </div>
              </div>
            </div>

            {/* Corner Decorative Crosshairs */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-white/30 pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-white/30 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="w-full max-w-screen-2xl mx-auto pt-12 flex items-center justify-between text-zinc-500 text-xs mono"
      >
        <a
          href="#about"
          className="flex items-center gap-3 hover:text-white transition-colors duration-200 group"
        >
          <span className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center group-hover:border-white/40 transition-colors">
            <ArrowDown size={12} className="animate-bounce" />
          </span>
          <span className="tracking-[0.25em] text-[10px] uppercase">
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
