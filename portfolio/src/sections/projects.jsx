import React, { useState, useEffect } from 'react';
import ProjectModal from '../components/projectModal';

// A helper function to generate a random number within a range.
const random = (min, max) => Math.random() * (max - min) + min;

// A reusable component for the interactive star background.
const StarBackground = ({ children }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);

  // Generate a list of stars with random initial positions and sizes.
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

  // Set up event listeners for mouse movement to track cursor position.
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax effect based on cursor position.
  const calculateParallax = (initialX, initialY, depth) => {
    const moveX = (cursorPosition.x - window.innerWidth / 2) * depth * 0.05;
    const moveY = (cursorPosition.y - window.innerHeight / 2) * depth * 0.05;
    return {
      x: initialX + moveX,
      y: initialY + moveY,
    };
  };

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(17,24,39,0.9) 0%, rgba(0,0,0,1) 100%)',
      }}
    >
      {/* Dynamic stars that react to the cursor and pulse */}
      {stars.map((star, index) => {
        const parallaxPos = calculateParallax(star.x, star.y, star.size * 0.1);
        return (
          <div
            key={index}
            className="absolute rounded-full bg-white transition-opacity duration-300 ease-in-out animate-pulse"
            style={{
              left: `${parallaxPos.x}px`,
              top: `${parallaxPos.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          ></div>
        );
      })}
      {/* Overlay to create a foggy/glowing effect */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.3) 0%, rgba(0,0,0,0) 50%)',
        }}
      ></div>

      {/* Render children on top of the background */}
      {children}
    </div>
  );
};

// Inline SVG icon to replace external libraries
const IoMdClose = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" fill="currentColor"><path d="M289.94 256l95-95A24 24 0 00352 128H160a24 24 0 00-17.94 40.94l95 95-95 95A24 24 0 00160 384h192a24 24 0 0017.94-40.94z" /></svg>

const projects = [
    {
      id: 1,
      title: 'Themepark Management System',
      description: 'A fullstack management system for a themepark, built with React, C#, and MySQL. It allows users to manage rides, employees, and customer data efficiently. The system features user authentication for admins, employees, and customers with differing access levels. The system provides data reports and entry pages for non-customer users to manage themepark operations and logistics. Triggers were used to enforce semantic constraints such as ensuring the maintenance status of a ride restricts customer access.',
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

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <StarBackground>
    <section id="projects" className="relative z-10 min-h-screen w-full px-4 sm:px-8 py-16 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-12 text-gray-400">My Projects</h1>
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mb-12 bg-gray-800 rounded-xl shadow-xl p-6 transition-transform duration-300 hover:scale-[1.02]"
        >
          {/* Left: Text Content */}
          <div className="md:w-1/2 max-w-xl space-y-6 text-center md:text-left p-4">
            <h2 className="text-4xl font-bold text-gray-400">{project.title}</h2>
            <p className="text-gray-300 text-base md:text-lg">{project.description}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-sky-600/30 text-sky-100 text-xs font-semibold rounded-full 
                            transition-all duration-300 ease-in-out 
                            hover:bg-sky-500/50 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/40 cursor-pointer"
                >
                  {tech}
                </span>

              ))}
            </div>
          </div>

          {/* Right: Project Image */}
          <div
            className="md:w-1/2 mt-8 md:mt-0 flex justify-center transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => setActiveProject(project)}
          >
            <img
              src={project.images[0]}
              alt={`${project.title} preview`}
              className="w-full md:w-[90%] max-w-2xl rounded-lg shadow-xl object-cover border-4 border-gray-700"
            />
          </div>
        </div>
      ))}

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