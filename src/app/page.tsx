"use client";

import { AnimatePresence, motion, useInView, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ── Data ──────────────────────────────────────────────────────────────────── */

const LINKS = {
  github: "https://github.com/AarnavNoble",
  linkedin: "https://linkedin.com/in/aarnav-noble",
  email: "mailto:aarnavnoble14@gmail.com",
};

const PROJECTS = [
  {
    title: "Roam",
    description:
      "AI travel itinerary generator. Input a destination and interest profile — get back a route-optimized day plan with stops ordered to minimize travel time.",
    longDescription:
      "End-to-end ML stack: dense retrieval over scraped travel content, LightGBM LambdaRank for POI scoring, OR-Tools VRP for route optimization, and a Groq-backed synthesis pass. Not a prompt wrapper.",
    stack: ["Python", "FastAPI", "LightGBM", "FAISS", "OR-Tools", "React Native", "Groq"],
    href: "https://github.com/AarnavNoble/roam",
    demo: "https://huggingface.co/spaces/AarnavNoble/roam",
    featured: true,
    color: "#3B82F6",
    pipeline: [
      { label: "RAG Retrieval", color: "#3B82F6", detail: "FAISS vector search" },
      { label: "POI Fetch", color: "#8B5CF6", detail: "Overpass API" },
      { label: "ML Rank", color: "#F59E0B", detail: "LightGBM LambdaRank" },
      { label: "Route Optimize", color: "#10B981", detail: "OR-Tools VRP" },
      { label: "LLM Synthesize", color: "#EC4899", detail: "Groq Llama 3.3" },
    ],
  },
  {
    title: "Dothraki ASR",
    description:
      "Zero-shot speech recognition for Dothraki — a constructed language with no training data. Tests the limits of multilingual ASR models on an out-of-distribution language.",
    longDescription:
      "Vocal isolation with Demucs, zero-shot transcription with mlx-whisper, IPA phoneme extraction, then a custom matching engine that maps phoneme sequences to real Dothraki lexicon entries. Runs locally on Apple Silicon.",
    stack: ["Python", "mlx-whisper", "Demucs", "espeak-ng", "Next.js"],
    href: "https://github.com/AarnavNoble/dothraki-asr",
    demo: null,
    featured: false,
    color: "#8B5CF6",
    pipeline: [
      { label: "Vocal Isolation", color: "#8B5CF6", detail: "Demucs" },
      { label: "Zero-Shot ASR", color: "#3B82F6", detail: "mlx-whisper" },
      { label: "IPA Phonemes", color: "#F59E0B", detail: "espeak-ng" },
      { label: "Dothraki Match", color: "#10B981", detail: "custom engine" },
      { label: "Translation", color: "#EC4899", detail: "lexicon lookup" },
    ],
  },
];

const EXPERIENCE = [
  {
    company: "AethexAI",
    companyDetail: "Stealth voice AI startup · London, UK",
    title: "Member of Technical Staff — Intern",
    period: "Jan 2026 – Apr 2026",
    bullets: [
      "Built an async post-call ML pipeline to automatically correct ASR transcription errors using an LLM judge — parallelized per-turn execution across every production call, zero latency added to the live path.",
      "Resolved interrupt-handling failures in a sub-500ms voice pipeline by implementing a 5-phase conversation state machine; fixed recording timeline drift across WebRTC, telephony, and WebSocket transports.",
      "Designed and shipped the platform's external developer API and Python SDK across 100+ REST and WebSocket endpoints: session lifecycle, outbound call triggering, event-driven webhooks, browser SDK auth.",
      "Operated on AWS/EKS: Kubernetes deployments, Terraform infra, CI/CD pipelines, OIDC-based secret management — supporting 500+ pods in production.",
    ],
  },
  {
    company: "Environment and Climate Change Canada",
    companyDetail: "Burlington, Ontario",
    title: "AI/ML Developer",
    period: "May 2025 – Aug 2025",
    bullets: [
      "Designed and built a basin-wide Graph Neural Network (PyTorch) for Lake Erie concentration forecasting integrating satellite and atmospheric data — 5× more spatial coverage than traditional approaches.",
      "Engineered an XGBoost pipeline with multi-source spatial feature engineering (weather, satellite, soil data), improving predictive accuracy by 85%.",
    ],
  },
  {
    company: "Toronto Transit Commission",
    companyDetail: "Toronto, Ontario",
    title: "Software Analyst",
    period: "Sep 2024 – Dec 2024",
    bullets: [
      "Automated OS imaging via PXE boot and bash scripting for 2000+ devices, improving imaging speeds by 50%.",
      "Executed remote software migration for 400+ devices using DSM, improving operational efficiency by 60%.",
    ],
  },
  {
    company: "UW Orbital",
    companyDetail: "Waterloo, Ontario",
    title: "Firmware & Control Systems Developer",
    period: "Jan 2024 – Dec 2024",
    bullets: [
      "Built a peripheral driver for the LM75BD temperature sensor in C over I2C, with real-time over-temperature shutdown under FreeRTOS.",
      "Programmed STM32 microcontroller for satellite thermal control using MATLAB and Simulink.",
    ],
  },
];

const EDUCATION = {
  school: "University of Waterloo",
  degree: "B.ASc. Honours Computer Engineering",
  period: "Sept. 2023 – Apr. 2028 (expected)",
  location: "Waterloo, Ontario",
  courses: [
    "Data Structures & Algorithms",
    "Systems Programming & Concurrency",
    "Digital Circuits (VHDL)",
    "Embedded Microprocessor Systems",
    "Signals & Systems",
  ],
};

const STACK_GROUPS = [
  { label: "Languages", items: ["Python", "C/C++", "TypeScript", "Java", "MATLAB", "SQL", "Bash"] },
  { label: "ML / AI", items: ["PyTorch", "XGBoost", "scikit-learn", "TensorFlow", "LightGBM", "FAISS"] },
  { label: "Infra", items: ["Kubernetes", "Terraform", "Docker", "AWS / EKS", "GitHub Actions", "PostgreSQL"] },
  { label: "Backend", items: ["FastAPI", "Node.js", "WebRTC", "DynamoDB", "Redis"] },
  { label: "Frontend", items: ["React", "Next.js", "React Native"] },
];

/* ── Animation helpers ─────────────────────────────────────────────────────── */

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

/* ── Components ────────────────────────────────────────────────────────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 z-[60] origin-left"
    />
  );
}

function ScrollToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (y) => setVisible(y > 500));
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-200 text-sm"
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = ["projects", "experience", "about", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/[0.04]"
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-semibold text-sm tracking-tight text-white/90" onClick={() => setActive("")}>
          aarnav noble
        </a>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          {["Projects", "Experience", "About", "Contact"].map((s) => {
            const isActive = active === s.toLowerCase();
            return (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className={`relative text-[13px] transition-colors duration-200 ${isActive ? "text-white/90" : "text-white/40 hover:text-white/80"}`}
              >
                {s}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-blue-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener"
            className="text-[13px] text-white/40 hover:text-white/80 transition-colors duration-200"
          >
            GitHub
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden flex flex-col gap-[5px] p-1"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-white/50 transition-all duration-200 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-white/50 transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-white/50 transition-all duration-200 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="sm:hidden border-t border-white/[0.04] bg-[#0a0a0a]/95 backdrop-blur-md"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {["Projects", "Experience", "About", "Contact"].map((s) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className={`text-sm transition-colors ${active === s.toLowerCase() ? "text-white/80" : "text-white/50 hover:text-white/80"}`}
              >
                {s}
              </a>
            ))}
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener"
              className="text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function Hero() {
  return (
    <div className="min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
      {/* Gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full bg-blue-500/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-purple-500/[0.04] blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-2xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-[44px] sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] leading-[0.95] text-white"
          >
            Aarnav Noble
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-5">
            <div className="h-[2px] w-8 bg-blue-500/70 rounded-full" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-base sm:text-lg text-white/40 leading-relaxed max-w-lg"
          >
            Computer Engineering at Waterloo. I build ML systems and the infrastructure
            to run them — real-time pipelines, retrieval, ranking, and embedded firmware.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.05]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse" />
            <span className="text-[11px] text-white/25 font-mono tracking-wide">currently building · Roam</span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex gap-3 sm:gap-4">
            <a
              href="#projects"
              className="px-5 py-2.5 bg-white text-[#0a0a0a] text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors"
            >
              View projects
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener"
              className="px-5 py-2.5 border border-white/10 text-sm text-white/60 rounded-lg hover:border-white/25 hover:text-white/80 transition-all"
            >
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const [hovering, setHovering] = useState(false);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });
  const spotlightBg = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, rgba(255,255,255,0.05), transparent 70%)`;

  function handleMouse(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  function handleLeave() {
    x.set(0); y.set(0);
    setHovering(false);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onMouseEnter={() => setHovering(true)}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`relative ${className}`}
    >
      {hovering && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{ background: spotlightBg }}
        />
      )}
      {children}
    </motion.div>
  );
}

function PipelineStep({ step, index, total }: { step: { label: string; color: string; detail: string }; index: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center gap-1">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold border"
          style={{ background: step.color + "15", borderColor: step.color + "30", color: step.color }}
        >
          {index + 1}
        </div>
        <span className="text-[10px] text-white/40 font-medium whitespace-nowrap">{step.label}</span>
        <span className="text-[9px] text-white/20 font-mono whitespace-nowrap">{step.detail}</span>
      </div>
      {index < total - 1 && (
        <div className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-white/10 to-white/5 mt-[-20px]" />
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <TiltCard>
      <motion.div
        variants={fadeUp}
        className="group relative rounded-2xl border border-white/[0.06] bg-[#111113] overflow-hidden hover:border-white/[0.12] transition-colors duration-300"
      >
        {/* Top accent */}
        <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

        <div className="p-5 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 gap-3">
            <div>
              <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
              {project.featured && (
                <span className="inline-block mt-1.5 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Featured
                </span>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener"
                  className="text-xs text-white/40 hover:text-white/80 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.15] transition-all"
                >
                  Live demo
                </a>
              )}
              <a
                href={project.href}
                target="_blank"
                rel="noopener"
                className="text-xs text-white/40 hover:text-white/80 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.15] transition-all"
              >
                Source
              </a>
            </div>
          </div>

          {/* Description */}
          <p className="text-[15px] text-white/50 leading-relaxed mb-2">{project.description}</p>
          <p className="text-[13px] text-white/30 leading-relaxed mb-6">{project.longDescription}</p>

          {/* Pipeline visualization */}
          {project.pipeline && (
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4 sm:p-5 mb-6 overflow-x-auto">
              <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3 font-medium">Pipeline</p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
                className="flex items-start gap-0 sm:gap-1 min-w-max"
              >
                {project.pipeline.map((step, i) => (
                  <motion.div
                    key={step.label}
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
                  >
                    <PipelineStep step={step} index={i} total={project.pipeline.length} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Stack */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] text-white/35 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.05]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

function Projects() {
  return (
    <Section className="py-20 sm:py-24" >
      <div className="max-w-5xl mx-auto px-6" id="projects">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <h2 className="text-sm font-medium text-white/30 uppercase tracking-[0.15em]">
            Projects
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-6"
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </motion.div>

      </div>
    </Section>
  );
}

function About() {
  return (
    <Section className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-6" id="about">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <h2 className="text-sm font-medium text-white/30 uppercase tracking-[0.15em]">
            About
          </h2>
        </div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16">
          {/* Bio */}
          <div>
            <p className="text-[15px] text-white/50 leading-[1.8]">
              Computer Engineering student at the University of Waterloo, on co-op.
              Most recently MTS at AethexAI — a stealth voice AI startup in London — working across
              a sub-500ms real-time streaming pipeline and the production AWS/EKS infrastructure behind it.
            </p>
            <p className="text-[15px] text-white/50 leading-[1.8] mt-4">
              Before that, ML at Environment and Climate Change Canada building GNN and XGBoost pipelines
              for satellite-derived environmental forecasting.
            </p>
            <p className="text-[15px] text-white/30 leading-[1.8] mt-4">
              Personal projects focus on the ML side: retrieval systems, ranking, and pushing ASR
              models into domains they weren&apos;t trained for.
            </p>

            {/* Education */}
            <div className="mt-8 pt-8 border-t border-white/[0.05]">
              <p className="text-[11px] text-white/25 uppercase tracking-widest mb-4">Education</p>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                <span className="text-[14px] font-semibold text-white/70">{EDUCATION.school}</span>
                <span className="text-[12px] font-mono text-white/20 tabular-nums">{EDUCATION.period}</span>
              </div>
              <p className="text-[13px] text-white/35 mb-3">{EDUCATION.degree} · {EDUCATION.location}</p>
              <div className="flex flex-wrap gap-2">
                {EDUCATION.courses.map((c) => (
                  <span key={c} className="text-[11px] text-white/25 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stack */}
          <div className="space-y-6">
            {STACK_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-[11px] text-white/25 uppercase tracking-widest mb-3">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-[12px] text-white/45 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:text-white/65 transition-all duration-200 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-6" id="experience">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <h2 className="text-sm font-medium text-white/30 uppercase tracking-[0.15em]">Experience</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-white/[0.05] hidden sm:block" />

          <div className="space-y-10">
            {EXPERIENCE.map((role, idx) => (
              <motion.div
                key={role.company + role.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="sm:pl-8 relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-[-4px] top-[6px] w-[9px] h-[9px] rounded-full border border-white/20 bg-[#0a0a0a] hidden sm:block" />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <div>
                    <span className="text-[15px] font-semibold text-white/80 tracking-tight">{role.company}</span>
                    <span className="text-[13px] text-white/30 ml-2">{role.companyDetail}</span>
                  </div>
                  <span className="text-[12px] font-mono text-white/20 shrink-0 tabular-nums">{role.period}</span>
                </div>

                <p className="text-[12px] text-blue-400/50 font-medium mb-3 tracking-wide">{role.title}</p>

                <ul className="space-y-2">
                  {role.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3 text-[13px] text-white/40 leading-relaxed">
                      <span className="mt-[8px] w-[3px] h-[3px] rounded-full bg-white/20 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {idx < EXPERIENCE.length - 1 && (
                  <div className="mt-10 border-b border-white/[0.04] sm:hidden" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);

  function copyEmail(e: React.MouseEvent) {
    e.preventDefault();
    navigator.clipboard.writeText("aarnavnoble14@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Section className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-6" id="contact">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <h2 className="text-sm font-medium text-white/30 uppercase tracking-[0.15em]">
            Contact
          </h2>
        </div>

        <div className="max-w-md">
          <p className="text-[15px] text-white/50 leading-[1.8] mb-8">
            Open to collaborations, interesting projects, or just a conversation.
          </p>

          <div className="flex flex-col gap-3">
            {/* Email — copy to clipboard */}
            <button
              onClick={copyEmail}
              className="group flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-all duration-200 text-left w-full"
            >
              <span className="text-[12px] text-white/30 uppercase tracking-wider">Email</span>
              <span className="text-[14px] text-white/50 group-hover:text-white/80 transition-colors flex items-center gap-2">
                aarnavnoble14@gmail.com
                <span className="text-[11px] text-white/20 group-hover:text-blue-400/60 transition-colors font-mono">
                  {copied ? "copied!" : "copy"}
                </span>
              </span>
            </button>

            {[
              { label: "GitHub", href: LINKS.github, display: "AarnavNoble" },
              { label: "LinkedIn", href: LINKS.linkedin, display: "aarnav-noble" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener"
                className="group flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-all duration-200"
              >
                <span className="text-[12px] text-white/30 uppercase tracking-wider">{link.label}</span>
                <span className="text-[14px] text-white/50 group-hover:text-white/80 transition-colors">
                  {link.display}
                  <span className="ml-2 text-white/20 group-hover:text-white/40 transition-colors">&rarr;</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-[12px] text-white/15">&copy; {new Date().getFullYear()} Aarnav Noble</p>
          <p className="hidden sm:block text-[11px] text-white/[0.07] mt-1 font-mono">
            press <kbd className="px-1 py-0.5 rounded bg-white/[0.04] text-white/20">g</kbd> · <kbd className="px-1 py-0.5 rounded bg-white/[0.04] text-white/20">l</kbd> · <kbd className="px-1 py-0.5 rounded bg-white/[0.04] text-white/20">e</kbd>
          </p>
        </div>
        <div className="flex items-center gap-5">
          {[
            { label: "GitHub", href: LINKS.github },
            { label: "LinkedIn", href: LINKS.linkedin },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener"
              className="text-[12px] text-white/15 hover:text-white/40 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <p className="text-[12px] text-white/10">Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────── */

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-xl bg-white/[0.08] border border-white/[0.1] backdrop-blur-md text-[13px] text-white/70 font-mono pointer-events-none"
    >
      {message}
    </motion.div>
  );
}

export default function Home() {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

  function showToast(message: string) {
    const id = Date.now();
    setToast({ message, id });
    setTimeout(() => setToast((t) => (t?.id === id ? null : t)), 2000);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "g" || e.key === "G") window.open(LINKS.github, "_blank");
      if (e.key === "l" || e.key === "L") window.open(LINKS.linkedin, "_blank");
      if (e.key === "e" || e.key === "E") {
        navigator.clipboard.writeText("aarnavnoble14@gmail.com").then(() => showToast("Email copied"));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="pt-14">
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <Toast message={toast?.message ?? ""} visible={!!toast} />
    </>
  );
}
