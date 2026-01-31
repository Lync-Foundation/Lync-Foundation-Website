"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep background */}
      <div className="absolute inset-0 bg-[#0A0A0C]" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      
      {/* Gradient orbs - react to mouse */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(127, 128, 255, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
      />
      
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(200, 109, 215, 0.4) 0%, transparent 70%)",
          filter: "blur(100px)",
          right: "-10%",
          bottom: "10%",
        }}
        animate={{
          x: -mousePosition.x * 0.5,
          y: -mousePosition.y * 0.5,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="caps text-[#7F80FF] mb-8"
          >
            Research Foundation
          </motion.p>

          {/* Main statement */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.1] mb-8"
          >
            We build infrastructure
            <br />
            <span className="gradient-text font-normal">
              that wasn&apos;t possible before.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-zinc-500 max-w-xl leading-relaxed mb-12"
          >
            Cryptographic verification of traditional finance.
            <br />
            Zero-knowledge proofs for real-world payments.
            <br />
            Open source. Non-profit.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-[1px] bg-zinc-700" />
            <span className="caps text-zinc-600">Scroll to explore</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0C] to-transparent" />
    </section>
  );
}
