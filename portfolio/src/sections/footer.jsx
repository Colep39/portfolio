import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
/* eslint-disable */

// Theme accent — swap these values to re-theme the whole component
const ACCENT = '#22C55E';       // green-500
const ACCENT_RGB = '34, 197, 94';
const BG = '#0D0D0D';

const MONO = "'JetBrains Mono', 'SF Mono', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace";

const socials = [
  { icon: FaGithub,   href: 'https://github.com/colep39',               label: 'GitHub'   },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/cole-plagens/', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:cbplagen@outlook.com',                 label: 'Email'    },
];

function SocialLink({ icon: Icon, href, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 38, height: 38, borderRadius: 8,
        border: hovered ? `1px solid rgba(${ACCENT_RGB},0.55)` : '1px solid rgba(255,255,255,0.09)',
        background: hovered ? `rgba(${ACCENT_RGB},0.1)` : 'rgba(255,255,255,0.03)',
        color: hovered ? ACCENT : 'rgba(255,255,255,0.45)',
        fontSize: 16, transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        textDecoration: 'none',
      }}
    >
      <Icon />
    </a>
  );
}

function TopLink() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#hero"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: MONO, fontSize: 12, textDecoration: 'none',
        color: hovered ? ACCENT : 'rgba(255,255,255,0.4)',
        transition: 'color 0.2s ease',
        marginRight: 10,
      }}
    >
      cd ~ ↑
    </a>
  );
}

const Footer = () => {
  return (
    <footer
      id="footer"
      style={{
        position: 'relative', width: '100%', background: BG,
        borderTop: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '26px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        {/* Left — name */}
        <span style={{
          fontFamily: MONO, fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.02em',
        }}>
          <span style={{ color: ACCENT, marginRight: 8 }}>©</span>
          {new Date().getFullYear()} Cole Plagens
        </span>

        {/* Right — back to top + socials */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <TopLink />
          {socials.map(s => <SocialLink key={s.label} {...s} />)}
        </div>
      </div>
    </footer>
  );
};

export default Footer;