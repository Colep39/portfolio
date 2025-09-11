import React, { useState, useEffect } from 'react';

// A helper function to generate a random number within a range.
const random = (min, max) => Math.random() * (max - min) + min;

// A reusable component for the interactive star background.
const StarBackground = ({ children }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);

  // Generate a list of stars with random initial positions and sizes.
  useEffect(() => {
    const numStars = 150;
    const starList = [];
    for (let i = 0; i < numStars; i++) {
      starList.push({
        x: random(0, window.innerWidth),
        y: random(0, window.innerHeight),
        size: random(1, 3),
        delay: random(0, 5),
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
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(17,24,39,0.9) 0%, rgba(0,0,0,1) 100%)',
      }}
    >
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
              animationDelay: `${star.delay}s`,
            }}
          ></div>
        );
      })}
      {/* Overlay to create a foggy/glowing effect */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.3) 0%, rgba(0,0,0,0) 50%)',
        }}
      ></div>
      {/* Render children on top of the background */}
      {children}
    </div>
  );
};

const AboutMe = () => {
  return (
    <StarBackground>
      <section className="h-screen w-full px-6 py-16 flex flex-col items-center justify-center text-white relative z-10" id="about">
        <div className="max-w-6xl mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-12">
          
          <div className="flex-1 text-left">
            <h1 className="text-4xl font-extrabold text-white mb-6">About Me</h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              I am passionate about building functioning interactive web apps for users with high{' '}
              performance. I thrive in{' '}
              collaborative environments with teams to solve problems in ways to ensure mutual success.
              I love learning new{' '}
              technologies and{' '}
              languages for whatever task is at hand.
            </p>
          </div>

          <img
            src="/profile.jpeg"
            alt="Cole Plagens"
            className="w-64 h-96 rounded-full shadow-lg object-cover"
          />
        </div>
      </section>
    </StarBackground>
  );
};

export default AboutMe;
