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
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#fefefe] px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Your Job Matches</h2>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-gray-600 font-medium">Select Resume:</label>
            <select
              onChange={(e) => setResumeId(e.target.value)}
              value={resumeId}
              className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Choose Resume --</option>
              {resumes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.resume_name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleMatchAll}
            className={`px-6 py-2 text-white rounded-lg font-semibold shadow-md transition duration-200 ${
              resumeId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!resumeId}
          >
            Match Jobs
          </button>
        </div>

        {results.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Matching Jobs for <span className="text-blue-600">{selectedResumeName}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((job, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-800">{job.job_title}</h4>
                    <div className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                      {job.match_score}%
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Matched Skills:</p>
                  <p className="text-sm text-gray-700">{job.matched_skills.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && resumeId && (
          <p className="text-gray-500 text-center mt-8">No matching jobs found for this resume.</p>
        )}
      </div>
    </div>
  );
}

export default ResumeMatchAllJobs;
