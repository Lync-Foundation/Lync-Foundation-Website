"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background handled by body */}
      
      {/* Subtle gradient glow matching logo colors */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 45%, rgba(99, 102, 241, 0.08) 0%, transparent 60%)"
        }}
      />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 40% 30% at 60% 50%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)"
        }}
      />

      {/* Content - full width */}
      <div className="relative z-10 w-full px-8 lg:px-16 xl:px-24 text-center">
        {/* Elegant line with gradient */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="elegant-line mx-auto mb-16"
        />

        {/* Main statement with gradient accent */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-extralight tracking-wide leading-relaxed mb-8"
        >
          <span className="gradient-text">Cryptographic trust</span>
          <br />
          <span className="dark:text-zinc-500 text-zinc-500">for traditional finance.</span>
        </motion.h1>

        {/* Subtle tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="refined-caps dark:text-zinc-600 text-zinc-500 mb-20"
        >
          Research Foundation
        </motion.p>

        {/* Elegant line with gradient */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
          className="elegant-line mx-auto"
        />
      </div>
    </section>
  );
}
