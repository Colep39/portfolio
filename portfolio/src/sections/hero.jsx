import React, { useEffect, useState } from "react";
/* eslint-disable */
import { motion, MotionConfig } from "framer-motion";

// Theme accent — swap these values to re-theme the whole component
const ACCENT = "#22C55E";       // green-500
const ACCENT_HOVER = "#16A34A"; // green-600
const ACCENT_LIGHT = "#86EFAC"; // green-300
const ACCENT_RGB = "34, 197, 94";
const BG = "#0D0D0D";

const MONO = "'JetBrains Mono', 'SF Mono', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace";

const roles = [
  "Full Stack Developer",
  "Data Scientist",
  "Software Engineer",
  "Problem Solver",
  "Collaborator",
  "System Minded",
  "Cloud Practitioner",
];

const values = ["performance", "maintainability", "robustness"];

const EASE = [0.16, 1, 0.3, 1];

// Blinking terminal cursor
function Blink({ className }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn(v => !v), 530);
    return () => clearInterval(id);
  }, []);
  return <span className={className} style={{ opacity: on ? 1 : 0 }} />;
}

// One word of the headline: each letter rises out of a mask
function Word({ text, delay, accent, cursor }) {
  return (
    <span className="hr-word">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className={`hr-char ${accent ? "is-accent" : ""}`}
          initial={{ y: "115%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.85, delay: delay + i * 0.05, ease: EASE }}
        >
          {c}
        </motion.span>
      ))}
      {cursor && <Blink className="hr-cursor" />}
    </span>
  );
}

