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
    <div className="min-h-screen bg-gradient-to-br from-[#ffe5d9] to-[#fff1f0] px-6 py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 p-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#2c3e50]">🎯 Resume to Job Match</h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <label className="text-lg font-medium text-gray-700">Select Resume:</label>
            <select
              onChange={(e) => setResumeId(e.target.value)}
              value={resumeId}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff7f50] bg-[#fffaf0] shadow-md"
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
            className={`px-6 py-2 text-white rounded-lg font-semibold transition duration-200 ${
              resumeId
                ? 'bg-[#ff7f50] hover:bg-[#ff5722] shadow-md'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!resumeId}
          >
            🔍 Match Jobs
          </button>
        </div>

        {results.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-[#374151] mb-6">
              Top Matches for <span className="text-[#ff7f50]">{selectedResumeName}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((job, index) => (
                <div
                  key={index}
                  className="bg-[#fdf6ec] rounded-2xl border border-orange-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-[#2c3e50]">{job.job_title}</h4>
                    <div className="text-sm px-3 py-1 bg-[#ffe0b2] text-[#d35400] rounded-full font-semibold">
                      {job.match_score}%
                    </div>
                  </div>

                  <div className="bg-[#fff5eb] rounded-xl mt-4 p-4 border border-orange-100">
                    <p className="text-sm text-[#6b7280] mb-1 font-medium">Matched Skills:</p>
                    <p className="text-sm text-[#2d3436] font-semibold">
                      {job.matched_skills.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && resumeId && (
          <p className="text-gray-500 text-center mt-10">😔 No matching jobs found for this resume.</p>
        )}
      </div>
    </div>
  );
}

export default ResumeMatchAllJobs;
