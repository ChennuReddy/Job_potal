import React, { useState } from 'react';
import API from '../api/api';

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a resume to upload.');
      return;
    }
    try {
      setUploading(true);
      setError('');
      const formData = new FormData();
      formData.append('file', file);
      const res = await API.post('resumes/upload/', formData);
      setSkills(res.data.skills);
    } catch (err) {
      setError('Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-orange-300 via-pink-300 to-rose-300 flex items-center justify-center px-6 text-gray-800">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-xl w-full transform transition duration-500 hover:scale-[1.01] hover:shadow-pink-300">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">📄 Upload Your Resume</h1>

        <label
          htmlFor="resume"
          className={`block w-full text-center border-4 border-dashed rounded-xl p-8 mb-6 cursor-pointer transition duration-300 ${
            isDragging 
              ? 'border-orange-400 bg-orange-50 scale-105 shadow-inner'
              : 'border-orange-300 bg-gradient-to-r from-white to-orange-50'
          } ${file ? 'border-green-300 bg-green-50' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <svg
              className={`w-12 h-12 mb-3 transition duration-300 ${
                file ? 'text-green-500' : 'text-orange-400'
              } ${isDragging ? 'scale-110' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            {file ? (
              <div className="space-y-2">
                <p className="text-gray-700 font-medium">{file.name}</p>
                <p className="text-green-600 text-sm font-medium flex items-center justify-center">
                  ✅ File selected
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-500 font-semibold">
                  Drag and drop or <span className="text-orange-600 underline hover:text-orange-700 transition-colors">click to upload</span> your resume
                </p>
                <p className="text-gray-400 text-sm mt-2">Supports: PDF, DOC, DOCX</p>
              </>
            )}
          </div>
        </label>

        <button
          className={`w-full py-3 px-6 text-white text-lg font-semibold rounded-xl bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 shadow-lg transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 ${
            uploading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? 'Processing...' : 'Upload Resume'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded text-red-700 font-medium flex items-center">
            ⚠️ {error}
          </div>
        )}

        {skills.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
              ⭐ Extracted Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-orange-200 transition duration-200 hover:scale-105 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;
