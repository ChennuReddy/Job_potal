import React, { useEffect, useState } from 'react';
import API from '../api/api';

function MatchOnlineJobs() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState('');
  const [query, setQuery] = useState('developer');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get('resumes/');
        setResumes(res.data);
      } catch (err) {
        console.error('Failed to fetch resumes', err);
      }
    };
    fetchResumes();
  }, []);

  const handleMatch = async () => {
    setLoading(true);
    try {
      const res = await API.post('match-online-jobs/', {
        resume_id: resumeId,
        query: query,
      });
      setResults(res.data.results || []);
    } catch (err) {
      console.error('Error matching online jobs:', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 px-4 py-10 text-white">
      <div className="max-w-3xl mx-auto bg-purple-900 bg-opacity-80 rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold mb-6 border-b border-purple-300 pb-2">
          Match Resume with Online Jobs
        </h2>

        <div className="mb-6 space-y-4">
          <label className="block">
            <span className="block mb-1 font-semibold">Select Resume:</span>
            <select
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              className="w-full p-3 rounded-lg bg-purple-700 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <option value="">-- Choose Resume --</option>
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.filename || resume.file.split('/').pop()}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="block mb-1 font-semibold">Job Title / Query:</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Python Developer"
              className="w-full p-3 rounded-lg bg-purple-700 text-white placeholder-purple-300 border border-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </label>

          <button
            onClick={handleMatch}
            disabled={!resumeId}
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
              resumeId
                ? 'bg-green-500 hover:bg-green-600 shadow-md text-white'
                : 'bg-gray-400 cursor-not-allowed text-white'
            }`}
          >
            Match Jobs
          </button>
        </div>

        {loading ? (
          <p className="text-center text-sm font-medium">🔍 Loading matching jobs...</p>
        ) : (
          results.length > 0 && (
            <div className="mt-8 space-y-6">
              <h3 className="text-2xl font-bold">Matching Jobs</h3>
              {results.map((job, idx) => (
                <div key={idx} className="bg-purple-700 bg-opacity-70 p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold">{job.job_title}</h4>
                  <p className="text-sm text-purple-200">{job.company}</p>
                  <p className="mt-2 text-sm">Score: <strong>{job.score}%</strong></p>
                  <p className="mt-1 text-sm">
                    Matched Keywords: <span className="text-purple-100">{job.matched_keywords.join(', ')}</span>
                  </p>
                  <p className="mt-1 text-sm">
                    Missing Keywords: <span className="text-red-300">{job.missing_keywords.join(', ')}</span>
                  </p>
                  <a
                    href={job.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-300 underline hover:text-blue-200"
                  >
                    Apply Now
                  </a>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default MatchOnlineJobs;
