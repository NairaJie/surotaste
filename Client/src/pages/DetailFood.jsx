import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../index.css";

export default function DetailFood() {
    const { name } = useParams(); // ambil nama dari URL
    const navigate = useNavigate(); 
    const [food, setFood] = useState(null);

    useEffect(() => {
        fetch (`http://localhost:5050/api/foods/name/${name}`)
            .then(res => res.json())
            .then(data => setFood(data))
            .catch(err => console.log(err));
    }, [name]);
    if (!food) return <div className="p-10">Loading...</div>;

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

            {/* BACK BUTTON */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-28 left-10 text-green-700 text-3xl hover:text-green-900 transition"
            >
                <i className="fa-solid fa-arrow-left"></i>
            </button>



            {/* HERO SECTION */}
            <section className="px-6 lg:px-20 py-28 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

                    {/* TEKS KIRI */}
                    <div>
                        <h1 className="text-5xl font-bold text-green-700 mb-5">{food.name}</h1>


                        <div className="flex gap-2 mb-5">
                            <span className="bg-green-100 text-green-800 px-4 py-1.5 rounded-lg text-sm font-medium">
                                {food.meals}
                            </span>
                            <span className="bg-orange-100 text-orange-400 px-4 py-1.5 rounded-lg text-sm font-medium">
                                {food.category}
                            </span>
                        </div>

                        <p className="text-gray-700 leading-relaxed text-lg">
                            {food.description}
                        </p>
                    </div>

                    {/* GAMBAR KANAN */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[700px] h-[580px]">
                            <img
                                src="../assets/foods/default-cingur.png"
                                alt="Rujak Cingur"
                                className="w-full h-full object-cover rounded-2xl shadow-2xl border border-gray-100"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* HISTORY SECTION */}
            <section className="px-12 py-10">
                <div className="bg-[#FBF8F5] rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-center text-2xl font-bold text-green-700 mb-4">
                        History
                    </h2>
                    <p className="text-gray-700 text-base leading-relaxed text-justify">
                        Rujak cingur sudah ada sejak masa kolonial dan berkembang menjadi
                        hidangan khas Surabaya. Dahulu hanya disajikan dalam acara adat,
                        namun kini tersedia di berbagai warung hingga restoran modern.
                        Keunikan bumbu petis udang yang kuat menjadi ciri utama dan diwariskan
                        turun-temurun sebagai salah satu kekayaan kuliner Nusantara.
                    </p>
                </div>
            </section>

            {/* VARIASI RUJAK CINGUR */}
            <section className="px-12 py-12">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-8">
                    Rujak Cingur
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        {
                            img: "../assets/foods/cingur-wagiti.jpg",
                            title: "Rujak Cingur Bu Wagiti",
                            restaurant: "Depot Bu Wagiti",
                            price: "Rp25,000",
                        },
                        {
                            img: "../assets/foods/cingur-bbm.jpg",
                            title: "Rujak Cingur",
                            restaurant: "Warung BBM",
                            price: "Rp25,000",
                        },
                        {
                            img: "../assets/foods/cingur-genteng.jpg",
                            title: "Rujak Cingur",
                            restaurant: "Rujak Genteng Surabaya",
                            price: "Rp25,000",
                        },
                        {
                            img: "../assets/foods/cingur-delta.jpg",
                            title: "Rujak Cingur",
                            restaurant: "Warung Delta",
                            price: "Rp25,000",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:bg-[#fff5ea] transition-all duration-300"
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-4">
                                <h3 className="text-[var(--green-700)] font-semibold text-lg">
                                    {item.title}
                                </h3>

                                <p className="text-[var(--green-700)] text-sm">
                                    {item.restaurant}
                                </p>

                                <p className="text-[var(--orange)] font-bold mt-1">
                                    {item.price}
                                </p>
                            </div>
                        </div>
                    ))}
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
