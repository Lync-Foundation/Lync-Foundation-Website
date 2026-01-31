"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "01",
    name: "LyncZ",
    field: "Payment Verification",
    status: "Active",
    statusColor: "#8AF5FF",
    description: "Trustless P2P exchange using ZK proofs to verify Alipay receipts on-chain.",
    href: "https://lync-z.xyz",
  },
  {
    id: "02",
    name: "LyncS",
    field: "Verified Assets",
    status: "Research",
    statusColor: "#C86DD7",
    description: "Stablecoin backed by cryptographically verified fiat balances.",
    href: null,
  },
  {
    id: "03",
    name: "Payment Rails",
    field: "Infrastructure",
    status: "Planned",
    statusColor: "#7F80FF",
    description: "SEPA, Wise, and additional regional payment integrations.",
    href: null,
  },
];

export default function Products() {
  return (
    <section id="research" className="relative py-32 lg:py-48 bg-[#0F0F10]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7F80FF]/5 blur-[120px] rounded-full" />
      
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="caps text-[#7F80FF] mb-4">Research</p>
          <h2 className="text-3xl lg:text-5xl font-light text-white max-w-2xl leading-tight">
            Active projects and
            <br />
            <span className="gradient-text-subtle">ongoing research.</span>
          </h2>
        </motion.div>

        {/* Table header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 py-4 border-b border-zinc-800 mb-2">
          <div className="col-span-1">
            <span className="caps text-zinc-600">ID</span>
          </div>
          <div className="col-span-3">
            <span className="caps text-zinc-600">Project</span>
          </div>
          <div className="col-span-3">
            <span className="caps text-zinc-600">Field</span>
          </div>
          <div className="col-span-2">
            <span className="caps text-zinc-600">Status</span>
          </div>
          <div className="col-span-3">
            <span className="caps text-zinc-600">Link</span>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group grid grid-cols-12 gap-4 py-6 lg:py-8 border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors duration-300"
            >
              {/* ID */}
              <div className="col-span-2 lg:col-span-1">
                <span className="font-mono text-sm text-zinc-600">{project.id}</span>
              </div>
              
              {/* Name */}
              <div className="col-span-10 lg:col-span-3">
                <h3 className="text-lg lg:text-xl font-normal text-white group-hover:text-[#8AF5FF] transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-sm text-zinc-600 mt-1 lg:hidden">{project.field}</p>
              </div>
              
              {/* Field */}
              <div className="hidden lg:block col-span-3">
                <span className="text-zinc-400">{project.field}</span>
              </div>
              
              {/* Status */}
              <div className="col-span-6 lg:col-span-2">
                <span 
                  className="inline-flex items-center gap-2 text-sm"
                  style={{ color: project.statusColor }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.statusColor }} />
                  {project.status}
                </span>
              </div>
              
              {/* Link */}
              <div className="col-span-6 lg:col-span-3 flex justify-end lg:justify-start">
                {project.href ? (
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group/link"
                  >
                    <span>Visit</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                ) : (
                  <span className="text-sm text-zinc-600">—</span>
                )}
              </div>

              {/* Description - mobile only */}
              <div className="col-span-12 lg:hidden mt-2">
                <p className="text-sm text-zinc-500">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Descriptions - desktop hover reveal could go here */}
      </div>
    </section>
  );
}
