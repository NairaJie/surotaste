import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CulinaryHome() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5050/api/culinary")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data.slice(0, 4)); // ⬅️ tampilkan hanya 4 item
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // =========================================
  // ⭐ LOADING SKELETON (smooth shimmer)
  // =========================================
  if (loading) {
    return (
      <section className="py-20 px-12 lg:px-32 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-[var(--green-700)] animate-pulse">
          Taste of Surabaya
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden animate-pulse"
            >
              <div className="w-full h-56 bg-gray-300"></div>
              <div className="p-4 space-y-3">
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                <div className="w-2/5 h-3 bg-gray-300 rounded"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // =========================================
  // ⭐ MAIN UI — fade + slide in animation
  // =========================================
  return (
    <section className="py-16 px-12  bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-[var(--green-700)]">
          Taste of Surabaya
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {foods.map((food, index) => (
            <div
              key={food.id}
              onClick={() =>
                navigate(`/detailrestaurant/${food.restaurant?.id}`)
              }
              className="bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:bg-[#fff5ea] transition-all duration-300 cursor-pointer"
              style={{
                animation: `fadeInUp 0.5s ease forwards`,
                animationDelay: `${index * 0.15}s`,
                opacity: 0,
              }}
            >
              <img
                src={food.image || "/fallback.jpg"}
                alt={food.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h2 className="text-[var(--green-700)] font-semibold">
                  {food.name}
                </h2>

                <p className="text-[var(--green-700)] text-sm">
                  {food.restaurant?.name || "Unknown Restaurant"}
                </p>

                <p className="text-[var(--orange)] font-bold mt-1">
                  Rp{Number(food.price).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fade-in animation */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
}
