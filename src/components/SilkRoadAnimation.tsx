"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

interface SilkRoadAnimationProps {
  onAnimationComplete?: () => void;
}

interface SilkThread {
  id: number;
  points: { x: number; y: number }[];
  progress: number;
  speed: number;
  amplitude: number;
  frequency: number;
  phase: number;
  width: number;
  colorOffset: number;
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
  const threadsRef = useRef<SilkThread[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);
  const [phase, setPhase] = useState<"flowing" | "converging" | "forming" | "complete">("flowing");
  const logoControls = useAnimation();

  // Color palette - 故宫红 to autumn gold
  const colors = {
    deepRed: "#7A1F1F",
    vermillion: "#8B2323",
    crimson: "#B82828",
    orange: "#E05820",
    amber: "#FF8810",
    gold: "#FFB428",
    lightGold: "#FFD866",
    paleGold: "#FFF8DC",
  };

  // Get color based on progress along thread (0 = origin/red, 1 = tip/gold)
  const getThreadColor = useCallback((progress: number, alpha: number = 1) => {
    const colorStops = [
      { pos: 0, color: [122, 31, 31] },      // deepRed
      { pos: 0.15, color: [139, 35, 35] },   // vermillion
      { pos: 0.3, color: [184, 40, 40] },    // crimson
      { pos: 0.45, color: [224, 88, 32] },   // orange
      { pos: 0.6, color: [255, 136, 16] },   // amber
      { pos: 0.75, color: [255, 180, 40] },  // gold
      { pos: 0.9, color: [255, 216, 102] },  // lightGold
      { pos: 1, color: [255, 248, 220] },    // paleGold
    ];

    // Find the two stops we're between
    let lower = colorStops[0];
    let upper = colorStops[colorStops.length - 1];
    
    for (let i = 0; i < colorStops.length - 1; i++) {
      if (progress >= colorStops[i].pos && progress <= colorStops[i + 1].pos) {
        lower = colorStops[i];
        upper = colorStops[i + 1];
        break;
      }
    }

    // Interpolate
    const range = upper.pos - lower.pos;
    const t = range > 0 ? (progress - lower.pos) / range : 0;
    
    const r = Math.round(lower.color[0] + (upper.color[0] - lower.color[0]) * t);
    const g = Math.round(lower.color[1] + (upper.color[1] - lower.color[1]) * t);
    const b = Math.round(lower.color[2] + (upper.color[2] - lower.color[2]) * t);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }, []);

  // Initialize threads
  const initThreads = useCallback((width: number, height: number) => {
    const threadCount = 7; // Medium density
    const threads: SilkThread[] = [];

    for (let i = 0; i < threadCount; i++) {
      const yBase = height * 0.3 + (height * 0.4 * i / (threadCount - 1));
      threads.push({
        id: i,
        points: [],
        progress: 0,
        speed: 0.008 + Math.random() * 0.004, // Varying speeds
        amplitude: 20 + Math.random() * 30,
        frequency: 0.003 + Math.random() * 0.002,
        phase: Math.random() * Math.PI * 2,
        width: 2 + Math.random() * 3,
        colorOffset: i / threadCount,
      });
    }

    return threads;
  }, []);

