import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";

// IMAGE IMPORTS
import bukrisHero from "../assets/foods/warungbukris.png";
import area1 from "../assets/restaurants/area1.png";
import area2 from "../assets/restaurants/area2.png";
import area3 from "../assets/restaurants/area3.png";
import area4 from "../assets/restaurants/area4.png";

// Menu Images
import penyet from "../assets/foods/penyet-bukris.jpg";
import pecel from "../assets/foods/nasi-pecel.jpg";
import asem from "../assets/foods/sayurasem.jpg";
import buntut from "../assets/foods/sopbuntut.jpg";
import empal from "../assets/foods/empalsuwir.jpg";
import kalasan from "../assets/foods/ayamkalasan.jpg";
import tahu from "../assets/foods/tahubumbu.jpg";
import bok from "../assets/foods/nasibok.jpg";

// Reviews
import userPic from "../assets/usercomment.jpg";

export default function DetailRestaurant() {
      const [modalOpen, setModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [selectedHero, setSelectedHero] = useState(null);

    const menuItems = [
        { img: penyet, title: "Nasi Ayam Goreng", price: "Rp28,000" },
        { img: pecel, title: "Nasi Pecel Empal", price: "Rp36,000" },
        { img: asem, title: "Sayur Asem", price: "Rp8,000" },
        { img: buntut, title: "Sop Buntut", price: "Rp38,000" },
        { img: empal, title: "Empal Suwir Bu Kris", price: "Rp32,000" },
        { img: kalasan, title: "Ayam Kalasan", price: "Rp30,000" },
        { img: tahu, title: "Tahu Telur Bumbu", price: "Rp20,000" },
        { img: bok, title: "Nasi Bok", price: "Rp35,000" },
    ];

    const reviews = [
        {
            name: "Joshua",
            stars: 4,
            comment:
                "Warung Bu Kris selalu penuh, pertanda rasa tak diragukan! Semua makanan enak terutama Penyetan, Nasi Krawu, dan Sup Buntut.",
        },
        {
            name: "Mas Gibran",
            stars: 5,
            comment:
                "Klo mo makan di sini mah jangan laper banged... Tapi rasa makanannya sih oke banget!",
        },
        {
            name: "Adina",
            stars: 3,
            comment:
                "Mmm enak, ayamnya lembut banget. Porsinya besar dan datangnya cepat.",
        },
    ];
    
    const { name } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5050/api/restaurants/name/${encodeURIComponent(name)}`)
            .then(res => res.json())
            .then(data => setRestaurant(data))
            .catch(err => console.log(err));
    }, [name]);

    if (!restaurant) return <div className="p-10">Loading...</div>;

  

    return (
        <div className="antialiased text-gray-800 bg-white">

            {/* NAVBAR (JANGAN DIUBAH) */}
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

            {/* === CONTENT START === */}

            <section className="px-12 lg:px-20 py-20 mt-10">
                <div className="flex flex-col lg:flex-row gap-12 min-h-[500px]">

                    {/* LEFT SIDE */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">

                        <span className="bg-[var(--orange)] text-white px-4 py-1 rounded-lg w-fit font-semibold shadow text-lg">
                            ★ {restaurant.rating}
                        </span>

                        <h1 className="text-5xl font-bold text-green-700 mt-4 leading-tight">
                            {restaurant.name}
                        </h1>

                        <div className="inline-block">
                            <span className="inline-flex w-auto bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium mt-4">
                                {restaurant.openHours}
                            </span>
                        </div>

                        <p className="text-gray-600 mt-6 text-lg leading-relaxed max-w-xl">
                            {restaurant.description}
                        </p>

                        <p className="text-gray-700 mt-6 bg-[#FAF8F5] p-4 rounded-xl text-sm flex items-start gap-2 w-fit">
                            <i className="fa-solid fa-location-dot text-[var(--orange)] mt-1"></i>
                            {restaurant.location}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6 flex-wrap">
                            <button className="px-4 py-2 border rounded-xl flex items-center gap-2">
                                <i className="fa-regular fa-heart" /> Save
                            </button>
                            <button className="px-4 py-2 border rounded-xl flex items-center gap-2">
                                <i className="fa-solid fa-share-nodes" /> Share
                            </button>
                            <button className="px-4 py-2 border rounded-xl">
                                <i className="fab fa-instagram" />
                            </button>
                            <button className="px-4 py-2 border rounded-xl">
                                <i className="fab fa-whatsapp" />
                            </button>
                        </div>
                    </div>


                    {/* RIGHT */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center">

                        {/* FOTO UTAMA */}
                        <div className="w-[420px] h-[420px] rounded-2xl shadow-xl overflow-hidden">
                            <img
                                src={selectedHero ?? bukrisHero}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* THUMBNAILS */}
                        <div className="flex gap-4 mt-4">
                            {[bukrisHero, area1, area2, area3, area4].map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedHero(img)}
                                    className={`w-24 h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition 
                    ${selectedHero === img ? "border-green-700" : "border-transparent"}`}
                                >
                                    <img
                                        src={img}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR MENU */}
            <section className="px-12 py-12">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-8">Our Menu</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {menuItems.map((item) => (
                        <div
                            key={item.title}
                            className="bg-[#FBF8F5] rounded-xl shadow-md hover:-translate-y-1 transition cursor-pointer"
                            onClick={() => {
                                setSelected(item);
                                setModalOpen(true);
                            }}
                        >
                            <img src={item.img} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-green-700 font-semibold">{item.title}</h3>
                                <p className="text-[var(--orange)] font-bold">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* REVIEWS */}
            <section className="px-12 py-12">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-8">Our Review</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((rev, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-center mb-4">
                                <img src={userPic} className="w-12 h-12 rounded-full mr-3" />
                                <div>
                                    <h4 className="font-semibold">{rev.name}</h4>
                                    <div className="text-yellow-500 text-sm">
                                        {"★".repeat(rev.stars)}{"☆".repeat(5 - rev.stars)}
                                    </div>
                                </div>
                            </div>

                            <i className="fa-solid fa-quote-left text-2xl text-[var(--orange)] mb-2"></i>

                            <p className="text-gray-600 text-sm">{rev.comment}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* LOCATION */}
            <section className="px-12 py-12">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-8">Location</h2>

                <div className="rounded-2xl overflow-hidden shadow-md h-[400px]">
                    <iframe
                        src={restaurant.mapsLink}
                        className="w-full h-full border-0"
                        loading="lazy"
                        allowFullScreen
                    />
                </div>
            </section>

            {/* MODAL */}
            {modalOpen && selected && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-xl p-8 w-[92%] max-w-3xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-6 text-3xl text-gray-500 hover:text-black"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <div className="flex gap-8">
                            {/* Image */}
                            <div className="w-48 h-48 rounded-xl overflow-hidden">
                                <img
                                    src={selected.img}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Detail */}
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold text-green-700">
                                    {selected.title}
                                </h3>

                                <p className="text-[var(--orange)] font-bold text-xl mt-3">
                                    {selected.price}
                                </p>

                                <div className="mt-4 flex gap-3">
                                    <span className="px-4 py-1 bg-green-100 text-green-700 rounded-xl text-sm">
                                        Aneka Lontong
                                    </span>
                                    <span className="px-4 py-1 bg-orange-100 text-orange-700 rounded-xl text-sm">
                                        Gurih
                                    </span>
                                </div>

                                <p className="text-gray-600 mt-4 leading-relaxed">
                                    Nasi ayam goreng khas bu kris dengan sambal bawang pedas...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* FOOTER (JANGAN DIUBAH) */}
            <footer className="text-gray-200 text-center py-10 bg-[var(--green-dark)] mt-10">
                <ul className="flex justify-center space-x-10 mb-8 text-gray-300 text-lg">
                    {["Home", "Culinary", "About", "Mealplan"].map((item) => (
                        <li key={item}>
                            <a href="#" className="hover:text-white transition">{item}</a>
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
