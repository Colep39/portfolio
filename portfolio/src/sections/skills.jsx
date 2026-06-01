import React, { useRef, useEffect, useState } from 'react';
/* eslint-disable */
import { motion, useInView } from 'framer-motion';
import {
  SiCplusplus, SiPython, SiHtml5, SiJavascript, SiMysql, SiReact,
  SiNodedotjs, SiTailwindcss, SiExpress, SiGithub, SiNextdotjs,
  SiTypescript, SiDotnet, SiGo, SiSpringboot, SiNumpy, SiPandas,
  SiClaude, SiPostman,
} from 'react-icons/si';
import { FaAws, FaJenkins, FaCss3Alt, FaJava } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';
import { DiDocker, DiRedis } from 'react-icons/di';
import { BiLogoVisualStudio } from 'react-icons/bi';

const skills = {
  Languages: {
    accent: '#E8613C',
    border: 'rgba(232,97,60,0.3)',
    label: '01',
    items: [
      { name: 'C++',        icon: <SiCplusplus /> },
      { name: 'Python',     icon: <SiPython /> },
      { name: 'HTML',       icon: <SiHtml5 /> },
      { name: 'CSS',        icon: <FaCss3Alt /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'C#',         icon: <SiDotnet /> },
      { name: 'Java',       icon: <FaJava /> },
      { name: 'Go',         icon: <SiGo /> },
      { name: 'SQL',        icon: <SiMysql /> },
    ],
  },
  'Frameworks & Libraries': {
    accent: '#F0A878',
    border: 'rgba(240,168,120,0.3)',
    label: '02',
    items: [
      { name: 'React',        icon: <SiReact /> },
      { name: 'Node.js',      icon: <SiNodedotjs /> },
      { name: 'ASP.NET',      icon: <SiDotnet /> },
      { name: 'Spring Boot',  icon: <SiSpringboot /> },
      { name: 'Express',      icon: <SiExpress /> },
      { name: 'NumPy',        icon: <SiNumpy /> },
      { name: 'Pandas',       icon: <SiPandas /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    ],
  },
  Tools: {
    accent: '#C4A882',
    border: 'rgba(196,168,130,0.3)',
    label: '03',
    items: [
      { name: 'VS Code', icon: <BiLogoVisualStudio /> },
      { name: 'GitHub',  icon: <SiGithub /> },
      { name: 'Docker',  icon: <DiDocker /> },
      { name: 'Jenkins', icon: <FaJenkins /> },
      { name: 'AWS',     icon: <FaAws /> },
      { name: 'Azure',   icon: <VscAzure /> },
      { name: 'Postman', icon: <SiPostman /> },
      { name: 'Claude',  icon: <SiClaude /> },
    ],
  },
};

function Counter({ to, accent }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 30);
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); }
      else setVal(start);
    }, 30);
    return () => clearInterval(id);
  }, [inView, to]);
  return (
    <span ref={ref} style={{ color: accent, fontFamily: "'Courier New', monospace", fontSize: 11, fontWeight: 700 }}>
      {String(val).padStart(2, '0')}
    </span>
  );
}

function SkillPill({ name, icon, accent, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay, ease: 'backOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 14px', borderRadius: 8,
        border: hovered ? `1px solid ${accent}` : '1px solid rgba(255,255,255,0.08)',
        background: hovered ? `${accent}18` : 'rgba(255,255,255,0.03)',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.65)',
        fontSize: 13, fontWeight: 500, cursor: 'default',
        transition: 'all 0.2s ease', letterSpacing: '0.01em',
        userSelect: 'none', whiteSpace: 'nowrap',
      }}
    >
      <span style={{
        fontSize: 15,
        color: hovered ? accent : 'rgba(255,255,255,0.45)',
        transition: 'color 0.2s', display: 'flex', alignItems: 'center',
      }}>
        {icon}
      </span>
      {name}
    </motion.div>
  );
}

function CategoryCard({ category, data, cardIndex }) {
  const { accent, border, label, items } = data;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: cardIndex * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative', borderRadius: 20, border: `1px solid ${border}`,
        background: 'rgba(255,255,255,0.025)',
        padding: '36px 32px 32px', overflow: 'hidden',
      }}
    >
      {/* Corner accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 60, height: 3,
        background: accent, borderRadius: '0 0 3px 0',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{
            fontFamily: "'Courier New', monospace", fontSize: 11,
            letterSpacing: '0.15em', color: accent, marginBottom: 6, opacity: 0.8,
          }}>
            {label} ──
          </div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {category}
          </h2>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, padding: '8px 14px',
        }}>
          <Counter to={items.length} accent={accent} />
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginTop: 2 }}>SKILLS</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: `${accent}40`, marginBottom: 24 }} />

      {/* Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map(({ name, icon }, i) => (
          <SkillPill key={name} name={name} icon={icon} accent={accent} delay={cardIndex * 0.1 + i * 0.04} />
        ))}
      </div>
    </motion.div>
  );
}

function Dot({ x, y, size, opacity }) {
  return (
    <div style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      width: size, height: size, borderRadius: '50%',
      background: 'rgba(255,255,255,0.6)', opacity, pointerEvents: 'none',
    }} />
  );
}

const dots = [
  { x: 8,  y: 15, size: 2,   opacity: 0.3  },
  { x: 92, y: 10, size: 1.5, opacity: 0.2  },
  { x: 3,  y: 70, size: 1,   opacity: 0.25 },
  { x: 96, y: 60, size: 2,   opacity: 0.15 },
  { x: 50, y: 4,  size: 1.5, opacity: 0.2  },
  { x: 20, y: 90, size: 1,   opacity: 0.15 },
  { x: 80, y: 88, size: 2,   opacity: 0.2  },
];

const Skills = () => {
  return (
    <section
      id="skills"
      style={{
        position: 'relative', width: '100%', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px', background: '#0D0D0D',
        overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Dots */}
      {dots.map((d, i) => <Dot key={i} {...d} />)}

      {/* Section header */}
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
            margin: 0, fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800,
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
            margin: '18px auto 0', width: 48, height: 3,
            background: '#E8613C', borderRadius: 3, transformOrigin: 'left',
          }}
        />
      </div>

      {/* Cards grid */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24, width: '100%', maxWidth: 1100,
      }}>
        {Object.entries(skills).map(([category, data], i) => (
          <CategoryCard key={category} category={category} data={data} cardIndex={i} />
        ))}
      </div>
    </section>
  );
};

export default Skills;