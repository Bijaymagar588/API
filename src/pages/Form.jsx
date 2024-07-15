import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Form = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = {
      fullName: fullName,
      email: email,
      address: address,
      dateOfBirth: dateOfBirth,
      password: password,
    };

    fetch('http://172.25.0.105:8181/api/student/addStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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

        setFullName("");
        setEmail("");
        setAddress("");
        setDateOfBirth("");
        setPassword("");
      })
      .catch(error => {
        console.error('Error:', error);
        setSubmitting(false);
        setSubmitStatus('error');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="mb-6 font-bold text-2xl">LOGIN</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-start">
          <label htmlFor="fullName" className="mb-1 font-bold">Name:</label>
          <input
            type="text"
            id="fullName"
            required
            placeholder="Your Name"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label htmlFor="email" className="mb-1 font-bold">Email:</label>
          <input
            type="email"
            id="email"
            required
            placeholder="Your E-mail"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="mb-1 font-bold">Password:</label>
          <input
            type="password"
            id="password"
            required
            placeholder="Enter your password"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="dateOfBirth" className="mb-1 font-bold">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <label htmlFor="address" className="mb-1 font-bold">Address:</label>
          <input
            type="text"
            id="address"
            required
            placeholder="Your Address"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            type="submit"
            className={`w-full py-2 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>

          <div className="Remember-me flex items-center">
            <input type="checkbox" id="remember" name="remember" className="mr-2" />
            <label htmlFor="remember">Remember Me</label>
          </div>
        </form>
        <div>
          <Link to="/Homepage" className="text-blue-600 text-xs hover:underline">Forget Password</Link>
        </div>
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

export default Form;
