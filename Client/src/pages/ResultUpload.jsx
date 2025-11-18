import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import rujakCingur from "../assets/foods/cingur-genteng.jpg";

export default function ResultUpload() {
  const navigate = useNavigate();

  return (
    <div className="antialiased text-gray-800 bg-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-12 py-4">
          <img src={logo} alt="Logo" className="w-28 h-auto object-contain" />

          <ul className="hidden md:flex items-center space-x-8 font-semibold text-[var(--green-700)]">
            <li><Link to="/" className="hover:text-[var(--orange)] transition">Home</Link></li>
            <li><Link to="/culinary" className="hover:text-[var(--orange)] transition">Culinary</Link></li>
            <li><Link to="/about" className="hover:text-[var(--orange)] transition">About</Link></li>
            <li><Link to="/mealplan" className="hover:text-[var(--orange)] transition">Mealplan</Link></li>
          </ul>

          <Link to="/SignIn">
            <button className="bg-[var(--green-700)] text-white px-10 py-2.5 rounded-full font-semibold hover:bg-[#1f5a32] transition-all shadow-md hover:scale-[1.03]">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* TITLE SECTION */}
      <div className="pt-36 text-center">
        <h1 className="text-4xl font-extrabold text-green-800">
          Kenali rasa suroboyo
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Kami menemukan makanan berikut berdasarkan foto yang Anda unggah
        </p>
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-28 left-10 text-green-700 text-3xl hover:text-green-900 transition"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      {/* CONTENT */}
      <div className="pt-12 pb-20 flex justify-center">
        <div className="bg-[#f8f5ee] p-8 rounded-[30px] shadow-sm max-w-xl text-center">

          {/* Gambar */}
          <img
            src={rujakCingur}
            alt="Rujak Cingur"
            className="w-96 h-96 rounded-3xl object-cover"
          />

          {/* Judul */}
          <h2 className="text-4xl font-bold text-green-800 mt-6">
            Rujak Cingur
          </h2>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-gray-200 text-center py-10 bg-[var(--green-dark)] mt-10">
        <ul className="flex justify-center space-x-10 mb-8 text-gray-300 text-lg">
          {["Home", "Culinary", "About", "Mealplan"].map((item) => (
            <li key={item}>
              <a href="#" className="hover:text-white transition">{item}</a>
            </li>
          ))}
        </ul>
        <img src={logo} alt="Logo" className="w-36 mx-auto mb-4" />
        <p className="text-sm text-gray-300">© 2025 | SuroTaste. All rights reserved.</p>
      </footer>

    </div>
  );
}
