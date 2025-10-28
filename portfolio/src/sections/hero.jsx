import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = [
  "Full Stack Developer",
  "Data Scientist",
  "Software Engineer",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  // Rotate role text every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full m-0 p-0 flex items-center justify-center px-6 sm:px-12 bg-transparent overflow-hidden"
    >
      {/* Subtle cyan / indigo glow */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 25% 30%, rgba(56,189,248,0.20), transparent 70%), radial-gradient(circle at 80% 65%, rgba(99,102,241,0.20), transparent 70%)',
        }}
      ></div>

      <div className="relative z-10 text-center md:text-left space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
        >
          Hey, I’m <span className="text-sky-400">Cole</span>
        </motion.h1>

        {/* Rotating Role Text */}
        <div className="h-10 sm:h-12">
          <AnimatePresence mode="wait">
            <motion.h2
              key={roles[index]}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-3xl font-semibold text-gray-300"
            >
              {roles[index]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-6">
          <a
            href="#projects"
            className="px-7 py-3 bg-sky-500 text-white font-semibold rounded-full shadow-lg hover:bg-sky-400 hover:scale-105 transition"
          >
            View My Work
          </a>
          <a
            href="#about"
            className="px-7 py-3 border border-gray-500 text-gray-200 rounded-full hover:border-sky-400 hover:text-sky-300 hover:scale-105 transition"
          >
            About Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
