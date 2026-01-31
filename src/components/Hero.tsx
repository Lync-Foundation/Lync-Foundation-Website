"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imperial background - adapts to theme */}
      <div className="absolute inset-0 bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#0d0808] dark:to-[#080808] from-[#f8f6f4] via-[#f5f0ec] to-[#f2ebe5]" />
      
      {/* Imperial lattice pattern - ancient geometric */}
      <div 
        className="absolute inset-0 dark:opacity-[0.03] opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(139, 69, 69, 0.4) 1px, transparent 1px),
            linear-gradient(rgba(139, 69, 69, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Imperial red accent glow */}
      <div 
        className="absolute inset-0 dark:opacity-25 opacity-15"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 55%, rgba(120, 40, 40, 0.4) 0%, transparent 70%)"
        }}
      />
      
      {/* Ancient gold shimmer */}
      <div 
        className="absolute inset-0 dark:opacity-10 opacity-8"
        style={{
          background: "radial-gradient(ellipse 40% 25% at 35% 45%, rgba(180, 140, 80, 0.2) 0%, transparent 50%)"
        }}
      />

      {/* Animated Logo - The Imperial Seal */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute w-56 h-56 lg:w-72 lg:h-72 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(139, 69, 69, 0.1), transparent, rgba(180, 140, 80, 0.1), transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulsing glow */}
        <motion.div
          className="absolute w-44 h-44 lg:w-56 lg:h-56 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Logo with subtle float animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.div
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/logo.png"
              alt="Lync Foundation"
              width={140}
              height={140}
              className="w-32 h-32 lg:w-40 lg:h-40 drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Imperial seal text - appears after logo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 refined-caps dark:text-zinc-700 text-zinc-500 tracking-[0.4em]"
        >
          Est. MMXXIV
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-12"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b dark:from-transparent dark:via-zinc-700 dark:to-transparent from-transparent via-zinc-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
