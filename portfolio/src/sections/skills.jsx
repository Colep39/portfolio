import {
    SiCplusplus,
    SiPython,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiMysql,
    SiReact,
    SiNodedotjs,
    SiTailwindcss,
    SiExpress,
    SiGithub,
    SiVite,
    SiNpm,
    SiPrisma,
  } from 'react-icons/si';
  import { FaCode } from 'react-icons/fa'; // for VS Code
  

const skills = {
  Languages: [
    { name: 'C++', icon: <SiCplusplus size={20} /> },
    { name: 'Python', icon: <SiPython size={20} /> },
    { name: 'HTML', icon: <SiHtml5 size={20} /> },
    { name: 'CSS', icon: <SiCss3 size={20} /> },
    { name: 'JavaScript', icon: <SiJavascript size={20} /> },
    { name: 'SQL', icon: <SiMysql size={20} /> },
  ],
  Frameworks: [
    { name: 'React', icon: <SiReact size={20} /> },
    { name: 'Node.js', icon: <SiNodedotjs size={20} /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={20} /> },
    { name: 'Express', icon: <SiExpress size={20} /> },
  ],
  Tools: [
    { name: 'VS Code', icon: <FaCode size={20} /> },
    { name: 'GitHub', icon: <SiGithub size={20} /> },
    { name: 'Vite', icon: <SiVite size={20} /> },
    { name: 'npm', icon: <SiNpm size={20} /> },
    { name: 'Prisma ORM', icon: <SiPrisma size={20} /> },
  ],
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="h-screen w-full bg-gradient-to-b from-white to-sky-50 flex flex-col items-center justify-center px-4 sm:px-8 overflow-hidden"
    >
      <h1 className="text-4xl font-bold text-sky-700 mb-12 animate-fade-in-down">My Skills</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl animate-fade-in-up">
        {Object.entries(skills).map(([category, items]) => (
          <div
            key={category}
            className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{category}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {items.map(({ name, icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full shadow text-sm font-medium hover:bg-sky-200 transition cursor-pointer"
                >
                  {icon}
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
