import React, { useEffect, useState } from "react";
/* eslint-disable */
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Full Stack Developer",
  "Data Scientist",
  "Software Engineer",
  "Data Analyst",
  "Problem Solver",
  "Collaborator",
  "System Minded",
];

const dots = [
  { x: 6,  y: 18, size: 2,   opacity: 0.25 },
  { x: 93, y: 12, size: 1.5, opacity: 0.2  },
  { x: 2,  y: 72, size: 1,   opacity: 0.2  },
  { x: 97, y: 58, size: 2,   opacity: 0.15 },
  { x: 52, y: 5,  size: 1.5, opacity: 0.18 },
  { x: 18, y: 92, size: 1,   opacity: 0.15 },
  { x: 82, y: 88, size: 2,   opacity: 0.18 },
];

function Cursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn(v => !v), 530);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{
      display: "inline-block",
      width: 3,
      height: "0.75em",
      marginLeft: 6,
      borderRadius: 2,
      verticalAlign: "middle",
      background: on ? "#E8613C" : "transparent",
      transition: "background 0.1s",
    }} />
  );
}

function CTAButton({ href, primary, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "12px 28px",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.01em",
        textDecoration: "none",
        transition: "all 0.2s ease",
        cursor: "pointer",
        transform: hovered ? "translateY(-2px)" : "none",
        ...(primary ? {
          background: hovered ? "#d45530" : "#E8613C",
          color: "#fff",
          border: "1px solid transparent",
          boxShadow: hovered ? "0 8px 24px rgba(232,97,60,0.3)" : "none",
        } : {
          background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
          color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)",
          border: hovered ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.08)",
        }),
      }}
    >
      {children}
    </a>
  );
}

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#0D0D0D",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, #0D0D0D 100%)",
      }} />

      {/* Dots */}
      {dots.map((d, i) => (
        <div key={i} style={{
          position: "absolute", left: `${d.x}%`, top: `${d.y}%`,
          width: d.size, height: d.size, borderRadius: "50%",
          background: "rgba(255,255,255,0.6)", opacity: d.opacity, pointerEvents: "none",
        }} />
      ))}

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 10,
        maxWidth: 900, width: "100%", padding: "0 32px",
        display: "flex", flexDirection: "column",
        boxSizing: "border-box",
      }}>

        {/* Hey I'm */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            marginBottom: 14,
            display: "block",
          }}
        >
          Hey, I'm
        </motion.span>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            margin: "0 0 22px 0",
            padding: "0 0 8px 0",
            fontSize: "clamp(54px, 9vw, 108px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
            overflow: "visible",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{
            background: "linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.6) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Cole </span><span style={{
            background: "linear-gradient(135deg, #E8613C 0%, #F0A878 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Plagens</span>
          <Cursor />
        </motion.h1>

        {/* Rotating role */}
        <div style={{ height: 48, marginBottom: 24, display: "flex", alignItems: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={roles[roleIndex]}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <div style={{
                width: 24, height: 2, flexShrink: 0, borderRadius: 2,
                background: "#E8613C",
              }} />
              <span style={{
                fontSize: "clamp(18px, 2.5vw, 28px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "rgba(255,255,255,0.7)",
              }}>
                {roles[roleIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            margin: "0 0 44px",
            maxWidth: 520,
            fontSize: 16,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.4)",
            fontWeight: 400,
          }}
        >
          I architect scalable software systems and data solutions designed for{" "}
          <span style={{ color: "rgba(255,255,255,0.75)" }}>performance</span>,{" "}
          <span style={{ color: "rgba(255,255,255,0.75)" }}>maintainability</span>, and{" "}
          <span style={{ color: "rgba(255,255,255,0.75)" }}>robustness</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
        >
          <CTAButton href="#projects" primary>
            View My Work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 6 }}>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CTAButton>
          <CTAButton href="#about">About Me</CTAButton>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;