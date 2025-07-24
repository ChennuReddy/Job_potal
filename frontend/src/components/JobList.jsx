import React, {useEffect, useState} from 'react';
import API from '../api/api'

function JobList() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await API.get('jobs/');
      setJobs(res.data);
    } catch (error) {
      console.error("Error Fetching jobs:", error)
    }
};

useEffect(() => {
  fetchJobs();
}, []);

return (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>

    {jobs.length === 0 ? (
      <p>No jobs available.</p>
    ) : (
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="mt-1">{job.description}</p>
            <p className="mt-2 text-sm-text-gray-600">
              Required Skills: {job.skills_required}
            </p>
          </div>
        ))}
      </div>
    )}
    </div>
  );
}

export default JobList

