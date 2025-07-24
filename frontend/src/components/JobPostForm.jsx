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
      const response = await axios.post(
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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Skills Required (comma separated)"
          value={skillsRequired}
          onChange={(e) => setSkillsRequired(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;
