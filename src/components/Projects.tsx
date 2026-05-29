"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Check, Users, Heart, BookOpen, ArrowRight } from "lucide-react";
import { SiReact, SiNodedotjs, SiMysql, SiPython } from "react-icons/si";

/* ── Sparkling star field ────────────────────────────── */
function SparkleField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + 2.5,
      })),
    []
  );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.id % 4 === 0 ? "#a78bfa" : s.id % 4 === 1 ? "#38bdf8" : s.id % 4 === 2 ? "#f9a8d4" : "#ffffff",
          }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.6, 0.4] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Types ───────────────────────────────────────────── */
type Tech = {
  label: string;
  Icon?: React.ComponentType<{ style?: React.CSSProperties }>;
  color: string;
};

type Project = {
  num: string;
  category: string;
  CategoryIcon: React.ComponentType<{ style?: React.CSSProperties; className?: string }>;
  title: string;
  description: string;
  features: string[];
  image: string;
  techs: Tech[];
  demo?: string;
  accent: string;
  liveDemo?: string;
};

/* ── Data ────────────────────────────────────────────── */
const projects: Project[] = [
  {
    num: "01",
    category: "MLM Application",
    CategoryIcon: Users,
    title: "MLM Business Platform",
    description:
      "A complete multi-level marketing system with e-wallet, commission management, genealogy tree, and analytics & reports.",
    features: [
      "E-Wallet System",
      "Genealogy Tree",
      "Commission Management",
      "Analytics & Reports",
    ],
    image: "/mlm.png",
    liveDemo: "https://user.infinitemlmsoftware.com/login/binaryaddon/INF00123?source=direct?source=https://ioss.co/&preset=true&_gl=1*17gksge*_gcl_au*MjYxNTEzNzk4LjE3ODAwNjgwMzg.*_ga*ODk0NTMyODg1LjE3MzkzNjU5MzU.*_ga_VX1R0RHREG*czE3ODAwNjgwMzgkbzMkZzEkdDE3ODAwNjgwNzYkajIyJGwwJGgxODA3NDA3MDcx",
    techs: [
      { label: "React", Icon: SiReact, color: "#61DAFB" },
      { label: "Node.js", Icon: SiNodedotjs, color: "#68A063" },
      { label: "SQL", Icon: SiMysql, color: "#4479A1" },
    ],
    accent: "#7c3aed",

  },
  {
    num: "02",
    category: "LMS Platform",
    CategoryIcon: BookOpen,
    title: "Learning Management System",
    description:
      "A powerful LMS for online learning with course management, student progress tracking, quizzes, and instructor dashboards.",
    features: [
      "Course Management",
      "Progress Tracking",
      "Quiz System",
      "Instructor Dashboard",
    ],
    image: "/lms.png",
    techs: [
      { label: "React", Icon: SiReact, color: "#61DAFB" },
      { label: "Node.js", Icon: SiNodedotjs, color: "#68A063" },
      { label: "SQL", Icon: SiMysql, color: "#4479A1" },
    ],
    accent: "#0ea5e9",
    liveDemo:"https://lmsuser.infinitemlmsoftware.com/login?email=bugeripu@cyclelove.cc"
  },
  {
    num: "03",
    category: "Dating App",
    CategoryIcon: Heart,
    title: "Dating & Match Platform",
    description:
      "A modern matchmaking platform with real-time chat via WebSockets, smart matching algorithm, and advanced profile discovery.",
    features: [
      "Smart Matching",
      "Real-Time Chat",
      "Profile Discovery",
      "Advanced Filters",
    ],
    image: "/dating.png",
    techs: [
      { label: "React", Icon: SiReact, color: "#61DAFB" },
      { label: "Python", Icon: SiPython, color: "#3776AB" },
      { label: "WebSocket", color: "#e879f9" },
    ],
    accent: "#ec4899",
  },
];

