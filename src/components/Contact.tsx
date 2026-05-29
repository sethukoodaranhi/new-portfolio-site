"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  Send,
  User,
  Mail,
  Tag,
  PenLine,
  Shield,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa";

const MAX_MSG = 500;

type FormData = { name: string; email: string; subject: string; message: string };
type FormErrors = Partial<FormData>;
type Status = "idle" | "loading" | "success" | "error";

function validate(data: FormData): FormErrors {
  const e: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    e.name = "Name must be at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    e.email = "Please enter a valid email address.";
  if (!data.subject.trim() || data.subject.trim().length < 3)
    e.subject = "Subject must be at least 3 characters.";
  if (!data.message.trim() || data.message.trim().length < 10)
    e.message = "Message must be at least 10 characters.";
  return e;
}

const socials = [
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/sethukoodaranhi" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/sethulakshmi-as-638160232/" },
  // { Icon: FaTwitter, label: "Twitter", href: "https://twitter.com/sethukoodaranhi" },
  { Icon: FaEnvelope, label: "Email", href: "mailto:sethukoodaranhi@gmail.com" },
];

const infoItems = [
  { Icon: MapPin, label: "Location", value: "Kerala, India", dot: null as string | null },
  { Icon: Clock, label: "Availability", value: "Mon–Fri, 9am–6pm IST", dot: null as string | null },
  { Icon: Briefcase, label: "Open to work", value: "Freelance & Full-time", dot: "#22c55e" as string | null },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_MSG) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormData]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormData] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(form)[name as keyof FormData] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(newErrors).length > 0) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-600 " +
    "transition-all duration-200 focus:outline-none focus:ring-2 bg-white/[0.04]";
  const inputStyle = (field: keyof FormData) =>
    `${inputBase} ${
      errors[field] && touched[field]
        ? "border border-red-500/50 focus:ring-red-500/20"
        : "border border-white/[0.08] focus:border-purple-500/50 focus:ring-purple-500/20"
    }`;

  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #060212 0%, #0a0418 50%, #060212 100%)",
      }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-dark-bg to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none" />

      <div
        ref={ref}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-[44%_56%] gap-10 items-start">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col"
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 w-fit"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.3)",
              }}
            >
              <Send className="w-3 h-3 text-purple-400" />
              <span className="text-xs font-mono tracking-widest uppercase text-purple-400">
                Let&apos;s Work Together
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              <span className="text-white">Get In </span>
              <span className="gradient-text">Touch</span>
            </h2>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Have a project in mind or just want to say hi?<br />
              I&apos;d love to hear from you. I typically respond within{" "}
              <span className="font-semibold" style={{ color: "#a78bfa" }}>
                24 hours.
              </span>
            </p>

            {/* Girl image area — portrait 500×680 works best here */}
            <div className="relative h-[420px] sm:h-[480px]">
              {/* Glow orb */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124,58,237,0.38) 0%, rgba(124,58,237,0.1) 50%, transparent 75%)",
                  filter: "blur(32px)",
                }}
              />

              {/* Girl image */}
              <Image
                src="/contactUsimage.png"
                alt="Contact illustration"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="(max-width: 1024px) 100vw, 44vw"
              />

              {/* Floating envelope bubble */}
              <motion.div
                animate={{ y: [-6, 7, -6] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-10 w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(124,58,237,0.22)",
                  border: "1.5px solid rgba(124,58,237,0.55)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 0 22px rgba(124,58,237,0.45)",
                }}
              >
                <FaEnvelope className="w-5 h-5 text-purple-400" />
              </motion.div>

              {/* New message notification */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.85, duration: 0.5 }}
                className="absolute bottom-4 left-0 sm:-left-2 rounded-xl p-3 flex items-center gap-3"
                style={{
                  background:
                    "linear-gradient(rgba(8,3,22,0.95), rgba(8,3,22,0.95)) padding-box, " +
                    "linear-gradient(135deg, rgba(124,58,237,0.8) 0%, rgba(124,58,237,0.12) 50%, rgba(168,85,247,0.6) 100%) border-box",
                  border: "1px solid transparent",
                  backdropFilter: "blur(18px)",
                  boxShadow: "0 0 22px rgba(124,58,237,0.2), 0 8px 36px rgba(0,0,0,0.55)",
                  minWidth: 218,
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(124,58,237,0.22)",
                    border: "1px solid rgba(124,58,237,0.38)",
                  }}
                >
                  <FaEnvelope className="w-4 h-4 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-semibold text-purple-400">New Message</p>
                    <span className="text-xs text-slate-500">2m ago</span>
                  </div>
                  <p className="text-xs text-white font-medium truncate">contact@example.com</p>
                  <p className="text-xs text-slate-400 truncate">Let&apos;s discuss your project!</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0 animate-pulse" />
              </motion.div>
            </div>

            {/* Social links */}
            <div className="mt-5 flex flex-col items-center">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                Let&apos;s Connect
              </p>
              <div className="flex items-center gap-3">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                      style={{
                        background: "rgba(124,58,237,0.12)",
                        border: "1px solid rgba(124,58,237,0.28)",
                      }}
                    >
                      <Icon className="w-4 h-4 text-slate-300 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Form card */}
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background:
                  "linear-gradient(rgba(6,2,18,0.93), rgba(6,2,18,0.93)) padding-box, " +
                  "linear-gradient(135deg, rgba(124,58,237,0.75) 0%, rgba(124,58,237,0.15) 50%, rgba(168,85,247,0.55) 100%) border-box",
                border: "1px solid transparent",
                backdropFilter: "blur(18px)",
                boxShadow: "0 0 44px rgba(124,58,237,0.12), 0 24px 64px rgba(0,0,0,0.45)",
              }}
            >
              {/* Card header */}
              <div className="flex items-center gap-2.5 mb-6">
                <h3 className="text-lg font-bold text-purple-400">Send Me a Message</h3>
                <Send className="w-4 h-4 text-purple-400" />
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-secondary mt-2 text-sm"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {status === "error" && (
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                      <XCircle className="w-4 h-4 shrink-0" />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Name <span className="text-purple-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        <input
                          name="name" type="text" placeholder="John Doe"
                          value={form.name} onChange={handleChange} onBlur={handleBlur}
                          className={inputStyle("name")}
                        />
                      </div>
                      {errors.name && touched.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Email <span className="text-purple-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        <input
                          name="email" type="email" placeholder="john@example.com"
                          value={form.email} onChange={handleChange} onBlur={handleBlur}
                          className={inputStyle("email")}
                        />
                      </div>
                      {errors.email && touched.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Subject <span className="text-purple-400">*</span>
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                      <input
                        name="subject" type="text" placeholder="Project Inquiry"
                        value={form.subject} onChange={handleChange} onBlur={handleBlur}
                        className={inputStyle("subject")}
                      />
                    </div>
                    {errors.subject && touched.subject && (
                      <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Message <span className="text-purple-400">*</span>
                    </label>
                    <div className="relative">
                      <PenLine className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                      <textarea
                        name="message" rows={5} placeholder="Tell me about your project..."
                        value={form.message} onChange={handleChange} onBlur={handleBlur}
                        className={`${inputStyle("message")} resize-none`}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      {errors.message && touched.message ? (
                        <p className="text-red-400 text-xs">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <p className="text-xs text-slate-600 ml-auto">
                        {form.message.length}/{MAX_MSG}
                      </p>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
                      boxShadow: "0 4px 30px rgba(124,58,237,0.5)",
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  {/* Privacy */}
                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1">
                    <Shield className="w-3.5 h-3.5 shrink-0" />
                    Your information is safe with me. I will never share it.
                  </div>
                </form>
              )}
            </div>

            {/* Info bar */}
            <div
              className="grid grid-cols-3 rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(124,58,237,0.2)" }}
            >
              {infoItems.map(({ Icon, label, value, dot }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 px-3 sm:px-4 py-3"
                  style={{
                    background: "rgba(124,58,237,0.06)",
                    borderRight:
                      i < infoItems.length - 1
                        ? "1px solid rgba(124,58,237,0.18)"
                        : undefined,
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: dot ? `${dot}20` : "rgba(124,58,237,0.18)",
                    }}
                  >
                    {dot ? (
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ background: dot }}
                      />
                    ) : (
                      <Icon className="w-3 h-3 text-purple-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-purple-400 leading-tight">
                      {label}
                    </p>
                    <p className="text-xs text-slate-300 leading-tight truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
