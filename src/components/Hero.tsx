"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - adapts to theme */}
      <div className="absolute inset-0 bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#0d0808] dark:to-[#080808] from-[#f5f0e6] via-[#f3ece2] to-[#f5f0e6]" />
      
      {/* Subtle lattice pattern - inspired by imperial screens */}
      <div 
        className="absolute inset-0 dark:opacity-[0.025] opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(139, 35, 35, 0.4) 1px, transparent 1px),
            linear-gradient(rgba(139, 35, 35, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Deep vermillion glow - center */}
      <div 
        className="absolute inset-0 dark:opacity-20 opacity-10"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139, 35, 35, 0.3) 0%, transparent 70%)"
        }}
      />
      
      {/* Bronze accent - subtle */}
      <div 
        className="absolute inset-0 dark:opacity-8 opacity-5"
        style={{
          background: "radial-gradient(ellipse 30% 25% at 30% 40%, rgba(184, 134, 11, 0.2) 0%, transparent 50%)"
        }}
      />

      {/* Animated Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Outer rotating ring - very subtle */}
        <motion.div
          className="absolute w-60 h-60 lg:w-80 lg:h-80 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(139, 35, 35, 0.08), transparent, rgba(99, 102, 241, 0.08), transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulsing glow - logo gradient colors */}
        <motion.div
          className="absolute w-48 h-48 lg:w-64 lg:h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.08) 50%, transparent 70%)",
          }}
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Logo with gentle float */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/lync-icon.svg"
              alt="Lync Foundation"
              width={160}
              height={160}
              className="w-36 h-36 lg:w-44 lg:h-44 drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-16"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b dark:from-transparent dark:via-zinc-700 dark:to-transparent from-transparent via-zinc-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
