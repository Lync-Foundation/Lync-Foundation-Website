"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center text-center"
        >
          {/* Logo */}
          <Link href="/" className="mb-8">
            <Image
              src="/logo.png"
              alt="Lync Foundation"
              width={32}
              height={32}
              className="w-8 h-8 opacity-40 hover:opacity-60 transition-opacity duration-500"
            />
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8 mb-12">
            <Link
              href="https://github.com/Lync-Foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="refined-caps text-zinc-700 hover:text-zinc-400 transition-colors duration-500"
            >
              GitHub
            </Link>
            <Link
              href="https://x.com/LyncFoundation"
              target="_blank"
              rel="noopener noreferrer"
              className="refined-caps text-zinc-700 hover:text-zinc-400 transition-colors duration-500"
            >
              X
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-800">
            © 2026 Lync Foundation
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
