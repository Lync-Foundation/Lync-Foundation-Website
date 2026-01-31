"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#doctrine", label: "Doctrine" },
  { href: "#research", label: "Research" },
  { href: "https://github.com/Lync-Foundation", label: "GitHub", external: true },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0A0A0C]/80 backdrop-blur-xl border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Lync Foundation"
              width={32}
              height={32}
              className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
              Lync Foundation
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-zinc-500 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu - simplified */}
          <div className="md:hidden">
            <Link
              href="#research"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Menu
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