/* ── Project row ─────────────────────────────────────── */
function ProjectRow({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { CategoryIcon } = project;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 55 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      className="relative flex items-stretch gap-4 sm:gap-6"
    >
      {/* Number + connector */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        <div
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold font-mono shrink-0 z-10"
          style={{
            border: `2px solid ${project.accent}65`,
            color: project.accent,
            background: `${project.accent}12`,
            boxShadow: `0 0 14px ${project.accent}25`,
          }}
        >
          {project.num}
        </div>
        {index < total - 1 && (
          <div
            className="w-px flex-1 mt-3 min-h-[24px]"
            style={{
              background: `linear-gradient(to bottom, ${project.accent}35, transparent)`,
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 p-5 sm:p-7 lg:p-8 rounded-2xl mb-5 sm:mb-7 min-w-0"
        style={{
          background: `linear-gradient(rgba(6,2,18,0.88), rgba(6,2,18,0.88)) padding-box, linear-gradient(135deg, ${project.accent}85 0%, ${project.accent}18 45%, ${project.accent}60 100%) border-box`,
          border: "1px solid transparent",
          backdropFilter: "blur(14px)",
          boxShadow: `0 0 32px ${project.accent}22, 0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
      >
        {/* ── Left: content ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Category badge */}
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: `${project.accent}18`,
                border: `1px solid ${project.accent}38`,
              }}
            >
              <CategoryIcon style={{ width: 16, height: 16, color: project.accent }} />
            </div>
            <span
              className="text-xs font-mono tracking-widest uppercase"
              style={{ color: `${project.accent}cc` }}
            >
              {project.category}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Feature checklist */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5">
            {project.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs text-slate-300">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    border: `1px solid ${project.accent}50`,
                    background: `${project.accent}15`,
                  }}
                >
                  <Check
                    className="w-2.5 h-2.5"
                    style={{ color: project.accent }}
                  />
                </div>
                {f}
              </div>
            ))}
          </div>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techs.map((tech) => (
              <span
                key={tech.label}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium"
                style={{
                  background: `${tech.color}12`,
                  border: `1px solid ${tech.color}28`,
                  color: tech.color,
                }}
              >
                {tech.Icon && <tech.Icon style={{ width: 11, height: 11 }} />}
                {tech.label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto">
            <a
              href={project.liveDemo ?? "#"}
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{
                background: `linear-gradient(135deg, ${project.accent}, ${project.accent}88)`,
                boxShadow: `0 4px 24px ${project.accent}38`,
              }}
            >
              Live Demo
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ── Right: browser mockup screenshot ── */}
        <div className="w-full lg:w-[52%] shrink-0 self-center">
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: `1px solid ${project.accent}28`,
              boxShadow: `0 24px 70px ${project.accent}20, 0 0 0 1px rgba(255,255,255,0.03)`,
            }}
          >
            {/* Browser chrome dots */}
            <div
              className="flex items-center gap-1.5 px-3 py-2"
              style={{
                background: `${project.accent}15`,
                borderBottom: `1px solid ${project.accent}22`,
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            {/* Screenshot */}
            <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────── */
export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0b0518 0%, #060212 45%, #0b0518 100%)",
      }}
    >
      {/* Sparkles */}
      <SparkleField />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.08]" />

      {/* Top/bottom fades */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-dark-bg to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none" />

      {/* Central ambient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-mono tracking-widest uppercase"
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.32)",
              color: "#a78bfa",
            }}
          >
            My Work
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5">
            <span className="text-white">Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
            Here are some of my recent projects. Each one was crafted with
            passion, focusing on clean code, performance, and great UX.
          </p>
        </motion.div>

        {/* Rows */}
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.num}
              project={project}
              index={i}
              total={projects.length}
            />
          ))}
        </div>

        {/* View All button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex justify-center mt-8"
        >
          <a
            href="https://github.com/sethukoodaranhi?tab=repositories"
            target="_blank"
            className="group inline-flex items-center gap-3 px-10 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background:
                "linear-gradient(rgba(6,2,18,0.92), rgba(6,2,18,0.92)) padding-box, linear-gradient(135deg, rgba(124,58,237,0.85) 0%, rgba(236,72,153,0.7) 50%, rgba(124,58,237,0.85) 100%) border-box",
              border: "1px solid transparent",
              boxShadow:
                "0 0 28px rgba(124,58,237,0.22), 0 0 60px rgba(124,58,237,0.08)",
            }}
          >
            View All Projects
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
