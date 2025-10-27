import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectModal from '../components/projectModal';

// Random number generator
const random = (min, max) => Math.random() * (max - min) + min;

// 🌠 Star background (unchanged)
const StarBackground = ({ children }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
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

  useEffect(() => {
    const handleMouseMove = (e) => setCursorPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateParallax = (x, y, depth) => {
    const moveX = (cursorPosition.x - window.innerWidth / 2) * depth * 0.05;
    const moveY = (cursorPosition.y - window.innerHeight / 2) * depth * 0.05;
    return { x: x + moveX, y: y + moveY };
  };

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(17,24,39,0.9) 0%, rgba(0,0,0,1) 100%)',
      }}
    >
      {/* Stars */}
      {stars.map((star, index) => {
        const pos = calculateParallax(star.x, star.y, star.size * 0.1);
        return (
          <div
            key={index}
            className="absolute rounded-full bg-white animate-pulse opacity-80"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          ></div>
        );
      })}

      {/* Fog overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(79,70,229,0.3) 0%, rgba(0,0,0,0) 50%)',
        }}
      ></div>

      {/* Foreground */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// 🧠 Project data
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
  // Add more projects here
];

// 💫 Projects Component
const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <StarBackground>
      <section
        id="projects"
        className="relative z-10 min-h-screen w-full px-4 sm:px-8 py-16 flex flex-col items-center justify-center text-white"
      >
        {/* Section title animation */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400"
        >
          My Projects
        </motion.h1>

        {/* Project Cards */}
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
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mb-12 bg-gray-800 rounded-xl shadow-xl p-6 transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Left: Text */}
              <div className="md:w-1/2 max-w-xl space-y-6 text-center md:text-left p-4">
                <h2 className="text-3xl font-bold text-gray-200">{project.title}</h2>
                <p className="text-gray-300 text-base md:text-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                  {project.techStack.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="px-3 py-1 bg-sky-600/30 text-sky-100 text-xs font-semibold rounded-full 
                        transition-all duration-300 ease-in-out 
                        hover:bg-sky-500/50 hover:shadow-lg hover:shadow-sky-500/40 cursor-pointer"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Right: Image */}
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

        {/* Project Modal */}
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </section>
    </StarBackground>
  );
};

export default Projects;
