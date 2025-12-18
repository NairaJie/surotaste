// src/pages/Culinary.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// === IMAGES ===
import heroCulinary from "../assets/hero-culinary.png";
import mascot from "../assets/mascotte.png";

// === COMPONENTS ===
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FoodCard from "../components/FoodCard";
import CulinaryCard from "../components/CulinaryCard";
import RestaurantCard from "../components/RestaurantCard";

const Culinary = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  // Fetch restaurant data
  useEffect(() => {
    fetch("hhttps://api-surotaste.infinitelearningstudent.id/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="font-[Poppins] bg-white text-gray-800">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="relative text-center px-6 mt-32">
        <img
          src={heroCulinary}
          alt="Kuliner Surabaya"
          className="w-full max-w-[1200px] h-[420px] object-cover brightness-[65%] rounded-[25px] mx-auto block"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-[#FFD35B] font-[MuseoModerno] text-5xl font-extrabold mb-4">
            Kenali Rasa Suroboyo
          </h1>
          <p className="max-w-lg mb-6 font-medium">
            Unggah foto makananmu dan temukan apakah itu termasuk kuliner legendaris Surabaya.
          </p>
          <button
            onClick={() => navigate("/uploadphoto")}
            className="bg-[#FF4400] hover:bg-[#e03c00] text-white px-6 py-2 rounded-full font-semibold transition-transform hover:-translate-y-1"
          >
            Unggah Foto Sekarang
          </button>
        </div>
      </section>

      {/* SEARCH BY FOOD */}
      <FoodCard />

      {/* FIND MORE CULINARY */}
      <CulinaryCard />

      {/* FIND MORE RESTAURANT */}
      <RestaurantCard/>
      
      {/* FLOATING CHAT */}
      <div className="fixed bottom-24 right-28 bg-green-700 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg">
        Tanya aja!
      </div>
      <div
        className="fixed bottom-12 right-6 bg-white rounded-full w-20 h-20 shadow-lg flex items-center justify-center cursor-pointer animate-bounce"
        onClick={() => navigate("/chatbot")}
      >
        <img src={mascot} alt="Chat Mascot" className="w-16 h-16 rounded-full" />
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Culinary;
