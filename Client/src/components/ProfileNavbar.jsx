// src/components/ProfileNavbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function ProfileNavbar() {
  const base =
    "pb-2 px-1 text-lg font-semibold transition border-b-2 border-transparent";
  const active = "!text-green-700 !border-green-700";

  return (
    <div className="flex gap-10 px-6 pt-6 border-b">
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${base} ${isActive ? active : "text-gray-500"}`
        }
      >
        Profile
      </NavLink>

      <NavLink
        to="/saved"
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
  );
}
