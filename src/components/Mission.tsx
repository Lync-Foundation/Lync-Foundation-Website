"use client";

import { motion } from "framer-motion";

const doctrines = [
  {
    number: "01",
    title: "Trust Through Cryptography",
    text: "Financial systems should not require faith in intermediaries. Mathematical proof is the only arbiter.",
  },
  {
    number: "02", 
    title: "Verification Over Custody",
    text: "We verify payments on-chain. We never hold your funds. The smart contract is neutral territory.",
  },
  {
    number: "03",
    title: "Open Infrastructure",
    text: "All code is public. All transactions are verifiable. We build in the open because secrecy breeds corruption.",
  },
];

export default function Mission() {
  return (
    <section id="doctrine" className="relative py-32 lg:py-48">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <p className="caps text-[#7F80FF] mb-4">Doctrine</p>
          <h2 className="text-3xl lg:text-5xl font-light text-white max-w-2xl leading-tight">
            The principles that
            <br />
            <span className="gradient-text-subtle">govern our work.</span>
          </h2>
        </motion.div>

        {/* Doctrine list */}
        <div className="space-y-0">
          {doctrines.map((doctrine, index) => (
            <motion.div
              key={doctrine.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group border-t border-zinc-800 py-12 lg:py-16"
            >
              <div className="grid grid-cols-12 gap-4 lg:gap-8 items-start">
                {/* Number */}
                <div className="col-span-2 lg:col-span-1">
                  <span className="text-sm font-mono text-zinc-600 group-hover:text-[#7F80FF] transition-colors duration-500">
                    {doctrine.number}
                  </span>
                </div>
                
                {/* Title */}
                <div className="col-span-10 lg:col-span-4">
                  <h3 className="text-xl lg:text-2xl font-normal text-white group-hover:text-[#C86DD7] transition-colors duration-500">
                    {doctrine.title}
                  </h3>
                </div>
                
                {/* Text */}
                <div className="col-span-12 lg:col-span-7 lg:pl-8">
                  <p className="text-zinc-500 leading-relaxed">
                    {doctrine.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Bottom border */}
          <div className="border-t border-zinc-800" />
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="mt-24 lg:mt-32"
        >
          <blockquote className="text-2xl lg:text-4xl font-light text-white leading-relaxed max-w-3xl">
            &ldquo;We don&apos;t build products.
            <br />
            <span className="gradient-text">We build proofs.</span>&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
