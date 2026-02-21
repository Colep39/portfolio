import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiJavascript,
  SiTypescript,
  SiDotnet,
} from 'react-icons/si';
import { FaCode, FaAws } from 'react-icons/fa';

const techIcons = {
  React: SiReact,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  JavaScript: SiJavascript,
  'C#': SiDotnet,
  TypeScript: SiTypescript,
  AWS: FaAws,
};

function mod(n, m) {
  return ((n % m) + m) % m;
}

const ProjectModal = ({ project, onClose }) => {
  const [[index, direction], setIndex] = useState([0, 0]);
  const total = project?.images?.length ?? 0;

  const paginate = (newDirection) => {
    if (!total) return;
    setIndex(([prev]) => [mod(prev + newDirection, total), newDirection]);
  };

  // Preload/Decode neighboring images to remove stutter between transitions
  useEffect(() => {
    if (!total) return;

    const neighbors = [
      project.images[mod(index - 1, total)],
      project.images[index],
      project.images[mod(index + 1, total)],
    ];

    let cancelled = false;

    neighbors.forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.src = src;

      // decode() helps avoid a decode jank right when the image swaps (supported in modern browsers)
      if (img.decode) {
        img
          .decode()
          .catch(() => {})
          .finally(() => {
            if (cancelled) return;
          });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [index, total, project]);

  // Lock scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || 'auto';
    };
  }, []);

  // Fix: only bind keydown once (and update when index changes)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey, { passive: true });
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total, onClose]);

  const slideVariants = useMemo(
    () => ({
      enter: (dir) => ({
        x: dir > 0 ? 260 : -260,
        opacity: 0,
        position: 'absolute',
      }),
      center: {
        x: 0,
        opacity: 1,
        position: 'relative',
      },
      exit: (dir) => ({
        x: dir > 0 ? -260 : 260,
        opacity: 0,
        position: 'absolute',
      }),
    }),
    []
  );

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 bg-black/50 backdrop-blur-sm"
      onMouseDown={(e) => {
        // click outside to close
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <MotionConfig
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 26,
          mass: 0.8,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 18 }}
          className="bg-white rounded-2xl w-full max-w-4xl relative p-6 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold transition"
            aria-label="Close modal"
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
                    whileHover={{ y: -3 }}
                    className="
                      flex items-center gap-2
                      px-4 py-2 rounded-full
                      bg-gradient-to-r from-sky-100 to-indigo-100
                      text-sky-800
                      border border-sky-200
                      shadow-sm
                      cursor-default
                      select-none
                    "
                    title={tech}
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
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
              <motion.img
                key={project.images[index]}
                src={project.images[index]}
                alt={`${project.title} screenshot ${index + 1} of ${total}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full object-cover rounded-xl select-none"
                draggable={false}
                loading="eager"
                // drag feels nicer with spring + no "layout" shift
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  const swipePower = Math.abs(info.offset.x) * info.velocity.x;
                  if (info.offset.x > 120 || swipePower > 8000) paginate(-1);
                  else if (info.offset.x < -120 || swipePower < -8000)
                    paginate(1);
                }}
              />
            </AnimatePresence>

            {/* Counter */}
            <div className="absolute bottom-3 left-3 bg-black/45 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
              {index + 1} / {total}
            </div>

            {/* Left arrow */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition z-10"
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Right arrow */}
            <button
              onClick={() => paginate(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition z-10"
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
};

export default ProjectModal;