import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
/* eslint-disable */

function InputField({ type = 'text', name, placeholder, required, multiline, rows }) {
  const [focused, setFocused] = useState(false);
  const shared = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: focused ? '1px solid rgba(232,97,60,0.5)' : '1px solid rgba(255,255,255,0.08)',
    background: focused ? 'rgba(232,97,60,0.06)' : 'rgba(255,255,255,0.03)',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: multiline ? 'vertical' : undefined,
    boxShadow: focused ? '0 0 0 3px rgba(232,97,60,0.1)' : 'none',
  };

  return multiline ? (
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      rows={rows || 5}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...shared, minHeight: 120 }}
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
  );
}

const ContactModal = ({ toggleModal }) => {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
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
          setTimeout(() => toggleModal(), 2200);
        },
        () => {
          alert('Failed to send. Try again later.');
          setSending(false);
        }
      );
  };

  return (
    <div
      onClick={toggleModal}
      style={{
        position: 'fixed', inset: 0, zIndex: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px',
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: 480,
          maxHeight: '90vh', overflowY: 'auto', borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.09)',
          background: 'rgba(13,13,13,0.97)', backdropFilter: 'blur(20px)',
          padding: '40px 36px 36px', boxSizing: 'border-box',
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          borderRadius: '20px 20px 0 0', background: '#E8613C',
        }} />

        {/* Close button */}
        <button
          onClick={toggleModal}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32, borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            color: 'rgba(255,255,255,0.45)', fontSize: 16, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', lineHeight: 1,
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          aria-label="Close"
        >✕</button>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            <span style={{
              fontFamily: "'Courier New', monospace", fontSize: 10,
              letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
            }}>Get In Touch</span>
          </div>
          <h1 style={{
            margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.5) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Contact Me
          </h1>
          <div style={{ marginTop: 10, width: 36, height: 2, background: '#E8613C', borderRadius: 2 }} />
        </div>

        {/* Success state */}
        {sent ? (
          <div style={{
            textAlign: 'center', padding: '32px 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(232,97,60,0.12)', border: '1px solid rgba(232,97,60,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>✓</div>
            <p style={{ margin: 0, color: '#E8613C', fontWeight: 600, fontSize: 16 }}>Message sent!</p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>I'll get back to you soon.</p>
          </div>
        ) : (
          <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <InputField name="user_name" placeholder="Your Name" required />
            <InputField type="email" name="user_email" placeholder="Your Email" required />
            <InputField name="message" placeholder="Your Message" required multiline rows={5} />

            <button
              type="submit"
              disabled={sending}
              style={{
                marginTop: 4, width: '100%', padding: '13px 0', borderRadius: 10,
                border: '1px solid transparent',
                background: sending ? 'rgba(232,97,60,0.4)' : '#E8613C',
                color: '#fff', fontSize: 14, fontWeight: 600, letterSpacing: '0.02em',
                cursor: sending ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease', fontFamily: 'inherit',
              }}
              onMouseEnter={e => { if (!sending) e.currentTarget.style.boxShadow = '0 0 24px rgba(232,97,60,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              {sending ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}

        {/* Divider */}
        <div style={{ margin: '28px 0 20px', height: 1, background: 'rgba(232,97,60,0.2)' }} />

        {/* Direct email */}
        <p style={{ margin: '0 0 18px', fontSize: 13, color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
          Or email me at{' '}
          <a
            href="mailto:cbplagen@outlook.com"
            style={{ color: '#E8613C', textDecoration: 'none', fontWeight: 500 }}
            onMouseEnter={e => e.currentTarget.style.color = '#F0A878'}
            onMouseLeave={e => e.currentTarget.style.color = '#E8613C'}
          >
            cbplagen@outlook.com
          </a>
        </p>

        {/* Social icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          {[
            { icon: FaLinkedin, href: 'https://www.linkedin.com/in/cole-plagens/' },
            { icon: FaGithub,   href: 'https://github.com/colep39' },
            { icon: FaEnvelope, href: 'mailto:colep3@icloud.com' },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                width: 38, height: 38, borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
                color: 'rgba(255,255,255,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, textDecoration: 'none', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#E8613C';
                e.currentTarget.style.borderColor = 'rgba(232,97,60,0.5)';
                e.currentTarget.style.background = 'rgba(232,97,60,0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
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
  );
};

export default ContactModal;