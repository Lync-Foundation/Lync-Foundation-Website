"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

interface SilkRoadAnimationProps {
  onAnimationComplete?: () => void;
}

interface SilkRibbon {
  id: number;
  points: { x: number; y: number }[];
  progress: number;
  speed: number;
  amplitude: number;
  frequency: number;
  phase: number;
  width: number;
  colorOffset: number;
  // Dunhuang ribbon properties
  swirl: number; // Amount of swirl/curl
  delay: number; // Staggered start
  length: number; // Ribbon length
  waveSpeed: number; // How fast the wave moves
  yOffset: number; // Vertical position
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

export default function SilkRoadAnimation({ onAnimationComplete }: SilkRoadAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const ribbonsRef = useRef<SilkRibbon[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);
  const [phase, setPhase] = useState<"waiting" | "flowing" | "converging" | "forming" | "complete">("waiting");
  const [hasPlayed, setHasPlayed] = useState(false);
  const logoControls = useAnimation();

  // Check if animation has already played this session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const played = sessionStorage.getItem("silkRoadAnimationPlayed");
      if (played === "true") {
        setHasPlayed(true);
        setPhase("complete");
        onAnimationComplete?.();
      } else {
        setPhase("flowing");
      }
    }
  }, [onAnimationComplete]);

  // Color palette - 故宫红 to autumn gold (敦煌 colors)
  const getThreadColor = useCallback((progress: number, alpha: number = 1) => {
    const colorStops = [
      { pos: 0, color: [122, 31, 31] },      // deepRed 故宫红
      { pos: 0.12, color: [139, 35, 35] },   // vermillion
      { pos: 0.25, color: [184, 40, 40] },   // crimson
      { pos: 0.38, color: [224, 88, 32] },   // orange
      { pos: 0.5, color: [255, 136, 16] },   // amber
      { pos: 0.65, color: [255, 180, 40] },  // gold
      { pos: 0.8, color: [255, 216, 102] },  // lightGold
      { pos: 1, color: [255, 248, 220] },    // paleGold
    ];

    let lower = colorStops[0];
    let upper = colorStops[colorStops.length - 1];
    
    for (let i = 0; i < colorStops.length - 1; i++) {
      if (progress >= colorStops[i].pos && progress <= colorStops[i + 1].pos) {
        lower = colorStops[i];
        upper = colorStops[i + 1];
        break;
      }
    }

    const range = upper.pos - lower.pos;
    const t = range > 0 ? (progress - lower.pos) / range : 0;
    
    const r = Math.round(lower.color[0] + (upper.color[0] - lower.color[0]) * t);
    const g = Math.round(lower.color[1] + (upper.color[1] - lower.color[1]) * t);
    const b = Math.round(lower.color[2] + (upper.color[2] - lower.color[2]) * t);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }, []);

  // Initialize 敦煌丝带 ribbons
  const initRibbons = useCallback((width: number, height: number) => {
    const ribbonCount = 9; // More ribbons for richer effect
    const ribbons: SilkRibbon[] = [];

    for (let i = 0; i < ribbonCount; i++) {
      const yBase = height * 0.15 + (height * 0.7 * i / (ribbonCount - 1));
      ribbons.push({
        id: i,
        points: [],
        progress: 0,
        speed: 0.006 + Math.random() * 0.003,
        amplitude: 30 + Math.random() * 50, // Larger waves for ribbon feel
        frequency: 0.004 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
        width: 3 + Math.random() * 4, // Wider ribbons
        colorOffset: i / ribbonCount,
        // Dunhuang-specific
        swirl: 0.5 + Math.random() * 1.5, // Swirl intensity
        delay: i * 0.08, // Staggered entry
        length: 0.6 + Math.random() * 0.3, // Ribbon length (60-90% of path)
        waveSpeed: 1.5 + Math.random() * 1, // Wave animation speed
        yOffset: yBase,
      });
    }

    return ribbons;
  }, []);

  // Create particle
  const createParticle = useCallback((x: number, y: number, colorProgress: number): Particle => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      life: 0,
      maxLife: 40 + Math.random() * 60,
      size: 1.5 + Math.random() * 2.5,
      color: getThreadColor(colorProgress, 0.9),
    };
  }, [getThreadColor]);

  useEffect(() => {
    if (hasPlayed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ribbonsRef.current = initRibbons(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    startTimeRef.current = Date.now();
    let currentPhase: "flowing" | "converging" | "forming" | "complete" = "flowing";

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Phase transitions
      if (elapsed > 3.8 && currentPhase === "flowing") {
        currentPhase = "converging";
        setPhase("converging");
      } else if (elapsed > 4.8 && currentPhase === "converging") {
        currentPhase = "forming";
        setPhase("forming");
      } else if (elapsed > 5.5 && currentPhase === "forming") {
        currentPhase = "complete";
        setPhase("complete");
        // Mark as played
        sessionStorage.setItem("silkRoadAnimationPlayed", "true");
        // Immediately trigger completion
        onAnimationComplete?.();
        cancelAnimationFrame(animationRef.current);
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw ribbons - 敦煌丝带飞舞
      ribbonsRef.current.forEach((ribbon, ribbonIndex) => {
        // Staggered start
        const adjustedElapsed = Math.max(0, elapsed - ribbon.delay);
        if (adjustedElapsed <= 0) return;

        // Update progress
        if (currentPhase === "flowing") {
          ribbon.progress = Math.min(1, ribbon.progress + ribbon.speed);
        }

        // Calculate ribbon path with 环绕 (swirling) effect
        const points: { x: number; y: number }[] = [];
        const segments = 150; // More segments for smoother curves
        const startX = width + 150;
        const endX = -150;
        const pathLength = startX - endX;

        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          
          // Only draw up to current progress, respecting ribbon length
          const visibleStart = Math.max(0, ribbon.progress - ribbon.length);
          if (t < visibleStart || t > ribbon.progress) continue;

          let x, y;
          const time = adjustedElapsed * ribbon.waveSpeed;

          if (currentPhase === "flowing" || currentPhase === "converging") {
            // 敦煌丝带 style - multiple wave components for organic flow
            x = startX - pathLength * t;
            
            // Primary wave
            const wave1 = Math.sin(t * Math.PI * 3 + ribbon.phase + time) * ribbon.amplitude;
            // Secondary wave (faster, smaller)
            const wave2 = Math.sin(t * Math.PI * 7 + ribbon.phase * 2 + time * 1.5) * (ribbon.amplitude * 0.3);
            // Swirl component - creates the 环绕 effect
            const swirl = Math.sin(t * Math.PI * 2 + time * 0.5) * ribbon.swirl * 20 * Math.sin(t * Math.PI);
            
            // Dampening at edges for natural flow
            const edgeDamp = Math.sin(t * Math.PI);
            
            y = ribbon.yOffset + (wave1 + wave2 + swirl) * edgeDamp;

            // Add convergence during that phase
            if (currentPhase === "converging") {
              const convergeProgress = Math.min(1, (elapsed - 3.8) / 1);
              const targetY = centerY + (ribbonIndex - ribbonsRef.current.length / 2) * 30;
              y = y + (targetY - y) * convergeProgress * 0.5;
              x = x + (centerX - x) * convergeProgress * 0.3;
            }
          } else {
            // Forming phase - spiral into center
            const formProgress = Math.min(1, (elapsed - 4.8) / 0.7);
            const angle = ribbonIndex * (Math.PI * 2 / ribbonsRef.current.length) + t * Math.PI * 2;
            const radius = 100 * (1 - formProgress) * (1 - t);
            x = centerX + Math.cos(angle) * radius;
            y = centerY + Math.sin(angle) * radius;
          }

          points.push({ x, y });

          // Spawn golden particles along ribbon
          if (Math.random() < 0.03 && currentPhase !== "complete") {
            particlesRef.current.push(createParticle(x, y, t));
          }
        }

        ribbon.points = points;

        // Draw ribbon with gradient and glow
        if (points.length > 2) {
          // Main ribbon stroke
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          
          // Use quadratic curves for smoother ribbon
          for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
          }
          if (points.length > 1) {
            ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
          }

          // Create gradient along ribbon
          const gradient = ctx.createLinearGradient(
            points[0].x, points[0].y,
            points[points.length - 1].x, points[points.length - 1].y
          );
          gradient.addColorStop(0, getThreadColor(0, 0.2)); // Fade in
          gradient.addColorStop(0.1, getThreadColor(0.1, 0.85));
          gradient.addColorStop(0.4, getThreadColor(0.4, 0.9));
          gradient.addColorStop(0.7, getThreadColor(0.7, 0.85));
          gradient.addColorStop(1, getThreadColor(1, 0.6)); // Fade out at tip

          // Glow effect (draw first, underneath)
          ctx.save();
          ctx.shadowColor = getThreadColor(0.5, 0.6);
          ctx.shadowBlur = 20;
          ctx.strokeStyle = gradient;
          ctx.lineWidth = ribbon.width + 2;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
          ctx.restore();

          // Main ribbon
          ctx.strokeStyle = gradient;
          ctx.lineWidth = ribbon.width;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();

          // Highlight edge (silk sheen effect)
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y - ribbon.width * 0.3);
          for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2 - ribbon.width * 0.3;
            ctx.quadraticCurveTo(points[i].x, points[i].y - ribbon.width * 0.3, xc, yc);
          }
          ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Update and draw particles (golden sparkles)
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // Slight gravity
        p.vx *= 0.99; // Air resistance
        p.life++;

        if (p.life > p.maxLife) return false;

        const alpha = 1 - (p.life / p.maxLife);
        
        // Particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5 * alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha * 0.15})`);
        ctx.fill();
        
        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha * 0.8})`);
        ctx.fill();

        return true;
      });

      if (currentPhase !== "complete") {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (phase === "flowing") {
      animate();
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [hasPlayed, phase, initRibbons, createParticle, getThreadColor, onAnimationComplete]);

  // Don't render anything if animation has already played
  if (hasPlayed || phase === "complete") {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Canvas for silk ribbons */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      {/* Ambient glow during animation */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: phase === "converging" || phase === "forming" ? 0.5 : 0.2,
          scale: phase === "forming" ? 1.3 : 1,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(255, 180, 40, 0.25) 0%, rgba(139, 35, 35, 0.12) 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}
