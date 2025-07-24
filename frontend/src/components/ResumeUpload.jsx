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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFE5B4] via-[#FFDAB9] to-[#FFDEAD] p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-xl w-full transform transition-all duration-500 hover:scale-[1.01] hover:shadow-orange-300">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6 relative">
          <span className="relative z-10">
            Upload Your Resume
            <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-orange-300 rounded-full transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </span>
        </h1>

        {/* Upload box */}
        <label
          htmlFor="resume"
          className={`block w-full text-center border-4 border-dashed rounded-xl p-8 mb-6 cursor-pointer transition-all duration-300 ${
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
              className={`w-12 h-12 mb-3 transition-all duration-300 ${
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
                <p className="text-gray-700 font-medium animate-pulse-once">{file.name}</p>
                <p className="text-green-600 text-sm font-medium flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  File selected
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-500 font-semibold">
                  Drag and drop or{' '}
                  <span className="text-orange-600 underline hover:text-orange-700 transition-colors">
                    click to upload
                  </span>{' '}
                  your resume
                </p>
                <p className="text-gray-400 text-sm mt-2">Supports: PDF, DOC, DOCX</p>
              </div>
            )}
          </div>
        </label>

        {/* Upload button */}
        <button
          className={`w-full py-3 px-6 text-white text-lg font-semibold rounded-xl bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 ${
            uploading ? 'opacity-70 cursor-not-allowed' : ''
          } ${file ? 'animate-bounce-once' : ''}`}
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Upload Resume'
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r text-red-700 font-medium flex items-center animate-shake">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Extracted Skills */}
        {skills.length > 0 && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Extracted Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-orange-200 transition-all duration-200 hover:scale-105 cursor-default transform hover:rotate-1"
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