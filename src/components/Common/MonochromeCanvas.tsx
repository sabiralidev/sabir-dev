import React, { useEffect, useRef } from 'react';

export const MonochromeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isVisible = true;
    let animationFrameId: number;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      baseAlpha: number;
      pulseSpeed: number;
      phase: number;
    }

    const particleCount = 75;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.25 + 0.08;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.8,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Scroll parallax tracking
    let targetScrollY = 0;
    let currentScrollY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let frame = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible) return;

      frame++;
      currentScrollY += (targetScrollY - currentScrollY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render drifting monochrome particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle alpha pulsation
        p.alpha = p.baseAlpha + Math.sin(frame * p.pulseSpeed + p.phase) * 0.05;

        // Scroll parallax displacement
        const yOffset = (currentScrollY * 0.04 * (p.size * 0.5)) % height;
        let drawY = p.y - yOffset;
        if (drawY < 0) drawY += height;

        ctx.beginPath();
        ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.alpha)})`;
        ctx.fill();
      }
    };

    render();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
};
