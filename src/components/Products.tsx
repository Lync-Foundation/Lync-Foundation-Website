"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";

const products = [
  {
    name: "LyncZ",
    tagline: "P2P Fiat-Crypto Exchange",
    description:
      "Trustless peer-to-peer exchange with ZK-verified payment proofs.",
    status: "live",
    statusLabel: "Live",
    href: "https://lync-z.xyz",
    logo: "/lyncz-avatar.svg",
  },
  {
    name: "LyncS",
    tagline: "Verified Stablecoin",
    description:
      "Stablecoin backed by cryptographically verified fiat balances.",
    status: "development",
    statusLabel: "Research",
    href: null,
    logo: null,
  },
];

export default function Products() {
  return (
    <section id="products" className="relative py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
            Products
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            From Research to Reality
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Our research translates into practical applications that demonstrate 
            the viability of trustless financial infrastructure.
          </p>
        </motion.div>

        {/* Products list - compact */}
        <div className="space-y-4">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {product.logo ? (
                    <Image
                      src={product.logo}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-xl"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                      <span className="text-lg font-bold text-slate-400">?</span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {product.name}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          product.status === "live"
                            ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {product.status === "live" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {product.statusLabel}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {product.tagline}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs hidden md:block">
                    {product.description}
                  </p>
                  {product.href ? (
                    <Link
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Visit
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="text-sm text-slate-400 dark:text-slate-500">
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-sm text-slate-500 dark:text-slate-500"
        >
          Additional payment rail integrations planned for 2026-2027.
        </motion.p>
      </div>
    </section>
  );
}
