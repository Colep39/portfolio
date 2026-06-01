import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from "react-icons/fa";
/* eslint-disable */
import { motion } from "framer-motion";

const links = [
  { label: "GitHub",   icon: <FaGithub size={15} />,   href: "https://github.com/colep39",                 primary: true  },
  { label: "LinkedIn", icon: <FaLinkedin size={15} />,  href: "https://www.linkedin.com/in/cole-plagens/", primary: false },
  { label: "Resume",   icon: <FaFileAlt size={15} />,   href: "/cole_plagens_resume.pdf",                  primary: false },
  { label: "Email",    icon: <FaEnvelope size={15} />,  href: "mailto:colep3@icloud.com",                  primary: false },
];

function StatPill({ value, label, accent }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
      padding: "12px 20px", borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.07)",
      background: "rgba(255,255,255,0.03)",
    }}>
      <span style={{
        fontFamily: "'Courier New', monospace", fontSize: 20, fontWeight: 700,
        color: accent, lineHeight: 1,
      }}>{value}</span>
      <span style={{
        fontSize: 10, letterSpacing: "0.12em",
        color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
      }}>{label}</span>
    </div>
  );
}

function LinkButton({ label, icon, href, primary }) {
  const [hovered, setHovered] = useState(false);

  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600,
    textDecoration: "none", cursor: "pointer", transition: "all 0.2s ease",
    letterSpacing: "0.01em", userSelect: "none",
  };

  const primaryStyle = {
    ...base,
    background: hovered ? "#d45530" : "#E8613C",
    color: "#fff", border: "1px solid transparent",
    boxShadow: hovered ? "0 0 24px rgba(232,97,60,0.35)" : "none",
    transform: hovered ? "translateY(-1px)" : "none",
  };

  const ghostStyle = {
    ...base,
    background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
    color: hovered ? "#fff" : "rgba(255,255,255,0.6)",
    border: hovered ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.08)",
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

const AboutMe = () => {
  return (
    <section
      id="about"
      style={{
        position: "relative", width: "100%", minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "100px 24px", background: "#0D0D0D",
        overflow: "hidden", boxSizing: "border-box",
      }}
    >
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "row", flexWrap: "wrap",
        alignItems: "center", justifyContent: "center",
        gap: 72, maxWidth: 1000, width: "100%",
      }}>

        {/* LEFT: Photo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, flexShrink: 0 }}
        >
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", inset: -3, borderRadius: "50%",
              background: "#E8613C", zIndex: 0,
            }} />
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "#0D0D0D", zIndex: 1, margin: 3,
            }} />
            <motion.img
              src="/careerpfp.jpeg"
              alt="Cole Plagens"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{
                position: "relative", zIndex: 2,
                width: 240, height: 240, borderRadius: "50%",
                objectFit: "cover", display: "block", margin: 6,
              }}
            />
            <div style={{
              position: "absolute", bottom: 16, right: 16, zIndex: 3,
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 10px", borderRadius: 20,
              background: "rgba(13,13,13,0.85)",
              border: "1px solid rgba(232,97,60,0.35)",
              backdropFilter: "blur(8px)",
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#E8613C", boxShadow: "0 0 6px #E8613C",
                display: "inline-block", animation: "pulse 2s ease-in-out infinite",
              }} />
              <span style={{ fontSize: 11, color: "#E8613C", fontWeight: 600, letterSpacing: "0.05em" }}>
                Open to Work
              </span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: 28 }}
        >
          <div>
            <h1 style={{
              margin: 0,
              fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 800,
              letterSpacing: "-0.04em", lineHeight: 1.05,
              background: "linear-gradient(135deg, #fff 50%, rgba(255,255,255,0.4) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              About Me
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{
                marginTop: 12, width: 48, height: 3,
                background: "#E8613C", borderRadius: 3, transformOrigin: "left",
              }}
            />
          </div>

          <p style={{
            margin: 0, fontSize: 16, lineHeight: 1.8,
            color: "rgba(255,255,255,0.6)", fontWeight: 400,
          }}>
            I'm a{" "}
            <span style={{ color: "#fff", fontWeight: 600 }}>full stack developer</span> and{" "}
            <span style={{ color: "#fff", fontWeight: 600 }}>data scientist</span> who loves
            crafting intuitive, high-performing web applications. I thrive in collaborative
            environments where creativity and logic come together to solve real-world problems.
            Outside of tech I enjoy sports and TV/movies.
          </p>

          <div style={{ height: 1, background: "rgba(232,97,60,0.2)" }} />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {links.map(l => <LinkButton key={l.label} {...l} />)}
          </div>
        </motion.div>
      </div>

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