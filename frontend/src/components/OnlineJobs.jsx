import React, { useEffect, useState } from 'react';
import API from '../api/api';

function OnlineJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await API.get('online-jobs/');
      setJobs(res.data.results || []);
    } catch (err) {
      console.error("Failed to fetch online jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 px-6 py-10 text-white">
      <h2 className="text-3xl font-extrabold text-center mb-10">Latest Online Jobs (Adzuna)</h2>

      {loading ? (
        <p className="text-center text-lg font-medium">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-lg font-medium">No jobs found.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 text-gray-900 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-2">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {job.company} – {job.location}
              </p>
              <p className="text-sm mb-4">
                {job.description?.slice(0, 200)}...
              </p>
              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline font-medium"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OnlineJobs;
