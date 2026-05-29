"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiDocker,
  SiGraphql,
  SiPython,
} from "react-icons/si";

/* ── Orbit icons ───────────────────────────────────────────────────────── */

const ICONS = [
  { Icon: SiReact,      color: "#61DAFB", glow: "rgba(97,218,251,0.7)"  },
  { Icon: SiNextdotjs,  color: "#e2e8f0", glow: "rgba(226,232,240,0.5)" },
  { Icon: SiTypescript, color: "#3178C6", glow: "rgba(49,120,198,0.7)"  },
  { Icon: SiNodedotjs,  color: "#68A063", glow: "rgba(104,160,99,0.7)"  },
  { Icon: SiMongodb,    color: "#47A248", glow: "rgba(71,162,72,0.7)"   },
  { Icon: SiDocker,     color: "#2496ED", glow: "rgba(36,150,237,0.7)"  },
  { Icon: SiGraphql,    color: "#E10098", glow: "rgba(225,0,152,0.7)"   },
  { Icon: SiPython,     color: "#FFD43B", glow: "rgba(255,212,59,0.6)"  },
];

const ORBIT_R  = 150;   // horizontal radius (px)
const ORBIT_RY =  52;   // vertical   radius — flatten for 3D look
const ORBIT_DURATION = 16; // seconds for one full rotation

/* ── Single orbiting icon ───────────────────────────────────────────────── */

type OrbitIconProps = {
  Icon: React.ComponentType<{ style?: React.CSSProperties }>;
  color: string;
  glow: string;
  index: number;
  total: number;
};

function OrbitIcon({ Icon, color, glow, index, total }: OrbitIconProps) {
  const startAngle = (index / total) * Math.PI * 2;
  const angle = useMotionValue(startAngle);

  useEffect(() => {
    const controls = animate(angle, startAngle + Math.PI * 2, {
      duration: ORBIT_DURATION,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [angle, startAngle]);

  const x     = useTransform(angle, (a) => Math.cos(a) * ORBIT_R);
  const y     = useTransform(angle, (a) => Math.sin(a) * ORBIT_RY);
  const scale = useTransform(angle, (a) => 0.6 + 0.55 * ((Math.sin(a) + 1) / 2));
  const opacity = useTransform(angle, (a) => 0.35 + 0.65 * ((Math.sin(a) + 1) / 2));
  const zIndex  = useTransform(angle, (a) => Math.round(5 + 15 * ((Math.sin(a) + 1) / 2)));

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%", left: "50%",
        x, y,
        translateX: "-50%",
        translateY: "-50%",
        scale, opacity, zIndex,
      }}
    >
      <div
        style={{
          width: 36, height: 36,
          borderRadius: 10,
          background: "rgba(10,4,26,0.92)",
          border: `1px solid ${glow.replace(/[\d.]+\)$/, "0.45)")}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 10px ${glow}, 0 0 22px ${glow.replace(/[\d.]+\)$/, "0.25)")}`,
          backdropFilter: "blur(8px)",
        }}
      >
        <Icon style={{ color, width: 18, height: 18 }} />
      </div>
    </motion.div>
  );
}

/* ── Stats pills ───────────────────────────────────────────────────────── */

const STATS = [
  { value: "50+", label: "Projects" },
  { value: "5yr", label: "Exp." },
  { value: "30+", label: "Clients" },
];

/* ── Main export ────────────────────────────────────────────────────────── */

export default function AvatarOrbit() {
  return (
    <div className="relative flex flex-col items-center" style={{ width: 360, height: 400 }}>

      {/* ── Outer pulsing aura ──────────────────────────────────────── */}
      <motion.div
        animate={{ scale: [1, 1.07, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: -40,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.22) 0%, rgba(217,70,239,0.1) 45%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Orbit path ring (visual ellipse) ────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width:  ORBIT_R * 2 + 44,
          height: ORBIT_RY * 2 + 44,
          marginTop:  -(ORBIT_RY + 22),
          marginLeft: -(ORBIT_R + 22),
          borderRadius: "50%",
          border: "1px solid rgba(139,92,246,0.14)",
          pointerEvents: "none",
        }}
      />

      {/* ── Orbiting icons ──────────────────────────────────────────── */}
      {ICONS.map((ic, i) => (
        <OrbitIcon key={i} {...ic} index={i} total={ICONS.length} />
      ))}

      {/* ── Central avatar sphere ───────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 190, height: 190,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background: "linear-gradient(145deg, #1c0a42 0%, #0e0520 45%, #180935 100%)",
          border: "1.5px solid rgba(139,92,246,0.45)",
          boxShadow: [
            "0 0 0 1px rgba(217,70,239,0.12)",
            "0 0 35px rgba(139,92,246,0.55)",
            "0 0 70px rgba(217,70,239,0.28)",
            "0 0 130px rgba(139,92,246,0.14)",
            "inset 0 0 55px rgba(109,40,217,0.32)",
            "inset 0 1px 0 rgba(255,255,255,0.09)",
          ].join(", "),
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        {/* Specular top-left highlight */}
        <div
          style={{
            position: "absolute",
            top: "10%", left: "13%",
            width: "42%", height: "36%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, rgba(167,139,250,0.04) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Scan line sweep */}
        <motion.div
          animate={{ top: ["8%", "88%", "8%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: 0, right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, transparent 5%, rgba(217,70,239,0.55) 30%, rgba(167,139,250,0.8) 50%, rgba(217,70,239,0.55) 70%, transparent 95%)",
            pointerEvents: "none",
          }}
        />

        {/* Bottom gradient rim */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "35%",
            background:
              "linear-gradient(to top, rgba(217,70,239,0.14) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: "3.8rem", filter: "drop-shadow(0 0 18px rgba(217,70,239,0.6))" }}
          >
            👨‍💻
          </motion.div>
          <TypewriterLabel />
        </div>
      </div>

      {/* ── Stats pills ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: 0,
          display: "flex",
          gap: 10,
        }}
      >
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            style={{
              background: "rgba(14,8,32,0.88)",
              border: "1px solid rgba(139,92,246,0.22)",
              borderRadius: 12,
              padding: "7px 16px",
              textAlign: "center",
              backdropFilter: "blur(14px)",
              boxShadow: "0 0 18px rgba(139,92,246,0.14), 0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #c084fc, #e879f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.2,
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontSize: "0.58rem",
                color: "rgba(167,139,250,0.5)",
                marginTop: 2,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Typewriter label inside sphere ────────────────────────────────────── */

const LABELS = ["<developer />", "fullstack dev", "open to work", "let's build 🚀"];

function TypewriterLabel() {
  // Cycle through labels with a simple motion animation
  return (
    <motion.div
      key="label"
      style={{
        fontFamily: "var(--font-jetbrains-mono, monospace)",
        fontSize: "0.62rem",
        color: "rgba(196,181,253,0.75)",
        letterSpacing: "0.04em",
      }}
    >
      {LABELS[0]}
    </motion.div>
  );
}

