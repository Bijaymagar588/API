import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-1">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
        </div>
        <div className="flex justify-end  space-x-10">
          <Link to="/table" className="text-white hover:text-gray-200">Data</Link>
          <Link to="/form" className="text-white hover:text-gray-200">Student Form</Link>
          <Link to="/courses.form" className="text-white hover:text-gray-200">Courses Form</Link>
          
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
