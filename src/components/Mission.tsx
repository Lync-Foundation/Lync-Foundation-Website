"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Mission() {
  return (
    <>
      {/* Section 1: Hero Declaration - Animation plays here */}
      <section id="about" className="relative min-h-screen flex items-center">
        <div className="relative w-full px-8 lg:px-16 xl:px-24 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="max-w-5xl"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-wide leading-tight mb-8">
              <span className="gradient-text">Lyncing the World</span>
              <br />
              <span className="text-zinc-600">to China&apos;s Currency</span>
            </h1>
            
            <p className="text-lg lg:text-xl font-light text-zinc-500 leading-relaxed max-w-2xl">
              We build trustless infrastructure to internationalize CNY — making the People&apos;s Currency accessible to everyone, everywhere.
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#8B2323]/40 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2: Why CNY */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute top-0 left-0 right-0">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8B2323]/40 to-transparent" />
          <div className="h-12 bg-gradient-to-b from-[#8B2323]/5 to-transparent" />
        </div>
        
        <div className="relative w-full px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#8B2323] to-[#8B2323]/30" />
              <p className="text-xs tracking-[0.3em] uppercase text-[#8B2323]">Why CNY</p>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extralight text-zinc-700">
              The Currency of 1.4 Billion
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-[#8B2323] mb-3">人民币</p>
              <h3 className="text-lg font-light text-zinc-700 mb-2">The People&apos;s Currency</h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-light">
                RMB represents the economic power of China&apos;s citizens. Within China, it has unmatched buying power.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-[#8B2323] mb-3">Strategic</p>
              <h3 className="text-lg font-light text-zinc-700 mb-2">A Growing Force</h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-light">
                As China&apos;s global influence expands, CNY becomes increasingly valuable. Early access is a strategic advantage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-[#8B2323] mb-3">Opportunity</p>
              <h3 className="text-lg font-light text-zinc-700 mb-2">Currently Inaccessible</h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-light">
                Despite its importance, CNY remains difficult to obtain globally. We&apos;re changing that.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Approach */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B2323]/20 to-transparent" />
        
        <div className="relative w-full px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#8B2323] to-[#8B2323]/30" />
              <p className="text-xs tracking-[0.3em] uppercase text-[#8B2323]">Our Approach</p>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extralight text-zinc-700">
              Trustless by Design
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="w-10 h-10 mb-4 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-[#8B2323]/30 flex items-center justify-center">
                  <span className="text-[#8B2323] text-sm">1</span>
                </div>
              </div>
              <h3 className="text-lg font-light text-zinc-700 mb-2">Cryptographic Guarantees</h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-light">
                Every transaction is mathematically verifiable. No trust required — only proofs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-10 h-10 mb-4 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-[#8B2323]/30 flex items-center justify-center">
                  <span className="text-[#8B2323] text-sm">2</span>
                </div>
              </div>
              <h3 className="text-lg font-light text-zinc-700 mb-2">Complete Transparency</h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-light">
                All systems are open source. All reserves are provable. Anyone can verify, anytime.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="w-10 h-10 mb-4 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-[#8B2323]/30 flex items-center justify-center">
                  <span className="text-[#8B2323] text-sm">3</span>
                </div>
              </div>
              <h3 className="text-lg font-light text-zinc-700 mb-2">Research-Driven</h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-light">
                100% of foundation revenue funds R&D. Security is our only priority.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Products */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B2323]/20 to-transparent" />
        
        <div className="relative w-full px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#8B2323] to-[#8B2323]/30" />
              <p className="text-xs tracking-[0.3em] uppercase text-[#8B2323]">Infrastructure</p>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extralight text-zinc-700">
              Our Products
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Link 
                href="https://lync-z.xyz" 
                target="_blank"
                rel="noopener noreferrer"
                className="block p-8 border border-[#8B2323]/15 rounded-sm hover:border-[#8B2323]/30 hover:bg-[#8B2323]/5 transition-all duration-500 group"
              >
                <Image
                  src="/lyncz-logo.svg"
                  alt="LyncZ"
                  width={100}
                  height={40}
                  className="h-8 w-auto mb-4"
                />
                <p className="text-sm text-zinc-500 leading-relaxed font-light mb-4">
                  Trustless CNY-Crypto P2P Exchange. Peer-to-peer, no custody, cryptographic escrow.
                </p>
                <span className="text-xs tracking-[0.2em] uppercase text-[#8B2323] group-hover:translate-x-1 transition-transform duration-300 inline-block">
                  Launch App →
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="p-8 border border-[#8B2323]/10 rounded-sm opacity-70">
                <p className="text-xl italic font-light text-zinc-600 tracking-wide mb-1" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  LyncS
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#8B2323]/70 mb-4">Research</p>
                <p className="text-sm text-zinc-500 leading-relaxed font-light">
                  Trustless CNY Stablecoin. 1:1 backed, fully transparent, on-chain proof of reserves.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Foundation + CTA */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B2323]/20 to-transparent" />
        
        <div className="relative w-full px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#8B2323] mb-6">Non-Profit Foundation</p>
            
            <h2 className="text-2xl lg:text-4xl font-extralight text-zinc-700 mb-6">
              The Future is CNY
            </h2>
            
            <p className="text-base text-zinc-500 font-light mb-10 leading-relaxed">
              Lync Foundation is a non-profit organization. All revenue funds research and development for trustless CNY infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://lync-z.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-[#8B2323] text-white text-sm tracking-[0.15em] uppercase hover:bg-[#6B1A1A] transition-colors duration-300"
              >
                Start with LyncZ
              </Link>
              <Link
                href="mailto:contact@lync-foundation.org"
                className="px-8 py-3 border border-[#8B2323]/30 text-[#8B2323] text-sm tracking-[0.15em] uppercase hover:bg-[#8B2323]/5 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
