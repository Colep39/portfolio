import React, { useState } from 'react';
/* eslint-disable */
import { motion } from 'framer-motion';
import {
  SiCplusplus, SiPython, SiHtml5, SiJavascript, SiMysql, SiReact,
  SiNodedotjs, SiTailwindcss, SiExpress, SiGithub,
  SiTypescript, SiDotnet, SiGo, SiSpringboot, SiNumpy, SiPandas,
  SiClaude, SiPostman, SiPhp,
} from 'react-icons/si';
import { FaAws, FaJenkins, FaCss3Alt, FaJava } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';
import { DiDocker } from 'react-icons/di';
import { BiLogoVisualStudio } from 'react-icons/bi';

// Theme accent — swap these values to re-theme the whole component
const ACCENT = '#22C55E';       // green-500
const ACCENT_RGB = '34, 197, 94';
const BG = '#0D0D0D';

const MONO = "'JetBrains Mono', 'SF Mono', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace";

const categories = [
  {
    title: 'Languages',
    items: [
      { name: 'C++',        icon: SiCplusplus },
      { name: 'Python',     icon: SiPython },
      { name: 'HTML',       icon: SiHtml5 },
      { name: 'CSS',        icon: FaCss3Alt },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'PHP',        icon: SiPhp },
      { name: 'C#',         icon: SiDotnet },
      { name: 'Java',       icon: FaJava },
      { name: 'SQL',        icon: SiMysql },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      { name: 'React',        icon: SiReact },
      { name: 'Node.js',      icon: SiNodedotjs },
      { name: 'ASP.NET',      icon: SiDotnet },
      { name: 'Express',      icon: SiExpress },
      { name: 'NumPy',        icon: SiNumpy },
      { name: 'Pandas',       icon: SiPandas },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'VS Code', icon: BiLogoVisualStudio },
      { name: 'GitHub',  icon: SiGithub },
      { name: 'Docker',  icon: DiDocker },
      { name: 'Jenkins', icon: FaJenkins },
      { name: 'AWS',     icon: FaAws },
      { name: 'Azure',   icon: VscAzure },
      { name: 'Postman', icon: SiPostman },
      { name: 'Claude',  icon: SiClaude },
    ],
  },
];

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

function SkillChip({ name, icon: Icon, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 14px',
        borderRadius: 6,
        border: hovered
          ? `1px solid rgba(${ACCENT_RGB},0.5)`
          : '1px solid rgba(255,255,255,0.08)',
        background: hovered ? `rgba(${ACCENT_RGB},0.08)` : 'rgba(255,255,255,0.015)',
        cursor: 'default',
        transition: 'all 0.18s ease',
        userSelect: 'none',
      }}
    >
      <Icon style={{
        fontSize: 15,
        color: hovered ? ACCENT : 'rgba(255,255,255,0.38)',
        transition: 'color 0.18s ease',
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: MONO,
        fontSize: 12.5,
        fontWeight: 500,
        color: hovered ? '#fff' : 'rgba(255,255,255,0.6)',
        transition: 'color 0.18s ease',
        whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
    </motion.div>
  );
}

function CategoryBlock({ category, blockIndex }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: blockIndex * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.09)',
        background: 'rgba(255,255,255,0.022)',
        overflow: 'hidden',
      }}
    >
      {/* Title bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '11px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        fontFamily: MONO,
        fontSize: 12,
        color: 'rgba(255,255,255,0.45)',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.25)' }}>~/skills/</span>
        <span style={{ color: ACCENT, fontWeight: 600 }}>{slugify(category.title)}</span>
      </div>

      {/* Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '22px 20px 24px' }}>
        {category.items.map((item, i) => (
          <SkillChip
            key={item.name}
            name={item.name}
            icon={item.icon}
            delay={blockIndex * 0.06 + i * 0.025}
          />
        ))}
      </div>
    </motion.div>
  );
}

const Skills = () => {
  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px',
        background: BG,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1100 }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: MONO,
              fontSize: 12.5, letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            <span style={{ color: ACCENT, marginRight: 6 }}>//</span>
            Technical Expertise
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              margin: 0,
              fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800,
              letterSpacing: '-0.04em', lineHeight: 1,
              color: '#fff',
            }}
          >
            My Skills
          </motion.h1>
        </div>

        {/* Category blocks stacked vertically */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {categories.map((cat, i) => (
            <CategoryBlock key={cat.title} category={cat} blockIndex={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;