import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from "react-icons/fa";
/* eslint-disable */
import { motion } from "framer-motion";

/* ── Social / CTA link data ── */
const links = [
  {
    label: "GitHub",
    icon: <FaGithub size={15} />,
    href: "https://github.com/colep39",
    primary: true,
  },
  {
    label: "LinkedIn",
    icon: <FaLinkedin size={15} />,
    href: "https://www.linkedin.com/in/cole-plagens/",
    primary: false,
  },
  {
    label: "Resume",
    icon: <FaFileAlt size={15} />,
    href: "/cole_plagens_resume.pdf",
    primary: false,
  },
  {
    label: "Email",
    icon: <FaEnvelope size={15} />,
    href: "mailto:colep3@icloud.com",
    primary: false,
  },
];

/* ── Stat pill ── */
function StatPill({ value, label, accent }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      padding: "12px 20px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.07)",
      background: "rgba(255,255,255,0.03)",
    }}>
      <span style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 20,
        fontWeight: 700,
        color: accent,
        lineHeight: 1,
      }}>{value}</span>
      <span style={{
        fontSize: 10,
        letterSpacing: "0.12em",
        color: "rgba(255,255,255,0.35)",
        textTransform: "uppercase",
      }}>{label}</span>
    </div>
  );
}

/* ── Link button ── */
function LinkButton({ label, icon, href, primary }) {
  const [hovered, setHovered] = useState(false);

  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 20px",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    letterSpacing: "0.01em",
    userSelect: "none",
  };

  const primaryStyle = {
    ...base,
    background: hovered
      ? "linear-gradient(135deg, #8B7FFF, #00E4B8)"
      : "linear-gradient(135deg, #7C6FFF, #00D4AA)",
    color: "#fff",
    border: "1px solid transparent",
    boxShadow: hovered ? "0 0 24px rgba(124,111,255,0.4)" : "none",
    transform: hovered ? "translateY(-1px)" : "none",
  };

  const ghostStyle = {
    ...base,
    background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
    color: hovered ? "#fff" : "rgba(255,255,255,0.6)",
    border: hovered
      ? "1px solid rgba(255,255,255,0.2)"
      : "1px solid rgba(255,255,255,0.08)",
    transform: hovered ? "translateY(-1px)" : "none",
  };

  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      style={primary ? primaryStyle : ghostStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ display: "flex", alignItems: "center", opacity: primary ? 1 : hovered ? 0.9 : 0.5 }}>
        {icon}
      </span>
      {label}
    </a>
  );
}

/* ── Main component ── */
const AboutMe = () => {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px",
        background: "#080810",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Background grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* Radial vignette */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #080810 100%)",
        pointerEvents: "none",
      }} />

      {/* Ambient blobs */}
      <div style={{
        position: "absolute",
        top: "15%",
        right: "-5%",
        width: 450,
        height: 450,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,111,255,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "-8%",
        width: 380,
        height: 380,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,170,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Inner layout ── */}
      <div style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 72,
        maxWidth: 1000,
        width: "100%",
      }}>

        {/* ── LEFT: Photo block ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, flexShrink: 0 }}
        >
          {/* Photo with layered ring treatment */}
          <div style={{ position: "relative" }}>
            {/* Outer glow ring */}
            <div style={{
              position: "absolute",
              inset: -3,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7C6FFF, #00D4AA)",
              zIndex: 0,
            }} />
            {/* Inner dark gap ring */}
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#080810",
              zIndex: 1,
              margin: 3,
            }} />
            <motion.img
              src="/careerpfp.jpeg"
              alt="Cole Plagens"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{
                position: "relative",
                zIndex: 2,
                width: 240,
                height: 240,
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                margin: 6,
              }}
            />

            {/* Status dot */}
            <div style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px",
              borderRadius: 20,
              background: "rgba(8,8,16,0.85)",
              border: "1px solid rgba(0,212,170,0.3)",
              backdropFilter: "blur(8px)",
            }}>
              <span style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#00D4AA",
                boxShadow: "0 0 6px #00D4AA",
                display: "inline-block",
                animation: "pulse 2s ease-in-out infinite",
              }} />
              <span style={{ fontSize: 11, color: "#00D4AA", fontWeight: 600, letterSpacing: "0.05em" }}>
                Open to Work
              </span>
            </div>
          </div>

          
        </motion.div>

        {/* ── RIGHT: Text block ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: 28 }}
        >
          

          {/* Heading */}
          <div>
            <h1 style={{
              margin: 0,
              fontSize: "clamp(36px, 5vw, 58px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              background: "linear-gradient(135deg, #fff 50%, rgba(255,255,255,0.4) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              About Me
            </h1>
            {/* Accent underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{
                marginTop: 12,
                width: 48,
                height: 3,
                background: "linear-gradient(90deg, #7C6FFF, #00D4AA)",
                borderRadius: 3,
                transformOrigin: "left",
              }}
            />
          </div>

          {/* Bio */}
          <p style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.6)",
            fontWeight: 400,
          }}>
            I'm a{" "}
            <span style={{ color: "#fff", fontWeight: 600 }}>full stack developer</span> and{" "}
            <span style={{ color: "#fff", fontWeight: 600 }}>data scientist</span> who loves
            crafting intuitive, high-performing web applications. I thrive in collaborative
            environments where creativity and logic come together to solve real-world problems.
            Outside of tech I enjoy sports and TV/movies.
          </p>

          {/* Divider */}
          <div style={{
            height: 1,
            background: "linear-gradient(90deg, rgba(124,111,255,0.3), transparent)",
          }} />

          {/* Link buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {links.map((l) => (
              <LinkButton key={l.label} {...l} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pulse keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
};

export default AboutMe;