"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface SilkRoadAnimationProps {
  onLogoReveal?: () => void;
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
  swirl: number;
  delay: number;
  length: number;
  waveSpeed: number;
  yOffset: number;
  // For the special ribbon that flies to logo
  isLogoRibbon?: boolean;
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

  // Logo position (top-left, with padding)
  const logoTargetX = 80; // px from left
  const logoTargetY = 56; // px from top (center of header)

  // Check if animation has already played
  useEffect(() => {
    if (typeof window !== "undefined") {
      const played = sessionStorage.getItem("silkRoadAnimationPlayed");
      if (played === "true") {
        setHasPlayed(true);
        setPhase("complete");
        onLogoReveal?.();
      } else {
        setPhase("flowing");
      }
    }
  }, [onLogoReveal]);

  // Color palette - 故宫红 to autumn gold
  const getThreadColor = useCallback((progress: number, alpha: number = 1) => {
    const colorStops = [
      { pos: 0, color: [122, 31, 31] },
      { pos: 0.12, color: [139, 35, 35] },
      { pos: 0.25, color: [184, 40, 40] },
      { pos: 0.38, color: [224, 88, 32] },
      { pos: 0.5, color: [255, 136, 16] },
      { pos: 0.65, color: [255, 180, 40] },
      { pos: 0.8, color: [255, 216, 102] },
      { pos: 1, color: [255, 248, 220] },
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

  // Initialize ribbons
  const initRibbons = useCallback((width: number, height: number) => {
    const ribbonCount = 9;
    const ribbons: SilkRibbon[] = [];

    for (let i = 0; i < ribbonCount; i++) {
      const yBase = height * 0.15 + (height * 0.7 * i / (ribbonCount - 1));
      ribbons.push({
        id: i,
        points: [],
        progress: 0,
        speed: 0.003 + Math.random() * 0.0015,
        amplitude: 35 + Math.random() * 55,
        frequency: 0.004 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
        width: 3 + Math.random() * 4,
        colorOffset: i / ribbonCount,
        swirl: 0.5 + Math.random() * 1.5,
        delay: i * 0.12,
        length: 0.5 + Math.random() * 0.35,
        waveSpeed: 1.0 + Math.random() * 0.6,
        yOffset: yBase,
        isLogoRibbon: i === 2, // Third ribbon will fly to logo
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
    let currentPhase: "flowing" | "flyingToLogo" | "orbiting" | "complete" = "flowing";

    // Timing constants
    const FLOW_END = 5.5;
    const FLY_START = 5.5;
    const FLY_END = 7.0;
    const ORBIT_START = 7.0;
    const ORBIT_END = 9.0;
    const LOGO_REVEAL = 8.5;

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const width = canvas.width;
      const height = canvas.height;

      // Phase transitions
      if (elapsed > FLOW_END && currentPhase === "flowing") {
        currentPhase = "flyingToLogo";
        setPhase("flyingToLogo");
      } else if (elapsed > ORBIT_START && currentPhase === "flyingToLogo") {
        currentPhase = "orbiting";
        setPhase("orbiting");
      } else if (elapsed > ORBIT_END && currentPhase === "orbiting") {
        currentPhase = "complete";
        setPhase("complete");
        sessionStorage.setItem("silkRoadAnimationPlayed", "true");
        cancelAnimationFrame(animationRef.current);
        return;
      }

      // Reveal logo during orbiting phase
      if (elapsed > LOGO_REVEAL && !logoRevealedRef.current) {
        logoRevealedRef.current = true;
        onLogoReveal?.();
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw ribbons
      ribbonsRef.current.forEach((ribbon, ribbonIndex) => {
        const adjustedElapsed = Math.max(0, elapsed - ribbon.delay);
        if (adjustedElapsed <= 0) return;

        // Update progress during flowing phase
        if (currentPhase === "flowing") {
          ribbon.progress = Math.min(1, ribbon.progress + ribbon.speed);
        }

        const points: { x: number; y: number }[] = [];
        const segments = 150;
        const startX = width + 150;
        const endX = -150;
        const pathLength = startX - endX;

        // Special handling for the logo ribbon
        if (ribbon.isLogoRibbon && (currentPhase === "flyingToLogo" || currentPhase === "orbiting")) {
          // Calculate ribbon flying to logo
          const flyProgress = Math.min(1, (elapsed - FLY_START) / (FLY_END - FLY_START));
          const orbitProgress = currentPhase === "orbiting" ? Math.min(1, (elapsed - ORBIT_START) / (ORBIT_END - ORBIT_START)) : 0;
          
          // Current ribbon center position
          const ribbonCenterX = width * 0.3; // Where ribbon roughly is
          const ribbonCenterY = ribbon.yOffset;
          
          // Interpolate position toward logo
          const currentX = ribbonCenterX + (logoTargetX - ribbonCenterX) * flyProgress;
          const currentY = ribbonCenterY + (logoTargetY - ribbonCenterY) * flyProgress;
          
          // Draw orbiting ribbon around logo position
          const orbitRadius = 60 * (1 - orbitProgress * 0.7); // Shrinks as it orbits
          const ribbonLength = 80 * (1 - orbitProgress * 0.5);
          const orbitSpeed = 4 + orbitProgress * 2; // Speeds up
          
          for (let i = 0; i <= 50; i++) {
            const t = i / 50;
            const angle = elapsed * orbitSpeed + t * Math.PI * 1.5;
            
            // Spiral inward effect
            const spiralRadius = orbitRadius * (1 - t * 0.3);
            const x = currentX + Math.cos(angle) * spiralRadius * (1 - flyProgress * 0.3 + flyProgress);
            const y = currentY + Math.sin(angle) * spiralRadius * 0.6 * (1 - flyProgress * 0.3 + flyProgress);
            
            // Fade ribbon as it completes orbit
            if (orbitProgress > 0.8) continue;
            
            points.push({ x, y });
            
            // Extra sparkles during orbit
            if (Math.random() < 0.08) {
              particlesRef.current.push(createParticle(x, y, 0.7));
            }
          }
        } else if (!ribbon.isLogoRibbon || currentPhase === "flowing") {
          // Normal ribbon drawing
          for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            
            const visibleStart = Math.max(0, ribbon.progress - ribbon.length);
            if (t < visibleStart || t > ribbon.progress) continue;

            let x, y;
            const time = adjustedElapsed * ribbon.waveSpeed;

            // Flowing animation
            x = startX - pathLength * t;
            
            const wave1 = Math.sin(t * Math.PI * 3 + ribbon.phase + time) * ribbon.amplitude;
            const wave2 = Math.sin(t * Math.PI * 7 + ribbon.phase * 2 + time * 1.5) * (ribbon.amplitude * 0.3);
            const swirl = Math.sin(t * Math.PI * 2 + time * 0.5) * ribbon.swirl * 20 * Math.sin(t * Math.PI);
            const edgeDamp = Math.sin(t * Math.PI);
            
            y = ribbon.yOffset + (wave1 + wave2 + swirl) * edgeDamp;

            // Fade out other ribbons during fly phase
            if (currentPhase !== "flowing") {
              const fadeProgress = Math.min(1, (elapsed - FLOW_END) / 2);
              if (fadeProgress > 0.8) continue; // Stop drawing when mostly faded
            }

            points.push({ x, y });

            if (Math.random() < 0.03) {
              particlesRef.current.push(createParticle(x, y, t));
            }
          }
        }

        ribbon.points = points;

        // Draw ribbon
        if (points.length > 2) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          
          for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
          }
          if (points.length > 1) {
            ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
          }

          // Calculate opacity based on phase
          let ribbonOpacity = 1;
          if (!ribbon.isLogoRibbon && currentPhase !== "flowing") {
            const fadeProgress = Math.min(1, (elapsed - FLOW_END) / 1.5);
            ribbonOpacity = 1 - fadeProgress;
          }
          if (ribbon.isLogoRibbon && currentPhase === "orbiting") {
            const orbitProgress = Math.min(1, (elapsed - ORBIT_START) / (ORBIT_END - ORBIT_START));
            ribbonOpacity = 1 - orbitProgress;
          }

          const gradient = ctx.createLinearGradient(
            points[0].x, points[0].y,
            points[points.length - 1].x, points[points.length - 1].y
          );
          gradient.addColorStop(0, getThreadColor(0, 0.2 * ribbonOpacity));
          gradient.addColorStop(0.1, getThreadColor(0.1, 0.85 * ribbonOpacity));
          gradient.addColorStop(0.4, getThreadColor(0.4, 0.9 * ribbonOpacity));
          gradient.addColorStop(0.7, getThreadColor(0.7, 0.85 * ribbonOpacity));
          gradient.addColorStop(1, getThreadColor(1, 0.6 * ribbonOpacity));

          // Glow
          ctx.save();
          ctx.shadowColor = getThreadColor(0.5, 0.6 * ribbonOpacity);
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

          // Highlight
          if (ribbonOpacity > 0.3) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y - ribbon.width * 0.3);
            for (let i = 1; i < points.length - 1; i++) {
              const xc = (points[i].x + points[i + 1].x) / 2;
              const yc = (points[i].y + points[i + 1].y) / 2 - ribbon.width * 0.3;
              ctx.quadraticCurveTo(points[i].x, points[i].y - ribbon.width * 0.3, xc, yc);
            }
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * ribbonOpacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      // Draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.vx *= 0.99;
        p.life++;

        if (p.life > p.maxLife) return false;

        const alpha = 1 - (p.life / p.maxLife);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5 * alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha * 0.15})`);
        ctx.fill();
        
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
  }, [hasPlayed, phase, initRibbons, createParticle, getThreadColor, onLogoReveal, logoTargetX, logoTargetY]);

  if (hasPlayed || phase === "complete") {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Glow around logo area during orbit */}
      {(phase === "flyingToLogo" || phase === "orbiting") && (
        <motion.div
          className="absolute rounded-full"
          style={{
            left: logoTargetX - 40,
            top: logoTargetY - 40,
            width: 80,
            height: 80,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: phase === "orbiting" ? 0.8 : 0.4, 
            scale: phase === "orbiting" ? 1.2 : 1 
          }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255, 180, 40, 0.4) 0%, rgba(139, 35, 35, 0.2) 50%, transparent 70%)",
              filter: "blur(15px)",
            }}
          />
        </motion.div>
      )}

      {/* Ambient glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: phase === "flowing" ? 0.2 : 0,
          scale: 1,
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
