"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-24 border-t border-[#8B2323]/15 overflow-hidden">
      {/* Top accent glow */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#8B2323]/3 to-transparent" />


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
              src="/lync-icon-new.svg"
              alt="Lync Foundation"
              width={48}
              height={48}
              className="w-12 h-12 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8 mb-16">
            <Link
              href="https://x.com/LyncFoundation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase text-zinc-500 hover:text-[#8B2323] transition-colors duration-500"
            >
              X
            </Link>
          </div>


          {/* Copyright */}
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-8 bg-gradient-to-r from-[#8B2323] to-transparent" />
            <p className="text-xs text-zinc-400 tracking-wide">
              © 2026 Lync Foundation
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
