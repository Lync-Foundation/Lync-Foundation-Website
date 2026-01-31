"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
    description: "Trustless CNY Stablecoin",
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
          ? "bg-[#f5f0e6]/90 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-8 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-5 group">
            <Image
              src="/logo.png"
              alt="Lync Foundation"
              width={54}
              height={54}
              className="w-14 h-14 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span className="nav-text text-zinc-600 group-hover:text-zinc-900 transition-colors duration-500">
              Lync Foundation
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <Link
              href="#about"
              className="nav-text text-zinc-500 hover:text-zinc-900 transition-colors duration-500"
            >
              About
            </Link>
            
            {/* Products Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="nav-text text-zinc-500 hover:text-zinc-900 transition-colors duration-500 flex items-center gap-2"
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
                    className="absolute top-full right-0 mt-4 w-72 bg-white border border-black/10 rounded-sm overflow-hidden shadow-lg"
                  >
                    {products.map((product) => (
                      <div key={product.name}>
                        {product.href ? (
                          <Link
                            href={product.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-6 py-5 hover:bg-black/5 transition-colors duration-300"
                            onClick={() => setIsProductsOpen(false)}
                          >
                            {product.logo ? (
                              <div className="mb-3">
                                <Image
                                  src={product.logo}
                                  alt={product.name}
                                  width={80}
                                  height={32}
                                  className="h-8 w-auto"
                                />
                              </div>
                            ) : (
                              <div className="mb-2">
                                <span className="text-base text-black">
                                  {product.name}
                                </span>
                              </div>
                            )}
                            <p className="text-sm text-zinc-500">
                              {product.description}
                            </p>
                          </Link>
                        ) : (
                          <div className="block px-6 py-5 opacity-50 cursor-not-allowed">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-base text-black">
                                {product.name}
                              </span>
                              {product.status && (
                                <span className="nav-text text-zinc-500">{product.status}</span>
                              )}
                            </div>
                            <p className="text-sm text-zinc-500">
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
              className="nav-text text-zinc-500 hover:text-zinc-900 transition-colors duration-500"
            >
              News
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
