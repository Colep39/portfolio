import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
/* eslint-disable */

// Theme accent — swap these values to re-theme the whole component
const ACCENT = '#22C55E';       // green-500
const ACCENT_HOVER = '#16A34A'; // green-600
const ACCENT_LIGHT = '#86EFAC'; // green-300
const ACCENT_RGB = '34, 197, 94';
const BG = '#0D0D0D';

const MONO = "'JetBrains Mono', 'SF Mono', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace";

function Field({ label, type = 'text', name, placeholder, required, multiline, rows }) {
  const [focused, setFocused] = useState(false);
  const shared = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 8,
    border: focused ? `1px solid rgba(${ACCENT_RGB},0.6)` : '1px solid rgba(255,255,255,0.1)',
    background: focused ? `rgba(${ACCENT_RGB},0.05)` : 'rgba(255,255,255,0.03)',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: multiline ? 'vertical' : undefined,
    boxShadow: focused ? `0 0 0 3px rgba(${ACCENT_RGB},0.1)` : 'none',
  };

  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <span style={{
        fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.06em',
        color: focused ? ACCENT : 'rgba(255,255,255,0.42)',
        transition: 'color 0.2s ease',
      }}>
        {label}
      </span>
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={rows || 4}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...shared, minHeight: 100, maxHeight: 220 }}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={shared}
        />
      )}
    </label>
  );
}

const ContactModal = ({ toggleModal }) => {
  const form = useRef();
  const closeTimer = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || 'auto';
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') toggleModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleModal]);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_PUBLIC_KEY,
      )
      .then(
        () => {
          setSent(true);
          setSending(false);
          form.current.reset();
          closeTimer.current = setTimeout(() => toggleModal(), 2200);
        },
        () => {
          alert('Failed to send. Try again later.');
          setSending(false);
        }
      );
  };

  return (
    <div
      className="ct-overlay"
      onClick={toggleModal}
      role="dialog"
      aria-modal="true"
      aria-label="Contact me"
    >
      <div className="ct-panel" onClick={(e) => e.stopPropagation()}>

        {/* Title bar — pinned, never scrolls, so the X is always reachable */}
        <div className="ct-bar">
          <span className="ct-path">
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>~/</span>
            <span style={{ color: ACCENT, fontWeight: 600 }}>contact</span>
          </span>
          <button
            type="button"
            onClick={toggleModal}
            className="ct-close"
            aria-label="Close"
          >✕</button>
        </div>

        {/* Scrollable body */}
        <div className="ct-body">

          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 10,
            }}>
              <span style={{ color: ACCENT, marginRight: 6 }}>//</span>
              Get In Touch
            </div>
            <h1 style={{
              margin: 0, fontSize: 'clamp(26px, 6vw, 32px)', fontWeight: 800,
              letterSpacing: '-0.035em', color: '#fff', lineHeight: 1.1,
            }}>
              Contact Me
            </h1>
          </div>

          {/* Success state */}
          {sent ? (
            <div style={{
              textAlign: 'center', padding: '28px 0',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: `rgba(${ACCENT_RGB},0.12)`, border: `1px solid rgba(${ACCENT_RGB},0.35)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, color: ACCENT,
              }}>✓</div>
              <p style={{ margin: 0, color: ACCENT, fontWeight: 600, fontSize: 16 }}>Message sent!</p>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>I'll get back to you soon.</p>
            </div>
          ) : (
            <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Field label="name" name="user_name" placeholder="Your Name" required />
              <Field label="email" type="email" name="user_email" placeholder="Your Email" required />
              <Field label="message" name="message" placeholder="Your Message" required multiline rows={4} />

              <button
                type="submit"
                disabled={sending}
                className="ct-submit"
                style={{
                  background: sending ? `rgba(${ACCENT_RGB},0.4)` : ACCENT,
                  cursor: sending ? 'not-allowed' : 'pointer',
                }}
              >
                {sending ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}

          {/* Divider */}
          <div style={{ margin: '26px 0 20px', height: 1, background: 'rgba(255,255,255,0.08)' }} />

          {/* Direct email */}
          <p style={{ margin: '0 0 18px', fontSize: 13, color: 'rgba(255,255,255,0.38)', textAlign: 'center', lineHeight: 1.6 }}>
            Or email me at{' '}
            <a
              href="mailto:cbplagen@outlook.com"
              style={{ color: ACCENT, textDecoration: 'none', fontWeight: 500, fontFamily: MONO, fontSize: 12.5, wordBreak: 'break-all' }}
              onMouseEnter={e => e.currentTarget.style.color = ACCENT_LIGHT}
              onMouseLeave={e => e.currentTarget.style.color = ACCENT}
            >
              cbplagen@outlook.com
            </a>
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            {[
              { icon: FaLinkedin, href: 'https://www.linkedin.com/in/cole-plagens/', label: 'LinkedIn' },
              { icon: FaGithub,   href: 'https://github.com/colep39',                label: 'GitHub'   },
              { icon: FaEnvelope, href: 'mailto:colep3@icloud.com',                  label: 'Email'    },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                style={{
                  width: 40, height: 40, borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'rgba(255,255,255,0.45)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, textDecoration: 'none', transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = ACCENT;
                  e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.55)`;
                  e.currentTarget.style.background = `rgba(${ACCENT_RGB},0.1)`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Overlay is exactly the visible viewport (dvh handles mobile browser toolbars) */
        .ct-overlay {
          position: fixed; top: 0; left: 0; right: 0;
          height: 100vh; height: 100dvh;
          z-index: 60;
          display: flex; align-items: center; justify-content: center;
          box-sizing: border-box;
          padding: max(12px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) max(12px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
          background: rgba(0, 0, 0, 0.72);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
        }

        /* Panel never grows past the overlay: the bar stays pinned, the body scrolls */
        .ct-panel {
          display: flex; flex-direction: column;
          width: 100%; max-width: 480px;
          max-height: 100%;
          box-sizing: border-box;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(13, 13, 13, 0.98);
          overflow: hidden;
        }
        .ct-bar {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 8px 10px 8px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-family: ${MONO}; font-size: 12px; color: rgba(255, 255, 255, 0.45);
        }
        .ct-close {
          flex-shrink: 0;
          width: 40px; height: 40px; border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.65); font-size: 15px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; line-height: 1;
        }
        .ct-close:hover { color: #fff; border-color: rgba(${ACCENT_RGB}, 0.55); background: rgba(${ACCENT_RGB}, 0.1); }
        .ct-close:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 2px; }

        .ct-body {
          flex: 1 1 auto; min-height: 0;
          overflow-y: auto; overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          padding: 28px 28px 26px;
        }

        .ct-submit {
          margin-top: 4px; width: 100%; padding: 13px 0; border-radius: 8px;
          border: 1px solid transparent;
          color: ${BG}; font-size: 14px; font-weight: 700; letter-spacing: 0.02em;
          font-family: inherit;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .ct-submit:not(:disabled):hover { background: ${ACCENT_HOVER} !important; transform: translateY(-1px); }
        .ct-submit:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 2px; }

        @media (max-width: 480px) {
          .ct-body { padding: 22px 18px 20px; }
          .ct-bar { padding-left: 16px; }
        }
        /* Short screens (landscape phones): tighten so more of the form fits before scrolling */
        @media (max-height: 560px) {
          .ct-body { padding-top: 18px; padding-bottom: 16px; }
        }
      `}</style>
    </div>
  );
};

export default ContactModal;