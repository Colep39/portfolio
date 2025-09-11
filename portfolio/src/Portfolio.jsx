import React, {useEffect, useState} from 'react'
import NavBar from './components/navbar.jsx'
import Hero from './sections/hero.jsx'
import AboutMe from './sections/about.jsx'
import Skills from './sections/skills.jsx'
import Projects from './sections/projects.jsx'
import ContactModal from './sections/contact.jsx';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);

  return (
    <>
      <div className="overflow-x-hidden">
        <NavBar toggleModal={toggleModal} />
        <Hero />
        <AboutMe />
        <Skills />
        <Projects />
      </div>

      {/* Modal overlay outside */}
      {isModalOpen && <ContactModal toggleModal={toggleModal} />}
    </>
  );
}


export default App
