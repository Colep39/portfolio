import React, { useEffect, useState } from 'react';
import NavBar from './components/navbar.jsx';
import Hero from './sections/hero.jsx';
import AboutMe from './sections/about.jsx';
import Skills from './sections/skills.jsx';
import Projects from './sections/projects.jsx';
import ContactModal from './sections/contact.jsx';
import Footer from './sections/footer.jsx';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(prev => !prev);

  // Fix 100vh on mobile
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900">
      <NavBar toggleModal={toggleModal} />

      <main className="relative z-10">
        <Hero />
        <AboutMe />
        <Skills />
        <Projects />
        <Footer />
      </main>

      {isModalOpen && <ContactModal toggleModal={toggleModal} />}
    </div>
  );
}

export default App;

