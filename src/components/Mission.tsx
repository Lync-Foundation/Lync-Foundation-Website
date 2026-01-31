"use client";

import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section id="about" className="relative py-32 lg:py-48">
      <div className="w-full px-8 lg:px-16 xl:px-24">
        {/* Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="refined-caps gradient-text mb-12">About</p>
          
          <p className="text-xl lg:text-2xl xl:text-3xl font-extralight dark:text-zinc-400 text-zinc-600 leading-relaxed">
            We build infrastructure that bridges traditional financial systems 
            with cryptographic verification.
          </p>
          
          <div className="elegant-line mx-auto mt-16 mb-16" />
        </motion.div>
        
        {/* Three columns - full spread */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 mt-20 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
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
            className="text-center"
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
            className="text-center"
          >
            <p className="refined-caps dark:text-zinc-600 text-zinc-500 mb-4">Structure</p>
            <p className="text-sm dark:text-zinc-500 text-zinc-600 leading-relaxed">
              Non-profit. Open source. No value extraction.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
