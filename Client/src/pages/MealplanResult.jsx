import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import foodimg from "../assets/Mealplan-Food.png";
import restoimg from "../assets/Mealplan-Resto.png";

export default function MealplanResult() {
    const navigate = useNavigate();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("mealplanResult");
        if (!data) {
            navigate("/mealplan");
            return;
        }
        setResult(JSON.parse(data));
    }, []);

    if (!result) return null;

    const restaurant = result.restaurant;
    const menu = result.menu;

    // CEK jika data kosong / API gagal
    if (!restaurant) return <p className="pt-40 text-center">Data tidak ditemukan.</p>;

    return (
        <div className="font-poppins text-gray-800">
            <Navbar />

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-28 left-10 text-green-700 text-3xl hover:text-green-900 transition"
            >
                <i className="fa-solid fa-arrow-left"></i>
            </button>

            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-12 pt-40 pb-20">

                {/* Title */}
                <h1 className="text-2xl font-semibold mb-6">Rekomendasi Restoran</h1>

                {/* RESTAURANT CARD */}
                <div className="flex gap-6">
                    {/* Image */}
                    <img
                        src={restoimg}
                        className="w-72 h-48 object-cover rounded-3xl"
                        alt=""
                    />

                    {/* Content */}
                    <div className="flex flex-col justify-between py-2">
                        <div>
                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-1">
                                <div className="bg-orange-500 text-white text-sm px-3 py-1 rounded-lg font-semibold">
                                    ★ {restaurant.rating}
                                </div>
                            </div>

                            {/* Name */}
                            <h2 className="text-3xl font-bold text-green-800">{restaurant.name}</h2>

                            {/* Open Hours */}
                            <div className="bg-[#f8f5ee] rounded-lg inline-block px-3 py-1 mt-1">
                                <p className="text-orange-500 font-regular">
                                    {restaurant.openHours}
                                </p>
                            </div>

                            {/* Address */}
                            <p className="text-gray-600 text-sm mt-3 max-w-lg leading-relaxed">
                                {restaurant.address}
                            </p>

                            {/* Dummy Profile Link */}
                            <button className="text-green-700 text-sm font-semibold mt-3 hover:underline">
                                See Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* MENU LIST */}
                <h1 className="text-xl font-semibold mt-12 mb-4">Rekomendasi Menu</h1>

                <div className="space-y-4">
                    {menu.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-[#f8f5ee] p-4 rounded-2xl"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={foodimg}
                                    className="w-14 h-14 rounded-xl object-cover"
                                    alt=""
                                />
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-orange-500 font-regular">
                                        Rp{item.price.toLocaleString("id-ID")}
                                        <span className="text-gray-600"> x{item.quantity}</span>
                                    </p>
                                </div>
                            </div>
                            <p className="text-orange-500 font-semibold">
                                Rp{item.total.toLocaleString("id-ID")}
                            </p>
                        </div>
                    ))}
                </div>

                {/* SUBTOTAL */}
                <div className="mt-12 border-t pt-6 flex justify-between">
                    <p className="font-semibold">Subtotal</p>
                    <p className="font-semibold text-orange-500">
                        Rp{result.subtotal.toLocaleString("id-ID")}
                    </p>
                </div>

                {/* SAVINGS */}
                <p className="mt-2 text-gray-700">
                    Kamu berhasil hemat{" "}
                    <span className="font-bold text-green-800">
                        Rp{result.savings.toLocaleString("id-ID")}
                    </span>{" "}
                    dari total budget{" "}
                    <span className="font-bold text-green-800">
                        Rp{result.totalBudget.toLocaleString("id-ID")}
                    </span>
                    !
                </p>
            </div>

            <Footer />
        </div>
    );
}
