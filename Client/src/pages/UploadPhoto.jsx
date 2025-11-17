import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import makananHero from "../assets/makanan-hero.png";
import "../index.css";


export default function UploadPhoto() {

    const handleUploadClick = () => {
        document.getElementById("uploadInput").click();
    };

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

                    <button className="bg-[var(--green-700)] text-white px-10 py-2.5 rounded-full font-semibold hover:bg-[#1f5a32] transition-all shadow-md hover:scale-[1.03]">
                        Sign In
                    </button>
                </div>
            </nav>

            {/* MAIN CONTENT */}
            <main className="text-center px-6 md:px-16 py-16 md:py-20 mt-24">

                {/* Tombol kembali */}
                <div className="text-left mb-8">
                    <Link
                        to="/culinary"
                        className="text-green-700 text-2xl hover:text-green-900 transition"
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                </div>

                {/* Judul */}
                <h1 className="text-3xl md:text-5xl font-semibold text-green-700 mb-4">
                    Kenali Rasa Suroboyo
                </h1>

                <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                    Unggah foto makananmu dan temukan apakah itu termasuk kuliner legendaris Surabaya.
                </p>

                {/* Tombol Unggah */}
                <button
                    onClick={handleUploadClick}
                    className="bg-[var(--orange)] text-white font-semibold py-3 px-9 rounded-xl
                     shadow-lg transition-all duration-200 hover:bg-[#ff5b1f] 
                     hover:-translate-y-0.5 mb-14"
                >
                    Unggah Gambar
                </button>

                <input
                    type="file"
                    id="uploadInput"
                    accept="image/*"
                    className="hidden"
                />

                {/* Gambar Hero */}
                <div className="flex justify-center">
                    <img
                        src={makananHero}
                        alt="Makanan Surabaya"
                        className="w-full max-w-5xl rounded-xl"
                    />
                </div>
            </main>


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