import React from 'react';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center w-full min-h-screen m-0 p-0 px-6 sm:px-12 overflow-hidden bg-transparent"
    >
      {/* Subtle cyan/indigo glow overlay (consistent with rest of site) */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(56,189,248,0.15), transparent 70%), radial-gradient(circle at 75% 70%, rgba(99,102,241,0.15), transparent 70%)',
        }}
      ></div>

      {/* Main content */}
      <div className="relative z-10 text-left hero-content">
        <div className="space-y-4">
          <h5 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 animate-fadeInUp">
            Hello there,
          </h5>
          <h1
            className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 animate-fadeInUp"
            style={{ animationDelay: '0.3s' }}
          >
            I'm <span className="animate-rainbow">Cole</span>
          </h1>
          <h3
            className="text-xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 max-w-xl animate-fadeInUp"
            style={{ animationDelay: '0.6s' }}
          >
            I am a Full Stack Developer and Data Scientist!
          </h3>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInMoveUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInMoveUp 1s ease-out forwards;
        }

        @keyframes rainbow {
          0% { color: #FF0000; }
          16% { color: #FF7F00; }
          33% { color: #FFFF00; }
          50% { color: #00FF00; }
          66% { color: #0000FF; }
          83% { color: #4B0082; }
          100% { color: #9400D3; }
        }
        .animate-rainbow {
          animation: rainbow 10s infinite linear;
        }

        @media (max-width: 640px) {
          .hero-content {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
