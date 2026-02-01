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

interface HeaderProps {
  showLogo?: boolean;
}

export default function Header({ showLogo = true }: HeaderProps) {
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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-5 group">
            <Image
              src="/lync-icon-new.svg"
              alt="Lync Foundation"
              width={54}
              height={54}
              className="w-14 h-14 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span className="nav-text text-zinc-700 group-hover:text-[#8B2323] transition-colors duration-500">
              Lync Foundation
            </span>
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
                    className="absolute top-full right-0 mt-4 w-72 bg-[#f8f6f2]/98 backdrop-blur-xl border border-[#d4c8b8]/60 rounded-sm overflow-hidden shadow-lg shadow-[#8B2323]/5"
                  >
                    {products.map((product) => (
                      <div key={product.name}>
                        {product.href ? (
                          <Link
                            href={product.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-6 py-5 hover:bg-[#8B2323]/8 transition-colors duration-300 border-b border-[#d4c8b8]/40 last:border-b-0"
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
                                <span className="text-base text-zinc-800">
                                  {product.name}
                                </span>
                              </div>
                            )}
                            <p className="text-sm text-zinc-500">
                              {product.description}
                            </p>
                          </Link>
                        ) : (
                          <div className="block px-6 py-5 opacity-70 cursor-not-allowed border-b border-[#d4c8b8]/40 last:border-b-0">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-lg italic font-light text-zinc-600 tracking-wide" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                                {product.name}
                              </span>
                              {product.status && (
                                <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B2323]/80 font-medium">{product.status}</span>
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
                    className="absolute top-full right-0 mt-4 w-40 bg-[#f8f6f2]/98 backdrop-blur-xl border border-[#d4c8b8]/60 rounded-sm overflow-hidden shadow-lg shadow-[#8B2323]/5"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-3 hover:bg-[#8B2323]/8 transition-colors duration-300 border-b border-[#d4c8b8]/40 last:border-b-0 ${
                          currentLang === lang.code 
                            ? "text-[#8B2323] bg-[#8B2323]/5" 
                            : "text-zinc-600"
                        }`}
                      >
                        <span className="nav-text">{lang.code}</span>
                        <span className="text-sm text-zinc-400 ml-2">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
