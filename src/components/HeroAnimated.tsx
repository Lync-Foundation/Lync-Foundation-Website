"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

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
      "rgba(99, 102, 241, alpha)",   // Indigo
      "rgba(168, 85, 247, alpha)",   // Purple  
      "rgba(125, 211, 252, alpha)",  // Sky blue
      "rgba(139, 35, 35, alpha)",    // Vermillion
    ];
    
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.1, // Slight upward drift
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 400 + 200,
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

    // Initialize particles
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    particlesRef.current = Array.from({ length: particleCount }, () => 
      createParticle(canvas.width, canvas.height)
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Fade in and out based on life
        const lifeRatio = p.life / p.maxLife;
        const fadeAlpha = lifeRatio < 0.1 
          ? lifeRatio * 10 
          : lifeRatio > 0.9 
            ? (1 - lifeRatio) * 10 
            : 1;

        const currentAlpha = p.alpha * fadeAlpha;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("alpha", String(currentAlpha));
        ctx.fill();

        // Add subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("alpha", String(currentAlpha * 0.1));
        ctx.fill();

        // Reset particle if dead or out of bounds
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

export default function HeroAnimated() {
  const canvasRef = useParticleCanvas();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b dark:from-[#050505] dark:via-[#0a0808] dark:to-[#080808] from-[#f5f0e6] via-[#f0ebe3] to-[#ebe5dc]" />

      {/* Animated lattice pattern - CSS only */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 dark:opacity-[0.04] opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(139, 35, 35, 0.5) 1px, transparent 1px),
              linear-gradient(rgba(139, 35, 35, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'latticeShift 30s linear infinite',
          }}
        />
      </div>

      {/* Radial glows - animated */}
      <motion.div 
        className="absolute inset-0 dark:opacity-30 opacity-15"
        animate={{
          background: [
            "radial-gradient(ellipse 40% 35% at 50% 50%, rgba(139, 35, 35, 0.25) 0%, transparent 70%)",
            "radial-gradient(ellipse 45% 40% at 48% 52%, rgba(139, 35, 35, 0.3) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 35% at 52% 48%, rgba(139, 35, 35, 0.25) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 35% at 50% 50%, rgba(139, 35, 35, 0.25) 0%, transparent 70%)",
          ]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo gradient glow - breathing */}
      <motion.div 
        className="absolute inset-0 dark:opacity-20 opacity-10"
        animate={{
          background: [
            "radial-gradient(ellipse 30% 25% at 50% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)",
            "radial-gradient(ellipse 35% 30% at 50% 50%, rgba(168, 85, 247, 0.25) 0%, transparent 60%)",
            "radial-gradient(ellipse 30% 25% at 50% 50%, rgba(125, 211, 252, 0.2) 0%, transparent 60%)",
            "radial-gradient(ellipse 30% 25% at 50% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particle canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none dark:opacity-60 opacity-40"
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)"
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Rotating outer ring */}
        <motion.div
          className="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(139, 35, 35, 0.06), transparent, rgba(99, 102, 241, 0.06), transparent, rgba(168, 85, 247, 0.06), transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Second rotating ring - opposite direction */}
        <motion.div
          className="absolute w-56 h-56 lg:w-72 lg:h-72 rounded-full"
          style={{
            background: "conic-gradient(from 180deg, transparent, rgba(125, 211, 252, 0.04), transparent, rgba(139, 35, 35, 0.04), transparent)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />

        {/* Pulsing glow */}
        <motion.div
          className="absolute w-48 h-48 lg:w-64 lg:h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 40%, transparent 70%)",
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 1, 0, -1, 0]
            }}
            transition={{ 
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Image
              src="/logo.png"
              alt="Lync Foundation"
              width={200}
              height={200}
              className="w-44 h-44 lg:w-56 lg:h-56 drop-shadow-[0_0_60px_rgba(99,102,241,0.3)]"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-12 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />
        </motion.div>
      </motion.div>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes latticeShift {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }
      `}</style>
    </section>
  );
}
