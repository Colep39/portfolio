/* eslint-disable */
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import {
  SiReact, SiNodedotjs, SiExpress, SiMysql,
  SiPostgresql, SiJavascript, SiTypescript, SiDotnet,
} from 'react-icons/si';
import { FaCode, FaAws } from 'react-icons/fa';

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

  const accent = project.accent || '#E8613C';

  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px',
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(14px)',
      }}
    >
      <MotionConfig transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.8 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 20 }}
          style={{
            position: 'relative', width: '100%', maxWidth: 860,
            maxHeight: '90vh', overflowY: 'auto', borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.09)',
            background: 'rgba(13,13,13,0.98)', backdropFilter: 'blur(20px)',
            padding: '36px 36px 32px', boxSizing: 'border-box',
          }}
        >
          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            borderRadius: '20px 20px 0 0',
            background: `linear-gradient(90deg, ${accent}, transparent)`,
          }} />

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close modal"
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
          >✕</button>

          {/* Title */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontFamily: "'Courier New', monospace", fontSize: 10,
              letterSpacing: '0.15em', color: accent, marginBottom: 6, opacity: 0.9,
            }}>
              {project.index || '──'} Project
            </div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>
              {project.title}
            </h2>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}40, transparent)`, marginBottom: 24 }} />

          {/* Tech pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {project.techStack.map((tech) => {
              const Icon = techIcons[tech] || FaCode;
              const color = TECH_COLORS[tech] || 'rgba(255,255,255,0.5)';
              return (
                <motion.div
                  key={tech}
                  whileHover={{ y: -2 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '7px 13px', borderRadius: 8,
                    border: `1px solid ${color}30`, background: `${color}10`,
                    cursor: 'default', userSelect: 'none',
                  }}
                >
                  <Icon style={{ color, fontSize: 14, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>
                    {tech}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Carousel */}
          <div style={{
            position: 'relative', width: '100%', borderRadius: 14, overflow: 'hidden',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
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
                  borderRadius: 14, userSelect: 'none', display: 'block',
                }}
              />
            </AnimatePresence>

            {/* Counter */}
            <div style={{
              position: 'absolute', bottom: 12, left: 12,
              padding: '4px 12px', borderRadius: 20,
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)', fontSize: 11,
              fontFamily: "'Courier New', monospace", letterSpacing: '0.06em',
            }}>
              {index + 1} / {total}
            </div>

            {/* Arrows */}
            {total > 1 && (
              <>
                <button
                  onClick={() => paginate(-1)}
                  aria-label="Previous image"
                  style={{
                    position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', fontSize: 20, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s', zIndex: 10, lineHeight: 1,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${accent}33`; e.currentTarget.style.borderColor = `${accent}55`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                >‹</button>

                <button
                  onClick={() => paginate(1)}
                  aria-label="Next image"
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', fontSize: 20, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s', zIndex: 10, lineHeight: 1,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${accent}33`; e.currentTarget.style.borderColor = `${accent}55`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
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
                  onClick={() => setIndex([i, i > index ? 1 : -1])}
                  style={{
                    width: i === index ? 20 : 6, height: 6, borderRadius: 3,
                    border: 'none',
                    background: i === index ? accent : 'rgba(255,255,255,0.15)',
                    cursor: 'pointer', transition: 'all 0.25s ease', padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </MotionConfig>
    </div>
  );
};

export default ProjectModal;