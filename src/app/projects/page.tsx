"use client";

import Link from "next/link";
import { PROJECTS, LINKS } from "@/lib/data";

function Pipeline({ steps }: { steps: typeof PROJECTS[0]["pipeline"] }) {
  return (
    <div className="my-7 rounded-lg overflow-hidden" style={{ border: "1px solid var(--g4)" }}>
      <div
        className="px-4 py-2 flex items-center gap-2"
        style={{ background: "var(--g2)", borderBottom: "1px solid var(--g4)" }}
      >
        <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: "var(--g7)" }}>
          Pipeline
        </span>
      </div>
      <div>
        {steps.map((s, i) => (
          <div
            key={s.step}
            className="flex gap-4 px-4 py-3"
            style={{ borderBottom: i < steps.length - 1 ? "1px solid var(--g3)" : "none" }}
          >
            <span
              className="text-[11px] font-mono w-5 shrink-0 pt-[2px] tabular-nums"
              style={{ color: "var(--g6)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2.5 mb-1">
                <span className="text-[13px] font-medium" style={{ color: "var(--g11)" }}>
                  {s.step}
                </span>
                <span
                  className="text-[11px] font-mono px-1.5 py-0.5 rounded"
                  style={{ color: "var(--g8)", background: "var(--g3)" }}
                >
                  {s.tech}
                </span>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--g8)" }}>
                {s.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoamSample({ data }: { data: typeof PROJECTS[0]["sampleOutput"] }) {
  if (!("days" in data) || !data.days) return null;
  return (
    <div className="my-7 terminal">
      <div className="terminal-bar">
        <div className="terminal-dot" style={{ background: "#ff5f57" }} />
        <div className="terminal-dot" style={{ background: "#febc2e" }} />
        <div className="terminal-dot" style={{ background: "#28c840" }} />
        <span className="ml-2 text-[11px]" style={{ color: "var(--g8)" }}>{data.label}</span>
      </div>
      <div className="px-4 py-3 space-y-4">
        {data.days.map((day) => (
          <div key={day.day}>
            <p className="text-[11px] uppercase tracking-widest mb-2" style={{ color: "var(--g7)" }}>
              {day.day}
            </p>
            {day.stops.map((stop) => (
              <div key={stop.name} className="flex gap-3 mb-2">
                <span className="text-[11px] font-mono tabular-nums pt-[1px] w-10 shrink-0" style={{ color: "var(--g7)" }}>
                  {stop.time}
                </span>
                <div>
                  <span className="text-[13px] font-medium" style={{ color: "var(--g11)" }}>{stop.name}</span>
                  <span className="text-[12px] ml-2" style={{ color: "var(--g7)" }}>{stop.area}</span>
                  <p className="text-[12px] leading-relaxed" style={{ color: "var(--g7)" }}>{stop.note}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DothrakiSample({ data }: { data: typeof PROJECTS[1]["sampleOutput"] }) {
  if (!("steps" in data) || !data.steps) return null;
  return (
    <div className="my-7 terminal">
      <div className="terminal-bar">
        <div className="terminal-dot" style={{ background: "#ff5f57" }} />
        <div className="terminal-dot" style={{ background: "#febc2e" }} />
        <div className="terminal-dot" style={{ background: "#28c840" }} />
        <span className="ml-2 text-[11px]" style={{ color: "var(--g8)" }}>{data.label}</span>
      </div>
      <div className="px-4 py-4 space-y-2.5">
        {data.steps.map((s, i) => (
          <div key={i} className="flex gap-4">
            <span
              className="text-[11px] font-mono w-28 shrink-0 pt-[2px]"
              style={{ color: "var(--g7)" }}
            >
              {s.label}
            </span>
            <span
              className="text-[13px] font-mono"
              style={{ color: i === data.steps!.length - 1 ? "var(--g12)" : "var(--g10)" }}
            >
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="blur-fade" />

      <nav className="fixed top-0 left-0 right-0 z-20">
        <div className="max-w-[620px] mx-auto px-6 h-11 flex items-center justify-between">
          <Link href="/" className="link-dim text-[13px]">← Aarnav Noble</Link>
          <div className="flex items-center gap-5">
            <Link href="/work" className="link-dim text-[13px]">Work</Link>
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
          <span style={{ color: "var(--g8)" }}>Projects</span>
        </h1>

        <div>
          {PROJECTS.map((project, i) => (
            <div
              key={project.slug}
              data-animate
              style={{ "--stagger": i + 1 } as React.CSSProperties}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-[20px] font-semibold tracking-tight" style={{ color: "var(--g12)" }}>
                  {project.name}
                </h2>
                <div className="flex items-center gap-2.5 shrink-0 mt-1">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener"
                      className="link-dim text-[12px]"
                    >
                      Demo ↗
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener"
                    className="link-dim text-[12px]"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>

              <p className="text-[12px] italic mb-4" style={{ color: "var(--g8)" }}>
                {project.tagline}
              </p>
              <p className="text-[14px] leading-[1.75] mb-1" style={{ color: "var(--g10)" }}>
                {project.description}
              </p>

              <Pipeline steps={project.pipeline} />

              {"days" in project.sampleOutput
                ? <RoamSample data={project.sampleOutput} />
                : <DothrakiSample data={project.sampleOutput} />
              }

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mt-1">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded"
                    style={{ color: "var(--g8)", background: "var(--g2)", border: "1px solid var(--g4)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {i < PROJECTS.length - 1 && (
                <div
                  className="my-16"
                  style={{ borderBottom: "1px solid var(--g3)" }}
                />
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="max-w-[620px] mx-auto px-6 pb-8 w-full">
        <p className="text-[11px]" style={{ color: "var(--g6)" }}>© {new Date().getFullYear()} Aarnav Noble</p>
      </footer>
    </div>
  );
}
