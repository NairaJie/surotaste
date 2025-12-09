import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  

export default function RestaurantHome() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

     const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5050/api/restaurants")
            .then((res) => res.json())
            .then((data) => {
                // Tampilkan hanya 8
                setRestaurants(data.slice(0, 6));
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching restaurants:", err);
                setLoading(false);
            });
    }, []);

    // ===============================================
    // ⭐ LOADING SKELETON
    // ===============================================
    if (loading) {
        return (
            <section className="py-20 px-12 lg:px-32 bg-[#ffffff]">
                <h2 className="text-3xl font-bold text-center mb-10 text-[var(--green-700)] animate-pulse">
                    Featured Restaurant
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
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
            </section>
        );
    }

    // ===============================================
    // ⭐ MAIN UI + ANIMATION
    // ===============================================
    return (
        <section className="py-20 px-12 lg:px-32 bg-[#ffffff]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <h2 className="text-3xl font-bold text-center mb-10 text-[var(--green-700)]">
                    Featured Restaurant
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
                    {restaurants.map((resto, index) => (
                        <div
                            key={resto.id}
                            onClick={() =>
                               navigate(`/detailrestaurant/${resto.id}`)
                            }
                            className="relative bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:bg-[#fff5ea] transition-all duration-300 cursor-pointer"
                            style={{
                                animation: "fadeInUp 0.6s ease forwards",
                                animationDelay: `${index * 0.15}s`,
                                opacity: 0,
                            }}
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
            </div>
        </section>
    );
}