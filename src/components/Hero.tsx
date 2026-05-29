"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from "react-icons/si";
import Image from "next/image";

/* ─── Floating sparkle particles ─────────────────────────────────────────── */

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 4,
}));

function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.id % 3 === 0
                ? "rgba(217,70,239,0.8)"
                : p.id % 3 === 1
                ? "rgba(139,92,246,0.8)"
                : "rgba(45,212,191,0.6)",
            boxShadow:
              p.id % 3 === 0
                ? "0 0 6px rgba(217,70,239,0.9)"
                : p.id % 3 === 1
                ? "0 0 6px rgba(139,92,246,0.9)"
                : "0 0 6px rgba(45,212,191,0.8)",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
            y: [0, -30, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Profile avatar ───────────────────────────────────────────────────────── */

function ProfileAvatar() {
  const CIRCLE = 320; // diameter px

  return (
    <div
      className="relative"
      style={{ width: CIRCLE + 120, height: CIRCLE + 100 }}
    >
      {/* ── Deep background glow behind everything ─────────────────── */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute pointer-events-none rounded-full"
        style={{
          width: CIRCLE + 120, height: CIRCLE + 120,
          top: -20, left: -20,
          background:
            "radial-gradient(ellipse, rgba(109,40,217,0.35) 0%, rgba(139,92,246,0.18) 40%, transparent 70%)",
        }}
      />

      {/* ── Rotating ring 1 (outer, slow) ──────────────────────────── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute pointer-events-none rounded-full"
        style={{
          width: CIRCLE + 68, height: CIRCLE + 68,
          top: (CIRCLE + 100 - (CIRCLE + 68)) / 2,
          left: (CIRCLE + 120 - (CIRCLE + 68)) / 2,
          border: "1px dashed rgba(139,92,246,0.32)",
        }}
      >
        {/* Travelling dot */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
          style={{ background: "#a78bfa", boxShadow: "0 0 10px rgba(167,139,250,1), 0 0 20px rgba(167,139,250,0.5)" }}
        />
      </motion.div>

      {/* ── Rotating ring 2 (inner, faster, counter) ───────────────── */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute pointer-events-none rounded-full"
        style={{
          width: CIRCLE + 34, height: CIRCLE + 34,
          top: (CIRCLE + 100 - (CIRCLE + 34)) / 2,
          left: (CIRCLE + 120 - (CIRCLE + 34)) / 2,
          border: "1px dashed rgba(217,70,239,0.25)",
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: "#e879f9", boxShadow: "0 0 8px rgba(232,121,249,1)" }}
        />
      </motion.div>

      {/* ── Main photo circle ───────────────────────────────────────── */}
      <div
        className="absolute overflow-hidden rounded-full"
        style={{
          width: CIRCLE, height: CIRCLE,
          top: (CIRCLE + 100 - CIRCLE) / 2,
          left: (CIRCLE + 120 - CIRCLE) / 2,
          background: "linear-gradient(160deg,#1c0845 0%,#0d0520 55%,#170830 100%)",
          border: "2px solid rgba(139,92,246,0.5)",
          boxShadow: [
            "0 0 0 1px rgba(217,70,239,0.15)",
            "0 0 50px rgba(139,92,246,0.6)",
            "0 0 100px rgba(217,70,239,0.3)",
            "0 0 160px rgba(109,40,217,0.2)",
            "inset 0 0 70px rgba(109,40,217,0.35)",
            "inset 0 2px 0 rgba(255,255,255,0.08)",
          ].join(", "),
        }}
      >
        {/* Specular gloss — top-left */}
        <div
          className="absolute pointer-events-none z-10"
          style={{
            top: "5%", left: "8%", width: "46%", height: "40%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.11) 0%, rgba(196,181,253,0.05) 45%, transparent 70%)",
          }}
        />
        {/* Bottom magenta rim */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{
            height: "40%",
            background: "linear-gradient(to top, rgba(217,70,239,0.22) 0%, transparent 100%)",
          }}
        />
        {/* The actual photo */}
        <Image
          src="/avatar.png"
          alt="Sethulakshmi — Full Stack Developer"
          fill
          className="object-cover"
          style={{ objectPosition: "center 8%" }}
          priority
        />
      </div>

      {/* ── MERN icon chips — on the orbit ring at 45°/135°/225°/315° ── */}

      {/* React — top-right (45°) */}
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute flex items-center justify-center rounded-xl"
        style={{
          width: 40, height: 40,
          top: 53, left: 337,
          background: "rgba(6,2,18,0.88)",
          border: "1px solid rgba(97,218,251,0.35)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 0 14px rgba(97,218,251,0.5), 0 0 28px rgba(97,218,251,0.18)",
        }}
      >
        <SiReact style={{ width: 20, height: 20, color: "#61DAFB" }} />
      </motion.div>

      {/* Node.js — bottom-right (135°) */}
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        className="absolute flex items-center justify-center rounded-xl"
        style={{
          width: 40, height: 40,
          top: 327, left: 337,
          background: "rgba(6,2,18,0.88)",
          border: "1px solid rgba(104,160,99,0.35)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 0 14px rgba(104,160,99,0.5), 0 0 28px rgba(104,160,99,0.18)",
        }}
      >
        <SiNodedotjs style={{ width: 20, height: 20, color: "#68A063" }} />
      </motion.div>

      {/* Express — bottom-left (225°) */}
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute flex items-center justify-center rounded-xl"
        style={{
          width: 40, height: 40,
          top: 327, left: 63,
          background: "rgba(6,2,18,0.88)",
          border: "1px solid rgba(226,232,240,0.2)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 0 14px rgba(226,232,240,0.22), 0 0 28px rgba(226,232,240,0.08)",
        }}
      >
        <SiExpress style={{ width: 20, height: 20, color: "#e2e8f0" }} />
      </motion.div>

      {/* MongoDB — top-left (315°) */}
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute flex items-center justify-center rounded-xl"
        style={{
          width: 40, height: 40,
          top: 53, left: 63,
          background: "rgba(6,2,18,0.88)",
          border: "1px solid rgba(71,162,72,0.35)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 0 14px rgba(71,162,72,0.5), 0 0 28px rgba(71,162,72,0.18)",
        }}
      >
        <SiMongodb style={{ width: 20, height: 20, color: "#47A248" }} />
      </motion.div>
    </div>
  );
}

/* ─── Social links ─────────────────────────────────────────────────────────── */

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/sethukoodaranhi", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/sethulakshmi-as-638160232/", label: "LinkedIn" },
  // { icon: FaTwitter, href: "https://twitter.com/sethulakshmi", label: "Twitter" }
  // ,
];

/* ─── Main component ────────────────────────────────────────────────────────── */

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg"
    >
      {/* Grid + noise */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-noise" />

      {/* Top radial ambient light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(109,40,217,0.22) 0%, transparent 70%)",
        }}
      />

      {/* Left edge ambient glow */}
      <div
        className="absolute inset-y-0 left-0 w-[30%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 0% 55%, rgba(109,40,217,0.18) 0%, rgba(139,92,246,0.08) 45%, transparent 75%)",
        }}
      />

      {/* Right edge ambient glow */}
      <div
        className="absolute inset-y-0 right-0 w-[30%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 100% 50%, rgba(139,92,246,0.16) 0%, rgba(217,70,239,0.07) 45%, transparent 75%)",
        }}
      />

      {/* Floating sparkles */}
      <Particles />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-8 sm:px-12 lg:px-16 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* ── Left: Text ─────────────────────────────────────────────── */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.25)",
                color: "#a78bfa",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 20px rgba(139,92,246,0.1)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 shadow-[0_0_6px_rgba(217,70,239,1)] animate-pulse" />
              {/* <Sparkles className="w-3.5 h-3.5" /> */}
              Available for hire · Open to opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-[1.08]"
            >
              <span className="text-white">Hi, I&apos;m </span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #c084fc 0%, #e879f9 40%, #a78bfa 80%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 20px rgba(217,70,239,0.35))",
                }}
              >
                Sethulakshmi
              </span>
            </motion.h1>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="text-xl sm:text-2xl text-violet-200/80 font-semibold tracking-wide">
                Full Stack Developer
              </span>
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#4ade80", boxShadow: "0 0 10px rgba(74,222,128,0.9)" }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.43 }}
              className="text-base text-violet-300/60 leading-relaxed mb-10 max-w-lg"
            >
              I craft{" "}
              <span className="text-violet-200 font-medium">high-performance web applications</span>{" "}
             with clean code and intuitive UX — transforming complex ideas into scalable, production-ready solutions.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.53 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)",
                  boxShadow: "0 0 25px rgba(139,92,246,0.45), 0 0 50px rgba(192,38,211,0.2)",
                }}
              >
                View Projects
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-violet-200 text-sm transition-all duration-300 hover:scale-105 active:scale-95 hover:text-white"
                style={{
                  background: "rgba(139,92,246,0.08)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  backdropFilter: "blur(12px)",
                }}
              >
                Contact Me
              </button>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.63 }}
              className="flex items-center gap-4"
            >
              <span className="text-violet-400/40 text-sm">Find me on</span>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-violet-400 hover:text-white transition-all duration-200 hover:scale-110"
                    style={{
                      background: "rgba(139,92,246,0.08)",
                      border: "1px solid rgba(139,92,246,0.2)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Profile Photo ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <ProfileAvatar />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "rgba(167,139,250,0.4)" }}
        >
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
