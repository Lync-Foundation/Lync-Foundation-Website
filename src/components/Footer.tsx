"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-24 border-t dark:border-zinc-900 border-zinc-200 dark:bg-[#060606] bg-[#f0e8e0]">
      {/* Imperial pattern */}
      <div 
        className="absolute inset-0 dark:opacity-[0.02] opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(139, 69, 69, 0.4) 1px, transparent 1px),
            linear-gradient(rgba(139, 69, 69, 0.4) 1px, transparent 1px)
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
          className="flex flex-col items-start text-left"
        >
          {/* Imperial seal */}
          <Link href="/" className="mb-6 group">
            <Image
              src="/logo.png"
              alt="Lync Foundation"
              width={48}
              height={48}
              className="w-12 h-12 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
            />
          </Link>

          {/* Imperial designation */}
          <p className="refined-caps dark:text-[#8B4545] text-[#8B4545] tracking-[0.3em] mb-8">
            Imperial Research Foundation
          </p>

          {/* Links */}
          <div className="flex items-center gap-8 mb-8">
            <Link
              href="https://x.com/LyncFoundation"
              target="_blank"
              rel="noopener noreferrer"
              className="refined-caps dark:text-zinc-700 text-zinc-500 hover:text-[#8B4545] dark:hover:text-[#8B4545] transition-colors duration-500"
            >
              X / Twitter
            </Link>
          </div>

          {/* Contact - imperial style */}
          <Link
            href="mailto:contact@lync-foundation.org"
            className="flex items-center gap-3 mb-12 group"
          >
            <Mail className="w-4 h-4 dark:text-zinc-700 text-zinc-500 group-hover:text-[#8B4545] transition-colors duration-300" />
            <span className="text-sm dark:text-zinc-600 text-zinc-500 group-hover:text-[#8B4545] transition-colors duration-300">
              contact@lync-foundation.org
            </span>
          </Link>

          {/* Imperial copyright */}
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-8 dark:bg-zinc-800 bg-zinc-300" />
            <p className="text-xs dark:text-zinc-800 text-zinc-400 tracking-wider">
              © MMXXVI Lync Foundation. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
