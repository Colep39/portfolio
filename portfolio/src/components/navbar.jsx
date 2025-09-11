import React from 'react';

const NavBar = ( {toggleModal }) => {
    return (
        <nav className="w-full px-6 py-4 bg-white shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <a href="#hero" className="text-2xl font-bold text-sky-600 hover:text-sky-500 transition-colors">
                Cole Plagens
                </a>

                {/* Navigation Links */}
                <ul className="flex space-x-6 text-gray-700 font-medium">
                <li>
                    <a href="#about" className="hover:text-sky-500 transition-colors">About</a>
                </li>
                <li>
                    <a href="#skills" className="hover:text-sky-500 transition-colors">Skills</a>
                </li>
                <li>
                    <a href="#projects" className="hover:text-sky-500 transition-colors">Projects</a>
                </li>
                <li>
                    <button
                        onClick={toggleModal}
                        className="hover:text-sky-500 transition-colors bg-transparent border-none cursor-pointer p-0 font-medium"
                    >
                        Contact
                    </button>
                </li>
                <li>
                    <a href="/cole_plagens_resume.pdf" target="_blank" className="hover:text-sky-500 transition-colors">Resume</a>
                </li>
                </ul>
            </div>
        </nav>

    );
}

export default NavBar;