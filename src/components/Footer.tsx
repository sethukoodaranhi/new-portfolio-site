"use client";

import { motion } from "framer-motion";
import { Code2, Heart, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const socials = [
  { icon: FaGithub, href: "https://github.com/sethukoodaranhi", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/sethulakshmi-as-638160232/", label: "LinkedIn" },
  // { icon: FaTwitter, href: "https://twitter.com/sethukoodaranhi", label: "Twitter" },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-dark-card border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-10 pb-10 border-b border-white/5">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Sethu<span className="text-primary-400">.</span>dev
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Full Stack Developer building high-performance web apps with clean code and great UX.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg glass border border-white/8 flex items-center justify-center text-slate-500 hover:text-white hover:border-primary-500/40 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(link.href.slice(1))
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-slate-500 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-widest">
              Built With
            </h4>
            <ul className="space-y-2">
              {["Next.js 14 (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "Nodemailer"].map(
                (tech) => (
                  <li key={tech} className="text-sm text-slate-500 font-mono">
                    {tech}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 flex items-center gap-1.5">
            © {new Date().getFullYear()} Sethulakshmi. Made with{" "}
            <Heart className="w-3 h-3 text-red-500 fill-current" /> in India.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-lg glass border border-white/8 flex items-center justify-center text-slate-500 hover:text-white hover:border-primary-500/40 transition-all duration-200"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
