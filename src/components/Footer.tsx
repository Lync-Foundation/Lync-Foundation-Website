"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-24 border-t border-zinc-900 bg-[#080808]">
      <div className="w-full px-8 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-start text-left"
        >
          {/* Logo - 1.5x larger */}
          <Link href="/" className="mb-8">
            <Image
              src="/logo.png"
              alt="Lync Foundation"
              width={48}
              height={48}
              className="w-12 h-12 opacity-50 hover:opacity-70 transition-opacity duration-500"
            />
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8 mb-8">
            <Link
              href="https://x.com/LyncFoundation"
              target="_blank"
              rel="noopener noreferrer"
              className="refined-caps dark:text-zinc-700 text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-400 transition-colors duration-500"
            >
              X
            </Link>
          </div>

          {/* Contact Email */}
          <Link
            href="mailto:contact@lync-foundation.org"
            className="flex items-center gap-2 mb-12 group"
          >
            <Mail className="w-4 h-4 dark:text-zinc-600 text-zinc-500 group-hover:text-[#6366F1] transition-colors duration-300" />
            <span className="text-sm dark:text-zinc-600 text-zinc-500 group-hover:text-[#6366F1] transition-colors duration-300">
              contact@lync-foundation.org
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-xs dark:text-zinc-800 text-zinc-400">
            © 2026 Lync Foundation
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
