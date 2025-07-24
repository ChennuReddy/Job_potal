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

  if (error) {
    return <p className="p-4 text-red-600 font-semibold">{error}</p>;
  }

  if (!profile) {
    return <p className="p-4">Loading profile...</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>ID:</strong> {profile.id || "N/A"}</p>
      <p><strong>Username:</strong> {profile.username || "N/A"}</p>
      <p><strong>Email:</strong> {profile.email || "N/A"}</p>
    </div>
  );
};

export default Profile;
