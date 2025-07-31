import React, { useEffect, useState } from 'react';
import API from '../api/api';

function ResumeMatchAllJobs() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState('');
  const [results, setResults] = useState([]);
  const [selectedResumeName, setSelectedResumeName] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      const res = await API.get('resumes/');
      setResumes(res.data);
    };
    fetchResumes();
  }, []);

  const handleMatchAll = async () => {
    try {
      const selected = resumes.find(r => r.id.toString() === resumeId);
      setSelectedResumeName(selected?.resume_name || `Resume ${resumeId}`);

      const res = await API.get(`resumes/${resumeId}/match_jobs/`);
      setResults(res.data.results || []);
    } catch (err) {
      console.error("Matching failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-500 px-6 py-10 text-white">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
          🔎 Job Search with Resume Matching
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <label className="font-medium text-white">
            Select Resume:
            <select
              onChange={(e) => setResumeId(e.target.value)}
              value={resumeId}
              className="ml-2 p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">-- Choose Resume --</option>
              {resumes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.resume_name}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={handleMatchAll}
            className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
              resumeId
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            disabled={!resumeId}
          >
            Match Jobs
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Matching Jobs for <span className="text-pink-300">{selectedResumeName}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((job, index) => (
                <div key={index} className="bg-white bg-opacity-90 text-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                  <h4 className="text-lg font-bold text-indigo-700 mb-2">{job.job_title}</h4>
                  <p className="text-sm mb-1">Score: <strong>{job.match_score}%</strong></p>
                  <p className="text-sm">Matched Skills: <span className="text-purple-700">{job.matched_skills.join(', ')}</span></p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeMatchAllJobs;
