import React from "react";
import "../index.css";
import logo from "../assets/logo.png";
import heroFood from "../assets/hero-food.png";
import mascotte from "../assets/mascotte.png";
import rawon from "../assets/foods/rawon-setan.png";
import segoSambel from "../assets/foods/sego-sambel.png";
import rujakCingur from "../assets/foods/rujak-cingur.png";
import sotoAyam from "../assets/foods/soto-ayam.png";
import warungBukris from "../assets/restaurants/warung-bukris.png";
import rawonPangat from "../assets/restaurants/rawon-pakpangat.jpg";
import penyetanAli from "../assets/restaurants/penyetan-bangali.jpg";
import lontongBalap from "../assets/restaurants/lontong-balap-rajawali.jpg";
import sotoHar from "../assets/restaurants/soto-ayam-cakhar.jpg";
import nasiKuning from "../assets/restaurants/nasi-kuning-ambon.jpg";
import { Link } from "react-router-dom";


export default function Home() {
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

      {/* HERO */}
      <header className="relative pt-32 pb-24 bg-gradient-to-r from-[#fff8f3] to-[#f3fff5] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-12">

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
              <button className="bg-[var(--green-700)] text-white px-12 py-3 rounded-full font-semibold text-lg hover:bg-[#1f5a32] hover:scale-105 transition-all shadow-lg">
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
      <section className="py-20 px-12 lg:px-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-[var(--green-700)]">
            Taste of Surabaya
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[{
              img: rawon,
              title: "Rawon Setan",
              restaurant: "Warung Bu Kris",
              price: "Rp50,000"
            },
            {
              img: segoSambel,
              title: "Sego Sambel",
              restaurant: "Warung Mak Ijah",
              price: "Rp10,000"
            },
            {
              img: rujakCingur,
              title: "Rujak Cingur",
              restaurant: "Warung Bu Nah",
              price: "Rp12,000"
            },
            {
              img: sotoAyam,
              title: "Soto Ayam",
              restaurant: "Warung Ambetukam",
              price: "Rp28,000"
            }].map((food, i) => (
              <div
                key={i}
                className="bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:bg-[#fff5ea] transition-all duration-300"
              >
                <img src={food.img} alt={food.title} className="w-full h-56 object-cover" />
                <div className="p-4">
                  <h2 className="text-[var(--green-700)] font-semibold">{food.title}</h2>
                  <p className="text-[var(--green-700)] text-sm">{food.restaurant}</p>
                  <p className="text-[var(--orange)] font-bold mt-1">{food.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


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
            <button className="bg-[var(--orange)] text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-[#ff5c1a] transition-all shadow-md hover:scale-105">
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
      <section className="py-20 px-12 lg:px-32 bg-[#Fffff]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-[var(--green-700)]">
            Featured Restaurant
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
            {[
              { img: warungBukris, title: "Warung Ibu Kris", loc: "Jl. Kayoon No.46B", rating: "4.9" },
              { img: rawonPangat, title: "Rawon Pak Pangat", loc: "Jl. Keltintang Baru Sel.I No.15", rating: "4.8" },
              { img: penyetanAli, title: "Penyetan Bang Ali", loc: "Jl. Simpang Darmo Permai", rating: "4.7" },
              { img: lontongBalap, title: "Lontong Balap Rajawali", loc: "Jl. Kerembangan Timur", rating: "4.6" },
              { img: sotoHar, title: "Soto Ayam Cak Har", loc: "Jl. Dr. Ir. H. Soekarno No.220", rating: "4.8" },
              { img: nasiKuning, title: "Nasi Kuning Ambon", loc: "Jl. Raya Tenggilis Mejoyo", rating: "4.9" },
            ].map((resto, index) => (
              <div
                key={index}
                className="relative bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:bg-[#fff5ea] transition-all duration-300"
              >

                <span className="absolute top-3 left-3 bg-[var(--orange)] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                  ★ {resto.rating}
                </span>
                <img src={resto.img} alt={resto.title} className="w-full h-56 object-cover" />
                <div className="p-4 text-left">
                  <h3 className="text-lg font-bold text-[var(--green-700)]">{resto.title}</h3>
                  <p className="text-sm text-[var(--orange)] mt-1 flex items-center gap-1">
                    <i className="fa-solid fa-location-dot"></i> {resto.loc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


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
