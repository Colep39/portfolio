import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
/* eslint-disable */

// Theme accent — swap these values to re-theme the whole component
const ACCENT = '#22C55E';       // green-500
const ACCENT_HOVER = '#16A34A'; // green-600
const ACCENT_RGB = '34, 197, 94';
const BG = '#0D0D0D';

const MONO = "'JetBrains Mono', 'SF Mono', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace";

const navLinks = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
];

const NavBar = ({ toggleModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  const linksRef = useRef(null);
  const itemRefs = useRef([]);

  // Scroll state + page progress
  useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  // Track which section is in view
  useEffect(() => {
    const targets = navLinks
      .map(l => document.querySelector(l.href))
      .filter(Boolean);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive('#' + entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    targets.forEach(t => observer.observe(t));

    const onTop = () => {
      if (window.scrollY < 120) setActive(null);
    };
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, []);

  // Lock body scroll + Escape to close while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = e => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Close the mobile menu if the viewport grows past the breakpoint
  useEffect(() => {
    const onResize = () => window.innerWidth > 768 && setMenuOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const movePill = useCallback(index => {
    const el = itemRefs.current[index];
    if (!el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
  }, []);
  const hidePill = useCallback(() => setPill(p => ({ ...p, visible: false })), []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`cp-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''}`}>
        <nav className="cp-bar" aria-label="Primary">
          {/* Logo */}
          <a href="#hero" onClick={closeMenu} className="cp-logo" aria-label="Cole — home">
            <span className="cp-prefix" aria-hidden="true">~/</span>
            <span className="cp-name">Cole</span>
          </a>

          {/* Desktop links */}
          <div className="cp-desktop">
            <div className="cp-links" ref={linksRef} onMouseLeave={hidePill}>
              <span
                className="cp-pill"
                aria-hidden="true"
                style={{
                  transform: `translateX(${pill.left}px)`,
                  width: pill.width,
                  opacity: pill.visible ? 1 : 0,
                }}
              />
              {navLinks.map((l, i) => {
                const isActive = active === l.href;
                return (
                  <a
                    key={l.label}
                    ref={el => (itemRefs.current[i] = el)}
                    href={l.href}
                    className={`cp-link ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                    onMouseEnter={() => movePill(i)}
                    onFocus={() => movePill(i)}
                    onBlur={hidePill}
                  >
                    {l.label}
                  </a>
                );
              })}
            </div>

            <span className="cp-divider" aria-hidden="true" />

            <button type="button" onClick={toggleModal} className="cp-contact">
              Contact
            </button>

            <a
              href="/cole_plagens_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cp-resume"
            >
              Resume
              <ArrowUpRight size={15} strokeWidth={2.4} className="cp-arrow" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(o => !o)}
            className="cp-burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="cp-mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div
        id="cp-mobile-menu"
        className={`cp-overlay ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="cp-overlay-inner">
          <div className="cp-overlay-links">
            {navLinks.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                onClick={closeMenu}
                className="cp-m-link"
                style={{ '--i': i }}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span>{l.label}</span>
                <ArrowUpRight size={22} strokeWidth={2} className="cp-m-arrow" />
              </a>
            ))}
          </div>

          <div className="cp-overlay-actions" style={{ '--i': navLinks.length }}>
            <button
              type="button"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => { toggleModal(); closeMenu(); }}
              className="cp-m-contact"
            >
              Contact
            </button>
            <a
              href="/cole_plagens_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
              className="cp-m-resume"
            >
              Resume
              <ArrowUpRight size={17} strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .cp-header {
          --accent: ${ACCENT};
          --accent-hover: ${ACCENT_HOVER};
          --accent-rgb: ${ACCENT_RGB};
          --bg: ${BG};
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 14px 20px 0;
          pointer-events: none;
          transition: padding 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cp-header.is-scrolled { padding-top: 12px; }

        /* The bar: full-bleed at the top, condenses into a floating dock on scroll */
        .cp-bar {
          pointer-events: auto;
          position: relative;
          margin: 0 auto;
          max-width: 1100px;
          height: 64px;
          padding: 0 8px 0 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 16px;
          background: transparent;
          overflow: hidden;
          transition:
            max-width 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            height 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            padding 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            background-color 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }
        .cp-header.is-scrolled .cp-bar {
          max-width: 860px;
          height: 56px;
          padding: 0 8px 0 10px;
          background: rgba(13, 13, 13, 0.82);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          backdrop-filter: blur(18px) saturate(140%);
          border-color: rgba(255, 255, 255, 0.09);
          box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.7);
        }
        .cp-header.is-open .cp-bar {
          background: transparent;
          border-color: transparent;
          box-shadow: none;
          -webkit-backdrop-filter: none;
          backdrop-filter: none;
        }

        /* Logo */
        .cp-logo {
          display: flex;
          align-items: baseline;
          text-decoration: none;
          border-radius: 10px;
          padding: 6px 10px;
          font-family: ${MONO};
        }
        .cp-prefix {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.28);
          transition: color 0.2s ease;
        }
        .cp-name {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: rgba(255, 255, 255, 0.92);
          transition: color 0.2s ease;
        }
        .cp-logo:hover .cp-prefix { color: var(--accent); }
        .cp-logo:hover .cp-name { color: #fff; }

        /* Desktop group */
        .cp-desktop {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cp-links {
          position: relative;
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .cp-pill {
          position: absolute;
          top: 0; bottom: 0; left: 0;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.07);
          pointer-events: none;
          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            width 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.2s ease;
        }
        .cp-link {
          position: relative;
          z-index: 1;
          padding: 9px 16px;
          border-radius: 10px;
          font-family: ${MONO};
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.5);
          transition: color 0.2s ease;
        }
        .cp-link:hover,
        .cp-link:focus-visible { color: #fff; }
        .cp-link.is-active { color: var(--accent); }

        .cp-divider {
          width: 1px; height: 20px;
          margin: 0 6px;
          background: rgba(255, 255, 255, 0.1);
        }

        .cp-contact {
          font-family: ${MONO};
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          padding: 9px 16px;
          border-radius: 10px;
          border: 1px solid transparent;
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
        }
        .cp-contact:hover {
          color: #fff;
          border-color: rgba(var(--accent-rgb), 0.6);
          background: rgba(var(--accent-rgb), 0.08);
        }

        .cp-resume {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: ${MONO};
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.01em;
          padding: 9px 14px 9px 18px;
          border-radius: 10px;
          text-decoration: none;
          background: var(--accent);
          color: var(--bg);
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .cp-resume:hover { background: var(--accent-hover); transform: translateY(-1px); }
        .cp-arrow { transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
        .cp-resume:hover .cp-arrow { transform: translate(2px, -2px); }


        /* Mobile toggle */
        .cp-burger {
          display: none;
          width: 40px; height: 40px;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.85);
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .cp-burger:hover { border-color: rgba(var(--accent-rgb), 0.6); color: #fff; }

        /* Mobile overlay */
        .cp-overlay {
          position: fixed;
          inset: 0;
          z-index: 99;
          background: ${BG};
          visibility: hidden;
          opacity: 0;
          transition: opacity 0.3s ease, visibility 0s linear 0.3s;
        }
        .cp-overlay.is-open {
          visibility: visible;
          opacity: 1;
          transition: opacity 0.3s ease, visibility 0s;
        }
        .cp-overlay-inner {
          height: 100%;
          box-sizing: border-box;
          padding: 104px 28px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow-y: auto;
        }
        .cp-m-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 0;
          font-size: clamp(32px, 9vw, 44px);
          font-weight: 650;
          letter-spacing: -0.035em;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.88);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          opacity: 0;
          transform: translateY(18px);
          transition: color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
        }
        .cp-overlay.is-open .cp-m-link,
        .cp-overlay.is-open .cp-overlay-actions {
          opacity: 1;
          transform: none;
          transition:
            color 0.2s ease,
            opacity 0.5s ease calc(var(--i) * 70ms + 120ms),
            transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 70ms + 120ms);
        }
        .cp-m-link:hover,
        .cp-m-link:active { color: var(--accent, ${ACCENT}); }
        .cp-m-arrow { color: ${ACCENT}; flex-shrink: 0; }

        .cp-overlay-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          opacity: 0;
          transform: translateY(18px);
        }
        .cp-m-contact,
        .cp-m-resume {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 15px 0;
          border-radius: 12px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 650;
          text-decoration: none;
          cursor: pointer;
        }
        .cp-m-contact {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.16);
        }
        .cp-m-resume {
          background: ${ACCENT};
          color: ${BG};
          border: 1px solid ${ACCENT};
        }

        /* Keyboard focus */
        .cp-logo:focus-visible,
        .cp-link:focus-visible,
        .cp-contact:focus-visible,
        .cp-resume:focus-visible,
        .cp-burger:focus-visible,
        .cp-m-link:focus-visible,
        .cp-m-contact:focus-visible,
        .cp-m-resume:focus-visible {
          outline: 2px solid ${ACCENT};
          outline-offset: 3px;
        }

        @media (max-width: 768px) {
          .cp-header { padding: 10px 14px 0; }
          .cp-header.is-scrolled { padding-top: 10px; }
          .cp-bar, .cp-header.is-scrolled .cp-bar { max-width: 100%; height: 56px; padding: 0 8px 0 10px; }
          .cp-desktop { display: none; }
          .cp-burger { display: flex; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cp-header, .cp-bar, .cp-pill, .cp-name, .cp-resume, .cp-arrow,
          .cp-overlay, .cp-m-link, .cp-overlay-actions, .cp-dot {
            transition-duration: 0.01ms !important;
            transition-delay: 0s !important;
          }
        }
      `}</style>
    </>
  );
};

export default NavBar;