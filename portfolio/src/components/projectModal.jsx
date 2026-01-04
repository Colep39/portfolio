import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiJavascript,
  SiTypescript,
} from 'react-icons/si';
import { FaCode } from 'react-icons/fa';
import { SiDotnet } from 'react-icons/si';


const techIcons = {
  React: SiReact,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  JavaScript: SiJavascript,
  'C#': SiDotnet,
};

const ProjectModal = ({ project, onClose }) => {
  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (newDirection) => {
    setIndex(([prev]) => [
      (prev + newDirection + project.images.length) % project.images.length,
      newDirection,
    ]);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 280 : -280,
      opacity: 0,
      position: 'absolute',
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative',
    },
    exit: (direction) => ({
      x: direction > 0 ? -280 : 280,
      opacity: 0,
      position: 'absolute',
    }),
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white rounded-2xl w-full max-w-4xl relative p-6 shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold transition"
        >
          ×
        </button>

        {/* Tech stack */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-sky-600 mb-3">
            Technologies Used
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {project.techStack.map((tech) => {
              const Icon = techIcons[tech] || FaCode;

              return (
                <motion.div
                  key={tech}
                  whileHover={{ y: -4, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="
                    flex items-center gap-2
                    px-4 py-2 rounded-full
                    bg-gradient-to-r from-sky-100 to-indigo-100
                    text-sky-800
                    border border-sky-200
                    shadow-sm
                    cursor-default
                  "
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{tech}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Image carousel */}
        <div className="relative w-full overflow-hidden rounded-xl aspect-video bg-gray-100">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={index}
              src={project.images[index]}
              alt={`Screenshot ${index + 1}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full h-full object-cover rounded-xl"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x > 120) paginate(-1);
                else if (info.offset.x < -120) paginate(1);
              }}
            />
          </AnimatePresence>

          {/* Left arrow */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition z-10"
          >
            ‹
          </button>

          {/* Right arrow */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition z-10"
          >
            ›
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
