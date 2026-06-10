/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaRegEye, FaReact, FaNodeJs, FaAws } from 'react-icons/fa';
import {
  SiDotnet, SiMysql, SiPostgresql, SiExpress,
  SiTypescript, SiJavascript,
} from 'react-icons/si';
import ProjectModal from '../components/projectModal';

const TECH_CONFIG = {
  React:      { icon: FaReact,      color: '#38bdf8' },
  'C#':       { icon: SiDotnet,     color: '#a78bfa' },
  MySQL:      { icon: SiMysql,      color: '#60a5fa' },
  'Node.js':  { icon: FaNodeJs,     color: '#4ade80' },
  Express:    { icon: SiExpress,    color: '#d1d5db' },
  PostgreSQL: { icon: SiPostgresql, color: '#818cf8' },
  TypeScript: { icon: SiTypescript, color: '#60a5fa' },
  AWS:        { icon: FaAws,        color: '#fb923c' },
  JavaScript: { icon: SiJavascript, color: '#facc15' },
  Docker:     { icon: SiDotnet,     color: '#38bdf8' },
};

const projects = [
  {
    id: 1,
    title: 'Themepark Management System',
    description:
      'A fullstack management system for a themepark, built with React, C#, and MySQL. It supports role-based access, reporting dashboards, and database-enforced constraints for operational safety.',
    github: 'https://github.com/colep39/themepark-ms',
    techStack: ['React', 'JavaScript', 'C#', 'MySQL'],
    images: [
      '/themepark3.png', '/themepark14.png', '/themepark1.png',
      '/themepark2.png', '/themepark4.png', '/themepark5.png',
      '/themepark6.png', '/themepark7.png', '/themepark9.png',
    ],
    live: null,
    index: '01',
    accent: '#E8613C',
  },
  {
    id: 2,
    title: 'Volunteer Matching Platform',
    description:
      'A fullstack platform for managing volunteer events with admin-controlled listings, recommendations, authentication, notifications, and email verification.',
    github: 'https://github.com/colep39/4353-Project',
    techStack: ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
    images: ['/volunteer4.png', '/volunteer1.png', '/volunteer2.png', '/volunteer3.png'],
    live: 'https://cougar-connect.vercel.app/',
    index: '02',
    accent: '#F0A878',
  },
  {
    id: 3,
    title: 'Incident Monitoring Platform',
    description:
      'A full-stack incident monitoring and root cause analysis platform built to demonstrate production-grade engineering practices. It ingests logs from distributed services, detects anomalies using statistical analysis, groups related errors into incidents, and surfaces everything through a real-time dashboard.',
    github: 'https://github.com/Colep39/logwatch',
    techStack: ['React', 'TypeScript', 'C#', 'PostgreSQL', 'Docker'],
    images: ['/incidentmonitor.png'],
    live: null,
    index: '03',
    accent: '#C4A882',
  },
];

function TechPill({ tech }) {
  const [hovered, setHovered] = useState(false);
  const cfg = TECH_CONFIG[tech];
  if (!cfg) return null;
  const Icon = cfg.icon;
  const c = cfg.color;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '7px 13px', borderRadius: 8,
        border: hovered ? `1px solid ${c}55` : '1px solid rgba(255,255,255,0.08)',
        background: hovered ? `${c}12` : 'rgba(255,255,255,0.03)',
        transition: 'all 0.2s ease', cursor: 'default',
      }}
    >
      <Icon style={{ color: c, fontSize: 14, flexShrink: 0 }} />
      <span style={{
        fontSize: 12, fontWeight: 500,
        color: hovered ? '#fff' : 'rgba(255,255,255,0.55)',
        transition: 'color 0.2s', whiteSpace: 'nowrap',
      }}>
        {tech}
      </span>
    </div>
  );
}

function LinkBtn({ href, icon: Icon, label, accent }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '9px 18px', borderRadius: 9, fontSize: 13, fontWeight: 600,
        textDecoration: 'none', transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
        background: hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.55)',
        border: hovered ? `1px solid ${accent}55` : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Icon style={{ fontSize: 15 }} />
      {label}
    </a>
  );
}

