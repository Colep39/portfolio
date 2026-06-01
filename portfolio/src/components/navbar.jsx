import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
/* eslint-disable */

const navLinks = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
];

function NavLink({ href, label, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '0.04em',
        textDecoration: 'none',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.45)',
        transition: 'color 0.2s ease',
        paddingBottom: 2,
      }}
    >
      {label}
      <span style={{
        position: 'absolute',
        bottom: -2,
        left: 0,
        width: hovered ? '100%' : '0%',
        height: 1,
        background: '#E8613C',
        borderRadius: 1,
        transition: 'width 0.25s ease',
        display: 'block',
      }} />
    </a>
  );
}

const NavBar = ({ toggleModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);
  const [resumeHovered, setResumeHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleToggle = () => setMenuOpen(o => !o);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        background: scrolled ? 'rgba(13,13,13,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        boxSizing: 'border-box',
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 32px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <a
            href="#hero"
            onClick={handleLinkClick}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <span style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: logoHovered ? '#fff' : 'rgba(255,255,255,0.8)',
              transition: 'color 0.2s',
            }}>
              Cole Plagens
            </span>
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
            {navLinks.map(l => (
              <NavLink key={l.label} {...l} onClick={handleLinkClick} />
            ))}

            {/* Contact */}
            <button
              onClick={toggleModal}
              onMouseEnter={() => setContactHovered(true)}
              onMouseLeave={() => setContactHovered(false)}
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.01em',
                padding: '8px 18px',
                borderRadius: 8,
                border: contactHovered ? '1px solid rgba(232,97,60,0.5)' : '1px solid rgba(255,255,255,0.1)',
                background: contactHovered ? 'rgba(232,97,60,0.1)' : 'rgba(255,255,255,0.04)',
                color: contactHovered ? '#fff' : 'rgba(255,255,255,0.55)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Contact
            </button>

            {/* Resume */}
            <a
              href="/cole_plagens_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setResumeHovered(true)}
              onMouseLeave={() => setResumeHovered(false)}
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.01em',
                padding: '8px 18px',
                borderRadius: 8,
                textDecoration: 'none',
                background: resumeHovered ? '#d45530' : '#E8613C',
                color: '#fff',
                border: '1px solid transparent',
                boxShadow: resumeHovered ? '0 0 20px rgba(232,97,60,0.35)' : 'none',
                transition: 'all 0.2s ease',
                transform: resumeHovered ? 'translateY(-1px)' : 'none',
              }}
            >
              Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={handleToggle}
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.7)',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 64,
          left: 0,
          right: 0,
          zIndex: 99,
          background: 'rgba(13,13,13,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '24px 32px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          {navLinks.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={handleLinkClick}
              style={{
                padding: '14px 0',
                fontSize: 16,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'color 0.2s',
              }}
            >
              {l.label}
            </a>
          ))}

          <button
            onClick={() => { toggleModal(); handleLinkClick(); }}
            style={{
              padding: '14px 0',
              fontSize: 16,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.6)',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            Contact
          </button>

          <a
            href="/cole_plagens_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            style={{
              marginTop: 16,
              display: 'block',
              textAlign: 'center',
              padding: '12px 0',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              background: '#E8613C',
              color: '#fff',
            }}
          >
            Resume
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default NavBar;