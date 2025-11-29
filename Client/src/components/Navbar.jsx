import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-12 py-4">
        <img src={logo} alt="Logo" className="w-28 h-auto object-contain" />

        <ul className="hidden md:flex items-center space-x-8 font-semibold text-[var(--green-700)]">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/culinary">Culinary</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/mealplan">Mealplan</Link></li>
        </ul>

        {user ? (
          <Link to="/profile">
            <img
              src={user?.photoURL ?? "/profile.png"}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border border-gray-300 cursor-pointer hover:scale-105 transition"
            />
          </Link>
        ) : (
          <Link to="/signin">
            <button className="bg-[var(--green-700)] text-white px-10 py-2.5 rounded-full font-semibold hover:bg-[#1f5a32] transition-all shadow-md hover:scale-[1.03]">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
