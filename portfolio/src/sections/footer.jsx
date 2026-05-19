import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
/* eslint-disable */

const socials = [
  { icon: FaGithub,   href: 'https://github.com/colep39',                  label: 'GitHub',   accent: '#7C6FFF' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/cole-plagens/',    label: 'LinkedIn', accent: '#00D4AA' },
  { icon: FaEnvelope, href: 'mailto:colep3@icloud.com',                    label: 'Email',    accent: '#FF6B6B' },
];

function SocialLink({ icon: Icon, href, label, accent }) {
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 38,
        height: 38,
        borderRadius: 10,
        border: hovered ? `1px solid ${accent}55` : '1px solid rgba(255,255,255,0.08)',
        background: hovered ? `${accent}14` : 'rgba(255,255,255,0.03)',
        color: hovered ? accent : 'rgba(255,255,255,0.4)',
        fontSize: 16,
        transition: 'all 0.2s ease',
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
        position: 'relative',
        width: '100%',
        background: '#080810',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Subtle top accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 120,
        height: 1,
        background: 'linear-gradient(90deg, transparent, #7C6FFF, #00D4AA, transparent)',
      }} />

      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '28px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        {/* Left — name + monogram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 26,
            height: 26,
            borderRadius: 7,
            background: 'linear-gradient(135deg, #7C6FFF, #00D4AA)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 10,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.05em',
            }}>CP</span>
          </div>
          <span style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.01em',
          }}>
            © {new Date().getFullYear()} Cole Plagens
          </span>
        </div>

        {/* Center — tagline */}
        <span style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.18)',
          textTransform: 'uppercase',
        }}>
          Built with React
        </span>

        {/* Right — socials */}
        <div style={{ display: 'flex', gap: 10 }}>
          {socials.map(s => <SocialLink key={s.label} {...s} />)}
        </div>
      </div>
    </footer>
  );
};

export default Footer;