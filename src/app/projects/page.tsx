"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS, LINKS } from "@/lib/data";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

function Pipeline({ steps }: { steps: typeof PROJECTS[0]["pipeline"] }) {
  return (
    <div className="my-6 border border-white/[0.06] rounded-lg overflow-hidden">
      <div className="px-4 py-2 border-b border-white/[0.05] bg-white/[0.015]">
        <span className="text-[11px] text-white/25 uppercase tracking-widest font-medium">Pipeline</span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {steps.map((s, i) => (
          <div key={s.step} className="flex gap-4 px-4 py-3">
            <span className="text-[11px] font-mono text-white/20 w-4 shrink-0 mt-[2px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2 mb-0.5">
                <span className="text-[13px] font-medium text-white/70">{s.step}</span>
                <span className="text-[11px] font-mono text-white/25">{s.tech}</span>
              </div>
              <p className="text-[12px] text-white/35 leading-relaxed">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoamOutput({ data }: { data: typeof PROJECTS[0]["sampleOutput"] }) {
  if (!("days" in data) || !data.days) return null;
  return (
    <div className="my-6 border border-white/[0.06] rounded-lg overflow-hidden">
      <div className="px-4 py-2 border-b border-white/[0.05] bg-white/[0.015] flex items-center justify-between">
        <span className="text-[11px] text-white/25 uppercase tracking-widest font-medium">Sample output</span>
        <span className="text-[11px] font-mono text-white/20">{data.label}</span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {data.days.map((day) => (
          <div key={day.day}>
            <div className="px-4 py-2 bg-white/[0.01]">
              <span className="text-[11px] font-mono text-white/30">{day.day}</span>
            </div>
            {day.stops.map((stop) => (
              <div key={stop.name} className="flex gap-4 px-4 py-2.5">
                <span className="text-[11px] font-mono text-white/20 w-10 shrink-0 mt-[2px] tabular-nums">{stop.time}</span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[13px] text-white/65">{stop.name}</span>
                    <span className="text-[11px] text-white/25">{stop.area}</span>
                  </div>
                  <p className="text-[12px] text-white/30 mt-0.5 leading-relaxed">{stop.note}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DothrakiOutput({ data }: { data: typeof PROJECTS[1]["sampleOutput"] }) {
  if (!("steps" in data) || !data.steps) return null;
  return (
    <div className="my-6 border border-white/[0.06] rounded-lg overflow-hidden">
      <div className="px-4 py-2 border-b border-white/[0.05] bg-white/[0.015] flex items-center justify-between">
        <span className="text-[11px] text-white/25 uppercase tracking-widest font-medium">Sample trace</span>
        <span className="text-[11px] font-mono text-white/20">{data.label}</span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {data.steps.map((s, i) => (
          <div key={i} className="flex gap-4 px-4 py-2.5">
            <span className="text-[11px] font-mono text-white/20 w-28 shrink-0">{s.label}</span>
            <span className="text-[13px] font-mono text-white/55">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
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
            <Link href="/work" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">Work</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-[640px] mx-auto px-6 pt-24 pb-20 w-full">
        <motion.h1 {...fade(0)} className="text-[22px] font-semibold tracking-tight text-white/85 mb-14">
          Projects
        </motion.h1>

        <div className="space-y-20">
          {PROJECTS.map((project, i) => (
            <motion.div key={project.slug} {...fade(i * 0.06)}>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-[18px] font-semibold tracking-tight text-white/85">{project.name}</h2>
                <div className="flex items-center gap-3 shrink-0 mt-0.5">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener"
                      className="text-[12px] text-white/40 hover:text-white/70 transition-colors border border-white/[0.08] rounded px-2.5 py-1 hover:border-white/[0.18]"
                    >
                      Demo ↗
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener"
                    className="text-[12px] text-white/40 hover:text-white/70 transition-colors border border-white/[0.08] rounded px-2.5 py-1 hover:border-white/[0.18]"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>

              <p className="text-[12px] text-white/30 italic mb-4">{project.tagline}</p>
              <p className="text-[14px] text-white/50 leading-[1.75] mb-2">{project.description}</p>

              {/* Pipeline */}
              <Pipeline steps={project.pipeline} />

              {/* Sample output */}
              {"days" in project.sampleOutput
                ? <RoamOutput data={project.sampleOutput} />
                : <DothrakiOutput data={project.sampleOutput} />
              }

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.stack.map((t) => (
                  <span key={t} className="text-[11px] font-mono text-white/30 px-2 py-0.5 rounded border border-white/[0.06]">
                    {t}
                  </span>
                ))}
              </div>

              {i < PROJECTS.length - 1 && (
                <div className="mt-20 border-b border-white/[0.05]" />
              )}
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="max-w-[640px] mx-auto px-6 pb-8 w-full">
        <p className="text-[11px] text-white/15">© {new Date().getFullYear()} Aarnav Noble</p>
      </footer>
    </div>
  );
}
