import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import rujakCingur from "../assets/foods/cingur-genteng.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ResultUpload() {
  const navigate = useNavigate();

  return (
    <div className="antialiased text-gray-800 bg-white">
      {/* NAVBAR */}
      <Navbar/>

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
      <Footer/>

    </div>
  );
}
