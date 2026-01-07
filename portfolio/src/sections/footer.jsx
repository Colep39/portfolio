import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative w-full m-0 p-0 py-8 flex flex-col items-center justify-center text-gray-700 bg-white overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(56,189,248,0.12), transparent 70%), radial-gradient(circle at 70% 80%, rgba(99,102,241,0.12), transparent 70%)',
        }}
      ></div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 w-full max-w-5xl px-6">
        <p className="text-sm text-gray-700 text-center sm:text-left">
          © {new Date().getFullYear()} Cole Plagens. All rights reserved.
        </p>

        <div className="flex justify-center sm:justify-end gap-5 text-lg">
          <a
            href="https://github.com/colep39"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-transform duration-300 hover:scale-110"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/cole-plagens/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-transform duration-300 hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:colep3@icloud.com"
            className="hover:text-sky-400 transition-transform duration-300 hover:scale-110"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
