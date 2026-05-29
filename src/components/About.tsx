"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiMysql,
  SiGit,
  SiDocker,
  SiLinux,
  SiFigma,
  SiPrisma,
  SiPostman,
  SiGithub,
  SiHtml5,
  SiSocketdotio,
} from "react-icons/si";
import { FaCss3 } from "react-icons/fa";
import { FaAws } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

type Skill = {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  level: number;
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26", level: 95 },
      { name: "CSS3", icon: FaCss3, color: "#1572B6", level: 92 },
      { name: "React", icon: SiReact, color: "#61DAFB", level: 95 },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 90 },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 88 },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: 92 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 95 },
      { name: "Express.js", icon: SiExpress, color: "#ffffff", level: 95 },
      { name: "Socket.io", icon: SiSocketdotio, color: "#ffffff", level: 80 },
      { name: "Python", icon: SiPython, color: "#3776AB", level: 72 },
    ],
  }
  ,
  {
    title: "Database",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1", level: 90 },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 80 },
      { name: "Redis", icon: SiRedis, color: "#DC382D", level: 50 },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032", level: 92 },
      { name: "Docker", icon: SiDocker, color: "#2496ED", level: 78 },
      { name: "AWS", icon: FaAws, color: "#FF9900", level: 70 },
    ],
  },
];

const otherTools = [
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "VS Code", icon: VscVscode, color: "#007ACC" },
];
function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <skill.icon
            className="w-4 h-4 flex-shrink-0"
            style={{ color: skill.color }}
          />
          <span className="text-sm font-medium text-slate-300">{skill.name}</span>
        </div>
        <span className="text-xs text-slate-500 font-mono">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
        />
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary-400 font-mono text-sm mb-3 tracking-widest uppercase">
            Get to know me
          </p>
          <h2 className="section-heading">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-8 space-y-5 border border-white/5">
              <p className="text-slate-300 leading-relaxed text-base">
                I&apos;m a passionate Full Stack Developer with{" "}
                <span className="text-primary-400 font-semibold">
                  4+ years of experience
                </span>{" "}
                building scalable and user-focused web applications using modern
                technologies. I enjoy transforming complex ideas into clean,
                high-performance digital experiences.
              </p>

              <p className="text-slate-400 leading-relaxed text-base">
                My expertise lies in the React.js / Next.js ecosystem on the frontend
                and Node.js on the backend, with hands-on experience working with
                MongoDB and MySQL databases. I&apos;m passionate about writing
                clean, maintainable code and creating applications that are fast,
                responsive, and easy to scale.
              </p>

              <p className="text-slate-400 leading-relaxed text-base">
                Over the years, I&apos;ve worked on multiple real-world products
                including MLM platforms, learning management systems, and dating
                applications with real-time features. I love solving challenging
                problems, improving user experience, and continuously learning new
                technologies to grow as a developer.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "4+", label: "Years Exp." },
                { value: "25+", label: "Projects" },
                { value: "25+", label: "Clients" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-xl p-5 text-center border border-white/5"
                >
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Other tools badges */}
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">
                Also using
              </p>
              <div className="flex flex-wrap gap-2">
                {otherTools.map(({ name, icon: Icon, color }) => (
                  <div
                    key={name}
                    className="flex items-center gap-1.5 glass-card border border-white/5 px-3 py-1.5 rounded-lg text-sm text-slate-300"
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {skillCategories.map((cat, ci) => (
              <div
                key={cat.title}
                className="glass-card rounded-2xl p-6 border border-white/5"
              >
                <h3 className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-5">
                  {cat.title}
                </h3>
                <div className="space-y-4">
                  {cat.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      index={ci * 4 + si}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
