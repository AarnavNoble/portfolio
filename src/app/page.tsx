"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LINKS } from "@/lib/data";

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
      {/* Sticky blur header */}
      <div className="blur-fade" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-20">
        <div className="max-w-[620px] mx-auto px-6 h-11 flex items-center justify-between">
          <span className="text-[13px]" style={{ color: "var(--g10)" }}>Aarnav Noble</span>
          <div className="flex items-center gap-5">
            <a href={LINKS.github} target="_blank" rel="noopener" className="link-dim text-[13px]">GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener" className="link-dim text-[13px]">LinkedIn</a>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 max-w-[620px] mx-auto px-6 pt-24 pb-20 w-full">

        <h1
          data-animate
          style={{ "--stagger": 0 } as React.CSSProperties}
          className="text-[46px] sm:text-[54px] font-bold tracking-[-0.03em] leading-none mb-5"
        >
          Aarnav Noble
        </h1>

        <p
          data-animate
          style={{ "--stagger": 1, color: "var(--g8)" } as React.CSSProperties}
          className="text-[12px] font-mono mb-10 tracking-wide"
        >
          Computer Engineering · University of Waterloo
        </p>

        <div
          data-animate
          style={{ "--stagger": 2 } as React.CSSProperties}
          className="space-y-4 mb-10"
        >
          <p className="text-[15px] leading-[1.8]" style={{ color: "var(--g11)" }}>
            ML and infrastructure engineer, on co-op from Waterloo.
            Most recently MTS intern at{" "}
            <span style={{ color: "var(--g12)" }}>AethexAI</span> — a stealth voice AI startup
            — working on a sub-500ms real-time streaming pipeline and the AWS/EKS platform running it
            in production.
          </p>
          <p className="text-[15px] leading-[1.8]" style={{ color: "var(--g9)" }}>
            Before that, ML at Environment and Climate Change Canada building GNN and XGBoost
            forecasting pipelines over satellite data. Personal work is in retrieval systems,
            learning-to-rank, and low-resource ASR.
          </p>
        </div>

        <div
          data-animate
          style={{ "--stagger": 3 } as React.CSSProperties}
          className="flex flex-wrap gap-x-6 gap-y-3 text-[14px]"
        >
          <Link href="/work" className="link font-medium">Work →</Link>
          <Link href="/projects" className="link font-medium">Projects →</Link>
          <span style={{ color: "var(--g6)" }}>·</span>
          <a href={LINKS.github} target="_blank" rel="noopener" className="link-dim">GitHub ↗</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener" className="link-dim">LinkedIn ↗</a>
          <button onClick={copyEmail} className="link-dim">
            {copied ? "Copied ✓" : "Email"}
          </button>
        </div>
      </main>

      <footer className="max-w-[620px] mx-auto px-6 pb-8 w-full">
        <p className="text-[11px] font-mono" style={{ color: "var(--g6)" }}>g · l · e</p>
      </footer>
    </div>
  );
}
