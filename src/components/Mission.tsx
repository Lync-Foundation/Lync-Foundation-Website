"use client";

import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section id="about" className="relative py-32 lg:py-48 bg-[#080808]">
      {/* Subtle pattern continuation */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(139, 69, 69, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(139, 69, 69, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative w-full px-8 lg:px-16 xl:px-24">
        {/* Reveal statement - first thing users see on scroll */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="mb-32"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-extralight tracking-wide leading-relaxed max-w-4xl">
            <span className="gradient-text">Cryptographic trust</span>
            <br />
            <span className="dark:text-zinc-500 text-zinc-500">for traditional finance.</span>
          </h1>
        </motion.div>

        {/* About section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <p className="refined-caps gradient-text mb-8">About</p>
          
          <p className="text-lg lg:text-xl font-extralight dark:text-zinc-500 text-zinc-600 leading-relaxed mb-16">
            We build infrastructure that bridges traditional financial systems 
            with cryptographic verification. Non-profit. Open source.
          </p>
        </motion.div>
        
        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="refined-caps dark:text-zinc-600 text-zinc-500 mb-4">Principle</p>
            <p className="text-sm dark:text-zinc-500 text-zinc-600 leading-relaxed">
              Trust through mathematics, not intermediaries.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="refined-caps dark:text-zinc-600 text-zinc-500 mb-4">Method</p>
            <p className="text-sm dark:text-zinc-500 text-zinc-600 leading-relaxed">
              Zero-knowledge proofs for real-world payments.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="refined-caps dark:text-zinc-600 text-zinc-500 mb-4">Structure</p>
            <p className="text-sm dark:text-zinc-500 text-zinc-600 leading-relaxed">
              No value extraction. Pure infrastructure.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
