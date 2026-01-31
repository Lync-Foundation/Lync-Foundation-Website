"use client";

import Image from "next/image";
import Link from "next/link";
import { Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Lync Foundation"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="font-semibold text-lg text-white">
                Lync Foundation
              </span>
            </Link>
            <p className="text-slate-400 max-w-md mb-6">
              A non-profit research initiative developing open-source infrastructure 
              for trustless verification of traditional financial transactions.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              <Link
                href="https://x.com/LyncFoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/Lync-Foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links column */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#mission"
                  className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Mission
                </Link>
              </li>
              <li>
                <Link
                  href="#products"
                  className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Lync-Foundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-500">
            © 2026 Lync Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
