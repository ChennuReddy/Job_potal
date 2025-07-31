// src/components/JobPostForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const JobPostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // ✅ Get token after login

    if (!token) {
      alert('You must be logged in to post a job.');
      return;
    }

    try {
      await axios.post(
        "https://job-potal-12.onrender.com/api/jobs/",
        {
          title,
          description,
          skills_required: skillsRequired,
        },
        {
          headers: {
            Authorization: `Token ${token}`, // ✅ Set token in header
          },
        }
      );

      alert('Job posted successfully!');
      setTitle('');
      setDescription('');
      setSkillsRequired('');
    } catch (error) {
      console.error('Error posting job:', error.response?.data || error.message);
      alert('Failed to post job.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 px-4 py-10">
      <div className="bg-gradient-to-b from-purple-800 to-purple-600 p-8 rounded-xl shadow-2xl max-w-md w-full text-white">
        <h2 className="text-3xl font-extrabold mb-4 border-b border-white pb-2">Post a Job</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="text"
            placeholder="Skills Required (comma separated)"
            value={skillsRequired}
            onChange={(e) => setSkillsRequired(e.target.value)}
            className="w-full p-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="w-full bg-white text-indigo-700 font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-100 hover:shadow-lg transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPostForm;
