"use client";

import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section id="about" className="relative py-32 lg:py-48 bg-[#f5f0e6]">
      {/* Subtle lattice pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(139, 35, 35, 0.4) 1px, transparent 1px),
            linear-gradient(rgba(139, 35, 35, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(139,35,35,0.4)] to-transparent" />

      <div className="relative w-full px-8 lg:px-16 xl:px-24">
        {/* Main statement */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="mb-24"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-extralight tracking-wide leading-relaxed max-w-4xl">
            <span className="gradient-text">Cryptographic trust</span>
            <br />
            <span className="text-zinc-600">for traditional finance.</span>
          </h1>
        </motion.div>

        {/* About section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-3xl mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-gradient-to-r from-[#8B2323] to-transparent" />
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500">About</p>
          </div>
          
          <p className="text-lg lg:text-xl font-extralight text-zinc-600 leading-relaxed">
            We build infrastructure that bridges traditional financial systems 
            with cryptographic verification. Our work is open source. 
            Our purpose: pure advancement.
          </p>
        </motion.div>
        
        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 pt-16 border-t border-zinc-300/50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -top-4 left-0 w-6 h-[1px] bg-[#8B2323]" />
            <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-4">Principle</p>
            <p className="text-sm text-zinc-600 leading-relaxed font-light">
              Trust through mathematics, not intermediaries.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-4 left-0 w-6 h-[1px] bg-[#8B2323]" />
            <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-4">Method</p>
            <p className="text-sm text-zinc-600 leading-relaxed font-light">
              Zero-knowledge proofs for real-world payments.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -top-4 left-0 w-6 h-[1px] bg-[#8B2323]" />
            <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-4">Structure</p>
            <p className="text-sm text-zinc-600 leading-relaxed font-light">
              No value extraction. Pure infrastructure.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
