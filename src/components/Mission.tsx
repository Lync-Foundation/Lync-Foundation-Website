"use client";

import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section id="about" className="relative py-32 lg:py-48">
      <div className="max-w-4xl mx-auto px-8 lg:px-12">
        {/* Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <p className="refined-caps text-gold mb-12">About</p>
          
          <p className="text-xl lg:text-2xl font-extralight text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            We build infrastructure that bridges traditional financial systems 
            with cryptographic verification.
          </p>
          
          <div className="elegant-line mx-auto mt-16 mb-16" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <p className="refined-caps text-zinc-600 mb-4">Principle</p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Trust through mathematics, not intermediaries.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="refined-caps text-zinc-600 mb-4">Method</p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Zero-knowledge proofs for real-world payments.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="refined-caps text-zinc-600 mb-4">Structure</p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Non-profit. Open source. No value extraction.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
