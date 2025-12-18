// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ProfileNavbar from "../components/ProfileNavbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem("token");
  const { updateUserProfile } = useContext(AuthContext);

  // Ambil data user saat load
  useEffect(() => {
    if (!token) return;

    axios
      .get("https://api-surotaste.infinitelearningstudent.id/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userData = res.data.user;
        setUser({
          ...userData,
          photoURL: userData.image, // fallback
        });
      })
      .catch(() => toast.error("Failed to load profile"));
  }, [token]);

  // Save name update
  const handleSave = async () => {
    try {
      const res = await axios.put(
        "https://api-surotaste.infinitelearningstudent.id/api/auth/update",
        { name: user.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser((prev) => ({
        ...prev,
        ...res.data.data,
        photoURL: res.data.data.image || prev.photoURL,
      }));
      toast.success("Profile updated!");
      setEditMode(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  // Upload photo
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await axios.post(
        "https://api-surotaste.infinitelearningstudent.id/api/auth/upload-photo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser((prev) => ({
        ...prev,
        image: res.data.photoURL, // backend sudah kirim path relatif
      }));

      updateUserProfile({ image: res.data.photoURL });

      toast.success("Profile photo updated!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload photo");
    }
  };   // ← INI TETAP ADA (MENUTUP FUNGSI)


  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out!");
    setTimeout(() => (window.location.href = "/signin"), 600);
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="font-poppins text-gray-800">
      <Navbar />

      <div className="pt-24">
        <ProfileNavbar />
      </div>

      <div className="px-8 md:px-24 pt-10 flex gap-16">
        {/* Avatar */}
        <div className="relative group">
          <img
            src={user.image ? `https://api-surotaste.infinitelearningstudent.id${user.image}` : "/profile.png"}
            alt="Profile"
            className="w-56 h-56 object-cover rounded-full"
          />

          {/* Upload button overlay */}
          {editMode && (
            <label
              className="absolute bottom-4 left-1/2 -translate-x-1/2
      bg-black/70 text-white px-4 py-2 rounded-lg cursor-pointer text-sm transition"
            >
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
          )}
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
