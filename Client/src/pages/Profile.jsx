// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ProfileNavbar from "../components/ProfileNavbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5050/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("ME RESPONSE:", res.data);
        setUser(res.data.user);        // ← BACKEND KIRIM user
      })
      .catch(() => toast.error("Failed to load profile"));
  }, [token]);

  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5050/api/auth/update",
        { name: user.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("UPDATE RESPONSE:", res.data);

      setUser(res.data.data);          // ← UPDATE KIRIM data
      toast.success("Profile updated!");
      setEditMode(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out!");
    setTimeout(() => (window.location.href = "/signin"), 600);
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="font-poppins text-gray-800">
      <Navbar />
      <ProfileNavbar />

      <div className="px-8 md:px-24 pt-10 flex gap-16">
        {/* Avatar */}
        <div className="relative">
          <img
            src={user.photoURL || "https://i.pravatar.cc/200"}
            className="w-56 h-56 object-cover rounded-full"
          />
        </div>

        {/* Form */}
        <div className="flex-1">
          <div className="text-right mb-3">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="text-green-700 font-semibold"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="bg-green-700 text-white px-4 py-2 rounded-xl"
              >
                Save
              </button>
            )}
          </div>

          <label className="font-semibold">Name</label>
          <input
            disabled={!editMode}
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-4 py-3 mt-2 mb-6 border rounded-xl"
          />

          <label className="font-semibold">Email</label>
          <input
            disabled
            value={user.email}
            className="w-full px-4 py-3 mt-2 mb-6 border rounded-xl bg-gray-100"
          />

          <label className="font-semibold">Password</label>
          <input
            disabled
            type="password"
            value="********"
            className="w-full px-4 py-3 mt-2 mb-10 border rounded-xl bg-gray-100"
          />

          <button
            onClick={logout}
            className="border border-red-500 text-red-600 w-48 py-3 rounded-xl hover:bg-red-50"
          >
            Log Out
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
