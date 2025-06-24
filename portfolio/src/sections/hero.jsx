import React from 'react';

const Hero = () => {
    return (
      <>
        <section id="hero" className="h-screen scroll-mt-16 flex items-center justify-center -mt-16">
            <div className="text-left space-y-4">
                <h5 className="text-2xl text-gray-500">Hello there,</h5>
                <h1 className="text-6xl font-bold text-gray-800">
                I'm <span className="text-sky-500">Cole</span>
                </h1>
                <h3 className="text-3xl text-gray-600 max-w-xl">
                I am a Full Stack Developer and Data Scientist!
                </h3>
            </div>
        </section>


      </>
    );
}

export default Hero;