import React, { useState } from "react";
import { Link } from "react-router-dom";

const CoursesForm = () => {
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseFee, setCourseFee] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("courseName", courseName);
    formData.append("courseDescription", courseDescription);
    formData.append("courseFee", courseFee);
    if (courseImage) {
      formData.append("courseImage", courseImage);
    }

    fetch('http://172.25.0.105:8181/api/course/addCourse', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        setSubmitting(false);
        setSubmitStatus('success');

       
        setCourseId("");
        setCourseName("");
        setCourseDescription("");
        setCourseFee("");
        setCourseImage(null);
      })
      .catch(error => {
        console.error('Error:', error);
        setSubmitting(false);
        setSubmitStatus('error');
      });
  };

  return (
    <div className="bg-blue-200 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center mt-20 mb-16">
        <h2 className="mb-6 text-3xl font-bold">COURSES FORM</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-start">
          <label htmlFor="id" className="mb-1 font-bold">
            Course ID:
          </label>
          <input
            type="text"
            id="id"
            required
            placeholder="Course ID"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />

          <label htmlFor="name" className="mb-1 font-bold">
            Course Name:
          </label>
          <input
            type="text"
            id="name"
            required
            placeholder="Course Name"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />

          <label htmlFor="description" className="mb-1 font-bold">
            Course Description:
          </label>
          <textarea
            id="description"
            required
            placeholder="Enter Course Description"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md h-32"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />

          <label htmlFor="fee" className="mb-1 font-bold">
            Course Fee:
          </label>
          <input
            type="number"
            id="fee"
            required
            placeholder="Enter Course Fee"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={courseFee}
            onChange={(e) => setCourseFee(e.target.value)}
          />

          <label htmlFor="file" className="mb-1 font-bold">
            Course Image:
          </label>
          <input
            type="file"
            id="file"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            onChange={(e) => setCourseImage(e.target.files[0])}
          />

          <button
            type="submit"
            className={`w-full py-2 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {submitStatus === 'success' && (
          <p className="text-green-500 text-xs italic mt-2">Form submitted successfully!</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-500 text-xs italic mt-2">Error submitting form. Please try again later.</p>
        )}
      </div>
    </div>
  );
};

export default CoursesForm;
