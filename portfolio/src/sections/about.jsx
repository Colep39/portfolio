import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from "react-icons/fa";
/* eslint-disable */
import { motion } from "framer-motion";

// Theme accent — swap these values to re-theme the whole component
const ACCENT = "#22C55E";       // green-500
const ACCENT_HOVER = "#16A34A"; // green-600
const ACCENT_RGB = "34, 197, 94";
const BG = "#0D0D0D";

const MONO = "'JetBrains Mono', 'SF Mono', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace";

const links = [
  { label: "GitHub",   icon: <FaGithub size={15} />,   href: "https://github.com/colep39",                 primary: true  },
  { label: "LinkedIn", icon: <FaLinkedin size={15} />,  href: "https://www.linkedin.com/in/cole-plagens/", primary: false },
  { label: "Resume",   icon: <FaFileAlt size={15} />,   href: "/cole_plagens_resume.pdf",                  primary: false },
  { label: "Email",    icon: <FaEnvelope size={15} />,  href: "mailto:colep3@icloud.com",                  primary: false },
];

function LinkButton({ label, icon, href, primary }) {
  const [hovered, setHovered] = useState(false);

  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "10px 18px", borderRadius: 8, fontSize: 12.5, fontWeight: 600,
    fontFamily: MONO,
    textDecoration: "none", cursor: "pointer", transition: "all 0.2s ease",
    letterSpacing: "0.01em", userSelect: "none",
  };

  const primaryStyle = {
    ...base,
    background: hovered ? ACCENT_HOVER : ACCENT,
    color: BG, border: "1px solid transparent",
    transform: hovered ? "translateY(-1px)" : "none",
  };

  const ghostStyle = {
    ...base,
    background: hovered ? `rgba(${ACCENT_RGB},0.08)` : "rgba(255,255,255,0.03)",
    color: hovered ? "#fff" : "rgba(255,255,255,0.6)",
    border: hovered ? `1px solid rgba(${ACCENT_RGB},0.55)` : "1px solid rgba(255,255,255,0.1)",
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
      <span style={{ display: "flex", alignItems: "center", opacity: primary ? 1 : hovered ? 0.95 : 0.55 }}>
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
        padding: "100px 24px", background: BG,
        overflow: "hidden", boxSizing: "border-box",
      }}
    >
      <div className="ab-wrap">

        {/* LEFT: Photo */}
        <motion.div
          className="ab-photo-col"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="ab-photo"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <img src="/careerpfp.jpeg" alt="Cole Plagens" />
          </motion.div>

          <div className="ab-status">
            <span className="ab-status-key">status</span>
            <span className="ab-status-punct">:</span>
            <span className="ab-status-val">"employed"</span>
          </div>
        </motion.div>

        {/* RIGHT: README window */}
        <motion.div
          className="ab-win"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ab-win-bar">
            <span className="ab-ft">MD</span>
            <span>about.md</span>
          </div>

          <div className="ab-win-body">
            <h1 className="ab-title">
              <span className="ab-hash">#</span> About Me
            </h1>

            <p className="ab-text">
              I'm a <strong>full-stack developer</strong> who loves crafting intuitive,
              high-performing web applications with scalability and security in mind. I thrive in
              collaborative environments where creativity and logic come together to solve
              real-world problems. Outside of tech I enjoy sports and TV/movies.
            </p>

            <div className="ab-divider" />

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {links.map(l => <LinkButton key={l.label} {...l} />)}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .ab-wrap {
          position: relative; z-index: 10;
          display: flex; flex-direction: row; flex-wrap: wrap;
          align-items: center; justify-content: center;
          gap: 56px; max-width: 1000px; width: 100%;
        }
        .ab-photo-col { display: flex; flex-direction: column; align-items: center; gap: 18px; flex-shrink: 0; }
        .ab-photo {
          width: 260px; height: 260px;
          padding: 8px; box-sizing: border-box;
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.03);
        }
        .ab-photo img {
          width: 100%; height: 100%; display: block;
          object-fit: cover; border-radius: 15px;
        }
        .ab-status {
          font-family: ${MONO}; font-size: 12.5px;
          padding: 7px 14px; border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: rgba(255, 255, 255, 0.025);
        }
        .ab-status-key { color: rgba(255, 255, 255, 0.8); }
        .ab-status-punct { color: rgba(255, 255, 255, 0.35); margin-right: 8px; }
        .ab-status-val { color: ${ACCENT}; }

        .ab-win {
          flex: 1 1 400px; max-width: 580px; min-width: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.025);
          overflow: hidden;
        }
        .ab-win-bar {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          font-family: ${MONO}; font-size: 12px; color: rgba(255, 255, 255, 0.55);
        }
        .ab-ft {
          font-size: 10px; font-weight: 700; letter-spacing: 0.04em;
          padding: 2px 5px; border-radius: 4px;
          background: rgba(${ACCENT_RGB}, 0.15); color: ${ACCENT};
        }
        .ab-win-body { padding: 34px 36px 36px; display: flex; flex-direction: column; gap: 26px; }
        .ab-title {
          margin: 0;
          font-size: clamp(34px, 4.6vw, 52px); font-weight: 800;
          letter-spacing: -0.04em; line-height: 1.05; color: #fff;
        }
        .ab-hash { font-family: ${MONO}; font-weight: 500; color: ${ACCENT}; margin-right: 4px; }
        .ab-text { margin: 0; font-size: 16px; line-height: 1.85; color: rgba(255, 255, 255, 0.58); }
        .ab-text strong { color: #fff; font-weight: 600; }
        .ab-divider { height: 1px; background: rgba(255, 255, 255, 0.08); }

        @media (max-width: 640px) {
          .ab-photo { width: 220px; height: 220px; }
          .ab-win-body { padding: 26px 22px 28px; }
        }
      `}</style>
    </section>
  );
};

export default AboutMe;