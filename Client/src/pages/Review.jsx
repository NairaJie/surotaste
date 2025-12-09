import React, { useContext, useEffect, useState } from "react";
import ProfileNavbar from "../components/ProfileNavbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

export default function Review() {
  const { user } = useContext(AuthContext);

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // 👉 Fetch restaurants
  useEffect(() => {
  fetch("http://localhost:5050/api/restaurants")
    .then((res) => res.json())
    .then((data) => {
      console.log("Restaurant data:", data); // biar kamu lihat responsnya
      setRestaurants(data || []);
    });
}, []);


  const submitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("Kamu harus login dulu.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5050/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantId: selectedRestaurant,
          rating,
          description,
          userId: user.id, // ✅ Auto from AuthContext
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Review berhasil dikirim!");
        setSelectedRestaurant("");
        setRating(0);
        setDescription("");
      } else {
        setMessage(data.message || "Gagal mengirim review");
      }
    } catch (err) {
      setMessage("Terjadi kesalahan server");
    }
  };

  return (
    <div className="font-poppins text-gray-800 min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-24">
        <ProfileNavbar />

        <div className="max-w-3xl mx-auto px-6 py-10">
          <h3 className="text-3xl font-bold text-green-700 mb-6">
            Write a Review
          </h3>

          <form
            onSubmit={submitReview}
            className="bg-white p-8 rounded-2xl shadow-md space-y-6"
          >
            {/* Restaurant Selection */}
            <div>
              <label className="block font-semibold mb-2">Restaurant</label>
              <select
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
                required
              >
                <option value="">Pilih restoran</option>
                {restaurants.map((rest) => (
                  <option key={rest.id} value={rest.id}>
                    {rest.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block font-semibold mb-2">Rating</label>
              <div className="flex gap-2 text-3xl cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverStar(star)}
                    onMouseLeave={() => setHoverStar(0)}
                    className={`transition ${
                      (hoverStar || rating) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tulis pengalaman kamu..."
                rows="5"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-800 transition"
            >
              Submit Review
            </button>

            {message && (
              <p className="text-center text-green-700 font-medium">{message}</p>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
