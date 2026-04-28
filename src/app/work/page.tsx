"use client";

import Link from "next/link";
import { EXPERIENCE, EDUCATION, LINKS } from "@/lib/data";

export default function Work() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="blur-fade" />

      <nav className="fixed top-0 left-0 right-0 z-20">
        <div className="max-w-[620px] mx-auto px-6 h-11 flex items-center justify-between">
          <Link href="/" className="link-dim text-[13px]">← Aarnav Noble</Link>
          <div className="flex items-center gap-5">
            <Link href="/projects" className="link-dim text-[13px]">Projects</Link>
            <a href={LINKS.github} target="_blank" rel="noopener" className="link-dim text-[13px]">GitHub</a>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-[620px] mx-auto px-6 pt-24 pb-20 w-full">

        <h1
          data-animate
          style={{ "--stagger": 0 } as React.CSSProperties}
          className="text-[13px] font-medium uppercase tracking-widest mb-14"
        >
          <span style={{ color: "var(--g8)" }}>Work</span>
        </h1>

        <div className="space-y-0">
          {EXPERIENCE.map((role, i) => (
            <div
              key={role.company}
              data-animate
              style={{ "--stagger": i + 1 } as React.CSSProperties}
            >
              {/* Role header */}
              <div className="flex items-baseline justify-between gap-4 mb-0.5">
                <span className="text-[16px] font-semibold tracking-tight" style={{ color: "var(--g12)" }}>
                  {role.company}
                </span>
                <span className="text-[11px] font-mono shrink-0 tabular-nums" style={{ color: "var(--g7)" }}>
                  {role.period}
                </span>
              </div>
              <p className="text-[12px] mb-0.5" style={{ color: "var(--g8)" }}>{role.detail}</p>
              <p className="text-[12px] mb-4" style={{ color: "var(--g9)" }}>{role.role}</p>

              <ul className="space-y-2 mb-10 pl-3 border-l" style={{ borderColor: "var(--g4)" }}>
                {role.bullets.map((b, j) => (
                  <li key={j} className="text-[13px] leading-relaxed" style={{ color: "var(--g9)" }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education */}
        <div
          data-animate
          style={{ "--stagger": EXPERIENCE.length + 1, borderColor: "var(--g4)" } as React.CSSProperties}
          className="pt-10 border-t"
        >
          <p className="text-[11px] uppercase tracking-widest mb-7 font-medium" style={{ color: "var(--g7)" }}>
            Education
          </p>

          <div className="flex items-baseline justify-between gap-4 mb-0.5">
            <span className="text-[16px] font-semibold tracking-tight" style={{ color: "var(--g12)" }}>
              {EDUCATION.school}
            </span>
            <span className="text-[11px] font-mono tabular-nums" style={{ color: "var(--g7)" }}>
              {EDUCATION.period}
            </span>
          </div>
          <p className="text-[13px] mb-5" style={{ color: "var(--g9)" }}>
            {EDUCATION.degree} · {EDUCATION.location}
          </p>
          <div className="flex flex-wrap gap-2">
            {EDUCATION.courses.map((c) => (
              <span
                key={c}
                className="text-[11px] px-2.5 py-1 rounded"
                style={{ color: "var(--g9)", background: "var(--g3)", border: "1px solid var(--g4)" }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </main>

      <footer className="max-w-[620px] mx-auto px-6 pb-8 w-full">
        <p className="text-[11px]" style={{ color: "var(--g6)" }}>© {new Date().getFullYear()} Aarnav Noble</p>
      </footer>
    </div>
  );
}
