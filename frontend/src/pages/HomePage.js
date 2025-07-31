import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 flex flex-col items-center justify-center px-4 py-10 text-white">
      <h1 className="text-4xl font-bold text-center mb-4">Welcome to the Job Portal</h1>

      <p className="text-lg font-light mb-10 text-center max-w-xl">
        Find the best jobs that match your resume, explore job listings, and post jobs easily.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <button
          onClick={() => navigate("/upload")}
          className="py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-blue-500 to-blue-700"
        >
          📤 Upload Resume
        </button>

        <button
          onClick={() => navigate("/resumes")}
          className="py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-green-500 to-green-700"
        >
          📄 View Resumes
        </button>

        <button
          onClick={() => navigate("/post-job")}
          className="py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-purple-500 to-purple-700"
        >
          📣 Post Job
        </button>

        <button
          onClick={() => navigate("/jobs")}
          className="py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
        >
          🔍 View Jobs
        </button>

        <button
          onClick={() => navigate("/match-resume")}
          className="py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-pink-500 to-pink-700"
        >
          🎯 Match Resume to All Jobs
        </button>

        <button
          onClick={() => navigate("/online-jobs")}
          className="py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-orange-400 to-orange-600"
        >
          🌐 Online Jobs
        </button>

        <button
          onClick={() => navigate("/match-online-jobs")}
          className="py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-orange-500 to-red-400"
        >
          🧠 Match Resume to Online Jobs
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-indigo-500 to-indigo-700"
        >
          👤 My Profile
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-red-600 to-red-800"
        >
           Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
