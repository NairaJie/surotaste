import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

const RestaurantCard = () => {
  const navigate = useNavigate();

  const [allRestaurants, setAllRestaurants] = useState([]); 
  const [visibleRestaurants, setVisibleRestaurants] = useState([]); 
  const [loadedCount, setLoadedCount] = useState(ITEMS_PER_PAGE);

  const [location, setLocation] = useState("");
  const [openHours, setOpenHours] = useState("");
  const [rating, setRating] = useState("");

  const [loading, setLoading] = useState(true);

  // ================================
  // FETCH DATA API
  // ================================
  useEffect(() => {
    fetch("http://localhost:5050/api/restaurants")
      .then((res) => res.json())
      .then((data) => {
        setAllRestaurants(data);
        setVisibleRestaurants(data.slice(0, ITEMS_PER_PAGE));
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  // ================================
  // FILTER FUNCTION
  // ================================
  const applyFilter = () => {
    let filtered = [...allRestaurants];

    // Filter lokasi (region)
    if (location !== "") {
      filtered = filtered.filter(
        (r) =>
          r.region?.toLowerCase() === location.toLowerCase()
      );
    }

    // Filter jam buka
    if (openHours !== "") {
      filtered = filtered.filter(
        (r) =>
          r.openHours?.toLowerCase().includes(openHours.toLowerCase())
      );
    }

    // Filter rating
    if (rating !== "") {
      filtered = filtered.filter((r) => r.rating >= Number(rating));
    }

    // Reset pagination
    setLoadedCount(ITEMS_PER_PAGE);
    setVisibleRestaurants(filtered.slice(0, ITEMS_PER_PAGE));
  };

  // ================================
  // SHOW MORE
  // ================================
  const handleShowMore = () => {
    const newCount = loadedCount + ITEMS_PER_PAGE;
    setLoadedCount(newCount);

    setVisibleRestaurants((prev) => [
      ...prev,
      ...allRestaurants.slice(prev.length, newCount),
    ]);
  };

  // ================================
  // LOADING SKELETON
  // ================================
  if (loading) {
    return (
      <section className="py-20 px-12 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10 text-[var(--green-700)] animate-pulse">
          Find More Restaurant
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[var(--cream)] rounded-2xl shadow-md animate-pulse">
              <div className="w-full h-56 bg-gray-300"></div>
              <div className="p-4 space-y-3">
                <div className="w-3/4 h-4 bg-gray-300"></div>
                <div className="w-1/2 h-4 bg-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-12 bg-white text-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <h2 className="text-3xl font-bold mb-10 text-[var(--green-700)]">
          Find More Restaurant
        </h2>

        {/* FILTER */}
        <div className="flex justify-center mb-10 flex-wrap gap-3">
          <select
            className="border rounded-xl px-3 py-2 w-44"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Lokasi</option>
            <option value="Surabaya Timur">Surabaya Timur</option>
            <option value="Surabaya Barat">Surabaya Barat</option>
            <option value="Surabaya Pusat">Surabaya Pusat</option>
            <option value="Surabaya Utara">Surabaya Utara</option>
            <option value="Surabaya Selatan">Surabaya Selatan</option>
          </select>

          <select
            className="border rounded-md px-3 py-2 w-40"
            value={openHours}
            onChange={(e) => setOpenHours(e.target.value)}
          >
            <option value="">Open Hours</option>
            <option value="08.00">08.00 AM</option>
            <option value="12.00">12.00 AM</option>
            <option value="06.00">06.00 AM</option>
          </select>

          <select
            className="border rounded-md px-3 py-2 w-40"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Rating</option>
            <option value="3">⭐ 3+</option>
            <option value="4">⭐ 4+</option>
            <option value="4.5">⭐ 4.5+</option>
            <option value="5">⭐ 5</option>
          </select>

          <button
            onClick={applyFilter}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
          >
            Search
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {visibleRestaurants.map((resto, index) => (
            <div
              key={resto.id}
              onClick={() =>
                navigate(`/detailrestaurant/${encodeURIComponent(resto.name)}`)
              }
              className="relative bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden
              hover:-translate-y-2 hover:shadow-xl hover:bg-[#fff5ea] transition-all duration-300 cursor-pointer"
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

        {/* SHOW MORE */}
        {visibleRestaurants.length < allRestaurants.length && (
          <button
            onClick={handleShowMore}
            className="mt-10 bg-white border-2 border-green-700 text-green-700 px-6 py-3 rounded-full hover:bg-green-700 hover:text-white transition"
          >
            Show More
          </button>
        )}
      </div>
    </section>
  );
};

export default RestaurantCard;
