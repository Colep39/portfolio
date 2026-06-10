import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
/* eslint-disable */

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
        width: 38, height: 38, borderRadius: 10,
        border: hovered ? '1px solid rgba(232,97,60,0.5)' : '1px solid rgba(255,255,255,0.08)',
        background: hovered ? 'rgba(232,97,60,0.1)' : 'rgba(255,255,255,0.03)',
        color: hovered ? '#E8613C' : 'rgba(255,255,255,0.4)',
        fontSize: 16, transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        textDecoration: 'none',
      }}
    >
      <Icon />
    </a>
  );
}

const Footer = () => {
  return (
    <footer
      id="footer"
      style={{
        position: 'relative', width: '100%', background: '#0D0D0D',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 1,
        background: 'linear-gradient(90deg, transparent, #E8613C, #F0A878, transparent)',
      }} />

      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '28px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        {/* Left — name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.01em' }}>
            © {new Date().getFullYear()} Cole Plagens
          </span>
        </div>

        {/* Right — socials */}
        <div style={{ display: 'flex', gap: 10 }}>
          {socials.map(s => <SocialLink key={s.label} {...s} />)}
        </div>
      </div>
    </footer>
  );
};

export default Footer;