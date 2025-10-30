// src/pages/Culinary.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";

// === IMAGES ===
import logo from "../assets/logo.png";
import heroCulinary from "../assets/hero-culinary.png";
import mascot from "../assets/mascotte.png";

// === FOODS ===
import rujakCingur from "../assets/foods/rujak-cingur2.jpg";
import penyetBukris from "../assets/foods/penyet-bukris2.jpg";
import nasiCampur from "../assets/foods/nasi-campur.jpg";
import nasiKrawu from "../assets/foods/nasi-krawu.jpg";
import nasiKuning from "../assets/foods/nasi-kuning.jpg";
import sotoCakHar2 from "../assets/foods/soto-cakhar2.jpg";
import lontongKupang from "../assets/foods/lontong-kupang.jpg";
import sateKlopo from "../assets/foods/sate-klopo.png";
import lontongBalap from "../assets/foods/lontong-balap.jpg";
import rawon from "../assets/foods/rawon.jpg";
import kikil from "../assets/foods/kikil.jpg";
import nasiCumi from "../assets/foods/nasi-cumi.jpg";
import tahuTek from "../assets/foods/tahu-tek.jpg";

// === CULINARY CARDS ===
import penyetanBukris from "../assets/foods/penyet-bukris.jpg";
import rawonJaya from "../assets/foods/rawon-jaya.png";
import rawonPangat from "../assets/foods/rawon-pangat.jpg";
import sotoCakHar from "../assets/foods/soto-cakhar.jpg";
import nasiCuhima from "../assets/foods/nasi-cuhima.jpg";
import sotoAmbengan from "../assets/foods/soto-ambengan.jpg";
import segoSambel from "../assets/foods/sego-sambel.png";
import rawonSetan from "../assets/foods/rawon-setan.png";

// === RESTAURANTS ===
import warungBukris from "../assets/restaurants/warung-bukris.png";
import rujakCingurRest from "../assets/restaurants/rujak-cingur.jpg";
import rawonPakPangat from "../assets/restaurants/rawon-pakpangat.jpg";
import penyetanBangAli from "../assets/restaurants/penyetan-bangali.jpg";
import lontongBalapRajawali from "../assets/restaurants/lontong-balap-rajawali.jpg";
import sotoAyamCakhar from "../assets/restaurants/soto-ayam-cakhar.jpg";

