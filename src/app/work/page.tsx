"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EXPERIENCE, EDUCATION, LINKS } from "@/lib/data";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export default function Work() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-[#0c0c0c]/90 backdrop-blur-sm">
        <div className="max-w-[640px] mx-auto px-6 h-11 flex items-center justify-between">
          <Link href="/" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">
            ← Aarnav Noble
          </Link>
          <div className="flex items-center gap-5">
            <a href={LINKS.github} target="_blank" rel="noopener" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">GitHub</a>
            <Link href="/projects" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">Projects</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-[640px] mx-auto px-6 pt-24 pb-20 w-full">
        <motion.h1 {...fade(0)} className="text-[22px] font-semibold tracking-tight text-white/85 mb-14">
          Work
        </motion.h1>

        {/* Experience */}
        <div className="space-y-12">
          {EXPERIENCE.map((role, i) => (
            <motion.div key={role.company} {...fade(i * 0.05)}>
              {/* Role header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
                <span className="text-[15px] font-medium text-white/80">{role.company}</span>
                <span className="text-[12px] font-mono text-white/25 tabular-nums shrink-0">{role.period}</span>
              </div>
              <p className="text-[12px] text-white/30 mb-1">{role.detail}</p>
              <p className="text-[12px] text-white/40 mb-4">{role.role}</p>

              <ul className="space-y-2.5 border-l border-white/[0.06] pl-4">
                {role.bullets.map((b, j) => (
                  <li key={j} className="text-[13px] text-white/45 leading-relaxed">
                    {b}
                  </li>
                ))}
              </ul>

              {i < EXPERIENCE.length - 1 && (
                <div className="mt-12 border-b border-white/[0.05]" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div {...fade(0.2)} className="mt-16 pt-14 border-t border-white/[0.05]">
          <h2 className="text-[13px] text-white/25 uppercase tracking-widest mb-8 font-medium">Education</h2>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
            <span className="text-[15px] font-medium text-white/80">{EDUCATION.school}</span>
            <span className="text-[12px] font-mono text-white/25 tabular-nums">{EDUCATION.period}</span>
          </div>
          <p className="text-[13px] text-white/35 mb-5">{EDUCATION.degree} · {EDUCATION.location}</p>
          <div className="flex flex-wrap gap-2">
            {EDUCATION.courses.map((c) => (
              <span key={c} className="text-[11px] text-white/30 px-2.5 py-1 rounded border border-white/[0.07] bg-white/[0.02]">
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className="max-w-[640px] mx-auto px-6 pb-8 w-full">
        <p className="text-[11px] text-white/15">© {new Date().getFullYear()} Aarnav Noble</p>
      </footer>
    </div>
  );
}
