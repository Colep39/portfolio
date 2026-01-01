import React, { useEffect } from 'react';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable scroll when modal closes
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-6 shadow-lg">
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

        {/* Vertical Image Stack */}
        <div className="space-y-4">
          {project.images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Screenshot ${idx + 1}`}
              className="w-full rounded-lg shadow"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
