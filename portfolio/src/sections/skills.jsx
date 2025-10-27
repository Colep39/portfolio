import {
  SiCplusplus,
  SiPython,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiMysql,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiExpress,
  SiGithub,
  SiVite,
  SiNpm,
  SiPrisma,
  SiNextdotjs,
} from 'react-icons/si';
import { FaCode } from 'react-icons/fa'; 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Random number helper
const random = (min, max) => Math.random() * (max - min) + min;

const StarBackground = ({ children }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const numStars = 150;
    const starList = [];
    for (let i = 0; i < numStars; i++) {
      starList.push({
        x: random(0, window.innerWidth),
        y: random(0, window.innerHeight),
        size: random(1, 3),
        delay: random(0, 5),
      });
    }
    setStars(starList);
  }, []);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(17,24,39,0.9) 0%, rgba(0,0,0,1) 100%)',
      }}
    >
      {/* Pulsing stars */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white animate-pulse opacity-80"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        ></div>
      ))}

      {/* Fog overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.3) 0%, rgba(0,0,0,0) 50%)',
        }}
      ></div>

      {children}
    </div>
  );
};

// Skills data
const skills = {
  Languages: [
    { name: 'C++', icon: <SiCplusplus size={20} /> },
    { name: 'Python', icon: <SiPython size={20} /> },
    { name: 'HTML', icon: <SiHtml5 size={20} /> },
    { name: 'CSS', icon: <SiCss3 size={20} /> },
    { name: 'JavaScript', icon: <SiJavascript size={20} /> },
    { name: 'SQL', icon: <SiMysql size={20} /> },
  ],
  Frameworks: [
    { name: 'React', icon: <SiReact size={20} /> },
    { name: 'Node.js', icon: <SiNodedotjs size={20} /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={20} /> },
    { name: 'Express', icon: <SiExpress size={20} /> },
    { name: 'Next.js', icon: <SiNextdotjs size={20} /> },
  ],
  Tools: [
    { name: 'VS Code', icon: <FaCode size={20} /> },
    { name: 'GitHub', icon: <SiGithub size={20} /> },
    { name: 'Vite', icon: <SiVite size={20} /> },
    { name: 'npm', icon: <SiNpm size={20} /> },
    { name: 'Prisma ORM', icon: <SiPrisma size={20} /> },
  ],
};

const Skills = () => {
  return (
    <StarBackground>
      <section
        id="skills"
        className="min-h-[calc(var(--vh,1vh)*100)] w-full px-4 sm:px-8 overflow-hidden relative z-10 text-white flex flex-col items-center justify-center"
      >
        {/* Title animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400"
        >
          My Skills
        </motion.h1>

        {/* Grid of skill categories with staggered animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {Object.entries(skills).map(([category, items]) => (
            <motion.div
              key={category}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="bg-white/10 backdrop-blur-sm shadow-xl rounded-xl p-6 transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02]"
            >
              <h2 className="text-2xl font-semibold text-gray-200 mb-4 text-center">
                {category}
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {items.map(({ name, icon }) => (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-full shadow text-sm font-medium hover:bg-gray-600 cursor-pointer"
                  >
                    {icon}
                    <span>{name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </StarBackground>
  );
};

export default Skills;
