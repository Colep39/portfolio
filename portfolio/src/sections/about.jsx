import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutMe = () => {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen m-0 p-0 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-6 sm:px-12 text-white overflow-hidden"
    >
      {/* Subtle cyan/indigo overlay for depth */}
      <div className="absolute inset-0 opacity-25 pointer-events-none"></div>

      {/* Left: Profile Image */}
      <div className="flex justify-center md:justify-end flex-shrink-0 relative z-10">
        <img
          src="/profile.jpeg"
          alt="Cole Plagens"
          className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full object-cover shadow-[0_0_30px_rgba(200,189,248,0.6)] transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Right: Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl space-y-6 relative z-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-700">
          About Me
        </h1>

        <p className="text-gray-500 leading-relaxed text-base sm:text-lg">
          I’m a full stack developer and data scientist who loves crafting intuitive,
          high-performing web applications. I thrive in collaborative environments where
          creativity and logic come together to solve real-world problems.
          Outside of tech I enjoy sports and TV/movies.
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
      </motion.div>
    </section>
  );
};

export default AboutMe;
