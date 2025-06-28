import React, {useState} from 'react';
import ProjectModal from '../components/projectModal.jsx';

const projects = [
    {
      id: 1,
      title: 'Themepark Management System',
      description: 'A fullstack management system for a themepark, built with React, C#, and MySQL. It allows users to manage rides, employees, and customer data efficiently. The system features user authentication for admins, employees, and customers with differing access levels. The system provides data reports and entry pages for non-customer users to manage themepark operations and logistics. Triggers were used to enforce semantic constraints such as ensuring the maintenance status of a ride restricts customer access.',
      github: 'https://github.com/colep39/themepark-ms',
      techStack: ['React', 'C#', 'MySQL'],
      images: [
        '/themepark3.png',
        '/themepark14.png',
        '/themepark1.png',
        '/themepark2.png',
        '/themepark4.png',
        '/themepark5.png',
        '/themepark6.png',
        '/themepark7.png',
        '/themepark9.png',

      ],
    },
    // Add more projects here
];

const Projects = () => {
    const [activeProject, setActiveProject] = useState(null);
  
    return (
      <section id="projects">
        {projects.map((project) => (
          <div
            key={project.id}
            className="h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-sky-50 to-white px-6 py-8"
          >
            {/* Left: Text Content */}
            <div className="md:w-1/2 max-w-xl space-y-6 text-center md:text-left">
              <h2 className="text-4xl font-bold text-sky-700">{project.title}</h2>
              <p className="text-gray-700 text-base md:text-lg">{project.description}</p>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-500 hover:underline text-lg"
              >
                View GitHub Repo
              </a>
            </div>
  
            {/* Right: Project Image */}
            <div
              className="md:w-1/2 mt-8 md:mt-0 flex justify-center transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setActiveProject(project)}
            >
              <img
                src={project.images[0]}
                alt={`${project.title} preview`}
                className="w-[90%] max-w-2xl rounded-lg shadow-xl object-cover"
              />
            </div>
          </div>
        ))}
  
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </section>
    );
  };
  
  export default Projects;