  // Create particle at position
  const createParticle = useCallback((x: number, y: number, colorProgress: number): Particle => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 0,
      maxLife: 30 + Math.random() * 40,
      size: 1 + Math.random() * 2,
      color: getThreadColor(colorProgress, 0.8),
    };
  }, [getThreadColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      threadsRef.current = initThreads(canvas.width, canvas.height);
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
      if (elapsed > 3.5 && currentPhase === "flowing") {
        currentPhase = "converging";
        setPhase("converging");
      } else if (elapsed > 4.5 && currentPhase === "converging") {
        currentPhase = "forming";
        setPhase("forming");
      } else if (elapsed > 5.5 && currentPhase === "forming") {
        currentPhase = "complete";
        setPhase("complete");
        // Trigger logo fly animation
        logoControls.start({
          x: -centerX + 80,
          y: -centerY + 56,
          scale: 0.12,
          transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
        }).then(() => {
          onAnimationComplete?.();
        });
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Update and draw threads
      threadsRef.current.forEach((thread, threadIndex) => {
        // Update progress
        if (currentPhase === "flowing") {
          thread.progress = Math.min(1, thread.progress + thread.speed);
        }

        // Calculate thread path
        const points: { x: number; y: number }[] = [];
        const segments = 100;
        const startX = width + 100;
        const baseY = height * 0.3 + (height * 0.4 * threadIndex / (threadsRef.current.length - 1));

        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          
          // Only draw up to current progress
          if (t > thread.progress) break;

          let x, y;

          if (currentPhase === "flowing") {
            // Flowing from right to left with wave motion
            x = startX - (startX - centerX + 200) * t;
            const wave = Math.sin(t * Math.PI * 4 + thread.phase + elapsed * 2) * thread.amplitude;
            const dampening = Math.sin(t * Math.PI); // Dampen at ends
            y = baseY + wave * dampening;
          } else if (currentPhase === "converging" || currentPhase === "forming") {
            // Converge toward center
            const convergeProgress = Math.min(1, (elapsed - 3.5) / 1);
            const flowX = startX - (startX - centerX + 200) * t;
            const wave = Math.sin(t * Math.PI * 4 + thread.phase + elapsed * 2) * thread.amplitude;
            const dampening = Math.sin(t * Math.PI);
            const flowY = baseY + wave * dampening;

            // Target points for logo formation
            const leafAngle = (threadIndex / threadsRef.current.length) * Math.PI * 2 - Math.PI / 2;
            const leafRadius = 80 * (1 - t * 0.5);
            const targetX = centerX + Math.cos(leafAngle + t * 0.5) * leafRadius * (1 - t);
            const targetY = centerY + Math.sin(leafAngle + t * 0.5) * leafRadius * (1 - t);

            x = flowX + (targetX - flowX) * convergeProgress * t;
            y = flowY + (targetY - flowY) * convergeProgress * t;
          } else {
            x = centerX;
            y = centerY;
          }

          points.push({ x, y });

          // Spawn particles occasionally
          if (Math.random() < 0.02 && currentPhase !== "complete") {
            particlesRef.current.push(createParticle(x, y, t));
          }
        }

        thread.points = points;

        // Draw thread with gradient
        if (points.length > 1 && currentPhase !== "complete") {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }

          // Create gradient along thread
          const gradient = ctx.createLinearGradient(
            points[0].x, points[0].y,
            points[points.length - 1].x, points[points.length - 1].y
          );
          gradient.addColorStop(0, getThreadColor(0, 0.9));
          gradient.addColorStop(0.3, getThreadColor(0.3, 0.85));
          gradient.addColorStop(0.6, getThreadColor(0.6, 0.8));
          gradient.addColorStop(1, getThreadColor(1, 0.7));

          ctx.strokeStyle = gradient;
          ctx.lineWidth = thread.width;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();

          // Glow effect
          ctx.shadowColor = getThreadColor(0.5, 0.5);
          ctx.shadowBlur = 15;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // Slight gravity
        p.life++;

        if (p.life > p.maxLife) return false;

        const alpha = 1 - (p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha * 0.6})`);
        ctx.fill();

        // Particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2 * alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha * 0.2})`);
        ctx.fill();

        return true;
      });

      // Continue animation until complete phase is done
      if (currentPhase !== "complete" || elapsed < 6.5) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initThreads, createParticle, getThreadColor, logoControls, onAnimationComplete]);

  // Logo SVG paths (from lync-icon-new.svg)
  const upperWingPath = "m 307.92993,486.33172 c -4.07877,-25.50723 -22.83142,-38.80538 -68.98575,-48.92016 -47.862,-10.48901 -67.68131,-21.33781 -87.64138,-47.97356 -9.29771,-12.40735 -23.29998,-41.4103 -25.63926,-53.1067 -0.64382,-3.21913 -0.64382,-3.21913 5.25391,1.34152 20.33711,15.72645 51.9491,28.7234 95.39774,39.22183 32.14334,7.76674 44.29963,11.41198 54.57958,16.36648 32.52012,15.67333 41.99794,38.07427 32.67042,77.21696 -1.7875,7.5012 -3.25,14.78714 -3.25,16.19098 0,4.1849 -1.70058,3.94438 -2.38526,-0.33735 z";
  const innerCurvePath = "m 324.08227,533.09052 c 0.61938,-23.7723 3.50881,-42.2657 12.69474,-81.25098 7.43534,-31.55568 2.04861,-56.22502 -16.09573,-73.71294 C 308.09129,365.9921 298.87335,361.58494 256.11315,347.25619 197.7012,327.6826 174.54157,314.84495 147.77852,287.20505 116.93729,255.35336 97.845056,218.82138 73.678936,145.41939 c -8.23624,-25.01668 -10.46957,-33.59413 -7.24822,-27.83789 2.16922,3.87617 35.044634,25.5338 60.402934,39.79218 26.73346,15.0316 85.3721,43.92612 149.48154,73.65789 63.18922,29.30499 87.19122,45.06792 103.22944,67.79426 24.18935,34.2766 19.88756,73.38895 -16.4357,149.43509 -15.72851,32.9291 -31.84707,71.94069 -35.87531,86.82862 -1.22771,4.5375 -2.4991,8.25044 -2.82531,8.25098 -0.32622,5.4e-4 -0.47293,-4.61196 -0.32604,-10.25 z";
  const lowerWingPath = "m 323.31519,607.92439 c 0,-6.94275 11.56317,-49.10587 20.18054,-73.58485 22.98901,-65.30394 56.33799,-106.05787 122.31946,-149.47978 19.27363,-12.68384 35.1453,-21.90853 92.5,-53.76148 82.44319,-45.78629 109.24789,-62.86354 131.23164,-83.60758 2.05241,-1.93666 3.92725,-3.32544 4.16632,-3.08618 0.68733,0.68788 -11.9134,40.62671 -19.0673,60.43502 -12.40817,34.35681 -24.46147,60.58575 -38.66848,84.14575 -39.30346,65.17832 -80.8232,98.40512 -170.41703,136.37879 -42.67637,18.08805 -49.94096,21.31555 -65.24515,28.98692 -34.47517,17.28101 -57.818,33.83523 -73.25,51.94728 -3.70851,4.35257 -3.75,4.37056 -3.75,1.62611 z";

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Canvas for silk threads */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: phase === "complete" ? 0 : 1, transition: "opacity 0.5s" }}
      />

      {/* Logo that forms and flies to nav */}
      {(phase === "forming" || phase === "complete") && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: phase === "complete" ? 0 : 1, 
            scale: 1,
            ...logoControls 
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.svg
            width="200"
            height="200"
            viewBox="0 0 736 694"
            animate={logoControls}
            style={{ filter: "drop-shadow(0 0 30px rgba(255, 150, 24, 0.6))" }}
          >
            <defs>
              <linearGradient id="silkUpperWing" gradientUnits="userSpaceOnUse" x1="63" y1="103" x2="320" y2="540">
                <stop offset="0%" stopColor="#FFF8DC" />
                <stop offset="20%" stopColor="#FFC844" />
                <stop offset="40%" stopColor="#FF7010" />
                <stop offset="60%" stopColor="#D03428" />
                <stop offset="80%" stopColor="#8B2323" />
                <stop offset="100%" stopColor="#7A1F1F" />
              </linearGradient>
              <linearGradient id="silkInnerCurve" gradientUnits="userSpaceOnUse" x1="126" y1="336" x2="310" y2="486">
                <stop offset="0%" stopColor="#FFD866" />
                <stop offset="30%" stopColor="#E05820" />
                <stop offset="60%" stopColor="#B83028" />
                <stop offset="100%" stopColor="#7A1F1F" />
              </linearGradient>
              <linearGradient id="silkLowerWing" gradientUnits="userSpaceOnUse" x1="323" y1="607" x2="693" y2="247">
                <stop offset="0%" stopColor="#7A1F1F" />
                <stop offset="40%" stopColor="#9E2626" />
                <stop offset="60%" stopColor="#F07818" />
                <stop offset="80%" stopColor="#FFB428" />
                <stop offset="100%" stopColor="#FFE066" />
              </linearGradient>
            </defs>
            <motion.path
              d={innerCurvePath}
              fill="url(#silkInnerCurve)"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.path
              d={upperWingPath}
              fill="url(#silkUpperWing)"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            />
            <motion.path
              d={lowerWingPath}
              fill="url(#silkLowerWing)"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            />
          </motion.svg>
        </motion.div>
      )}

      {/* Ambient glow during convergence */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: phase === "converging" || phase === "forming" ? 0.6 : 0,
          scale: phase === "forming" ? 1.2 : 0.8,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(255, 180, 40, 0.3) 0%, rgba(139, 35, 35, 0.15) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