const Culinary = () => {
  const navigate = useNavigate();

  const foods = [
    { name: "Rujak Cingur", img: rujakCingur },
    { name: "Penyetan", img: penyetBukris },
    { name: "Nasi Campur", img: nasiCampur },
    { name: "Nasi Krawu", img: nasiKrawu },
    { name: "Nasi Kuning", img: nasiKuning },
    { name: "Soto", img: sotoCakHar2 },
    { name: "Lontong Kupang", img: lontongKupang },
    { name: "Sate Klopo", img: sateKlopo },
    { name: "Lontong Balap", img: lontongBalap },
    { name: "Rawon", img: rawon },
    { name: "Kikil", img: kikil },
    { name: "Nasi Cumi", img: nasiCumi },
    { name: "Tahu Tek", img: tahuTek },
  ];

 const culinaryList = [
  { 
    name: "Penyetan Bu Kris", 
    restaurant: "Warung Bu Kris",
    price: "Rp28.000", 
    img: penyetanBukris 
  },
  { 
    name: "Rawon Pak Jaya", 
    restaurant: "Warung Pak Jaya",
    price: "Rp10.000", 
    img: rawonJaya 
  },
  { 
    name: "Rawon Pak Pangat", 
    restaurant: "Warung Pak Pangat",
    price: "Rp25.000", 
    img: rawonPangat 
  },
  { 
    name: "Soto Ayam Cak Har",
    restaurant: "Warung Cak Har",
    price: "Rp25.000", 
    img: sotoCakHar 
  },
  { 
    name: "Nasi Cuhima Bu Evi",
    restaurant: "Warung Bu Evi",
    price: "Rp10.000", 
    img: nasiCuhima 
  },
  { 
    name: "Soto Ayam Ambengan",
    restaurant: "Soto Ambengan",
    price: "Rp28.000", 
    img: sotoAmbengan 
  },
  { 
    name: "Sego Sambel Mak Yeye",
    restaurant: "Warung Mak Yeye",
    price: "Rp10.000", 
    img: segoSambel 
  },
  { 
    name: "Rawon Setan",
    restaurant: "Warung Bu Kris",
    price: "Rp50.000", 
    img: rawonSetan 
  },
];


  const restaurants = [
    { name: "Warung Bu Kris", loc: "Jl. Kayoon No.46B", rate: "4.4", img: warungBukris },
    { name: "Rujak Cingur", loc: "Jl. Genteng Durasim No.29", rate: "4.5", img: rujakCingurRest },
    { name: "Rawon Pak Pangat", loc: "Jl. Kelintang Baru Sel. I No.15", rate: "4.5", img: rawonPakPangat },
    { name: "Penyetan Bang Ali", loc: "Jl. Simpang Darmo Permai Utara No.22", rate: "4.3", img: penyetanBangAli },
    { name: "Lontong Balap Rajawali", loc: "Jl. Krembangan Timur", rate: "4.4", img: lontongBalapRajawali },
    { name: "Soto Cak Har", loc: "Jl. Dr. Ir. H. Soekarno No.220", rate: "4.5", img: sotoAyamCakhar },
  ];

  return (
    <div className="font-[Poppins] bg-white text-gray-800">
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
          <button className="bg-[var(--green-700)] text-white px-10 py-2.5 rounded-full font-semibold hover:bg-[#1f5a32] transition-all shadow-md hover:scale-[1.03]">
            Sign In
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative text-center px-6 mt-32">
        <img src={heroCulinary} alt="Kuliner Surabaya" className="w-full max-w-[1200px] h-[420px] object-cover brightness-[65%] rounded-[25px] mx-auto block"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-[#FFD35B] font-[MuseoModerno] text-5xl font-extrabold mb-4">Kenali Rasa Suroboyo</h1>
          <p className="max-w-lg mb-6 font-medium">Unggah foto makananmu dan temukan apakah itu termasuk kuliner legendaris Surabaya.</p>
          <button onClick={() => navigate("/unggahmakanan")} className="bg-[#FF4400] hover:bg-[#e03c00] text-white px-6 py-2 rounded-full font-semibold transition-transform hover:-translate-y-1">
            Unggah Foto Sekarang
          </button>
        </div>
      </section>

      {/* SEARCH BY FOOD */}
      <section className="px-8 py-14 bg-white text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-8">Search By Food</h2>
        <div className="overflow-x-auto scroll-x pb-4 px-4">
          <div className="flex space-x-8 w-max">
            {foods.map((food, i) => (
              <div key={i} className="flex-shrink-0 text-center cursor-pointer" onClick={() => navigate(`/history/${food.name.toLowerCase().replace(/ /g, "-")}`)}>
                <img src={food.img} className="w-28 h-28 object-cover rounded-full border-4 border-green-700 mx-auto mb-2" alt={food.name} />
                <p>{food.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIND MORE CULINARY*/}
      <section className="bg-gray-50 py-16 px-12 text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold mb-8 text-green-800">Find More Culinary</h2>

          <div className="flex justify-center mb-10 flex-wrap gap-3">
            <input type="text" placeholder="Search Food" className="border rounded-xl px-4 py-2 w-52" />
            <select className="border rounded-xl px-3 py-2 w-44">
              <option>Harga</option>
              <option>10.000 - 30.000</option>
              <option>30.000 - 70.000</option>
              <option>70.000 - 100.000</option>
            </select>
            <select className="border rounded-md px-3 py-2 w-44">
              <option>Category</option>
              <option>Aneka Lontong</option>
              <option>Aneka Nasi</option>
              <option>Aneka Kuah</option>
            </select>
            <button className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition">Search</button>
          </div>

          {/* === Card disamain styling-nya dengan Home === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {culinaryList.map((item, i) => (
              <div
                key={i}
                onClick={() => navigate("/detail")}
                className="bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:bg-[#fff5ea] transition-all duration-300 cursor-pointer"
              >
                <img src={item.img} alt={item.name} className="w-full h-56 object-cover" />
                <div className="p-4 text-left">
                  <h3 className="text-[var(--green-700)] font-semibold">{item.name}</h3>
                  <p className="text-[var(--green-700)] text-sm">{item.restaurant}</p>
                  <p className="text-[var(--orange)] font-bold mt-1">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-10 bg-white border-2 border-green-700 text-green-700 px-6 py-3 rounded-full hover:bg-green-700 hover:text-white transition">
            Show More
          </button>
        </div>
      </section>


      {/* FIND MORE RESTAURANT */}
      <section className="py-20 px-12 lg:px-32 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <h2 className="text-3xl font-bold text-center mb-10 text-[var(--green-700)]">
            Find More Restaurant
          </h2>

          <div className="flex justify-center mb-10 flex-wrap gap-3">
            <select className="border rounded-xl px-3 py-2 w-44">
              <option>Lokasi</option>
              <option>Surabaya Timur</option>
              <option>Surabaya Barat</option>
              <option>Surabaya Pusat</option>
              <option>Surabaya Utara</option>
              <option>Surabaya Selatan</option>
            </select>
            <select className="border rounded-md px-3 py-2 w-40">
              <option>Open Hours</option>
              <option>08.00 AM</option>
              <option>12.00 AM</option>
              <option>06.00 AM</option>
            </select>
            <select className="border rounded-md px-3 py-2 w-40">
              <option>Rating</option>
              <option>⭐ 3</option>
              <option>⭐ 4</option>
              <option>⭐ 4.5</option>
              <option>⭐ 5</option>
            </select>
            <button className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition">Search</button>
          </div>

          {/* === CARD RESTO — styling disamain Featured Restaurant === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {restaurants.map((r, i) => (
              <div
                key={i}
                onClick={() => navigate("/restaurant")}
                className="relative bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:bg-[#fff5ea] transition-all duration-300 cursor-pointer"
              >
                <span className="absolute top-3 left-3 bg-[var(--orange)] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                  ★ {r.rate}
                </span>

                <img src={r.img} alt={r.name} className="w-full h-56 object-cover" />

                <div className="p-4 text-left">
                  <h3 className="text-[var(--green-700)] font-semibold">{r.name}</h3>
                  <p className="text-[var(--orange)] text-sm flex items-center gap-1 mt-1">
                    <i className="fa-solid fa-location-dot"></i> {r.loc}
                  </p>
                </div>
              </div>
            ))}
          </div>

           <button className="mt-10 bg-white border-2 border-green-700 text-green-700 px-6 py-3 rounded-full hover:bg-green-700 hover:text-white transition">
            Show More
          </button>
        </div>
      </section>

      {/* FLOATING CHAT */}
      <div className="fixed bottom-24 right-36 bg-green-700 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg">Tanya aja!</div>
      <div className="fixed bottom-6 right-6 bg-white rounded-full w-20 h-20 shadow-lg flex items-center justify-center cursor-pointer animate-bounce" onClick={() => navigate("/chatbot")}>
        <img src={mascot} alt="Chat Mascot" className="w-16 h-16 rounded-full" />
      </div>

      {/* FOOTER */}
      <footer className="text-gray-200 text-center py-10 bg-[var(--green-dark)] mt-10">
        <ul className="flex justify-center space-x-10 mb-8 text-gray-300 text-lg">
          {["Home", "Culinary", "About", "Mealplan"].map((item) => (
            <li key={item}><a href="#" className="hover:text-white transition">{item}</a></li>
          ))}
        </ul>
        <img src={logo} alt="Logo" className="w-36 mx-auto mb-4" />
        <p className="text-sm text-gray-300">© 2025 | SuroTaste. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Culinary;
