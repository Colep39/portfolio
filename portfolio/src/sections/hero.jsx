import React, { useEffect, useState } from "react";
/* eslint-disable */
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Full Stack Developer",
  "Data Scientist",
  "Software Engineer",
  "Data Analyst",
  "Problem Solver",
  "Collaborator",
  "System Minded",
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const name = "Cole";

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full">
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 sm:px-12">
        <div className="w-full text-center md:text-left">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-100"
          >
            Hey, I’m{" "}
            <span className="name-shimmer inline-flex">
              {name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 44, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.25 + i * 0.08,
                    type: "spring",
                    damping: 12,
                    stiffness: 150,
                  }}
                  className="inline-block bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent"
                  style={{ willChange: "transform" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Rotating Role Text */}
          <div className="mt-3 h-10 sm:h-12">
            <AnimatePresence mode="wait">
              <motion.h2
                key={roles[index]}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-3xl font-semibold text-slate-300"
              >
                {roles[index]}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-300/90 md:mx-0"
          >
            I architect scalable software systems and data solutions designed for performance, maintainability, and robustness.
          </motion.p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition will-change-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition group-hover:from-indigo-600 group-hover:to-violet-700" />
              <span className="absolute inset-0 rounded-full opacity-0 blur-xl bg-gradient-to-r from-indigo-500/50 to-violet-600/50 transition group-hover:opacity-100" />
              <span className="relative">View My Work</span>
            </a>

            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-slate-200/90 ring-1 ring-white/15 bg-white/5 backdrop-blur-sm shadow transition hover:bg-white/10 hover:ring-white/25 hover:scale-[1.03] will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
            >
              About Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;