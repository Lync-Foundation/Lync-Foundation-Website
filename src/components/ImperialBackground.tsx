"use client";

import { motion } from "framer-motion";

export default function ImperialBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base gradient - warm imperial cream with subtle depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% 0%, rgba(248, 246, 242, 1) 0%, transparent 60%),
            radial-gradient(ellipse 80% 40% at 50% 100%, rgba(240, 236, 228, 1) 0%, transparent 50%),
            linear-gradient(180deg, #f8f6f2 0%, #f5f2ec 50%, #f0ece4 100%)
          `,
        }}
      />

      {/* Tech grid pattern - high-tech classified feel */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 35, 35, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 35, 35, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Finer tech grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 35, 35, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 35, 35, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '15px 15px',
        }}
      />

      {/* Hexagonal pattern - secret research facility */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 L80 30 L80 70 L50 90 L20 70 L20 30 Z' fill='none' stroke='%238B2323' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Subtle vermillion accent glow - top center */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px]"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(139, 35, 35, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Tech accent glow - autumn red/gold logo colors */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(255, 180, 40, 0.08) 0%, rgba(139, 35, 35, 0.04) 40%, transparent 70%)",
        }}
      />

      {/* Corner accents - classified document feel */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-8 left-0 w-16 h-[1px] bg-gradient-to-r from-[#8B2323]/30 to-transparent" />
        <div className="absolute top-0 left-8 w-[1px] h-16 bg-gradient-to-b from-[#8B2323]/30 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-8 right-0 w-16 h-[1px] bg-gradient-to-l from-[#8B2323]/30 to-transparent" />
        <div className="absolute top-0 right-8 w-[1px] h-16 bg-gradient-to-b from-[#8B2323]/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute bottom-8 left-0 w-16 h-[1px] bg-gradient-to-r from-[#8B2323]/20 to-transparent" />
        <div className="absolute bottom-0 left-8 w-[1px] h-16 bg-gradient-to-t from-[#8B2323]/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-8 right-0 w-16 h-[1px] bg-gradient-to-l from-[#8B2323]/20 to-transparent" />
        <div className="absolute bottom-0 right-8 w-[1px] h-16 bg-gradient-to-t from-[#8B2323]/20 to-transparent" />
      </div>

      {/* Subtle vignette - adds depth without darkness */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(139, 35, 35, 0.03) 100%)",
        }}
      />

      {/* Scan line effect - high-tech classified */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 35, 35, 0.1) 2px, rgba(139, 35, 35, 0.1) 4px)",
        }}
      />

      {/* Moving scan line - subtle tech effect */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B2323]/10 to-transparent"
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
