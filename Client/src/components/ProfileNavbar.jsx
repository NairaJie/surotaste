// src/components/ProfileNavbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function ProfileNavbar() {
  const base =
    "pb-2 px-1 text-lg font-semibold transition border-b-2 border-transparent";
  const active = "!text-green-700 !border-green-700";

  return (
    <div className="border-b">
      {/* Judul dibungkus dalam container biar sejajar */}
      <div className="max-w-7xl mx-auto px-12 pt-6">
        <h3 className="text-3xl md:text-3xl font-semibold text-[var(--black)] mb-5 mt-4">
          Account & Settings
        </h3>

        {/* Navbar */}
        <div className="flex gap-10 pt-6">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${base} ${isActive ? active : "text-gray-500"}`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/save"
            className={({ isActive }) =>
              `${base} ${isActive ? active : "text-gray-500"}`
            }
          >
            Saved
          </NavLink>

          <NavLink
            to="/review"
            className={({ isActive }) =>
              `${base} ${isActive ? active : "text-gray-500"}`
            }
          >
            Review
          </NavLink>
        </div>
      </div>
    </div>
  );
}
