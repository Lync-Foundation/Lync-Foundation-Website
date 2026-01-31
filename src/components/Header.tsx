"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const products = [
  {
    name: "LyncZ",
    description: "P2P CNY-Crypto Exchange",
    href: "https://lync-z.xyz",
    status: "Live",
  },
  {
    name: "LyncS",
    description: "Verified Stablecoin",
    href: null,
    status: "Research",
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
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

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <Image
              src="/logo.png"
              alt="Lync Foundation"
              width={36}
              height={36}
              className="w-9 h-9 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span className="refined-caps text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500">
              Lync Foundation
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <Link
              href="#about"
              className="refined-caps text-zinc-600 hover:text-zinc-300 transition-colors duration-500"
            >
              About
            </Link>
            
            {/* Products Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="refined-caps text-zinc-600 hover:text-zinc-300 transition-colors duration-500 flex items-center gap-2"
              >
                Products
                <ChevronDown 
                  className={`w-3 h-3 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-4 w-64 bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden"
                  >
                    {products.map((product) => (
                      <div key={product.name}>
                        {product.href ? (
                          <Link
                            href={product.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-6 py-4 hover:bg-white/5 transition-colors duration-300"
                            onClick={() => setIsProductsOpen(false)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-white">{product.name}</span>
                              <span className="refined-caps text-gold">{product.status}</span>
                            </div>
                            <p className="text-xs text-zinc-600">{product.description}</p>
                          </Link>
                        ) : (
                          <div className="block px-6 py-4 opacity-50 cursor-not-allowed">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-white">{product.name}</span>
                              <span className="refined-caps text-zinc-500">{product.status}</span>
                            </div>
                            <p className="text-xs text-zinc-600">{product.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="https://github.com/Lync-Foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="refined-caps text-zinc-600 hover:text-zinc-300 transition-colors duration-500"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
