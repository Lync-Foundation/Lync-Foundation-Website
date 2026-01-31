"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Forbidden City inspired background - deep, serious, organized */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0808] to-[#080808]" />
      
      {/* Subtle geometric pattern overlay - inspired by imperial lattice */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(139, 69, 69, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(139, 69, 69, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Deep red accent glow - forbidden, serious */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse 50% 30% at 50% 60%, rgba(80, 20, 20, 0.4) 0%, transparent 70%)"
        }}
      />
      
      {/* Subtle gold/bronze accent */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: "radial-gradient(ellipse 30% 20% at 30% 40%, rgba(139, 115, 85, 0.3) 0%, transparent 50%)"
        }}
      />

      {/* Content - mysterious, minimal */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Logo only - large, centered, mysterious */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Image
            src="/logo.png"
            alt="Lync Foundation"
            width={120}
            height={120}
            className="w-28 h-28 lg:w-36 lg:h-36 opacity-70"
          />
        </motion.div>

        {/* Subtle scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-transparent via-zinc-600 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
