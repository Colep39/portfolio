import React from 'react';

const AboutMe = () => {
  return (
    <section className="h-screen w-full px-6 py-16 bg-blue-50" id="about">
      <div className="max-w-6xl mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-12">
        
        <div className="flex-1 text-left">
          <h1 className="text-4xl font-extrabold text-blue-500 mb-6">About Me</h1>
          <p className="text-lg text-blue-400 leading-relaxed">
            I am passionate about building functioning interactive web apps for users with high{' '}
            <strong className="text-blue-500 font-semibold">performance</strong>. I thrive in{' '}
            <strong className="text-blue-500 font-semibold">collaborative</strong> environments with teams to solve problems in ways to ensure mutual success.
            I love learning new{' '}
            <strong className="text-blue-500 font-semibold">technologies</strong> and{' '}
            <strong className="text-blue-500 font-semibold">languages</strong> for whatever task is at hand.
          </p>
        </div>

        <img
          src="/profile.jpeg"
          alt="Cole Plagens"
          className="w-64 h-96 rounded-full shadow-lg object-cover"
        />
      </div>
    </section>
  );
};

export default AboutMe;
