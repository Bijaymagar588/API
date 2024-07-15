import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="./c.png"
        alt="background"
      />
      <div className="absolute inset-0 bg-black h-full opacity-50"></div>
      <div className="relative z-10 flex flex-col items-start justify-center h-full ml-20">
        <h1 className="text-4xl font-black-ops-one text-white mb-5">STUDENT PORTAL</h1>
        
        <Link to="/course">
          <button className="bg-white text-gray-800 font-black-ops-one px-6 py-3 rounded hover:bg-gray-200">
            VIEW COURSES
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
