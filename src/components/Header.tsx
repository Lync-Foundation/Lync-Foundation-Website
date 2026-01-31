"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#mission", label: "Mission" },
  { href: "#products", label: "Products" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Lync Foundation"
              width={40}
              height={40}
              className="w-8 h-8 lg:w-10 lg:h-10"
            />
            <span className={`font-semibold text-lg ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
              Lync Foundation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 text-sm font-medium ${
                  isScrolled 
                    ? 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://github.com/Lync-Foundation"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium transition-colors duration-200 ${
                isScrolled 
                  ? 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              GitHub
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${isScrolled ? 'text-slate-600 dark:text-slate-300' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://github.com/Lync-Foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                GitHub
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
