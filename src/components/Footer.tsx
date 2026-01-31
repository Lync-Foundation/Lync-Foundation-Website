"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-24 border-t dark:border-zinc-900/50 border-zinc-300/50 dark:bg-[#060606] bg-[#f5f0e6]">
      {/* Subtle lattice pattern */}
      <div 
        className="absolute inset-0 dark:opacity-[0.015] opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(139, 35, 35, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(139, 35, 35, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative w-full px-8 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-start"
        >
          {/* Logo */}
          <Link href="/" className="mb-12 group">
            <Image
              src="/logo.png"
              alt="Lync Foundation"
              width={48}
              height={48}
              className="w-12 h-12 opacity-50 group-hover:opacity-70 transition-opacity duration-500"
            />
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8 mb-8">
            <Link
              href="https://x.com/LyncFoundation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase dark:text-zinc-700 text-zinc-500 hover:text-[#6366F1] dark:hover:text-[#6366F1] transition-colors duration-500"
            >
              X
            </Link>
          </div>

          {/* Contact */}
          <Link
            href="mailto:contact@lync-foundation.org"
            className="flex items-center gap-3 mb-16 group"
          >
            <Mail className="w-4 h-4 dark:text-zinc-700 text-zinc-500 group-hover:text-[#6366F1] transition-colors duration-300" />
            <span className="text-sm dark:text-zinc-600 text-zinc-500 group-hover:text-[#6366F1] transition-colors duration-300">
              contact@lync-foundation.org
            </span>
          </Link>

          {/* Copyright */}
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-[#8B2323] to-transparent" />
            <p className="text-xs dark:text-zinc-800 text-zinc-400 tracking-wide">
              © 2026 Lync Foundation
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
