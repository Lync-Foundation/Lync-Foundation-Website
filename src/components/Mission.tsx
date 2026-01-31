"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Unlock, Code } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Trustless",
    description:
      "Cryptographic proofs replace trusted intermediaries. The code is the arbiter.",
  },
  {
    icon: Eye,
    title: "Transparent",
    description:
      "Open source by default. Every transaction is verifiable on-chain.",
  },
  {
    icon: Unlock,
    title: "Permissionless",
    description:
      "No KYC, no gatekeepers. Trade 24/7 without restrictions.",
  },
  {
    icon: Code,
    title: "Open Source",
    description:
      "All our code is public. Audit it, fork it, build on it.",
  },
];

export default function Mission() {
  return (
    <section id="mission" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Traditional finance and decentralized finance don&apos;t have to be 
            separate worlds. Using cryptographic proofs, we can verify real-world 
            financial transactions on-chain — eliminating the need for trusted 
            intermediaries.
          </p>
        </motion.div>

        {/* Mission statement card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-8 lg:p-12 mb-16 border border-slate-200 dark:border-slate-700"
        >
          <blockquote className="text-xl lg:text-2xl font-medium text-slate-800 dark:text-slate-100 text-center italic">
            &ldquo;Lync Foundation builds trustless infrastructure that makes 
            traditional finance verifiable on-chain. We believe financial systems 
            should be transparent, permissionless, and cryptographically secure.&rdquo;
          </blockquote>
        </motion.div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 flex items-center justify-center mb-4">
                <principle.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {principle.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Why non-profit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Why Non-Profit?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We&apos;re not here to extract value — we&apos;re here to build 
            infrastructure. All revenue flows back into research and development. 
            Our incentives are aligned with our users, not shareholders.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
