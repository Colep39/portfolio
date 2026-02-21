/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaRegEye, FaReact, FaNodeJs } from 'react-icons/fa';
import {
  SiDotnet,
  SiMysql,
  SiPostgresql,
  SiExpress,
  SiTypescript,
  SiJavascript,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import ProjectModal from '../components/projectModal';

const TECH_CONFIG = {
  React: {
    icon: FaReact,
    color: 'text-sky-400',
    glow: 'hover:shadow-sky-400/40',
  },
  'C#': {
    icon: SiDotnet,
    color: 'text-purple-400',
    glow: 'hover:shadow-purple-400/40',
  },
  MySQL: {
    icon: SiMysql,
    color: 'text-blue-400',
    glow: 'hover:shadow-blue-400/40',
  },
  'Node.js': {
    icon: FaNodeJs,
    color: 'text-green-400',
    glow: 'hover:shadow-green-400/40',
  },
  Express: {
    icon: SiExpress,
    color: 'text-gray-300',
    glow: 'hover:shadow-white/20',
  },
  PostgreSQL: {
    icon: SiPostgresql,
    color: 'text-indigo-400',
    glow: 'hover:shadow-indigo-400/40',
  },
  TypeScript: {
    icon: SiTypescript,
    color: 'text-blue-400',
    glow: 'hover:shadow-blue-400/40',
  },
  AWS: {
    icon: FaAws,
    color: 'text-orange-400',
    glow: 'hover:shadow-orange-400/40',
  },
  JavaScript: {
    icon: SiJavascript,
    color: 'text-yellow-400',
    glow: 'hover:shadow-yellow-400/40',
  },
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
      '/themepark3.png',
      '/themepark14.png',
      '/themepark1.png',
      '/themepark2.png',
      '/themepark4.png',
      '/themepark5.png',
      '/themepark6.png',
      '/themepark7.png',
      '/themepark9.png',
    ],
    live: null,
  },
  {
    id: 2,
    title: 'Volunteer Matching Platform',
    description:
      'A fullstack platform for managing volunteer events with admin-controlled listings, recommendations, authentication, notifications, and email verification.',
    github: 'https://github.com/colep39/4353-Project',
    techStack: ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
    images: [
      '/volunteer4.png',
      '/volunteer1.png',
      '/volunteer2.png',
      '/volunteer3.png',
    ],
    live: 'https://cougar-connect.vercel.app/',
  },
  {
    id: 3,
    title: 'Startup Operations Platform',
    description: 'In Progress... ',
    github: 'https://github.com/colep39/'
,   techStack: ['React', 'TypeScript', 'C#', 'PostgreSQL', 'AWS',],
    images: [
      '/workinprogress.jpg',
    ],
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    projects.forEach(project => {
      project.images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full px-4 sm:px-8 py-16 flex flex-col items-center text-white overflow-hidden"
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-4xl sm:text-4xl font-bold animated-gradient-text mb-14 mt-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400"
      >
        My Projects
      </motion.h1>

      <motion.div
        className="flex flex-col items-center w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.25 },
          },
        }}
      >
        {projects.map(project => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col md:flex-row w-full max-w-6xl mb-14 bg-gray-800/60 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-6"
          >
            <div className="md:w-1/2 space-y-6 text-center md:text-left p-4">
              <h2 className="text-3xl font-bold text-gray-200">
                {project.title}
              </h2>

              <p className="text-gray-300 text-base md:text-lg">
                {project.description}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                {project.techStack.map(tech => {
                  const techData = TECH_CONFIG[tech];
                  if (!techData) return null;
                  const Icon = techData.icon;

                  return (
                    <motion.div
                      key={tech}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-full
                        bg-white/5 backdrop-blur-md
                        border border-white/10
                        shadow-md
                        ${techData.glow}
                        hover:shadow-lg
                        transition-all duration-300
                      `}
                      title={tech}
                    >
                      <Icon className={`text-lg ${techData.color}`} />
                      <span className="text-xs font-medium text-gray-200">
                        {tech}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-600 hover:scale-105 transition-all duration-300"
                >
                  <FaGithub size={18} />
                  <span>GitHub</span>
                </a>

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-600 hover:scale-105 transition-all duration-300"
                  >
                    <FaRegEye size={18} />
                    <span>Live Site</span>
                  </a>
                )}
              </div>
            </div>

            <motion.div
              onClick={() => setActiveProject(project)}
              className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
            >
              <motion.button
                type="button"
                aria-label={`Open ${project.title} gallery`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                className="group relative w-full sm:w-[90%] max-w-md cursor-pointer focus:outline-none"
              >
                {/* Animated gradient border */}
                <motion.div
                  whileHover={{ backgroundPosition: "200% center" }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="
                    rounded-2xl p-[2px]
                    bg-[linear-gradient(90deg,#38bdf8,#4ade80,#818cf8,#38bdf8)]
                    bg-[length:200%_100%]
                    shadow-xl
                    transition-shadow duration-300
                    group-hover:shadow-2xl
                  "
                >
                  {/* Fixed-size preview (CONSISTENT across all projects) */}
                  <div className="relative rounded-2xl overflow-hidden bg-gray-900 h-[240px] sm:h-[280px] md:h-[320px]">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${project.images[0]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    />

                    {/* Clickable affordance overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />

                    {/* Click to view chip */}
                    <div className="absolute bottom-4 right-4">
                      <div className="flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-sm text-white backdrop-blur-md border border-white/15 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-medium">View</span>
                        <span className="inline-block translate-x-0 group-hover:translate-x-0.5 transition-transform duration-300">
                          ↗
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
