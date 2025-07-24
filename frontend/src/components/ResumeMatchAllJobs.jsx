import React, { useEffect, useState } from "react";
import API from "../api/api";

const ResumeMatchAllJobs = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");
  const [matchedJobs, setMatchedJobs] = useState([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe4d6] to-[#fff0e4] py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
          🎯 Resume to Job Match
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="font-semibold text-lg text-gray-700">Select Resume:</label>
            <select
              value={selectedResume}
              onChange={(e) => setSelectedResume(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
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
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition duration-300 flex items-center gap-2 shadow-lg"
          >
            🔍 Match Jobs
          </button>
        </div>

        {matchedJobs.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Top Matches for <span className="text-orange-500 font-bold">{selectedResume}</span>
            </h3>

            <div className="space-y-6">
              {matchedJobs.map((job, index) => (
                <div
                  key={index}
                  className="bg-[#fff7f2] border-l-8 border-orange-400 rounded-xl shadow-md p-6 hover:scale-[1.02] transition-transform duration-200"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xl font-bold text-gray-800">{job.title}</h4>
                    <span className="bg-orange-300 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {job.matching_score}%
                    </span>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg shadow-inner border border-orange-100">
                    <p className="text-gray-700 font-medium">🎯 Matched Skills:</p>
                    <ul className="list-disc list-inside mt-1 text-gray-600">
                      {job.matched_skills.map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeMatchAllJobs;
