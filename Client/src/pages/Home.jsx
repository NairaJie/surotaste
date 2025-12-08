import React from "react";
import "../index.css";
import heroFood from "../assets/hero-food.png";
import mascotte from "../assets/mascotte.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CulinaryHome from "../components/CulinaryHome";
import RestaurantHome from "../components/RestaurantHome";


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="antialiased text-gray-800 bg-white">
      {/* NAVBAR */}
      <Navbar />
      {/* HERO */}
      <header className="relative min-h-screen flex items-center bg-gradient-to-r from-[#fff8f3] to-[#f3fff5] overflow-hidden pt-24">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-12 w-full">

          {/* Text */}
          <div className="flex flex-col gap-6 max-w-xl">
            <h1 className="font-museomoderno font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
              <span className="text-[var(--orange)]">Jelajahi Rasa</span> <br />
              <span className="text-[var(--green-700)]">Khas Surabaya</span>
            </h1>

            <p className="text-[#13412b] text-lg leading-relaxed">
              Temukan kuliner legendaris dan hidden gems Surabaya — dari warung legendaris sampai tempat hits kekinian.
            </p>

            <div className="flex gap-4 mt-2">
              <button
                onClick={() => navigate("/culinary")}
                className="bg-[var(--green-700)] text-white px-12 py-3 rounded-full font-semibold text-lg hover:bg-[#1f5a32] hover:scale-105 transition-all shadow-lg"
              >
                Explore Now
              </button>

            </div>
          </div>

          {/* Image */}
          <div className="relative w-full lg:w-[600px] flex justify-center mt-10 lg:mt-0">
            <div className="absolute -top-10 right-0 bg-[var(--green-dark)] w-[420px] h-[420px] rounded-full blur-3xl opacity-30"></div>

            <img
              src={heroFood}
              alt="Hero Food"
              className="relative z-10 w-[480px] lg:w-[540px] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </header>



      {/* STATISTIK */}
      <section className="py-20 text-center px-6 bg-[#FAF8F5]">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-[var(--green-700)]">
          Nikmati Kuliner Khas Surabaya
        </h2>
        <p className="mx-auto mb-14 text-lg md:text-xl font-regular leading-relaxed text-[var(--green-700)] max-w-[820px]">
          Surabaya punya cita rasa kuliner yang kuat dan beragam — dari makanan legendaris sampai modern.
          Temukan restoran terbaik, ulasan terpercaya, dan rekomendasi sesuai seleramu.
        </p>

        <div className="flex flex-wrap justify-center gap-x-28 gap-y-14 md:gap-x-36">
          <div>
            <h3 className="text-6xl font-extrabold text-[var(--orange)]">150+</h3>
            <p className="text-lg font-semibold text-[var(--green-700)] mt-1">Restaurant</p>
          </div>
          <div>
            <h3 className="text-6xl font-extrabold text-[var(--orange)]">10+</h3>
            <p className="text-lg font-semibold text-[var(--green-700)] mt-1">Culinary</p>
          </div>
          <div>
            <h3 className="text-6xl font-extrabold text-[var(--orange)]">200+</h3>
            <p className="text-lg font-semibold text-[var(--green-700)] mt-1">Review</p>
          </div>
        </div>
      </section>

      {/* TASTE OF SURABAYA */}
      <CulinaryHome />


      {/* CULINARY GUIDE */}

      <section className="relative py-20 bg-gradient-to-r from-[#163f2a] via-[#2e6b3e] to-[#eaf6ee] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap items-center justify-between gap-16 px-12">

          {/* Kiri */}
          <div className="z-10 max-w-xl lg:w-[45%] text-center lg:text-left space-y-4">
            <h2 className="text-[#FFfb8f] font-extrabold text-4xl mb-4 leading-tight">
              Your Culinary Guide to Surabaya is Here!
            </h2>
            <p className="text-lg">
              Discover Surabaya’s local food and UMKM stories instantly.
              Ask our chatbot anything and get quick answers!
            </p>
            <button 
            onClick={() => navigate("/chatbot")}
            className="bg-[var(--orange)] text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-[#ff5c1a] transition-all shadow-md hover:scale-105">
              Chat Now!
            </button>
          </div>

          {/* Kanan */}
          <div className="relative flex justify-center items-center lg:w-[45%] mt-8 lg:mt-0">
            <img
              src={mascotte}
              alt="Mascotte"
              className="w-[420px] relative z-10 drop-shadow-2xl"
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[var(--green-700)] text-white font-museomoderno text-2xl font-bold px-5 py-2 rounded-full shadow-md z-20">
              Cak Suroyo
            </p>
          </div>

        </div>
      </section>



      {/* FEATURED RESTAURANT */}
      <RestaurantHome />


      {/* FOOTER */}
      <Footer />

    </div>
  );
}
