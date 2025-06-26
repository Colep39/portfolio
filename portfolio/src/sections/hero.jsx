import React from 'react';

const Hero = () => {

  return (
    <section
    id="hero"
    className="relative h-screen flex items-center justify-center overflow-hidden text-white"
    style={{
      background: 'linear-gradient(-45deg, #3b82f6, #06b6d4, #818cf8, #f472b6)',
      backgroundSize: '400% 400%',
      animation: 'gradient-bg 15s ease infinite',
    }}
  >
    <div className="text-left space-y-4 z-10">
      <h5 className="text-2xl text-gray-200">Hello there,</h5>
      <h1 className="text-6xl font-bold text-white">
        I'm <span className="text-yellow-300">Cole</span>
      </h1>
      <h3 className="text-3xl text-gray-100 max-w-xl">
        I am a Full Stack Developer and Data Scientist!
      </h3>
    </div>
  </section>

  );
};

export default Hero;
