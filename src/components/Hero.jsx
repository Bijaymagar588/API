import React, { useState } from 'react';

const Hero = () => {
  const [courses, setCourses] = useState([]);
  const [showCourses, setShowCourses] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://172.16.100.112:8181/api/course/fetchAllCourses');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      console.log('API response:', responseData); // Log the response data
      if (responseData.statusCode === 'OK' && responseData.statusCodeValue === 200) {
        setCourses(responseData.body);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (!showCourses) {
      fetchCourses();
    }
    setShowCourses(!showCourses);
  };

  return (
    <div className="relative h-screen">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="./c.png"
        alt="background"
      />
      <div className="absolute inset-0 bg-black h-full opacity-50"></div>
      <div className="relative z-10 flex flex-col items-start justify-center h-full ml-20">
        <h1 className="text-4xl font-black-ops-one text-white mb-5">WELCOME HOMEPAGE</h1>
        <button
          className="bg-white text-gray-800 font-black-ops-one px-6 py-3 rounded hover:bg-gray-200"
          onClick={handleButtonClick}
        >
          VIEW COURSES
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {showCourses && (
          <div className="mt-5">
            {courses.length > 0 ? (
              <ul>
                {courses.map((course) => (
                  <li key={course.courseId} className="text-xl font-black-ops-one text-white mb-3">
                    <img src={course.courseImage} alt={course.courseName} className="w-32 h-32 mb-2 object-cover" />
                    <h2>{course.courseName}</h2>
                    <p>{course.courseDescription}</p>
                    <p>Fee: ${course.fee}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xl font-black-ops-one text-white">No courses available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
