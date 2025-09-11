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
  } from 'react-icons/si';
  import { FaCode } from 'react-icons/fa'; // for VS Code
  import React, { useState, useEffect } from 'react';

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
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.3) 0%, rgba(0,0,0,0) 50%)',
        }}
      ></div>
      {/* Render children on top of the background */}
      {children}
    </div>
  );
};
  

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
        className="h-screen w-full px-4 sm:px-8 overflow-hidden relative z-10 text-white flex flex-col items-center justify-center"
      >
        <h1 className="text-4xl font-bold mb-12 animate-fade-in-down">My Skills</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl animate-fade-in-up">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="bg-white/10 backdrop-blur-sm shadow-xl rounded-xl p-6 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <h2 className="text-2xl font-semibold text-gray-200 mb-4 text-center">{category}</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {items.map(({ name, icon }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-full shadow text-sm font-medium hover:bg-gray-600 transition cursor-pointer"
                  >
                    {icon}
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </StarBackground>
  );
};

export default Skills;
