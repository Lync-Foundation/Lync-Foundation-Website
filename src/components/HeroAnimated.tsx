"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useCallback, useState } from "react";
import FlyingLogo from "./FlyingLogo";

// Particle system for the mystical effect
function useParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    color: string;
    life: number;
    maxLife: number;
  }

  const createParticle = useCallback((width: number, height: number): Particle => {
    const colors = [
      "rgba(139, 35, 35, alpha)",    // 故宫红墙 Forbidden City red
      "rgba(255, 136, 16, alpha)",   // Orange autumn
      "rgba(255, 216, 102, alpha)",  // Golden leaf
      "rgba(224, 88, 32, alpha)",    // Vermillion orange
    ];
    
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25 - 0.08,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 500 + 300,
    };
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

    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
    particlesRef.current = Array.from({ length: particleCount }, () => 
      createParticle(canvas.width, canvas.height)
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        const fadeAlpha = lifeRatio < 0.1 
          ? lifeRatio * 10 
          : lifeRatio > 0.9 
            ? (1 - lifeRatio) * 10 
            : 1;

        const currentAlpha = p.alpha * fadeAlpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("alpha", String(currentAlpha));
        ctx.fill();

        // Subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("alpha", String(currentAlpha * 0.08));
        ctx.fill();

        if (p.life > p.maxLife || p.x < -10 || p.x > canvas.width + 10 || 
            p.y < -10 || p.y > canvas.height + 10) {
          particlesRef.current[i] = createParticle(canvas.width, canvas.height);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [createParticle]);

  return canvasRef;
}

interface HeroAnimatedProps {
  onLogoAnimationComplete?: () => void;
}

export default function HeroAnimated({ onLogoAnimationComplete }: HeroAnimatedProps) {
  const canvasRef = useParticleCanvas();
  const [logoFlown, setLogoFlown] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setLogoFlown(true);
    onLogoAnimationComplete?.();
  }, [onLogoAnimationComplete]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Transparent - relies on ImperialBackground */}

      {/* Particle canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none opacity-60"
      />

      {/* Center content with FLYING LOGO */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Rotating outer ring - autumn red/gold feel */}
        <motion.div
          className="absolute w-80 h-80 lg:w-[500px] lg:h-[500px] rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(139, 35, 35, 0.08), transparent, rgba(255, 180, 40, 0.06), transparent, rgba(255, 136, 16, 0.06), transparent)",
          }}
          animate={{ 
            rotate: 360,
            opacity: logoFlown ? 0 : 1,
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            opacity: { duration: 0.5 }
          }}
        />

        {/* Second rotating ring - inner */}
        <motion.div
          className="absolute w-64 h-64 lg:w-96 lg:h-96 rounded-full"
          style={{
            background: "conic-gradient(from 180deg, transparent, rgba(255, 216, 102, 0.05), transparent, rgba(139, 35, 35, 0.05), transparent)",
          }}
          animate={{ 
            rotate: -360,
            opacity: logoFlown ? 0 : 1,
          }}
          transition={{ 
            rotate: { duration: 45, repeat: Infinity, ease: "linear" },
            opacity: { duration: 0.5 }
          }}
        />

        {/* Inner pulsing ring - classified seal */}
        <motion.div
          className="absolute w-48 h-48 lg:w-64 lg:h-64 rounded-full border border-[#8B2323]/15"
          animate={{
            scale: [1, 1.08, 1],
            opacity: logoFlown ? 0 : [0.4, 0.7, 0.4],
          }}
          transition={{
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Tech crosshairs */}
        {!logoFlown && (
          <>
            <motion.div 
              className="absolute w-[2px] h-32 lg:h-48 bg-gradient-to-b from-transparent via-[#8B2323]/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.div 
              className="absolute w-32 lg:w-48 h-[2px] bg-gradient-to-r from-transparent via-[#8B2323]/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </>
        )}

        {/* FLYING LOGO - draws then flies to nav corner */}
        <FlyingLogo onAnimationComplete={handleAnimationComplete} />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: logoFlown ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-12 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#8B2323]/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
