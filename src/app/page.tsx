"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LINKS } from "@/lib/data";

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } };

export default function Home() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(LINKS.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;
      if (e.metaKey || e.ctrlKey) return;
      if (e.key === "g") window.open(LINKS.github, "_blank");
      if (e.key === "l") window.open(LINKS.linkedin, "_blank");
      if (e.key === "e") copyEmail();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-[#0c0c0c]/90 backdrop-blur-sm">
        <div className="max-w-[640px] mx-auto px-6 h-11 flex items-center justify-between">
          <span className="text-[13px] text-white/50">Aarnav Noble</span>
          <div className="flex items-center gap-5">
            <a href={LINKS.github} target="_blank" rel="noopener" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">LinkedIn</a>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 max-w-[640px] mx-auto px-6 pt-28 pb-20 w-full">
        <motion.div {...fade}>
          <h1 className="text-[26px] font-semibold tracking-tight text-white/90 mb-1">
            Aarnav Noble
          </h1>
          <p className="text-[13px] font-mono text-white/30 mb-9">
            Computer Engineering · University of Waterloo
          </p>

          <div className="space-y-4 mb-10">
            <p className="text-[15px] text-white/55 leading-[1.75]">
              ML and infrastructure engineer, on co-op from Waterloo. Most recently MTS intern at{" "}
              <span className="text-white/75">AethexAI</span> — a stealth voice AI startup — where I worked on
              a sub-500ms real-time streaming pipeline and the AWS/EKS infrastructure running it in production.
            </p>
            <p className="text-[15px] text-white/35 leading-[1.75]">
              Before that, ML at Environment and Climate Change Canada building GNN and XGBoost
              forecasting pipelines over satellite and atmospheric data.
              Personal projects focus on retrieval systems, learning-to-rank, and low-resource ASR.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[14px]">
            <Link href="/work" className="text-white/70 hover:text-white transition-colors">
              Work →
            </Link>
            <Link href="/projects" className="text-white/70 hover:text-white transition-colors">
              Projects →
            </Link>
            <a href={LINKS.github} target="_blank" rel="noopener" className="text-white/30 hover:text-white/60 transition-colors">
              GitHub ↗
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener" className="text-white/30 hover:text-white/60 transition-colors">
              LinkedIn ↗
            </a>
            <button onClick={copyEmail} className="text-white/30 hover:text-white/60 transition-colors">
              {copied ? "Copied" : "Email"}
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="max-w-[640px] mx-auto px-6 pb-8 w-full">
        <p className="text-[11px] text-white/15 font-mono">
          g · l · e
        </p>
      </footer>
    </div>
  );
}
