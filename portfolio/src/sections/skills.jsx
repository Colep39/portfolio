import React from 'react';
import { motion } from 'framer-motion';
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
  SiTypescript,
  SiDotnet,
} from 'react-icons/si';
import { FaCode, FaAws, FaJenkins, FaGithub } from 'react-icons/fa';
import { VscAzure } from "react-icons/vsc";
import { DiDocker} from 'react-icons/di';
import { BiLogoVisualStudio } from "react-icons/bi";

const skills = {
  Languages: [
    { name: 'C++', icon: <SiCplusplus size={20} /> },
    { name: 'Python', icon: <SiPython size={20} /> },
    { name: 'HTML', icon: <SiHtml5 size={20} /> },
    { name: 'CSS', icon: <SiCss3 size={20} /> },
    { name: 'JavaScript', icon: <SiJavascript size={20} /> },
    { name: 'TypeScript', icon: <SiTypescript size={20} /> },
    { name: 'SQL', icon: <SiMysql size={20} /> },

  ],
  'Frameworks/Libraries': [
    { name: 'React', icon: <SiReact size={20} /> },
    { name: 'Node.js', icon: <SiNodedotjs size={20} /> },
    { name: 'ASP.NET', icon: <SiDotnet size={20} /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={20} /> },
    { name: 'Express', icon: <SiExpress size={20} /> },
    { name: 'Next.js', icon: <SiNextdotjs size={20} /> },

  ],
  Tools: [
    { name: 'VS Code', icon: <BiLogoVisualStudio size={20} /> },
    { name: 'GitHub', icon: <SiGithub size={20} /> },
    { name: 'Vite', icon: <SiVite size={20} /> },
    { name: 'npm', icon: <SiNpm size={20} /> },
    { name: 'Docker', icon: <DiDocker size={20} /> },
    { name: 'Jenkins', icon: <FaJenkins size={20} /> },
    { name: 'AWS', icon: <FaAws size={20} /> },
    { name: 'Azure', icon: <VscAzure size={20} /> },

  ],
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative w-full min-h-screen m-0 p-0 px-4 sm:px-8 flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Subtle glow overlay */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
      ></div>

      {/* Section Title */}
      <h1 className="text-3xl sm:text-4xl font-bold animated-gradient-text mb-14">
          My Skills
      </h1>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl relative z-10"
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
            className="bg-gray-800/70 border border-gray-700 backdrop-blur-sm rounded-xl shadow-xl p-6 transition duration-300 ease-in-out hover:shadow-2xl hover:border-sky-500 hover:scale-[1.02]"
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
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-300 to-indigo-400 text-white rounded-full shadow text-sm font-medium hover:bg-gradient-to-r hover:from-sky-400 hover:to-indigo-500 cursor-pointer transition"
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
  );
};

export default Skills;
