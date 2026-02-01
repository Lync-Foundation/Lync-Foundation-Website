"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";

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

const languages = [
  { code: "EN", name: "English" },
  { code: "CN", name: "简体中文" },
  { code: "TW", name: "繁體中文" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

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
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ${
        isScrolled
          ? "bg-[#f8f6f2]/95 backdrop-blur-xl border-b border-[#8B2323]/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-8 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between h-28">
          {/* Logo with appearing animation */}
          <Link href="/" className="flex items-center gap-5 group">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <Image
                src="/lync-icon-new.svg"
                alt="Lync Foundation"
                width={54}
                height={54}
                className="w-14 h-14 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6,
                ease: "easeOut"
              }}
              className="nav-text text-zinc-700 group-hover:text-[#8B2323] transition-colors duration-500"
            >
              Lync Foundation
            </motion.span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <Link
              href="#about"
              className="nav-text text-zinc-600 hover:text-[#8B2323] transition-colors duration-500"
            >
              About
            </Link>
            
            {/* Products Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="nav-text text-zinc-600 hover:text-[#8B2323] transition-colors duration-500 flex items-center gap-2"
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
                    className="absolute top-full right-0 mt-2 w-72 bg-[#faf8f5] backdrop-blur-xl border border-[#8B2323]/15 rounded overflow-hidden shadow-lg shadow-black/8"
                  >
                    {products.map((product, index) => (
                      <div key={product.name}>
                        {product.href ? (
                          <Link
                            href={product.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block px-5 py-4 hover:bg-[#8B2323]/5 transition-colors duration-300 ${index < products.length - 1 ? 'border-b border-[#8B2323]/10' : ''}`}
                            onClick={() => setIsProductsOpen(false)}
                          >
                            {product.logo ? (
                              <div className="mb-2">
                                <Image
                                  src={product.logo}
                                  alt={product.name}
                                  width={72}
                                  height={28}
                                  className="h-7 w-auto"
                                />
                              </div>
                            ) : (
                              <div className="mb-1">
                                <span className="text-sm font-medium text-zinc-800">
                                  {product.name}
                                </span>
                              </div>
                            )}
                            <p className="text-xs text-zinc-500">
                              {product.description}
                            </p>
                          </Link>
                        ) : (
                          <div className={`block px-5 py-4 opacity-60 cursor-not-allowed ${index < products.length - 1 ? 'border-b border-[#8B2323]/10' : ''}`}>
                            <div className="flex items-center justify-between mb-1">
                              <span 
                                className="text-sm text-zinc-700 tracking-wide"
                                style={{ fontFamily: 'Garamond, "Times New Roman", serif', fontWeight: 500 }}
                              >
                                {product.name}
                              </span>
                              {product.status && (
                                <span className="text-[9px] tracking-[0.15em] uppercase text-[#8B2323]/70 font-medium">{product.status}</span>
                              )}
                            </div>
                            <p className="text-xs text-zinc-400">
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
              className="nav-text text-zinc-600 hover:text-[#8B2323] transition-colors duration-500"
            >
              News
            </Link>

            {/* Language Toggle */}
            <div ref={langDropdownRef} className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="nav-text text-zinc-600 hover:text-[#8B2323] transition-colors duration-500 flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {currentLang}
                <ChevronDown 
                  className={`w-3 h-3 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-40 bg-[#faf8f5] backdrop-blur-xl border border-[#8B2323]/15 rounded overflow-hidden shadow-lg shadow-black/8"
                  >
                    {languages.map((lang, index) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-3 hover:bg-[#8B2323]/5 transition-colors duration-300 ${
                          index < languages.length - 1 ? 'border-b border-[#8B2323]/10' : ''
                        } ${
                          currentLang === lang.code 
                            ? "text-[#8B2323] bg-[#8B2323]/5" 
                            : "text-zinc-600"
                        }`}
                      >
                        <span className="text-xs tracking-widest font-medium">{lang.code}</span>
                        <span className="text-xs text-zinc-400 ml-2">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Us Button */}
            <Link
              href="mailto:contact@lync-foundation.org"
              className="px-5 py-2 bg-[#8B2323] text-white text-xs tracking-[0.12em] uppercase hover:bg-[#6B1A1A] transition-colors duration-300"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
