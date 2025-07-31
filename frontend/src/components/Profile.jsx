import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not logged in or token missing.");
        return;
      }

      try {
        const response = await axios.get(
          "https://job-potal-12.onrender.com/api/profile/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        console.log("Fetched profile:", response.data);
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 via-rose-100 to-yellow-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-pink-200 p-8">
        {error ? (
          <p className="text-red-600 text-center font-semibold bg-red-100 rounded-md p-4">
            {error}
          </p>
        ) : !profile ? (
          <p className="text-blue-600 text-center font-medium animate-pulse">
            Loading profile...
          </p>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center border-b pb-3 border-pink-300">
              🎯 My Profile
            </h2>
            <div className="space-y-4 text-gray-700 text-lg">
              <p>
                <strong className="text-rose-600">ID:</strong>{" "}
                {profile.id || "N/A"}
              </p>
              <p>
                <strong className="text-rose-600">Username:</strong>{" "}
                {profile.username || "N/A"}
              </p>
              <p>
                <strong className="text-rose-600">Email:</strong>{" "}
                {profile.email || "N/A"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
