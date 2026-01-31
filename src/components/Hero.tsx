"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep black background */}
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* Subtle radial gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212, 175, 55, 0.03) 0%, transparent 70%)"
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Elegant line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="elegant-line mx-auto mb-16"
        />

        {/* Main statement */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-wide text-white leading-relaxed mb-8"
        >
          Cryptographic trust
          <br />
          <span className="text-zinc-500">for traditional finance.</span>
        </motion.h1>

        {/* Subtle tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="refined-caps text-zinc-600 mb-20"
        >
          Research Foundation
        </motion.p>

        {/* Elegant line */}
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
