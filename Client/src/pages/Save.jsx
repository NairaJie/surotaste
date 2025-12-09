import React, { useContext, useEffect, useState } from "react";
import ProfileNavbar from "../components/ProfileNavbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SavedRestaurants() {
    const { user } = useContext(AuthContext);
    const [savedRestaurants, setSavedRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        fetch(`http://localhost:5050/api/saved/${user.id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("🔥 Saved restaurants from backend:", data);
                setSavedRestaurants(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching saved:", err);
                setLoading(false);
            });
    }, [user]);

    return (
        <div className="font-poppins text-gray-800 min-h-screen flex flex-col">
            <Navbar />

            <div className="pt-24">
                <ProfileNavbar />

                <div className="max-w-7xl mx-auto p-6">
                    <h3 className="text-3xl font-bold text-green-700 mb-10">
                        Saved Restaurants
                    </h3>

                    {/* ===================== LOADING SKELETON ===================== */}
                    {loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden animate-pulse"
                                >
                                    <div className="w-full h-56 bg-gray-300"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                                        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ===================== EMPTY STATE ===================== */}
                    {!loading && savedRestaurants.length === 0 && (
                        <p className="text-gray-600 text-lg">Belum ada restaurant yang disimpan.</p>
                    )}

                    {/* ===================== CARD RESTAURANTS ===================== */}
                    {!loading && savedRestaurants.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                            {savedRestaurants.map((resto, index) => (
                                <div
                                    key={resto.id}
                                    onClick={() => navigate(`/detailrestaurant/${resto.restaurantId}`)}
                                    className="relative bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:bg-[#fff5ea] transition-all duration-300 cursor-pointer fade-in-up"
                                    style={{ animationDelay: `${index * 0.15}s` }}
                                >

                                    <span className="absolute top-3 left-3 bg-[var(--orange)] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                                        ★ {resto.rating}
                                    </span>

                                    <img
                                        src={resto.image}
                                        alt={resto.name}
                                        className="w-full h-56 object-cover"
                                    />

                                    <div className="p-4 text-left">
                                        <h3 className="text-lg font-bold text-[var(--green-700)]">
                                            {resto.name}
                                        </h3>

                                        <p className="text-sm text-[var(--orange)] mt-1 flex items-center gap-1">
                                            <i className="fa-solid fa-location-dot"></i> {resto.region}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
