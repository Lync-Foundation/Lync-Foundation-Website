"use client";

import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section id="about" className="relative py-32 lg:py-48">
      {/* Transparent - relies on ImperialBackground */}
      
      {/* Top accent line with subtle glow */}
      <div className="absolute top-0 left-0 right-0">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8B2323]/40 to-transparent" />
        <div className="h-12 bg-gradient-to-b from-[#8B2323]/5 to-transparent" />
      </div>

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
            <div className="w-12 h-[2px] bg-gradient-to-r from-[#8B2323] to-[#8B2323]/30" />
            <p className="text-xs tracking-[0.3em] uppercase text-[#8B2323]">About</p>
          </div>
          
          <p className="text-lg lg:text-xl font-extralight text-zinc-600 leading-relaxed">
            We build infrastructure that bridges traditional financial systems 
            with cryptographic verification. Our work is open source. 
            Our purpose: pure advancement.
          </p>
        </motion.div>
        
        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 pt-16 border-t border-[#8B2323]/15">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute -top-4 left-0 w-8 h-[2px] bg-gradient-to-r from-[#8B2323] to-[#8B2323]/20" />
            <p className="text-xs tracking-[0.2em] uppercase text-[#8B2323] mb-4">Principle</p>
            <p className="text-sm text-zinc-500 leading-relaxed font-light group-hover:text-zinc-700 transition-colors duration-500">
              Trust through mathematics, not intermediaries.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -top-4 left-0 w-8 h-[2px] bg-gradient-to-r from-[#8B2323] to-[#8B2323]/20" />
            <p className="text-xs tracking-[0.2em] uppercase text-[#8B2323] mb-4">Method</p>
            <p className="text-sm text-zinc-500 leading-relaxed font-light group-hover:text-zinc-700 transition-colors duration-500">
              Zero-knowledge proofs for real-world payments.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute -top-4 left-0 w-8 h-[2px] bg-gradient-to-r from-[#8B2323] to-[#8B2323]/20" />
            <p className="text-xs tracking-[0.2em] uppercase text-[#8B2323] mb-4">Structure</p>
            <p className="text-sm text-zinc-500 leading-relaxed font-light group-hover:text-zinc-700 transition-colors duration-500">
              No value extraction. Pure infrastructure.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
