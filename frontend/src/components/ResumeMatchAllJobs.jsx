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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Job Search with Resume Matching</h2>

      <div className="mb-4">
        <label className="mr-2">Select Resume:</label>
        <select
          onChange={(e) => setResumeId(e.target.value)}
          value={resumeId}
          className="border p-1"
        >
          <option value="">-- Choose Resume --</option>
          {resumes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.resume_name}
            </option>
          ))}
        </select>

        <button
          onClick={handleMatchAll}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
          disabled={!resumeId}
        >
          Match Jobs
        </button>
      </div>

      {results.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">
            Matching Jobs for <span className="text-blue-600">{selectedResumeName}</span>
          </h3>
          {results.map((job, index) => (
            <div key={index} className="border p-2 mb-2 rounded">
              <h4 className="text-lg font-bold">{job.job_title}</h4>
              <p>Score: {job.match_score}%</p>
              <p>Matched Skills: {job.matched_skills.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResumeMatchAllJobs;
