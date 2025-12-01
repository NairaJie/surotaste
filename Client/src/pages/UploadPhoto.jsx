import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import makananHero from "../assets/makanan-hero.png";
import "../index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UploadPhoto() {
    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // simpan file ke state browser (session)
        navigate("/resultupload", { state: { file } });
    };

    const openFileDialog = () => {
        const input = document.getElementById("uploadInput");
        if (input) input.click();   // <-- INI YANG BUKA FOLDER
    };


    return (
        <div className="antialiased text-gray-800 bg-white">
            {/* NAVBAR */}
            <Navbar />

            {/* MAIN CONTENT */}
            <main className="text-center px-6 md:px-16 py-16 md:py-20 mt-24">

                {/* Tombol kembali */}
                <div className="text-left mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-green-700 text-2xl hover:text-green-900 transition"
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
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
                    onClick={openFileDialog}
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
                    onChange={(e) => handleFileUpload(e)}
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
            <Footer />
        </div>
    );
}
