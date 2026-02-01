"use client";

import { useEffect, useRef, useCallback } from "react";

// Subtle, sparse floating particles background
export default function SilkRoadAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  const getColor = useCallback((alpha: number = 1) => {
    const colors = [
      [255, 216, 102], // light gold
      [255, 180, 40],  // gold
      [255, 136, 16],  // amber
      [224, 88, 32],   // orange  
      [184, 40, 40],   // crimson
      [139, 35, 35],   // deep red
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const width = canvas.width;
    const height = canvas.height;

    // Sparse floating particles
    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
      pulseSpeed: number;
      pulsePhase: number;
    }

    const particles: Particle[] = [];
    const particleCount = 25; // Much fewer particles

    // Initialize sparse particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2, // Smaller size
        color: getColor(1),
        vx: (Math.random() - 0.5) * 0.15, // Slower movement
        vy: (Math.random() - 0.5) * 0.15,
        alpha: 0.1 + Math.random() * 0.2, // Lower opacity
        pulseSpeed: 0.005 + Math.random() * 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Small cluster near logo - very subtle
    const logoX = 75;
    const logoY = 56;
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 60;
      particles.push({
        x: logoX + Math.cos(angle) * dist,
        y: logoY + Math.sin(angle) * dist,
        size: 1 + Math.random() * 1.5,
        color: getColor(1),
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        alpha: 0.15 + Math.random() * 0.2,
        pulseSpeed: 0.008 + Math.random() * 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Very gentle floating motion
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Subtle pulsing
        const pulse = Math.sin(time * p.pulseSpeed * 60 + p.pulsePhase);
        const currentAlpha = p.alpha + pulse * 0.05;

        // Draw soft glow - smaller radius
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 2
        );
        gradient.addColorStop(0, p.color.replace(/[\d.]+\)$/, `${currentAlpha * 0.6})`));
        gradient.addColorStop(0.5, p.color.replace(/[\d.]+\)$/, `${currentAlpha * 0.3})`));
        gradient.addColorStop(1, p.color.replace(/[\d.]+\)$/, `0)`));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw tiny core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${currentAlpha * 0.4})`);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [getColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
