import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
    const loseContext = gl.getExtension('WEBGL_lose_context');
    if (loseContext) loseContext.loseContext();
    return true;
  } catch {
    return false;
  }
}

export const Hero3DScene: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(() => !checkWebGLSupport());

  useEffect(() => {
    if (hasError) return;
    const container = containerRef.current;
    if (!container) return;

    let isVisible = true;
    let animationFrameId: number;
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
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch {
      requestAnimationFrame(() => setHasError(true));
      return;
    }

    // Main Architectural Structure Group
    const structureGroup = new THREE.Group();
    scene.add(structureGroup);

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
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.035, 16, 100);
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

    const ringGeo2 = new THREE.TorusGeometry(2.7, 0.02, 16, 100);
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
    const particleCount = 28;
    const particleGroup = new THREE.Group();
    structureGroup.add(particleGroup);

    const nodeGeo = new THREE.OctahedronGeometry(0.06, 0);
    disposables.push({ geometry: nodeGeo });
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.1,
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

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 0.8;
      targetY = (e.clientY / innerHeight - 0.5) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll parallax tracking
    let scrollProgress = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, window.innerHeight * 1.5);
      scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW === 0 || newH === 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || !renderer) return;

      const now = performance.now();
      const delta = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) * 0.001;

      // Mouse lerp
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      // Sculptural rotation
      centralMesh.rotation.y += delta * 0.25;
      centralMesh.rotation.x += delta * 0.15;
      wireMesh.rotation.y -= delta * 0.18;
      wireMesh.rotation.z += delta * 0.12;

      ringMesh1.rotation.z += delta * 0.3;
      ringMesh1.rotation.y += delta * 0.15;

      ringMesh2.rotation.z -= delta * 0.22;
      ringMesh2.rotation.x -= delta * 0.18;

      // Structure tilt
      structureGroup.rotation.y = currentX + elapsed * 0.08;
      structureGroup.rotation.x = -currentY + Math.sin(elapsed * 0.4) * 0.05;

      // Camera responds to scroll
      camera.position.z = 8.5 + scrollProgress * 3.5;
      camera.position.y = -scrollProgress * 2.0;

      // Orbiting particles
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

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

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
  }, [hasError]);

  if (hasError) {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <div className="w-72 h-72 rounded-full border border-white/10 flex items-center justify-center animate-pulse">
          <div className="w-48 h-48 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[420px] pointer-events-none select-none ${className}`}
    />
  );
};