// Syntax token helper
const T = ({ c, children }) => <span className={`tk-${c}`}>{children}</span>;

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // The highlighted "line" advances on a timer; clicking a role (or hovering the window) resets/pauses it
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setRoleIndex(i => (i + 1) % roles.length), 2600);
    return () => clearTimeout(id);
  }, [roleIndex, paused]);

  const lines = [
    { indent: 0, node: <T c="cm">{"// about the developer"}</T> },
    {
      indent: 0,
      node: (
        <>
          <T c="kw">const</T> <T c="vr">cole</T>
          <T c="pn">: </T>
          <T c="ty">Developer</T> <T c="pn">= {"{"}</T>
        </>
      ),
    },
    {
      indent: 1,
      node: (
        <>
          <T c="ky">name</T>
          <T c="pn">: </T>
          <T c="st">"Cole Plagens"</T>
          <T c="pn">,</T>
        </>
      ),
    },
    {
      indent: 1,
      node: (
        <>
          <T c="ky">location</T>
          <T c="pn">: </T>
          <T c="st">"Houston, TX"</T>
          <T c="pn">,</T>
        </>
      ),
    },
    {
      indent: 1,
      node: (
        <>
          <T c="ky">roles</T>
          <T c="pn">: [</T>
        </>
      ),
    },
    ...roles.map((r, i) => ({
      indent: 2,
      role: i,
      node: (
        <>
          <T c="st">{`"${r}"`}</T>
          <T c="pn">,</T>
        </>
      ),
    })),
    { indent: 1, node: <T c="pn">{"],"}</T> },
    {
      indent: 1,
      node: (
        <>
          <T c="ky">values</T>
          <T c="pn">: [</T>
        </>
      ),
    },
    ...values.map(v => ({
      indent: 2,
      node: (
        <>
          <T c="st">{`"${v}"`}</T>
          <T c="pn">,</T>
        </>
      ),
    })),
    { indent: 1, node: <T c="pn">{"],"}</T> },
    { indent: 0, node: <T c="pn">{"};"}</T> },
    { indent: 0, node: <>&nbsp;</> },
    {
      indent: 0,
      node: (
        <>
          <T c="kw">export default</T> <T c="vr">cole</T>
          <T c="pn">;</T>
          <Blink className="hr-caret" />
        </>
      ),
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section id="hero" className="hr-section">
        <div className="hr-grain" aria-hidden="true" />
        <div className="hr-vignette" aria-hidden="true" />

        <div className="hr-wrap">
          {/* ── Main column ── */}
          <div className="hr-main">
            <motion.div
              className="hr-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="hr-slashes">//</span> Hey, I'm
            </motion.div>

            <h1 className="hr-title" aria-label="Cole Plagens">
              <Word text="Cole" delay={0.2} />
              <Word text="Plagens" delay={0.42} accent cursor />
            </h1>

            <motion.p
              className="hr-tagline"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              I architect scalable software systems and data solutions designed for{" "}
              <span>performance</span>, <span>maintainability</span>, and{" "}
              <span>robustness</span>.
            </motion.p>

            <motion.div
              className="hr-ctas"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
            >
              <a href="#projects" className="hr-btn hr-btn-primary">
                View My Work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#about" className="hr-btn hr-btn-ghost">About Me</a>
            </motion.div>
          </div>

          {/* ── Code window ── */}
          <motion.aside
            className="hr-win"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label="Developer profile"
          >
            <div className="hr-win-bar">
              <span className="hr-ft">TS</span>
              <span>cole.ts</span>
            </div>

            <div className="hr-code">
              {lines.map((ln, i) => {
                const isRole = ln.role !== undefined;
                const Tag = isRole ? motion.button : motion.div;
                return (
                  <Tag
                    key={i}
                    type={isRole ? "button" : undefined}
                    className={`hr-line ${isRole ? "is-role" : ""} ${isRole && ln.role === roleIndex ? "is-active" : ""}`}
                    style={{ paddingLeft: `calc(20px + ${ln.indent * 2}ch)` }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.75 + i * 0.06, ease: EASE }}
                    onClick={isRole ? () => setRoleIndex(ln.role) : undefined}
                    aria-current={isRole && ln.role === roleIndex ? "true" : undefined}
                  >
                    {ln.node}
                  </Tag>
                );
              })}
            </div>

            <div className="hr-win-foot">
              <span>main</span>
              <span>TypeScript</span>
            </div>
          </motion.aside>
        </div>

        <style>{`
          .hr-section {
            --accent: ${ACCENT};
            --accent-hover: ${ACCENT_HOVER};
            --accent-light: ${ACCENT_LIGHT};
            --accent-rgb: ${ACCENT_RGB};
            position: relative;
            width: 100%;
            min-height: 100vh;
            background: ${BG};
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 120px 0 80px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }

          .hr-grain {
            position: absolute; inset: 0; pointer-events: none; opacity: 0.07;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          }
          .hr-vignette {
            position: absolute; inset: 0; pointer-events: none;
            background: radial-gradient(ellipse 85% 75% at 50% 50%, transparent 30%, ${BG} 100%);
          }

          .hr-wrap {
            position: relative; z-index: 10;
            width: 100%; max-width: 1180px;
            padding: 0 40px;
            box-sizing: border-box;
            display: grid;
            grid-template-columns: minmax(0, 1fr) 430px;
            gap: 56px;
            align-items: center;
          }
          .hr-main { display: flex; flex-direction: column; align-items: flex-start; min-width: 0; }

          .hr-eyebrow {
            margin-bottom: 20px;
            font-family: ${MONO};
            font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase;
            color: rgba(255, 255, 255, 0.42);
          }
          .hr-slashes { color: var(--accent); margin-right: 6px; }

          .hr-title {
            margin: 0 0 30px;
            font-size: clamp(54px, 8.6vw, 116px);
            font-weight: 900;
            letter-spacing: -0.05em;
            line-height: 1;
          }
          .hr-word {
            display: block;
            overflow: hidden;
            padding: 0.06em 0 0.17em;
            margin: -0.06em 0 -0.17em;
            white-space: nowrap;
          }
          .hr-char { display: inline-block; color: #fff; will-change: transform; }
          .hr-char.is-accent { color: var(--accent); }
          .hr-cursor {
            display: inline-block;
            width: 0.36em; height: 0.7em;
            margin-left: 0.14em;
            background: var(--accent);
            vertical-align: baseline;
            transition: opacity 0.1s;
          }

          .hr-tagline {
            margin: 0 0 38px;
            max-width: 500px;
            font-size: 16.5px; line-height: 1.8; font-weight: 400;
            color: rgba(255, 255, 255, 0.42);
          }
          .hr-tagline span { color: rgba(255, 255, 255, 0.8); }

          .hr-ctas { display: flex; flex-wrap: wrap; gap: 12px; }
          .hr-btn {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 13px 26px;
            border-radius: 10px;
            font-size: 14px; font-weight: 700; letter-spacing: 0.01em;
            text-decoration: none; cursor: pointer;
            transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          }
          .hr-btn svg { transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
          .hr-btn:hover { transform: translateY(-2px); }
          .hr-btn:hover svg { transform: translateX(3px); }
          .hr-btn-primary { background: var(--accent); color: ${BG}; border: 1px solid transparent; }
          .hr-btn-primary:hover { background: var(--accent-hover); }
          .hr-btn-ghost {
            background: rgba(255, 255, 255, 0.03);
            color: rgba(255, 255, 255, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-weight: 600;
          }
          .hr-btn-ghost:hover {
            color: #fff;
            background: rgba(var(--accent-rgb), 0.08);
            border-color: rgba(var(--accent-rgb), 0.55);
          }
          .hr-btn:focus-visible, .hr-line.is-role:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

          /* Code window */
          .hr-win {
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.025);
            overflow: hidden;
            font-family: ${MONO};
            box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.8);
            min-width: 0;
          }
          .hr-win-bar {
            display: flex; align-items: center; gap: 10px;
            padding: 11px 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.07);
            font-size: 12px; color: rgba(255, 255, 255, 0.55);
          }
          .hr-ft {
            font-size: 10px; font-weight: 700; letter-spacing: 0.04em;
            padding: 2px 5px; border-radius: 4px;
            background: rgba(var(--accent-rgb), 0.15); color: var(--accent);
          }
          .hr-code { padding: 16px 0; font-size: 13.5px; line-height: 1.85; }
          .hr-line {
            display: block; width: 100%; box-sizing: border-box;
            text-align: left; white-space: pre;
            padding-right: 20px;
            background: none; border: none; margin: 0;
            font: inherit; color: rgba(255, 255, 255, 0.85);
            border-radius: 0;
          }
          .hr-line.is-role { cursor: pointer; transition: background-color 0.25s ease; }
          .hr-line.is-role:hover { background: rgba(255, 255, 255, 0.04); }
          .hr-line.is-active { background: rgba(var(--accent-rgb), 0.1); }
          .hr-line.is-active:hover { background: rgba(var(--accent-rgb), 0.12); }
          .hr-line .tk-st { transition: color 0.25s ease; }
          .hr-line.is-active .tk-st { color: #fff; }

          .tk-cm { color: rgba(255, 255, 255, 0.28); font-style: italic; }
          .tk-kw { color: var(--accent-light); }
          .tk-vr { color: #fff; }
          .tk-ty { color: rgba(255, 255, 255, 0.6); }
          .tk-ky { color: rgba(255, 255, 255, 0.82); }
          .tk-st { color: var(--accent); }
          .tk-pn { color: rgba(255, 255, 255, 0.35); }
          .hr-caret {
            display: inline-block; width: 0.55em; height: 1.1em;
            margin-left: 4px; vertical-align: text-bottom;
            background: rgba(255, 255, 255, 0.7);
            transition: opacity 0.1s;
          }

          .hr-win-foot {
            display: flex; justify-content: space-between;
            padding: 9px 16px;
            border-top: 1px solid rgba(255, 255, 255, 0.07);
            font-size: 11px; letter-spacing: 0.04em;
            color: rgba(255, 255, 255, 0.35);
          }

          @media (max-width: 1080px) {
            .hr-wrap { grid-template-columns: minmax(0, 1fr) 380px; gap: 40px; padding: 0 32px; }
            .hr-code { font-size: 12.5px; }
          }

          @media (max-width: 920px) {
            .hr-section { padding: 108px 0 64px; align-items: flex-start; }
            .hr-wrap { grid-template-columns: minmax(0, 1fr); gap: 48px; padding: 0 24px; }
            .hr-title { font-size: clamp(56px, 17vw, 112px); }
          }

          @media (max-width: 480px) {
            .hr-tagline { font-size: 15.5px; }
            .hr-btn { padding: 12px 22px; }
            .hr-code { font-size: 12px; }
          }

          @media (prefers-reduced-motion: reduce) {
            .hr-btn, .hr-btn svg, .hr-line.is-role { transition-duration: 0.01ms !important; }
          }
        `}</style>
      </section>
    </MotionConfig>
  );
};

export default Hero;