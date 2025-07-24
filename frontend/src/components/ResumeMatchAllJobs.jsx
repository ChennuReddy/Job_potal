import React, { useEffect, useState } from "react";
import API from "../api/api";

const ResumeMatchAllJobs = () => {
  // Original states (unchanged)
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");
  const [matchedJobs, setMatchedJobs] = useState([]);

  // Original useEffect (unchanged)
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get("resumes/");
        setResumes(res.data);
        if (res.data.length > 0) {
          setSelectedResume(res.data[0]);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  // Original handleMatchJobs (unchanged)
  const handleMatchJobs = async () => {
    try {
      const res = await API.post("match_resume/", {
        resume_file: selectedResume,
      });
      setMatchedJobs(res.data.matches || []);
    } catch (error) {
      console.error("Error matching jobs:", error);
    }
  };

  // PURELY VISUAL ENHANCEMENTS BELOW (no logic changes)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#e4e8f0] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header - Visual only */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Resume to Job Matcher
          </h1>
          <p className="text-gray-600">
            Discover your best job matches
          </p>
        </div>

        {/* Control Panel - Same functionality, better styling */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-auto flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Resume
              </label>
              <select
                value={selectedResume}
                onChange={(e) => setSelectedResume(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {resumes.map((resume, index) => (
                  <option key={index} value={resume}>
                    {resume}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleMatchJobs}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              Match Jobs
            </button>
          </div>
        </div>

        {/* Results Section - Same data, better presentation */}
        {matchedJobs.length > 0 ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Matches for: <span className="text-blue-600">{selectedResume}</span>
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {matchedJobs.map((job, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-bold text-gray-900">{job.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        job.matching_score > 75 ? 'bg-green-100 text-green-800' : 
                        job.matching_score > 50 ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {job.matching_score}%
                      </span>
                    </div>

                    <div className="mt-4 bg-gray-50 rounded-md p-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Matched Skills:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.matched_skills.map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-500">
              No matches yet. Select a resume and click "Match Jobs".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeMatchAllJobs;