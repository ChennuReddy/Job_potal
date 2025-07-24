import React, { useState } from 'react';
import API from '../api/api';

function JobMatch() {
  const [resumeId, setResumeId] = useState('');
  const [jobId, setJobId] = useState('');
  const [result, setResult] = useState(null);

  const handleMatch = async () => {
    const res = await API.post('resume/match/', { resume_id: resumeId, job_id: jobId});
    setResult(res.data)
  };

  return (
    <div className="p-4">
      <h2 className="font-bold">Match Resume with Job</h2>
      <input type="number" placeholder="Resume ID" value={resumeId} onChange={(e) => setResumeId(e.target.value)}
      className="border px-2 py-1 mr-2" />
      <input type="number" placeholder="Job ID" value={jobId} onChange={(e) => setJobId(e.target.value)}
      className="border px-2 py-1 mr-2" />
      <button className="bg-green-600 text-white px-4 py-2" onClick={handleMatch}>Check Match</button>

      {result && (
        <div className="mt-4">
          <p><strong>Score:</strong> {result.score}%</p>
          <p><strong>Matched Keywords:</strong> {result.matched_keywords.join(', ')}</p>
          <p><strong>Missing Keywords</strong> {result.missing_keywords.join(', ')}</p>
    </div>
  )}
  </div>
  );
}

export default JobMatch;