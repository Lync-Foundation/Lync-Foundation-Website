"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Clock, Zap, Shield, DollarSign, Lock } from "lucide-react";

const products = [
  {
    name: "LyncZ",
    tagline: "Trustless P2P CNY-Crypto Exchange",
    description:
      "The first peer-to-peer exchange that uses zero-knowledge proofs to verify Alipay payments on-chain. No middlemen, no trust required.",
    status: "live",
    statusLabel: "Live on Base",
    features: [
      { icon: Zap, text: "Alipay & WeChat Pay support" },
      { icon: Shield, text: "ZK-verified payments" },
      { icon: Lock, text: "Non-custodial escrow" },
      { icon: DollarSign, text: "Zero platform fees" },
    ],
    cta: {
      label: "Try LyncZ",
      href: "https://lync-z.xyz",
      external: true,
    },
    gradient: "from-cyan-500 via-blue-500 to-violet-500",
  },
  {
    name: "LyncS",
    tagline: "CNY Stablecoin",
    description:
      "A stablecoin backed by cryptographically verified Alipay and WeChat balances. Mint by proving your balance, redeem to your account.",
    status: "coming",
    statusLabel: "In Development",
    features: [
      { icon: CheckCircle, text: "1:1 CNY backing" },
      { icon: Shield, text: "Cryptographic verification" },
      { icon: Zap, text: "Instant minting & redemption" },
      { icon: Lock, text: "Non-custodial design" },
    ],
    cta: {
      label: "Coming Soon",
      href: "#",
      external: false,
      disabled: true,
    },
    gradient: "from-violet-500 via-purple-500 to-pink-500",
  },
];

export default function Products() {
  return (
    <section id="products" className="relative py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Our Products
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Building the infrastructure to bridge traditional finance and DeFi, 
            one product at a time.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Status badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt={product.name}
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {product.tagline}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                    product.status === "live"
                      ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                      : "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {product.status === "live" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                  {product.statusLabel}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {product.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <feature.icon className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-sm">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {product.cta.disabled ? (
                <button
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-medium rounded-xl cursor-not-allowed"
                >
                  {product.cta.label}
                </button>
              ) : (
                <Link
                  href={product.cta.href}
                  target={product.cta.external ? "_blank" : undefined}
                  rel={product.cta.external ? "noopener noreferrer" : undefined}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${product.gradient} text-white font-medium rounded-xl hover:opacity-90 transition-opacity duration-200`}
                >
                  {product.cta.label}
                  {product.cta.external && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  )}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Future products teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 dark:text-slate-400">
            More products coming soon: WeChat Pay integration (Q3 2026), 
            SEPA support, Wise integration, and more regional payment rails.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
