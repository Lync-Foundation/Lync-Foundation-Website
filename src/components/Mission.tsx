"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Unlock, Code, Layers, Zap } from "lucide-react";

const researchAreas = [
  {
    icon: Shield,
    title: "Zero-Knowledge Proofs",
    description:
      "Cryptographic protocols that verify information without revealing the underlying data.",
  },
  {
    icon: Layers,
    title: "Payment Verification",
    description:
      "On-chain verification of traditional payment systems like Alipay, WeChat, and banking rails.",
  },
  {
    icon: Zap,
    title: "Trustless Infrastructure",
    description:
      "Smart contract systems that eliminate the need for trusted intermediaries.",
  },
];

const principles = [
  {
    icon: Eye,
    title: "Transparent",
    description: "All code is open source. All transactions are verifiable.",
  },
  {
    icon: Unlock,
    title: "Permissionless",
    description: "No gatekeepers. No KYC. Accessible to everyone.",
  },
  {
    icon: Code,
    title: "Open Source",
    description: "Public code. Auditable. Forkable. Community-driven.",
  },
];

export default function Mission() {
  return (
    <section id="mission" className="relative py-24 lg:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
            Our Mission
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Making Finance Trustless
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We believe that trust in financial systems should not depend on 
            intermediaries. Through cryptographic proofs, we can verify real-world 
            transactions on-chain — creating a bridge between traditional finance 
            and decentralized systems.
          </p>
        </motion.div>

        {/* Research areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <area.icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {area.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800 mb-20" />

        {/* Why non-profit section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
              Why Non-Profit
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Building Infrastructure, Not Extracting Value
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Lync Foundation operates as a non-profit initiative. All revenue from 
              our products flows back into research and development. We are not 
              beholden to shareholders or VCs — our incentives are aligned purely 
              with the users and the technology.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              This structure allows us to make decisions based on what&apos;s best for 
              the ecosystem, not what maximizes short-term profits.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {principles.map((principle, index) => (
              <div key={principle.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <principle.icon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {principle.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
