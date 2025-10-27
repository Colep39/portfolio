import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from 'react-icons/fa';

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
      {/* ⭐️ Stars */}
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

      {/* Glow overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background:
            'radial-gradient(circle at center, rgba(79, 70, 229, 0.3) 0%, rgba(0,0,0,0) 50%)',
        }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const AboutMe = () => {
  return (
    <StarBackground>
      <section
        id="about"
        className="min-h-[calc(var(--vh,1vh)*100)] flex flex-col items-center justify-center text-white px-6 py-16"
      >
        {/* Profile Image */}
        <img
          src="/profile.jpeg"
          alt="Cole Plagens"
          className="w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-full object-cover shadow-[0_0_20px_rgba(56,189,248,0.6)] mb-8 transition-transform duration-300 hover:scale-105"
        />

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400">
          Hey, I’m Cole 👋
        </h1>

        {/* Description */}
        <p className="max-w-2xl text-center text-gray-300 leading-relaxed mb-8 text-base sm:text-lg">
          I’m a full stack developer and data scientist who loves building clean,
          interactive web experiences. I enjoy learning new technologies, tackling
          complex problems, and collaborating with teams to create meaningful projects.
        </p>

        {/* Social Buttons */}
        <div className="flex flex-wrap justify-center gap-5">
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
      </section>
    </StarBackground>
  );
};

export default AboutMe;
