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

  // Smooth color interpolation for silk gradient
  const getColor = useCallback((progress: number, alpha: number = 1) => {
    const colors = [
      [255, 216, 102], // light gold
      [255, 180, 40],  // gold
      [255, 136, 16],  // amber
      [224, 88, 32],   // orange  
      [184, 40, 40],   // crimson
      [139, 35, 35],   // deep red
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
    if (hasPlayedRef.current) return;
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const width = canvas.width;
    const height = canvas.height;

    // Logo target position
    const LOGO_X = 75;
    const LOGO_Y = 56;

    // Only 3 silk ribbons - elegant Dunhuang style
    const ribbons = [
      {
        yOffset: height * 0.25,
        amplitude: 50,
        phase: 0,
        width: 6,
        speed: 0.003,
        waveFreq: 2.5,
        delay: 0,
        progress: 0,
        length: 0.6,
        isLogoRibbon: false,
        colorOffset: 0,
      },
      {
        yOffset: height * 0.45,
        amplitude: 60,
        phase: Math.PI / 3,
        width: 7,
        speed: 0.0035,
        waveFreq: 2,
        delay: 0.3,
        progress: 0,
        length: 0.55,
        isLogoRibbon: true, // This one flies to logo
        colorOffset: 0.2,
      },
      {
        yOffset: height * 0.65,
        amplitude: 45,
        phase: Math.PI / 2,
        width: 5,
        speed: 0.0025,
        waveFreq: 3,
        delay: 0.6,
        progress: 0,
        length: 0.5,
        isLogoRibbon: false,
        colorOffset: 0.4,
      },
    ];

    // Timing constants
    const FLOW_END = 5.0;
    const FLY_START = 5.0;
    const FLY_END = 7.5;
    const ORBIT_END = 8.5;
    const LOGO_REVEAL_TIME = 8.0;

    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      // End animation - clear everything
      if (elapsed > ORBIT_END) {
        sessionStorage.setItem("silkRoadAnimationPlayed", "true");
        if (!logoRevealedRef.current) {
          logoRevealedRef.current = true;
          onLogoReveal?.();
        }
        ctx.clearRect(0, 0, width, height);
        return;
      }

      // Reveal logo
      if (elapsed > LOGO_REVEAL_TIME && !logoRevealedRef.current) {
        logoRevealedRef.current = true;
        onLogoReveal?.();
      }

      ctx.clearRect(0, 0, width, height);

      // Calculate fade out for cleanup
      const cleanupFade = elapsed > LOGO_REVEAL_TIME 
        ? Math.max(0, 1 - (elapsed - LOGO_REVEAL_TIME) / 0.5) 
        : 1;

      // Draw each ribbon
      ribbons.forEach((ribbon) => {
        const adjustedTime = Math.max(0, elapsed - ribbon.delay);
        if (adjustedTime <= 0) return;

        // Update progress during flow phase
        if (elapsed < FLOW_END) {
          ribbon.progress = Math.min(1, ribbon.progress + ribbon.speed);
        }

        const points: { x: number; y: number }[] = [];
        const startX = width + 150;
        const pathLength = width + 300;

        // Check if this ribbon should fly to logo
        const shouldFly = ribbon.isLogoRibbon && elapsed >= FLY_START;
        const flyProgress = shouldFly ? Math.min(1, (elapsed - FLY_START) / (FLY_END - FLY_START)) : 0;
        const orbitProgress = elapsed > FLY_END ? Math.min(1, (elapsed - FLY_END) / (ORBIT_END - FLY_END)) : 0;

        if (shouldFly) {
          // FLYING RIBBON - continues from its current position toward logo
          // Ease function for smooth movement
          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
          const easedFly = easeOutCubic(flyProgress);

          // Starting position is where the ribbon head was at FLOW_END
          const ribbonHeadX = startX - pathLength * ribbon.progress;
          const ribbonHeadY = ribbon.yOffset;

          // Current position interpolating toward logo
          const currentX = ribbonHeadX + (LOGO_X - ribbonHeadX) * easedFly;
          const currentY = ribbonHeadY + (LOGO_Y - ribbonHeadY) * easedFly;

          // Draw flowing tail behind the moving head
          const tailLength = 40;
          for (let i = 0; i < tailLength; i++) {
            const t = i / tailLength;
            const tailProgress = flyProgress - t * 0.3;
            if (tailProgress < 0) continue;

            const easedTail = easeOutCubic(Math.max(0, tailProgress));
            const tx = ribbonHeadX + (LOGO_X - ribbonHeadX) * easedTail;
            const ty = ribbonHeadY + (LOGO_Y - ribbonHeadY) * easedTail;
            
            // Add wave motion to tail
            const wave = Math.sin(t * Math.PI * 4 + elapsed * 3) * (20 * (1 - flyProgress));
            
            points.push({ x: tx + wave * 0.3, y: ty + wave });
          }

          // Add spiral orbit effect when close to logo
          if (flyProgress > 0.7) {
            const orbitPhase = orbitProgress * Math.PI * 4;
            const orbitRadius = 40 * (1 - orbitProgress * 0.9);
            
            for (let i = 0; i < 20; i++) {
              const angle = orbitPhase + (i / 20) * Math.PI * 2;
              const r = orbitRadius * (1 - i / 40);
              const ox = LOGO_X + Math.cos(angle) * r;
              const oy = LOGO_Y + Math.sin(angle) * r * 0.6;
              points.push({ x: ox, y: oy });
            }
          }

          // Draw with fading
          const opacity = cleanupFade * (1 - orbitProgress * 0.8);
          if (opacity > 0.05 && points.length > 2) {
            drawSilkRibbon(ctx, points, ribbon.width, opacity, getColor, ribbon.colorOffset);
          }

        } else {
          // NORMAL FLOWING RIBBON
          const fadeOut = elapsed > FLOW_END ? Math.max(0, 1 - (elapsed - FLOW_END) / 2) : 1;
          
          // Skip non-logo ribbons after flow ends
          if (!ribbon.isLogoRibbon && fadeOut <= 0) return;

          // Generate smooth silk curve
          const segments = 80;
          for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const visibleStart = Math.max(0, ribbon.progress - ribbon.length);
            if (t < visibleStart || t > ribbon.progress) continue;

            const x = startX - pathLength * t;
            
            // Multi-frequency wave for silk-like undulation
            const wave1 = Math.sin(t * Math.PI * ribbon.waveFreq + ribbon.phase + adjustedTime * 1.5) * ribbon.amplitude;
            const wave2 = Math.sin(t * Math.PI * ribbon.waveFreq * 2 + ribbon.phase * 1.5 + adjustedTime * 2) * ribbon.amplitude * 0.3;
            const wave3 = Math.sin(t * Math.PI * ribbon.waveFreq * 0.5 + adjustedTime * 0.8) * ribbon.amplitude * 0.4;
            
            // Envelope to make ribbon taper at ends
            const envelope = Math.sin(((t - visibleStart) / (ribbon.progress - visibleStart)) * Math.PI);
            
            const y = ribbon.yOffset + (wave1 + wave2 + wave3) * envelope;

            points.push({ x, y });
          }

          if (fadeOut > 0.05 && points.length > 2) {
            drawSilkRibbon(ctx, points, ribbon.width, fadeOut * cleanupFade, getColor, ribbon.colorOffset);
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Draw elegant silk ribbon with gradient and sheen
    function drawSilkRibbon(
      ctx: CanvasRenderingContext2D,
      points: { x: number; y: number }[],
      lineWidth: number,
      opacity: number,
      getColor: (p: number, a: number) => string,
      colorOffset: number
    ) {
      if (points.length < 3) return;

      // Create smooth curve path
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

      // Create gradient along ribbon
      const gradient = ctx.createLinearGradient(
        points[0].x, points[0].y,
        points[points.length - 1].x, points[points.length - 1].y
      );
      
      // Silk gradient with sheen effect
      gradient.addColorStop(0, getColor((0 + colorOffset) % 1, 0.2 * opacity));
      gradient.addColorStop(0.15, getColor((0.2 + colorOffset) % 1, 0.8 * opacity));
      gradient.addColorStop(0.3, getColor((0.35 + colorOffset) % 1, 0.95 * opacity));
      gradient.addColorStop(0.5, getColor((0.5 + colorOffset) % 1, 1 * opacity));
      gradient.addColorStop(0.7, getColor((0.65 + colorOffset) % 1, 0.9 * opacity));
      gradient.addColorStop(0.85, getColor((0.8 + colorOffset) % 1, 0.7 * opacity));
      gradient.addColorStop(1, getColor((0.95 + colorOffset) % 1, 0.3 * opacity));

      // Draw soft glow
      ctx.save();
      ctx.shadowColor = getColor(0.5, 0.4 * opacity);
      ctx.shadowBlur = 20;
      ctx.strokeStyle = gradient;
      ctx.lineWidth = lineWidth + 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.restore();

      // Draw main ribbon
      ctx.strokeStyle = gradient;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Draw silk sheen highlight
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const sheenGradient = ctx.createLinearGradient(
        points[0].x, points[0].y - 10,
        points[0].x, points[0].y + 10
      );
      sheenGradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
      sheenGradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.15 * opacity})`);
      sheenGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      ctx.strokeStyle = sheenGradient;
      ctx.lineWidth = lineWidth * 0.4;
      ctx.stroke();
      ctx.restore();
    }

    animate();

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
