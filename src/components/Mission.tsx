"use client";

import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section id="about" className="relative py-32 lg:py-48 dark:bg-[#080808] bg-[#f2ebe5]">
      {/* Imperial pattern continuation */}
      <div 
        className="absolute inset-0 dark:opacity-[0.02] opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(139, 69, 69, 0.4) 1px, transparent 1px),
            linear-gradient(rgba(139, 69, 69, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Top border - imperial style */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(139,69,69,0.3)] to-transparent" />

      <div className="relative w-full px-8 lg:px-16 xl:px-24">
        {/* Imperial decree header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="mb-24"
        >
          {/* Decorative element */}
          <div className="flex items-center gap-6 mb-12">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[rgba(139,69,69,0.5)]" />
            <span className="refined-caps dark:text-[#8B4545] text-[#8B4545] tracking-[0.5em]">Classified</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[rgba(139,69,69,0.5)]" />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-extralight tracking-wide leading-relaxed max-w-4xl">
            <span className="gradient-text">Cryptographic trust</span>
            <br />
            <span className="dark:text-zinc-500 text-zinc-600">for traditional finance.</span>
          </h1>
        </motion.div>

        {/* Imperial about section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-3xl mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-[1px] dark:bg-zinc-800 bg-zinc-300" />
            <p className="refined-caps gradient-text tracking-[0.3em]">About the Foundation</p>
          </div>
          
          <p className="text-lg lg:text-xl font-extralight dark:text-zinc-400 text-zinc-600 leading-relaxed">
            We are an elite research institution dedicated to building infrastructure 
            that bridges traditional financial systems with cryptographic verification. 
            Our work remains open source. Our purpose: pure advancement.
          </p>
        </motion.div>
        
        {/* Three pillars - imperial columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 pt-16 border-t dark:border-zinc-900 border-zinc-200">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -top-4 left-0 w-8 h-[2px] bg-gradient-to-r from-[#8B4545] to-transparent" />
            <p className="refined-caps dark:text-[#8B4545] text-[#8B4545] mb-4 tracking-[0.2em]">Doctrine I</p>
            <p className="text-sm dark:text-zinc-500 text-zinc-600 leading-relaxed">
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
            <div className="absolute -top-4 left-0 w-8 h-[2px] bg-gradient-to-r from-[#8B4545] to-transparent" />
            <p className="refined-caps dark:text-[#8B4545] text-[#8B4545] mb-4 tracking-[0.2em]">Doctrine II</p>
            <p className="text-sm dark:text-zinc-500 text-zinc-600 leading-relaxed">
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
            <div className="absolute -top-4 left-0 w-8 h-[2px] bg-gradient-to-r from-[#8B4545] to-transparent" />
            <p className="refined-caps dark:text-[#8B4545] text-[#8B4545] mb-4 tracking-[0.2em]">Doctrine III</p>
            <p className="text-sm dark:text-zinc-500 text-zinc-600 leading-relaxed">
              No value extraction. Pure infrastructure.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
