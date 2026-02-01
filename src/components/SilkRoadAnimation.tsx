"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface SilkRoadAnimationProps {
  onLogoReveal?: () => void;
}

interface SilkRibbon {
  id: number;
  progress: number;
  speed: number;
  amplitude: number;
  phase: number;
  width: number;
  swirl: number;
  delay: number;
  length: number;
  waveSpeed: number;
  yOffset: number;
  isLogoRibbon: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function SilkRoadAnimation({ onLogoReveal }: SilkRoadAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const ribbonsRef = useRef<SilkRibbon[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);
  const logoRevealedRef = useRef(false);
  const [phase, setPhase] = useState<"waiting" | "flowing" | "flyingToLogo" | "orbiting" | "complete">("waiting");
  const [hasPlayed, setHasPlayed] = useState(false);

  // Check if animation has already played
  useEffect(() => {
    if (typeof window !== "undefined") {
      const played = sessionStorage.getItem("silkRoadAnimationPlayed");
      if (played === "true") {
        setHasPlayed(true);
        setPhase("complete");
        // Immediately reveal logo if already played
        onLogoReveal?.();
      } else {
        setPhase("flowing");
      }
    }
  }, [onLogoReveal]);

  // Color palette
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

  // Initialize ribbons
  const initRibbons = useCallback((height: number) => {
    const ribbons: SilkRibbon[] = [];
    const count = 7;
    
    for (let i = 0; i < count; i++) {
      ribbons.push({
        id: i,
        progress: 0,
        speed: 0.004 + Math.random() * 0.002,
        amplitude: 40 + Math.random() * 40,
        phase: Math.random() * Math.PI * 2,
        width: 4 + Math.random() * 3,
        swirl: 0.5 + Math.random() * 1,
        delay: i * 0.15,
        length: 0.5 + Math.random() * 0.3,
        waveSpeed: 1 + Math.random() * 0.5,
        yOffset: height * 0.2 + (height * 0.6 * i / (count - 1)),
        isLogoRibbon: i === 1, // Second ribbon flies to logo
      });
    }
    return ribbons;
  }, []);

  // Create particle
  const createParticle = useCallback((x: number, y: number, colorProgress: number): Particle => {
    return {
      x, y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 0,
      maxLife: 50 + Math.random() * 50,
      size: 2 + Math.random() * 2,
      color: getColor(colorProgress, 1),
    };
  }, [getColor]);

  useEffect(() => {
    if (hasPlayed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ribbonsRef.current = initRibbons(canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    startTimeRef.current = Date.now();
    
    // Timing
    const FLOW_DURATION = 5.0;
    const FLY_DURATION = 2.0;
    const ORBIT_DURATION = 1.5;
    const TOTAL_DURATION = FLOW_DURATION + FLY_DURATION + ORBIT_DURATION;

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const width = canvas.width;
      const height = canvas.height;
      
      // Logo target position (top-left corner where logo should be)
      const logoX = 75;
      const logoY = 56;

      // Phase management
      if (elapsed > FLOW_DURATION + FLY_DURATION && phase !== "orbiting") {
        setPhase("orbiting");
      } else if (elapsed > FLOW_DURATION && phase === "flowing") {
        setPhase("flyingToLogo");
      }

      // Reveal logo near end of orbit
      if (elapsed > TOTAL_DURATION - 0.5 && !logoRevealedRef.current) {
        logoRevealedRef.current = true;
        onLogoReveal?.();
      }

      // End animation
      if (elapsed > TOTAL_DURATION) {
        setPhase("complete");
        sessionStorage.setItem("silkRoadAnimationPlayed", "true");
        cancelAnimationFrame(animationRef.current);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw each ribbon
      ribbonsRef.current.forEach((ribbon) => {
        const adjustedTime = Math.max(0, elapsed - ribbon.delay);
        if (adjustedTime <= 0) return;

        // Update progress during flowing
        if (elapsed < FLOW_DURATION) {
          ribbon.progress = Math.min(1, ribbon.progress + ribbon.speed);
        }

        const points: { x: number; y: number }[] = [];
        const startX = width + 100;
        const pathLength = width + 200;

        // Special handling for logo ribbon
        if (ribbon.isLogoRibbon && elapsed > FLOW_DURATION) {
          const flyProgress = Math.min(1, (elapsed - FLOW_DURATION) / FLY_DURATION);
          const orbitProgress = elapsed > FLOW_DURATION + FLY_DURATION 
            ? Math.min(1, (elapsed - FLOW_DURATION - FLY_DURATION) / ORBIT_DURATION) 
            : 0;

          // Ribbon's current approximate position
          const ribbonX = width * 0.4;
          const ribbonY = ribbon.yOffset;

          // Interpolate toward logo
          const currentX = ribbonX + (logoX - ribbonX) * flyProgress;
          const currentY = ribbonY + (logoY - ribbonY) * flyProgress;

          // Draw ribbon spiraling toward/around logo
          const segmentCount = 60;
          const ribbonLen = 100 * (1 - orbitProgress * 0.8);
          
          for (let i = 0; i < segmentCount; i++) {
            const t = i / segmentCount;
            const angle = elapsed * 4 + t * Math.PI * 3;
            const orbitRadius = (40 + ribbonLen * t) * (1 - flyProgress * 0.6) * (1 - orbitProgress * 0.9);
            
            const x = currentX + Math.cos(angle) * orbitRadius;
            const y = currentY + Math.sin(angle) * orbitRadius * 0.6;
            
            points.push({ x, y });

            // Particles during orbit
            if (Math.random() < 0.1 && orbitProgress > 0) {
              particlesRef.current.push(createParticle(x, y, 0.6));
            }
          }

          // Fade out ribbon during orbit
          const opacity = 1 - orbitProgress;
          if (opacity > 0.05) {
            drawRibbon(ctx, points, ribbon.width, opacity, getColor);
          }

        } else if (!ribbon.isLogoRibbon || elapsed <= FLOW_DURATION) {
          // Normal flowing ribbon
          const fadeOut = elapsed > FLOW_DURATION ? Math.max(0, 1 - (elapsed - FLOW_DURATION) / 1.5) : 1;
          
          for (let i = 0; i <= 100; i++) {
            const t = i / 100;
            const visibleStart = Math.max(0, ribbon.progress - ribbon.length);
            if (t < visibleStart || t > ribbon.progress) continue;

            const x = startX - pathLength * t;
            const wave1 = Math.sin(t * Math.PI * 3 + ribbon.phase + adjustedTime * ribbon.waveSpeed) * ribbon.amplitude;
            const wave2 = Math.sin(t * Math.PI * 6 + ribbon.phase * 2 + adjustedTime * 1.5) * ribbon.amplitude * 0.3;
            const y = ribbon.yOffset + (wave1 + wave2) * Math.sin(t * Math.PI);

            points.push({ x, y });

            if (Math.random() < 0.02) {
              particlesRef.current.push(createParticle(x, y, t));
            }
          }

          if (fadeOut > 0.05) {
            drawRibbon(ctx, points, ribbon.width, fadeOut, getColor);
          }
        }
      });

      // Draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.life++;
        if (p.life > p.maxLife) return false;

        const alpha = (1 - p.life / p.maxLife) * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - p.life / p.maxLife), 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.fill();
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Helper to draw a ribbon
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

      // Main stroke
      ctx.strokeStyle = gradient;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }

    if (phase === "flowing") {
      animate();
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [hasPlayed, phase, initRibbons, createParticle, getColor, onLogoReveal]);

  if (hasPlayed || phase === "complete") {
    return null;
  }

  // Logo target for glow effect
  const logoX = 75;
  const logoY = 56;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Glow around logo position during fly/orbit phase */}
      {(phase === "flyingToLogo" || phase === "orbiting") && (
        <motion.div
          className="absolute"
          style={{
            left: logoX - 50,
            top: logoY - 50,
            width: 100,
            height: 100,
          }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 0.8, scale: 1.2 }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255, 180, 40, 0.5) 0%, rgba(139, 35, 35, 0.3) 40%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
