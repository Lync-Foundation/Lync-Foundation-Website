"use client";

import { useEffect, useRef, useCallback } from "react";

interface SilkRoadAnimationProps {
  onLogoReveal?: () => void;
}

export default function SilkRoadAnimation({ onLogoReveal }: SilkRoadAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const logoRevealedRef = useRef(false);
  const hasInitializedRef = useRef(false);

  // Check if animation already played
  const hasPlayedRef = useRef(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const played = sessionStorage.getItem("silkRoadAnimationPlayed");
      if (played === "true") {
        hasPlayedRef.current = true;
        onLogoReveal?.();
      }
    }
  }, [onLogoReveal]);

  // Color interpolation
  const getColor = useCallback((progress: number, alpha: number = 1) => {
    const colors = [
      [122, 31, 31],   // deep red
      [184, 40, 40],   // crimson
      [224, 88, 32],   // orange  
      [255, 136, 16],  // amber
      [255, 180, 40],  // gold
      [255, 216, 102], // light gold
    ];
    
    const idx = Math.min(Math.floor(progress * (colors.length - 1)), colors.length - 2);
    const t = (progress * (colors.length - 1)) - idx;
    const c1 = colors[idx];
    const c2 = colors[idx + 1];
    
    const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
    const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
    const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }, []);

  useEffect(() => {
    // Skip if already played
    if (hasPlayedRef.current) return;
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setup canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const width = canvas.width;
    const height = canvas.height;

    // Logo target position
    const LOGO_X = 75;
    const LOGO_Y = 56;

    // Ribbon data
    const ribbons = Array.from({ length: 7 }, (_, i) => ({
      yOffset: height * 0.15 + (height * 0.65 * i / 6),
      amplitude: 40 + Math.random() * 40,
      phase: Math.random() * Math.PI * 2,
      width: 4 + Math.random() * 3,
      speed: 0.004 + Math.random() * 0.002,
      waveSpeed: 1 + Math.random() * 0.5,
      delay: i * 0.15,
      progress: 0,
      length: 0.5 + Math.random() * 0.3,
      isLogoRibbon: i === 1,
    }));

    // Particles
    const particles: Array<{x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string}> = [];

    // Timing
    const FLOW_END = 5.0;
    const FLY_END = 7.0;
    const ORBIT_END = 8.5;
    const LOGO_REVEAL_TIME = 8.0;

    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      // End animation
      if (elapsed > ORBIT_END) {
        sessionStorage.setItem("silkRoadAnimationPlayed", "true");
        if (!logoRevealedRef.current) {
          logoRevealedRef.current = true;
          onLogoReveal?.();
        }
        // Clear canvas and stop
        ctx.clearRect(0, 0, width, height);
        return;
      }

      // Reveal logo
      if (elapsed > LOGO_REVEAL_TIME && !logoRevealedRef.current) {
        logoRevealedRef.current = true;
        onLogoReveal?.();
      }

      ctx.clearRect(0, 0, width, height);

      // Draw each ribbon
      ribbons.forEach((ribbon) => {
        const adjustedTime = Math.max(0, elapsed - ribbon.delay);
        if (adjustedTime <= 0) return;

        // Update progress
        if (elapsed < FLOW_END) {
          ribbon.progress = Math.min(1, ribbon.progress + ribbon.speed);
        }

        const points: { x: number; y: number }[] = [];
        const startX = width + 100;
        const pathLength = width + 200;

        // Is this the flying ribbon phase?
        const isFlying = ribbon.isLogoRibbon && elapsed > FLOW_END;
        const flyProgress = isFlying ? Math.min(1, (elapsed - FLOW_END) / (FLY_END - FLOW_END)) : 0;
        const orbitProgress = elapsed > FLY_END ? Math.min(1, (elapsed - FLY_END) / (ORBIT_END - FLY_END)) : 0;

        if (isFlying) {
          // FLYING RIBBON - flies from its position to logo and orbits
          const ribbonStartX = width * 0.4;
          const ribbonStartY = ribbon.yOffset;
          
          // Current position interpolating toward logo
          const currentX = ribbonStartX + (LOGO_X - ribbonStartX) * flyProgress;
          const currentY = ribbonStartY + (LOGO_Y - ribbonStartY) * flyProgress;

          // Draw spiral ribbon around current position
          const segCount = 50;
          const spiralRadius = 60 * (1 - orbitProgress * 0.8);
          
          for (let i = 0; i < segCount; i++) {
            const t = i / segCount;
            const angle = elapsed * 5 + t * Math.PI * 2;
            const radius = spiralRadius * (1 - t * 0.5);
            
            const x = currentX + Math.cos(angle) * radius;
            const y = currentY + Math.sin(angle) * radius * 0.6;
            
            points.push({ x, y });
            
            // Spawn particles
            if (Math.random() < 0.15) {
              particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                life: 0,
                maxLife: 30 + Math.random() * 30,
                size: 2 + Math.random() * 2,
                color: getColor(0.7, 1),
              });
            }
          }

          // Draw with fading opacity
          const opacity = 1 - orbitProgress;
          if (opacity > 0.1) {
            drawRibbon(ctx, points, ribbon.width, opacity, getColor);
          }

          // Draw glow at logo position
          if (flyProgress > 0.3) {
            const glowAlpha = Math.min(0.6, flyProgress * 0.8) * (1 - orbitProgress);
            ctx.beginPath();
            const glowRadius = 40 + 20 * Math.sin(elapsed * 3);
            const gradient = ctx.createRadialGradient(LOGO_X, LOGO_Y, 0, LOGO_X, LOGO_Y, glowRadius);
            gradient.addColorStop(0, `rgba(255, 180, 40, ${glowAlpha})`);
            gradient.addColorStop(0.5, `rgba(255, 136, 16, ${glowAlpha * 0.5})`);
            gradient.addColorStop(1, `rgba(139, 35, 35, 0)`);
            ctx.fillStyle = gradient;
            ctx.arc(LOGO_X, LOGO_Y, glowRadius, 0, Math.PI * 2);
            ctx.fill();
          }

        } else {
          // NORMAL RIBBON - flowing across screen
          const fadeOut = elapsed > FLOW_END ? Math.max(0, 1 - (elapsed - FLOW_END) / 1.5) : 1;
          
          for (let i = 0; i <= 100; i++) {
            const t = i / 100;
            const visibleStart = Math.max(0, ribbon.progress - ribbon.length);
            if (t < visibleStart || t > ribbon.progress) continue;

            const x = startX - pathLength * t;
            const wave1 = Math.sin(t * Math.PI * 3 + ribbon.phase + adjustedTime * ribbon.waveSpeed) * ribbon.amplitude;
            const wave2 = Math.sin(t * Math.PI * 6 + ribbon.phase * 2 + adjustedTime * 1.5) * ribbon.amplitude * 0.3;
            const y = ribbon.yOffset + (wave1 + wave2) * Math.sin(t * Math.PI);

            points.push({ x, y });

            // Spawn particles
            if (Math.random() < 0.015) {
              particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 0,
                maxLife: 40 + Math.random() * 40,
                size: 1.5 + Math.random() * 2,
                color: getColor(t, 1),
              });
            }
          }

          if (fadeOut > 0.1) {
            drawRibbon(ctx, points, ribbon.width, fadeOut, getColor);
          }
        }
      });

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.life++;

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = (1 - p.life / p.maxLife) * 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - p.life / p.maxLife / 2), 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Draw ribbon helper
    function drawRibbon(
      ctx: CanvasRenderingContext2D,
      points: { x: number; y: number }[],
      lineWidth: number,
      opacity: number,
      getColor: (p: number, a: number) => string
    ) {
      if (points.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

      const gradient = ctx.createLinearGradient(
        points[0].x, points[0].y,
        points[points.length - 1].x, points[points.length - 1].y
      );
      gradient.addColorStop(0, getColor(0, 0.3 * opacity));
      gradient.addColorStop(0.2, getColor(0.2, 0.9 * opacity));
      gradient.addColorStop(0.5, getColor(0.5, 0.95 * opacity));
      gradient.addColorStop(0.8, getColor(0.8, 0.85 * opacity));
      gradient.addColorStop(1, getColor(1, 0.5 * opacity));

      // Glow
      ctx.save();
      ctx.shadowColor = getColor(0.5, 0.5 * opacity);
      ctx.shadowBlur = 15;
      ctx.strokeStyle = gradient;
      ctx.lineWidth = lineWidth + 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.restore();

      // Main line
      ctx.strokeStyle = gradient;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }

    // Start animation
    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [getColor, onLogoReveal]);

  // Don't render if already played
  if (hasPlayedRef.current) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
}
