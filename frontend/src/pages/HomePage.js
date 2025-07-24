import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Welcome to the Job Portal</h1>

      <p className="text-lg text-gray-700 mb-8 text-center">
        Find the best jobs that match your resume, explore job listings, and post jobs easily.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg"
        >
          Upload Resume
        </button>

        <button
          onClick={() => navigate("/resumes")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg"
        >
          View Resumes
        </button>

        <button
          onClick={() => navigate("/post-job")}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg"
        >
          Post Job
        </button>

        <button
          onClick={() => navigate("/jobs")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg"
        >
          View Jobs
        </button>

        <button
          onClick={() => navigate("/match-resume")}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg"
        >
          Match Resume to All Jobs
        </button>

        <button
          onClick={() => navigate("/match-online-jobs")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg"
        >
          Match Resume to Online Jobs
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg"
        >
          My Profile
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
