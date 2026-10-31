import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MonogramLogo } from '../Common/MonogramLogo';

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

interface Logo3DProps {
  className?: string;
  size?: number;
}

export const Logo3D: React.FC<Logo3DProps> = ({ className = '', size = 180 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(() => !checkWebGLSupport());

  useEffect(() => {
    if (hasError) return;
    const container = containerRef.current;
    if (!container) return;

    let isVisible = true;
    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;

    const width = size;
    const height = size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch {
      requestAnimationFrame(() => setHasError(true));
      return;
    }

    // Group for the 3D logo
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Modern architectural S curve path
    const shape = new THREE.Shape();
    const w = 1.35;
    const h = 1.85;
    const t = 0.38;

    shape.moveTo(-w, h);
    shape.lineTo(w, h);
    shape.lineTo(w, h * 0.35);
    shape.lineTo(w - t, h * 0.35);
    shape.lineTo(w - t, h - t);
    shape.lineTo(-w + t, h - t);
    shape.lineTo(-w + t, 0.12);
    shape.lineTo(w, 0.12);
    shape.lineTo(w, -h);
    shape.lineTo(-w, -h);
    shape.lineTo(-w, -h * 0.35);
    shape.lineTo(-w + t, -h * 0.35);
    shape.lineTo(-w + t, -h + t);
    shape.lineTo(w - t, -h + t);
    shape.lineTo(w - t, -0.12);
    shape.lineTo(-w, -0.12);
    shape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.07,
    };

    const sGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    sGeometry.center();

    const silverMaterial = new THREE.MeshStandardMaterial({
      color: 0xdedede,
      metalness: 0.92,
      roughness: 0.2,
    });

    const sMesh = new THREE.Mesh(sGeometry, silverMaterial);
    logoGroup.add(sMesh);

    // Architectural backing frame
    const ringRadius = 2.45;
    const ringShape = new THREE.Shape();
    const segments = 4;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2 + Math.PI / 4;
      const x = Math.cos(theta) * ringRadius;
      const y = Math.sin(theta) * ringRadius;
      if (i === 0) ringShape.moveTo(x, y);
      else ringShape.lineTo(x, y);
    }
    const holePath = new THREE.Path();
    const innerRadius = 2.35;
    for (let i = segments; i >= 0; i--) {
      const theta = (i / segments) * Math.PI * 2 + Math.PI / 4;
      const x = Math.cos(theta) * innerRadius;
      const y = Math.sin(theta) * innerRadius;
      if (i === segments) holePath.moveTo(x, y);
      else holePath.lineTo(x, y);
    }
    ringShape.holes.push(holePath);

    const ringGeometry = new THREE.ExtrudeGeometry(ringShape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    ringGeometry.center();

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      metalness: 0.85,
      roughness: 0.35,
    });

    const frameMesh = new THREE.Mesh(ringGeometry, darkMetalMaterial);
    frameMesh.position.z = -0.15;
    logoGroup.add(frameMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x222222, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x999999, 1.8);
    rimLight.position.set(-4, -4, 3);
    scene.add(rimLight);

    const sweepLight = new THREE.PointLight(0xffffff, 3.5, 12);
    sweepLight.position.set(-5, 0, 3);
    scene.add(sweepLight);

    // Entrance animation variables
    let entranceProgress = 0;
    const entranceSpeed = 0.02;

    // Mouse tilt
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.45;
      targetRotationX = -y * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || !renderer) return;

      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      // Entrance animation progression
      if (entranceProgress < 1) {
        entranceProgress = Math.min(1, entranceProgress + entranceSpeed);
        const ease = 1 - Math.pow(1 - entranceProgress, 3);
        logoGroup.position.z = THREE.MathUtils.lerp(-3, 0, ease);
        logoGroup.rotation.y = THREE.MathUtils.lerp(-0.7, 0, ease);
        silverMaterial.opacity = ease;
      }

      // Smooth mouse tilt
      logoGroup.rotation.y += (targetRotationY - logoGroup.rotation.y) * 0.08;
      logoGroup.rotation.x += (targetRotationX - logoGroup.rotation.x) * 0.08;

      // Subtle atmospheric breathing
      const breathing = Math.sin(elapsed * 1.5) * 0.04;
      logoGroup.position.y = breathing;

      // Light sweep
      const sweepCycle = (elapsed * 0.6) % 6;
      if (sweepCycle < 2.5) {
        const sweepT = sweepCycle / 2.5;
        sweepLight.position.x = THREE.MathUtils.lerp(-5, 5, sweepT);
        sweepLight.position.y = Math.sin(sweepT * Math.PI) * 1.5;
        sweepLight.intensity = Math.sin(sweepT * Math.PI) * 3.5;
      } else {
        sweepLight.intensity = 0;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      sGeometry.dispose();
      ringGeometry.dispose();
      silverMaterial.dispose();
      darkMetalMaterial.dispose();

      if (renderer) {
        renderer.forceContextLoss();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [size, hasError]);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center select-none ${className}`}
        style={{ width: size, height: size }}
      >
        <MonogramLogo size={size * 0.8} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
};
