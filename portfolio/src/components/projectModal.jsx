import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';


const ProjectModal = ({ project, onClose }) => {

  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (newDirection) => {
    setIndex(([prev]) => [
      (prev + newDirection + project.images.length) % project.images.length,
      newDirection
    ]);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: 'absolute',
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative',
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      position: 'absolute',
    }),
  };


  useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable scroll when modal closes
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
  }, []);


  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-4xl relative p-6 shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>

        {/* Tech Stack Centered */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-sky-600 mb-2">Technologies Used</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Image Carousel */}
        <div className="relative w-full overflow-hidden rounded-xl">
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

            {/* Arrows */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition z-10"
            >
              ‹
            </button>

            <button
              onClick={() => paginate(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition z-10"
            >
              ›
            </button>
          </div>


          {/* Left Arrow */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition"
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition"
          >
            ›
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default ProjectModal;
