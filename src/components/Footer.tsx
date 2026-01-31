"use client";

import Image from "next/image";
import Link from "next/link";
import { Twitter, Github, ExternalLink } from "lucide-react";

const footerLinks = {
  products: [
    { label: "LyncZ", href: "https://lync-z.xyz", external: true },
    { label: "LyncS (Coming Soon)", href: "#", disabled: true },
  ],
  resources: [
    { label: "Mission", href: "#mission" },
    { label: "Products", href: "#products" },
  ],
  social: [
    { label: "Twitter", href: "https://x.com/LyncFoundation", icon: Twitter },
    { label: "GitHub", href: "https://github.com/Lync-Foundation", icon: Github },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
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
              <span className="font-semibold text-lg text-slate-900 dark:text-white">
                Lync Foundation
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-6">
              Building trustless infrastructure that makes traditional finance 
              verifiable on-chain. Open source. Non-profit. For everyone.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              {footerLinks.social.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  <link.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Products column */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  {link.disabled ? (
                    <span className="text-slate-400 dark:text-slate-500 text-sm">
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-1"
                    >
                      {link.label}
                      {link.external && <ExternalLink className="w-3 h-3" />}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2026 Lync Foundation. All rights reserved.
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Lync Foundation is an initiative dedicated to building trustless 
              financial infrastructure.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
