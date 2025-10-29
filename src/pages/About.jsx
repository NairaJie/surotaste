import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import aboutHero from "../assets/about-hero.png";
import vision from "../assets/our-vision.jpg";
import mission from "../assets/our-mission.jpg";

export default function About() {
  return (
    <div className="font-poppins text-gray-800">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-12 py-4">
          <img src={logo} alt="Logo" className="w-28 h-auto object-contain" />

          <ul className="hidden md:flex items-center space-x-8 font-semibold text-[var(--green-700)]">
            <li><Link to="/" className="hover:text-[var(--orange)] transition">Home</Link></li>
            <li><Link to="" className="hover:text-[var(--orange)] transition">Culinary</Link></li>
            <li><Link to="/about" className="hover:text-[var(--orange)] transition">About</Link></li>
            <li><Link to="/mealplan" className="hover:text-[var(--orange)] transition">Mealplan</Link></li>
          </ul>

          <button className="bg-[var(--green-700)] text-white px-10 py-2.5 rounded-full font-semibold hover:bg-[#1f5a32] transition-all shadow-md hover:scale-[1.03]">
            Sign In
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
     
    <section className="about-hero mt-32 text-center relative px-6">
        <img
            src={aboutHero}
            alt="About Us"
            className="w-full max-w-[1200px] h-[420px] object-cover brightness-[65%] rounded-[25px] mx-auto block"
        />
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-museomoderno text-[#FFD35B] text-5xl font-extrabold">
            About Us
        </h1>
    </section>



      {/* ABOUT CONTENT */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h3 className="text-2xl font-bold mb-3">Tentang Kami</h3>
        <p className="max-w-3xl mx-auto text-gray-600">
          SuroTaste memperkenalkan kekayaan kuliner Surabaya kepada dunia. Kami membantu kamu menemukan dan menikmati cita rasa autentik khas Kota Pahlawan dengan mudah.
        </p>

        {/* Vision */}
        <div className="grid md:grid-cols-2 gap-10 items-center mt-16">
          <div className="flex justify-start">
            <img
              src={vision}
              alt="Our Vision"
              className="rounded-2xl shadow-md object-cover w-full max-w-lg h-72"
            />
          </div>
          <div className="text-left flex flex-col justify-center h-72">
            <h4 className="text-black font-bold text-xl mb-3">Our Vision</h4>
            <p className="text-gray-600 leading-relaxed text-justify">
              Menjadi platform kuliner terdepan yang tidak hanya memperkenalkan kekayaan cita rasa khas Surabaya, tetapi juga mengangkat nilai budaya dan tradisi yang terkandung di dalam setiap sajian.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-10 items-center mt-16">
          <div className="text-left order-2 md:order-1 flex flex-col justify-center h-72">
            <h4 className="text-black font-bold text-xl mb-3">Our Mission</h4>
            <p className="text-gray-600 leading-relaxed text-justify">
              Menyediakan informasi kuliner yang akurat dan menarik, membantu promosi UMKM lokal melalui teknologi digital, serta menginspirasi masyarakat untuk menjaga dan mengembangkan warisan kuliner khas Surabaya.
            </p>
          </div>
          <div className="flex justify-end order-1 md:order-2">
            <img
              src={mission}
              alt="Our Mission"
              className="rounded-2xl shadow-md object-cover w-full max-w-lg h-72"
            />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="text-center py-12 bg-[var(--cream)]">
        <h3 className="text-2xl font-bold mb-8 text-[var(--green-700)]">Values</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { icon: "fa-solid fa-globe", label: "Accessibility" },
            { icon: "bi bi-lightbulb", label: "Inspiration" },
            { icon: "bi bi-people", label: "Connection" },
            { icon: "fa-solid fa-bowl-food", label: "Authenticity" },
          ].map((item) => (
            <div key={item.label}>
              <div className="w-20 h-20 mx-auto rounded-full bg-[var(--green-700)] text-white flex items-center justify-center text-3xl mb-3">
                <i className={item.icon}></i>
              </div>
              <p className="font-semibold text-gray-700">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 text-center">
        <h3 className="text-2xl font-bold mb-4 text-[var(--green-700)]">
          Frequently Asked Question
        </h3>
        <p className="max-w-2xl mx-auto text-gray-600 mb-10">
          Temukan jawaban atas pertanyaan seputar SuroTaste — mulai dari cara menggunakan website, rekomendasi kuliner, hingga dukungan untuk UMKM lokal. Kami siap membantu kamu menjelajahi kuliner Surabaya dengan mudah!
        </p>

        <div className="max-w-3xl mx-auto text-left space-y-3">
          {[
            {
              q: "Apakah website ini menjual makanan secara langsung?",
              a: "Tidak. Website ini hanya menyediakan informasi seputar kuliner, bukan layanan penjualan produk makanan.",
            },
            {
              q: "Apakah semua kuliner yang ditampilkan sudah terkurasi?",
              a: "Ya, semua kuliner yang ditampilkan sudah melalui proses kurasi oleh tim kami agar tetap relevan dan autentik.",
            },
            {
              q: "Bisa nggak saya merekomendasikan tempat makan sendiri?",
              a: "Tentu saja! Kamu bisa mengirimkan rekomendasi kuliner favoritmu melalui halaman “Contact Us”.",
            },
            {
              q: "Apakah akan ada update rutin tentang kuliner baru di Surabaya?",
              a: "Ya, kami rutin memperbarui informasi kuliner dan artikel inspiratif seputar kuliner khas Surabaya.",
            },
            {
              q: "Apakah website ini bisa diakses lewat HP?",
              a: "Ya! Website ini sepenuhnya responsif dan bisa diakses dengan nyaman melalui ponsel, tablet, maupun komputer.",
            },
            {
              q: "Apakah menggunakan website ini gratis?",
              a: "Tentu saja gratis! Kamu dapat menjelajahi semua fitur dan rekomendasi kuliner tanpa biaya apapun.",
            },
            {
              q: "Bagaimana cara menghubungi tim pengelola website?",
              a: "Kamu dapat menghubungi tim kami melalui halaman “Contact Us” atau lewat media sosial resmi SuroTaste.",
            },
          ].map((item, index) => (
            <details
              key={index}
              className="group border rounded-lg p-4 transition-all"
            >
              <summary className="font-semibold cursor-pointer flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-comments text-orange-500 text-lg"></i>
                  <span>{item.q}</span>
                </div>
                <i className="fa-solid fa-chevron-down text-gray-500 transition-transform duration-300 group-open:rotate-180"></i>
              </summary>
              <p className="mt-2 text-gray-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-gray-200 text-center py-10 bg-[var(--green-dark)] mt-10">
        <ul className="flex justify-center space-x-10 mb-8 text-gray-300 text-lg">
          {["Home", "Culinary", "About", "Mealplan"].map((item) => (
            <li key={item}>
              <a href="#" className="hover:text-white transition">
                {item}
              </a>
            </li>
          ))}
        </ul>
        <img src={logo} alt="Logo" className="w-36 mx-auto mb-4" />
        <p className="text-sm text-gray-300">
          © 2025 | SuroTaste. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
