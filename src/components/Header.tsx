"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sun, Moon } from "lucide-react";

const products = [
  {
    name: "LyncZ",
    logo: "/lyncz-logo.svg",
    description: "Trustless CNY-Crypto P2P Exchange",
    href: "https://lync-z.xyz",
    status: null,
  },
  {
    name: "LyncS",
    logo: null,
    description: "Verified Stablecoin",
    href: null,
    status: "Research",
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Check for saved preference or system preference
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved ? saved === "dark" : prefersDark;
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("light", !shouldBeDark);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches);
        document.documentElement.classList.toggle("light", !e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("light", !newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? isDark 
            ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5"
            : "bg-white/90 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-8 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between h-28">
          {/* Logo - 1.5x larger */}
          <Link href="/" className="flex items-center gap-5 group">
            <Image
              src="/logo.png"
              alt="Lync Foundation"
              width={54}
              height={54}
              className="w-14 h-14 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span className={`nav-text transition-colors duration-500 ${
              isDark 
                ? "text-zinc-400 group-hover:text-zinc-200" 
                : "text-zinc-600 group-hover:text-zinc-900"
            }`}>
              Lync Foundation
            </span>
          </Link>

          {/* Navigation - 1.5x larger */}
          <nav className="hidden md:flex items-center gap-12">
            <Link
              href="#about"
              className={`nav-text transition-colors duration-500 ${
                isDark ? "text-zinc-500 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              About
            </Link>
            
            {/* Products Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className={`nav-text transition-colors duration-500 flex items-center gap-2 ${
                  isDark ? "text-zinc-500 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                Products
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full right-0 mt-4 w-72 border rounded-sm overflow-hidden ${
                      isDark 
                        ? "bg-[#0A0A0A] border-white/10" 
                        : "bg-white border-black/10 shadow-lg"
                    }`}
                  >
                    {products.map((product) => (
                      <div key={product.name}>
                        {product.href ? (
                          <Link
                            href={product.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block px-6 py-5 transition-colors duration-300 ${
                              isDark ? "hover:bg-white/5" : "hover:bg-black/5"
                            }`}
                            onClick={() => setIsProductsOpen(false)}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              {product.logo && (
                                <Image
                                  src={product.logo}
                                  alt={product.name}
                                  width={24}
                                  height={24}
                                  className="w-6 h-6"
                                />
                              )}
                              <span className={`text-base ${isDark ? "text-white" : "text-black"}`}>
                                {product.name}
                              </span>
                            </div>
                            <p className={`text-sm ${isDark ? "text-zinc-600" : "text-zinc-500"}`}>
                              {product.description}
                            </p>
                          </Link>
                        ) : (
                          <div className={`block px-6 py-5 opacity-50 cursor-not-allowed`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-base ${isDark ? "text-white" : "text-black"}`}>
                                {product.name}
                              </span>
                              {product.status && (
                                <span className="nav-text text-zinc-500">{product.status}</span>
                              )}
                            </div>
                            <p className={`text-sm ${isDark ? "text-zinc-600" : "text-zinc-500"}`}>
                              {product.description}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="#news"
              className={`nav-text transition-colors duration-500 ${
                isDark ? "text-zinc-500 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              News
            </Link>

            {/* Theme Toggle - 1.5x larger */}
            <button
              onClick={toggleTheme}
              className={`theme-toggle p-3 rounded-full transition-colors duration-300 ${
                isDark 
                  ? "text-zinc-400 hover:text-zinc-200 hover:bg-white/5" 
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-black/5"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
