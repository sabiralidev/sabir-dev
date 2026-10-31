import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { supportsWebGL } from '../Common/webgl';

gsap.registerPlugin(ScrollTrigger);

export const Hero3DScene: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || hasError) return;
    if (!supportsWebGL()) {
      const fallbackFrame = requestAnimationFrame(() => setHasError(true));
      return () => cancelAnimationFrame(fallbackFrame);
    }

    const container = containerRef.current;
    if (!container) return;

    let isVisible = false;
    let isDocumentVisible = document.visibilityState === 'visible';
    let animationFrameId: number | null = null;
    let renderer: THREE.WebGLRenderer | null = null;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.innerWidth >= 768,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1 : 1.5)
      );
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch {
      const fallbackFrame = requestAnimationFrame(() => setHasError(true));
      return () => cancelAnimationFrame(fallbackFrame);
    }

    // Main Architectural Structure Group
    const scrollGroup = new THREE.Group();
    scene.add(scrollGroup);
    const structureGroup = new THREE.Group();
    structureGroup.scale.setScalar(1.25);
    scrollGroup.add(structureGroup);

    const disposables: { geometry?: THREE.BufferGeometry; material?: THREE.Material }[] = [];

    // 1. Central Precision Monolith
    const centralGeo = new THREE.IcosahedronGeometry(1.5, 0);
    disposables.push({ geometry: centralGeo });

    const platinumMat = new THREE.MeshStandardMaterial({
      color: 0xdedede,
      metalness: 0.92,
      roughness: 0.16,
    });
    disposables.push({ material: platinumMat });

    const centralMesh = new THREE.Mesh(centralGeo, platinumMat);
    structureGroup.add(centralMesh);

    // 2. Wireframe architectural halo
    const wireframeGeo = new THREE.IcosahedronGeometry(1.54, 1);
    disposables.push({ geometry: wireframeGeo });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    disposables.push({ material: wireframeMat });

    const wireMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    structureGroup.add(wireMesh);

    // 3. Orbital architectural rings
    const ringSegments = window.innerWidth < 768 ? 48 : 72;
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.035, 10, ringSegments);
    disposables.push({ geometry: ringGeo1 });
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.85,
      roughness: 0.3,
    });
    disposables.push({ material: ringMat1 });

    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    structureGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.7, 0.02, 10, ringSegments);
    disposables.push({ geometry: ringGeo2 });
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.6,
    });
    disposables.push({ material: ringMat2 });

    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.z = Math.PI / 4;
    structureGroup.add(ringMesh2);

    // 4. Ambient architectural floating nodes
    const particleCount = window.innerWidth < 768 ? 12 : 22;
    const particleGroup = new THREE.Group();
    structureGroup.add(particleGroup);

    const nodeGeo = new THREE.OctahedronGeometry(0.06, 0);
    disposables.push({ geometry: nodeGeo });
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xd71920,
      emissive: 0x7a0008,
      emissiveIntensity: 0.7,
      metalness: 0.4,
      roughness: 0.3,
    });
    disposables.push({ material: nodeMat });

    const nodePositions: { mesh: THREE.Mesh; speed: number; orbitRadius: number; phase: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      const orbitRadius = 2.2 + Math.random() * 2.2;
      const phase = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.3;
      particleGroup.add(mesh);
      nodePositions.push({ mesh, speed, orbitRadius, phase });
    }

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x202020, 1.2);
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 3.2);
    topLight.position.set(5, 8, 5);
    scene.add(topLight);

    const sideRimLight = new THREE.DirectionalLight(0x777777, 1.8);
    sideRimLight.position.set(-6, -4, 2);
    scene.add(sideRimLight);

    const bottomBounce = new THREE.DirectionalLight(0x333333, 0.8);
    bottomBounce.position.set(0, -6, 2);
    scene.add(bottomBounce);

    // Mouse tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 0.8;
      targetY = (e.clientY / innerHeight - 0.5) * 0.8;
    };

    const hasFinePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
    if (hasFinePointer) {
      window.addEventListener('pointermove', handleMouseMove, { passive: true });
    }

    const heroSection = container.closest<HTMLElement>('#hero') ?? container;
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    });
    scrollTimeline
      .to(
        scrollGroup.rotation,
        { x: Math.PI * 0.18, y: Math.PI * 1.5, z: Math.PI * 0.12, ease: 'none' },
        0
      )
      .to(
        scrollGroup.position,
        { x: 0.35, y: 0.2, z: -1.2, ease: 'none' },
        0
      )
      .to(
        scrollGroup.scale,
        { x: 1.55, y: 1.55, z: 1.55, ease: 'none' },
        0
      )
      .to(camera.position, { x: 0.25, y: -0.3, z: 7, ease: 'none' }, 0);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW === 0 || newH === 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, newW < 768 ? 1 : 1.5)
      );
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = () => {
      if (!isVisible || !isDocumentVisible || !renderer) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) * 0.001;

      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      centralMesh.rotation.y += delta * 0.25;
      centralMesh.rotation.x += delta * 0.15;
      wireMesh.rotation.y -= delta * 0.18;
      wireMesh.rotation.z += delta * 0.12;

      ringMesh1.rotation.z += delta * 0.3;
      ringMesh1.rotation.y += delta * 0.15;
      ringMesh2.rotation.z -= delta * 0.22;
      ringMesh2.rotation.x -= delta * 0.18;

      structureGroup.rotation.y = currentX + elapsed * 0.08;
      structureGroup.rotation.x = -currentY + Math.sin(elapsed * 0.4) * 0.05;

      for (let i = 0; i < nodePositions.length; i++) {
        const item = nodePositions[i];
        const theta = elapsed * item.speed + item.phase;
        item.mesh.position.x = Math.cos(theta) * item.orbitRadius;
        item.mesh.position.y = Math.sin(theta * 1.3) * (item.orbitRadius * 0.6);
        item.mesh.position.z = Math.sin(theta) * item.orbitRadius;
        item.mesh.rotation.x += delta * 0.5;
        item.mesh.rotation.y += delta * 0.7;
      }

      renderer.render(scene, camera);
    };

    const startAnimation = () => {
      if (
        isVisible &&
        isDocumentVisible &&
        renderer &&
        animationFrameId === null
      ) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const stopAnimation = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) startAnimation();
        else stopAnimation();
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === 'visible';
      if (isDocumentVisible) startAnimation();
      else stopAnimation();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      scrollTimeline.scrollTrigger?.kill();
      scrollTimeline.kill();
      observer.disconnect();
      stopAnimation();

      disposables.forEach((item) => {
        if (item.geometry) item.geometry.dispose();
        if (item.material) item.material.dispose();
      });

      if (renderer) {
        renderer.forceContextLoss();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [hasError, prefersReducedMotion]);

  if (hasError || prefersReducedMotion) {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`} aria-hidden="true">
        <div className="flex h-72 w-72 items-center justify-center rounded-full border border-white/10">
          <div className="flex h-48 w-48 items-center justify-center rounded-full border border-white/20">
            <div className="h-24 w-24 rounded-full border border-white/10 bg-white/[0.03]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[420px] pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
};
