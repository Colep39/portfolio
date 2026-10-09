/* eslint-disable */
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import {
  SiReact, SiNodedotjs, SiExpress, SiMysql,
  SiPostgresql, SiJavascript, SiTypescript, SiDotnet,
} from 'react-icons/si';
import { FaCode, FaAws } from 'react-icons/fa';

// Theme accent — swap these values to re-theme the whole component
const ACCENT = '#22C55E'; // green-500
const ACCENT_RGB = '34, 197, 94';

const MONO = "'JetBrains Mono', 'SF Mono', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace";

const techIcons = {
  React: SiReact,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  JavaScript: SiJavascript,
  'C#': SiDotnet,
  TypeScript: SiTypescript,
  AWS: FaAws,
};

// Tech brand colors are left as-is — these represent each technology's own
// identity color, not the site theme.
const TECH_COLORS = {
  React: '#38bdf8',
  'Node.js': '#4ade80',
  Express: '#d1d5db',
  MySQL: '#60a5fa',
  PostgreSQL: '#818cf8',
  JavaScript: '#facc15',
  'C#': '#a78bfa',
  TypeScript: '#60a5fa',
  AWS: '#fb923c',
  Docker: '#38bdf8',
};

function mod(n, m) { return ((n % m) + m) % m; }

const ProjectModal = ({ project, onClose }) => {
  const [[index, direction], setIndex] = useState([0, 0]);
  const total = project?.images?.length ?? 0;

  const paginate = (dir) => {
    if (!total) return;
    setIndex(([prev]) => [mod(prev + dir, total), dir]);
  };

  useEffect(() => {
    if (!total) return;
    [mod(index - 1, total), index, mod(index + 1, total)].forEach((i) => {
      const src = project.images[i];
      if (!src) return;
      const img = new Image();
      img.src = src;
      if (img.decode) img.decode().catch(() => {});
    });
  }, [index, total, project]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev || 'auto'; };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler, { passive: true });
    return () => window.removeEventListener('keydown', handler);
  }, [index, total, onClose]);

  const slideVariants = useMemo(() => ({
    enter: (dir) => ({ x: dir > 0 ? 280 : -280, opacity: 0, position: 'absolute' }),
    center: { x: 0, opacity: 1, position: 'relative' },
    exit: (dir) => ({ x: dir > 0 ? -280 : 280, opacity: 0, position: 'absolute' }),
  }), []);

  if (!project) return null;

  const arrowBtn = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    width: 36, height: 36, borderRadius: 8,
    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.14)',
    color: '#fff', fontSize: 20, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s', zIndex: 10, lineHeight: 1,
  };
  const arrowEnter = e => {
    e.currentTarget.style.background = `rgba(${ACCENT_RGB},0.25)`;
    e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.55)`;
  };
  const arrowLeave = e => {
    e.currentTarget.style.background = 'rgba(0,0,0,0.6)';
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
  };

  return (
    <div
      className="pm-overlay"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <MotionConfig transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.8 }}>
        <motion.div
          className="pm-panel"
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 20 }}
        >
          {/* Title bar — always visible, holds the close button */}
          <div className="pm-bar">
            <span className="pm-path">
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>~/projects/</span>
              <span style={{ color: ACCENT, fontWeight: 600 }}>{project.slug || 'project'}</span>
            </span>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="pm-close"
            >✕</button>
          </div>

          {/* Scrollable body */}
          <div className="pm-body">
            <h2 style={{
              margin: '0 0 20px', fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 700,
              letterSpacing: '-0.025em', color: '#fff', lineHeight: 1.2,
            }}>
              {project.title}
            </h2>

            {/* Tech pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {project.techStack.map((tech) => {
                const Icon = techIcons[tech] || FaCode;
                const color = TECH_COLORS[tech] || 'rgba(255,255,255,0.5)';
                return (
                  <motion.div
                    key={tech}
                    whileHover={{ y: -2 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 7,
                      padding: '6px 12px', borderRadius: 6,
                      border: `1px solid ${color}30`, background: `${color}10`,
                      cursor: 'default', userSelect: 'none',
                    }}
                  >
                    <Icon style={{ color, fontSize: 14, flexShrink: 0 }} />
                    <span style={{ fontFamily: MONO, fontSize: 11.5, fontWeight: 500, color: 'rgba(255,255,255,0.72)' }}>
                      {tech}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Carousel */}
            <div style={{
              position: 'relative', width: '100%', borderRadius: 12, overflow: 'hidden',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              aspectRatio: '16/9',
            }}>
              <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                <motion.img
                  key={project.images[index]}
                  src={project.images[index]}
                  alt={`${project.title} screenshot ${index + 1} of ${total}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  draggable={false}
                  loading="eager"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragEnd={(_, info) => {
                    const power = Math.abs(info.offset.x) * info.velocity.x;
                    if (info.offset.x > 120 || power > 8000) paginate(-1);
                    else if (info.offset.x < -120 || power < -8000) paginate(1);
                  }}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    borderRadius: 12, userSelect: 'none', display: 'block',
                  }}
                />
              </AnimatePresence>

              {/* Counter */}
              <div style={{
                position: 'absolute', bottom: 12, left: 12,
                padding: '4px 10px', borderRadius: 6,
                background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.85)', fontSize: 11,
                fontFamily: MONO, letterSpacing: '0.04em',
              }}>
                {index + 1} / {total}
              </div>

              {/* Arrows */}
              {total > 1 && (
                <>
                  <button
                    onClick={() => paginate(-1)}
                    aria-label="Previous image"
                    style={{ ...arrowBtn, left: 12 }}
                    onMouseEnter={arrowEnter}
                    onMouseLeave={arrowLeave}
                  >‹</button>

                  <button
                    onClick={() => paginate(1)}
                    aria-label="Next image"
                    style={{ ...arrowBtn, right: 12 }}
                    onMouseEnter={arrowEnter}
                    onMouseLeave={arrowLeave}
                  >›</button>
                </>
              )}
            </div>

            {/* Dot indicators */}
            {total > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
                {Array.from({ length: total }).map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to image ${i + 1}`}
                    onClick={() => setIndex([i, i > index ? 1 : -1])}
                    style={{
                      width: i === index ? 20 : 6, height: 6, borderRadius: 3,
                      border: 'none',
                      background: i === index ? ACCENT : 'rgba(255,255,255,0.15)',
                      cursor: 'pointer', transition: 'all 0.25s ease', padding: 0,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </MotionConfig>

      <style>{`
        .pm-overlay {
          position: fixed; top: 0; left: 0; right: 0;
          height: 100vh; height: 100dvh;
          z-index: 50;
          display: flex; align-items: center; justify-content: center;
          box-sizing: border-box;
          padding: max(12px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) max(12px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
          background: rgba(0, 0, 0, 0.78);
          -webkit-backdrop-filter: blur(14px);
          backdrop-filter: blur(14px);
        }
        .pm-panel {
          position: relative;
          display: flex; flex-direction: column;
          width: 100%; max-width: 860px;
          max-height: 100%;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(13, 13, 13, 0.98);
          overflow: hidden;
          box-sizing: border-box;
        }
        .pm-bar {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 8px 10px 8px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-family: ${MONO}; font-size: 12px; color: rgba(255, 255, 255, 0.45);
        }
        .pm-path { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pm-close {
          flex-shrink: 0;
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.6); font-size: 15px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; line-height: 1;
        }
        .pm-close:hover { color: #fff; border-color: rgba(${ACCENT_RGB}, 0.55); background: rgba(${ACCENT_RGB}, 0.1); }
        .pm-close:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 2px; }
        .pm-body {
          flex: 1 1 auto; min-height: 0;
          overflow-y: auto; overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          padding: 28px 32px 28px;
        }
        @media (max-width: 640px) {
          .pm-body { padding: 22px 18px 22px; }
          .pm-bar { padding-left: 16px; }
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;