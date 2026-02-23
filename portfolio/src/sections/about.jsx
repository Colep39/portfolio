import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from "react-icons/fa";
/* eslint-disable */
import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 px-6 sm:px-12"
    >
      {/* Left: Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex justify-center md:justify-end flex-shrink-0"
      >
        <img
          src="/careerpfp.jpeg"
          alt="Cole Plagens"
          className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full object-cover
          shadow-[0_0_40px_rgba(139,92,246,0.35)]
          transition duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(139,92,246,0.55)]"
        />
      </motion.div>

      {/* Right: Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-2xl text-center md:text-left space-y-6"
      >
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
          About Me
        </h1>

        <p className="text-slate-200/80 leading-relaxed text-base sm:text-lg">
          I’m a full stack developer and data scientist who loves crafting
          intuitive, high-performing web applications. I thrive in collaborative
          environments where creativity and logic come together to solve
          real-world problems. Outside of tech I enjoy sports and TV/movies.
        </p>

        {/* Social Buttons */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
          {/* Primary gradient CTA */}
          <a
            href="https://github.com/colep39"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white transition hover:scale-[1.04]"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition group-hover:from-indigo-600 group-hover:to-violet-700" />
            <span className="absolute inset-0 rounded-full opacity-0 blur-xl bg-gradient-to-r from-indigo-500/50 to-violet-600/50 transition group-hover:opacity-100" />
            <span className="relative flex items-center gap-2">
              <FaGithub size={17} />
              GitHub
            </span>
          </a>

          {/* Neutral glass buttons */}
          <a
            href="https://www.linkedin.com/in/cole-plagens/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
            text-slate-100/90 bg-white/5 ring-1 ring-white/10 backdrop-blur-sm
            hover:bg-white/10 hover:ring-white/20 hover:scale-[1.04] transition"
          >
            <FaLinkedin size={17} />
            LinkedIn
          </a>

          <a
            href="/cole_plagens_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
            text-slate-100/90 bg-white/5 ring-1 ring-white/10 backdrop-blur-sm
            hover:bg-white/10 hover:ring-white/20 hover:scale-[1.04] transition"
          >
            <FaFileAlt size={17} />
            Resume
          </a>

          <a
            href="mailto:colep3@icloud.com"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
            text-slate-100/90 bg-white/5 ring-1 ring-white/10 backdrop-blur-sm
            hover:bg-white/10 hover:ring-white/20 hover:scale-[1.04] transition"
          >
            <FaEnvelope size={17} />
            Email
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutMe;