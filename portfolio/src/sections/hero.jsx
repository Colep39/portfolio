import React, { useState, useEffect } from 'react';

// A helper function to generate a random number within a range.
const random = (min, max) => Math.random() * (max - min) + min;

const Hero = () => {

   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
   const [stars, setStars] = useState([]);

  // Generate a list of stars with random initial positions and sizes.
  useEffect(() => {
    const numStars = 150; // Increased star count for a richer effect
    const starList = [];
    for (let i = 0; i < numStars; i++) {
      starList.push({
        x: random(0, window.innerWidth),
        y: random(0, window.innerHeight),
        size: random(1, 3),
        delay: random(0, 5), // Added animation delay for a staggered blink effect
      });
    }
    setStars(starList);
  }, []);

  // Set up event listeners for mouse movement to track cursor position.
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax effect based on cursor position.
  const calculateParallax = (initialX, initialY, depth) => {
    const moveX = (cursorPosition.x - window.innerWidth / 2) * depth * 0.05;
    const moveY = (cursorPosition.y - window.innerHeight / 2) * depth * 0.05;
    return {
      x: initialX + moveX,
      y: initialY + moveY,
    };
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(17,24,39,0.9) 0%, rgba(0,0,0,1) 100%)',
      }}
      id="hero"
    >
      {/* CSS for custom animations */}
      <style>{`
        @keyframes fadeInMoveUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
      `}</style>

      {/* Dynamic stars that react to the cursor and pulse */}
      {stars.map((star, index) => {
        const parallaxPos = calculateParallax(star.x, star.y, star.size * 0.1);
        return (
          <div
            key={index}
            className="absolute rounded-full bg-white transition-opacity duration-300 ease-in-out animate-pulse"
            style={{
              left: `${parallaxPos.x}px`,
              top: `${parallaxPos.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`, // Stagger the blinking animation
            }}
          ></div>
        );
      })}

      <div className="relative z-10 text-center">
        <div className="text-left space-y-4">
          <h5 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 animate-fadeInUp">Hello there,</h5>
          <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            I'm <span className="animate-rainbow">Cole</span>
          </h1>
          <h3 className="text-xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 max-w-xl animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            I am a Full Stack Developer and Data Scientist!
          </h3>
        </div>
      </div>

      {/* Overlay to create a foggy/glowing effect */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.3) 0%, rgba(0,0,0,0) 50%)',
        }}
      ></div>
    </div>
  );
};

export default Hero;
