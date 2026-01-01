import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import ProjectModal from '../components/projectModal';

// Project data
const projects = [
  {
    id: 1,
    title: 'Themepark Management System',
    description:
      'A fullstack management system for a themepark, built with React, C#, and MySQL. It allows users to manage rides, employees, and customer data efficiently. The system features user authentication for admins, employees, and customers with differing access levels. The system provides data reports and entry pages for non-customer users to manage themepark operations and logistics. Triggers were used to enforce semantic constraints such as ensuring the maintenance status of a ride restricts customer access.',
    github: 'https://github.com/colep39/themepark-ms',
    techStack: ['React', 'C#', 'MySQL'],
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
  },
  {
    id: 2,
    title: 'Volunteer Matching Platform',
    description:
      'Fullstack Application that features Events that volunteers may sign up for ran by administrators that create/manage these events while being able to directly recommend an event to a volunteer. Includes user authentication, notifications, and email verification.',
    github: 'https://github.com/colep39/4353-Project',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    images: [
      '/volunteer4.png',
      '/volunteer1.png',
      '/volunteer2.png',
      '/volunteer3.png',
    ]
  }
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
      className="relative min-h-screen w-full px-4 sm:px-8 py-16 flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Subtle cyan/indigo glow overlay */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
      ></div>

      {/* Section title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400 relative z-10"
      >
        My Projects
      </motion.h1>

      {/* Project Cards */}
      <motion.div
        className="flex flex-col items-center w-full relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.25 },
          },
        }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mb-12 bg-gray-800/60 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm p-6 transition-transform duration-300 "
          >
            {/* Left: Text content */}
            <div className="md:w-1/2 max-w-xl space-y-6 text-center md:text-left p-4">
              <h2 className="text-3xl font-bold text-gray-200">{project.title}</h2>
              <p className="text-gray-300 text-base md:text-lg">{project.description}</p>

              {/* Tech stack badges */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
                {project.techStack.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -2, scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="
                      relative px-4 py-1.5 text-xs font-semibold tracking-wide
                      rounded-full cursor-default
                      bg-gradient-to-r from-sky-500/20 to-indigo-500/20
                      text-sky-200
                      border border-white/10
                      backdrop-blur-md
                      shadow-[0_0_0_1px_rgba(255,255,255,0.03)]
                      hover:shadow-[0_8px_30px_-8px_rgba(56,189,248,0.6)]
                      hover:text-white
                      transition-all duration-300
                    "
                  >
                    <span className="relative z-10">{tech}</span>
                  </motion.span>
                ))}
              </div>

              {/* GitHub button */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-5 py-2 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-600 hover:scale-105 transition-all duration-300"
              >
                <FaGithub size={18} />
                <span>View on GitHub</span>
              </a>
            </div>

            {/* Right: Project image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="md:w-1/2 mt-8 md:mt-0 flex justify-center cursor-pointer"
              onClick={() => setActiveProject(project)}
            >
              <img
                src={project.images[0]}
                alt={`${project.title} preview`}
                className="w-full sm:w-[90%] max-w-md rounded-lg shadow-xl object-cover border-4 border-gray-700"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
};

export default Projects;
