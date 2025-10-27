import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const random = (min, max) => Math.random() * (max - min) + min;

const StarBackground = ({ children }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const numStars = 150;
    const starList = Array.from({ length: numStars }, () => ({
      x: random(0, window.innerWidth),
      y: random(0, window.innerHeight),
      size: random(1, 3),
      delay: random(0, 5),
    }));
    setStars(starList);
  }, []);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(17,24,39,0.9) 0%, rgba(0,0,0,1) 100%)',
      }}
    >
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
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

      {/* Glow Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background:
            'radial-gradient(circle at center, rgba(79,70,229,0.3) 0%, rgba(0,0,0,0) 50%)',
        }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// 💫 AboutMe Section
const AboutMe = () => {
  return (
    <StarBackground>
      <section
        id="about"
        className="min-h-[calc(var(--vh,1vh)*100)] w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-6 sm:px-12 py-16 text-white"
      >
        {/* Left: Profile Image */}
        <div className="flex justify-center md:justify-end flex-shrink-0">
          <img
            src="/profile.jpeg"
            alt="Cole Plagens"
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full object-cover shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-transform duration-300 hover:scale-105"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl space-y-6"
        >

        {/* Right: Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400">
            Hey, I’m Cole 👋
          </h1>

          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            I’m a full stack developer and data scientist who loves crafting intuitive,
            high-performing web applications. I thrive in collaborative environments where
            creativity and logic come together to solve real-world problems.
          </p>

          {/* Social Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            <a
              href="https://github.com/colep39"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2 rounded-full shadow-md hover:bg-gray-700 hover:scale-105 transition-all duration-300"
            >
              <FaGithub size={18} />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/cole-plagens/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-sky-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-sky-500 hover:scale-105 transition-all duration-300"
            >
              <FaLinkedin size={18} />
              <span>LinkedIn</span>
            </a>

            <a
              href="/cole_plagens_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-indigo-500 hover:scale-105 transition-all duration-300"
            >
              <FaFileAlt size={18} />
              <span>Resume</span>
            </a>

            <a
              href="mailto:colep3@icloud.com"
              className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-teal-500 hover:scale-105 transition-all duration-300"
            >
              <FaEnvelope size={18} />
              <span>Email</span>
            </a>
          </div>
        </div>
        </motion.div>
      </section>
    </StarBackground>
  );
};

export default AboutMe;
