import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NavBar = ({ toggleModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen(!menuOpen);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#hero"
          className="text-2xl font-bold text-sky-600 hover:text-sky-500 transition-colors"
          onClick={handleLinkClick}
        >
          Cole Plagens
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><a href="#about" className="hover:text-sky-500">About</a></li>
          <li><a href="#skills" className="hover:text-sky-500">Skills</a></li>
          <li><a href="#projects" className="hover:text-sky-500">Projects</a></li>
          <li><button onClick={toggleModal} className="hover:text-sky-500 cursor-pointer">Contact</button></li>
          <li><a href="/cole_plagens_resume.pdf" target="_blank" className="hover:text-sky-500">Resume</a></li>
        </ul>

        {/* Mobile hamburger */}
        <button onClick={handleToggle} className="md:hidden text-sky-600 focus:outline-none">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul className="md:hidden bg-white text-gray-800 shadow-lg flex flex-col items-center space-y-4 py-6">
          <li><a href="#about" onClick={handleLinkClick}>About</a></li>
          <li><a href="#skills" onClick={handleLinkClick}>Skills</a></li>
          <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
          <li><button onClick={() => {toggleModal(); handleLinkClick();}}>Contact</button></li>
          <li><a href="/cole_plagens_resume.pdf" target="_blank" onClick={handleLinkClick}>Resume</a></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
