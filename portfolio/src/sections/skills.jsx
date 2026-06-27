import React, { useState } from 'react';
/* eslint-disable */
import { motion } from 'framer-motion';
import {
  SiCplusplus, SiPython, SiHtml5, SiJavascript, SiMysql, SiReact,
  SiNodedotjs, SiTailwindcss, SiExpress, SiGithub,
  SiTypescript, SiDotnet, SiGo, SiSpringboot, SiNumpy, SiPandas,
  SiClaude, SiPostman,
} from 'react-icons/si';
import { FaAws, FaJenkins, FaCss3Alt, FaJava } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';
import { DiDocker } from 'react-icons/di';
import { BiLogoVisualStudio } from 'react-icons/bi';

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
      { name: 'C#',         icon: SiDotnet },
      { name: 'Java',       icon: FaJava },
      { name: 'Go',         icon: SiGo },
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
        padding: '9px 16px',
        borderRadius: 6,
        border: hovered
          ? '1px solid rgba(232,97,60,0.45)'
          : '1px solid rgba(255,255,255,0.08)',
        background: hovered ? 'rgba(232,97,60,0.08)' : 'transparent',
        cursor: 'default',
        transition: 'all 0.18s ease',
        userSelect: 'none',
      }}
    >
      <Icon style={{
        fontSize: 15,
        color: hovered ? '#E8613C' : 'rgba(255,255,255,0.35)',
        transition: 'color 0.18s ease',
        flexShrink: 0,
      }} />
      <span style={{
        fontSize: 13,
        fontWeight: 500,
        color: hovered ? '#fff' : 'rgba(255,255,255,0.55)',
        letterSpacing: '0.01em',
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
    >
      {/* Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 20,
      }}>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          fontFamily: "'Courier New', monospace",
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#E8613C',
        }}>
          {category.title}
        </span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
      </div>

      {/* Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
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
        background: '#0D0D0D',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1100 }}>

        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}
          >
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            <span style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11, letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
            }}>
              Technical Expertise
            </span>
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
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
              background: 'linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.45) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            My Skills
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              marginTop: 18, width: 48, height: 3,
              background: '#E8613C', borderRadius: 3, transformOrigin: 'left',
            }}
          />
        </div>

        {/* Category blocks stacked vertically with generous spacing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
          {categories.map((cat, i) => (
            <CategoryBlock key={cat.title} category={cat} blockIndex={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;