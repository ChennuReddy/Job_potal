import React, { useEffect, useState } from "react";
import axios from "axios";

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://job-potal-12.onrender.com/api/resumes/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        console.log("Resumes response:", response.data);
        setResumes(Array.isArray(response.data) ? response.data : response.data.resumes || []);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-200 via-orange-100 to-yellow-100 px-6 py-10 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-pink-700 border-b border-pink-300 pb-4">
          📁 Uploaded Resumes
        </h2>

        {resumes.length === 0 ? (
          <p className="text-center text-lg font-medium text-gray-600">No resumes uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white rounded-xl shadow-lg p-6 border border-pink-200 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-lg font-bold text-indigo-700 mb-2">
                  📄 {resume.file_name || resume.file.split("/").pop()}
                </h3>
                <a
                  href={resume.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline font-medium hover:text-blue-700"
                >
                  Open Resume
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeList;
