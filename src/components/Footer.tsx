"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-24 lg:py-32 bg-[#0A0A0C] border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-8">
              <Image
                src="/logo.png"
                alt="Lync Foundation"
                width={40}
                height={40}
                className="w-10 h-10 opacity-60"
              />
            </Link>
            
            <p className="text-zinc-500 max-w-sm leading-relaxed mb-8">
              A research initiative building cryptographic infrastructure 
              for trustless verification of traditional financial systems.
            </p>

            <p className="text-sm text-zinc-700">
              © 2026 Lync Foundation
            </p>
          </motion.div>

          {/* Right column - links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-2 gap-8"
          >
            <div>
              <p className="caps text-zinc-600 mb-6">Navigation</p>
              <ul className="space-y-4">
                <li>
                  <Link href="#doctrine" className="text-zinc-400 hover:text-white transition-colors">
                    Doctrine
                  </Link>
                </li>
                <li>
                  <Link href="#research" className="text-zinc-400 hover:text-white transition-colors">
                    Research
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <p className="caps text-zinc-600 mb-6">External</p>
              <ul className="space-y-4">
                <li>
                  <Link 
                    href="https://github.com/Lync-Foundation" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://x.com/LyncFoundation" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    X / Twitter
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://lync-z.xyz" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    LyncZ App
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