function ProjectCard({ project, onOpen, cardIndex }) {
  const { title, description, techStack, github, live, images, index, accent } = project;
  const isEven = cardIndex % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: cardIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative', display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
        gap: 0, width: '100%', maxWidth: 1100, borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.025)',
        overflow: 'hidden', marginBottom: 28,
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${accent}, transparent)`,
      }} />

      {/* Text side */}
      <div style={{
        flex: '1 1 340px', padding: '40px 40px 36px',
        display: 'flex', flexDirection: 'column', gap: 20,
        order: isEven ? 0 : 1,
      }}>
        <div>
          <div style={{
            fontFamily: "'Courier New', monospace", fontSize: 11,
            letterSpacing: '0.15em', color: accent, marginBottom: 8, opacity: 0.9,
          }}>
            {index} ──
          </div>
          <h2 style={{
            margin: 0, fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 700,
            letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.2,
          }}>
            {title}
          </h2>
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}40, transparent)` }} />

        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
          {description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {techStack.map(t => <TechPill key={t} tech={t} />)}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 }}>
          <LinkBtn href={github} icon={FaGithub} label="GitHub" accent={accent} />
          {live && <LinkBtn href={live} icon={FaRegEye} label="Live Site" accent={accent} />}
        </div>
      </div>

      {/* Image side */}
      <div style={{ flex: '1 1 340px', minHeight: 280, order: isEven ? 1 : 0, position: 'relative' }}>
        <motion.button
          type="button"
          aria-label={`Open ${title} gallery`}
          onClick={() => onOpen(project)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          style={{
            width: '100%', height: '100%', minHeight: 280,
            border: 'none', padding: 0, cursor: 'pointer',
            background: 'none', position: 'relative', display: 'block',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${images[0]})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            transition: 'transform 0.4s ease',
          }} />

          <div className="img-overlay" style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0)', transition: 'background 0.3s ease',
          }} />

          <div style={{
            position: 'absolute', inset: 0,
            background: isEven
              ? 'linear-gradient(to right, rgba(13,13,13,0.5) 0%, transparent 40%)'
              : 'linear-gradient(to left, rgba(13,13,13,0.5) 0%, transparent 40%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'absolute', bottom: 16, right: 16,
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 20,
            background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)', color: '#fff', fontSize: 12,
            fontWeight: 600, letterSpacing: '0.04em',
          }}>
            <FaRegEye style={{ fontSize: 13 }} />
            Gallery
          </div>

          {images.length > 1 && (
            <div style={{
              position: 'absolute', top: 16, right: 16,
              padding: '4px 10px', borderRadius: 20,
              background: `${accent}22`, border: `1px solid ${accent}44`,
              color: accent, fontSize: 11,
              fontFamily: "'Courier New', monospace", letterSpacing: '0.08em',
            }}>
              {images.length} photos
            </div>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    projects.forEach(p => p.images.forEach(src => {
      const img = new Image(); img.src = src;
    }));
  }, []);

  return (
    <section
      id="projects"
      style={{
        position: 'relative', width: '100%', minHeight: '100vh',
        background: '#0D0D0D', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '100px 24px', boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginBottom: 72 }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}
        >
          <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          <span style={{
            fontFamily: "'Courier New', monospace", fontSize: 11,
            letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
          }}>
            Selected Work
          </span>
          <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            margin: 0, fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 1,
            background: 'linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.45) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}
        >
          My Projects
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            margin: '18px auto 0', width: 48, height: 3,
            background: '#E8613C', borderRadius: 3, transformOrigin: 'left',
          }}
        />
      </div>

      {/* Cards */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
      }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} cardIndex={i} onOpen={setActiveProject} />
        ))}
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      <style>{`
        button:hover .img-overlay { background: rgba(0,0,0,0.2) !important; }
      `}</style>
    </section>
  );
};

export default Projects;