import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 8;

const CulinaryCard = () => {
  const navigate = useNavigate();

  const [allFoods, setAllFoods] = useState([]);         // Semua data dari API
  const [filteredFoods, setFilteredFoods] = useState([]); // Hasil setelah filter
  const [visibleFoods, setVisibleFoods] = useState([]); // Data yang tampil
  const [loadedCount, setLoadedCount] = useState(ITEMS_PER_PAGE);

  // Filters
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    fetch("http://localhost:5050/api/culinary")
      .then((res) => res.json())
      .then((data) => {
        setAllFoods(data || []);
        setFilteredFoods(data || []);
        setVisibleFoods((data || []).slice(0, ITEMS_PER_PAGE));
        setLoadedCount(ITEMS_PER_PAGE);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  // Apply filter (memeriksa item.category dan item.food?.category)
  const applyFilter = () => {
    let filtered = [...allFoods];

    // Search (cari di item.name, food.name, restaurant.name)
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      filtered = filtered.filter((f) => {
        const name = (f.name || "").toLowerCase();
        const foodName = (f.food?.name || "").toLowerCase();
        const restName = (f.restaurant?.name || "").toLowerCase();
        return name.includes(q) || foodName.includes(q) || restName.includes(q);
      });
    }

    // Price filter (data price adalah number)
    if (price !== "") {
      const [min, max] = price.split("-").map((v) => Number(v));
      if (!isNaN(min) && !isNaN(max)) {
        filtered = filtered.filter((f) => {
          const p = Number(f.price ?? f.price); // defensive
          return !isNaN(p) && p >= min && p <= max;
        });
      }
    }

    // Category filter: cek both f.category dan f.food.category
    if (category !== "") {
      const wanted = category.toLowerCase();
      filtered = filtered.filter((f) => {
        const topCat = (f.category || "").toLowerCase();
        const foodCat = (f.food?.category || "").toLowerCase();
        // cocokkan jika salah satu mengandung kata yang dipilih
        return topCat.includes(wanted) || foodCat.includes(wanted);
      });
    }

    // Update filtered + visible (reset pagination)
    setFilteredFoods(filtered);
    setLoadedCount(ITEMS_PER_PAGE);
    setVisibleFoods(filtered.slice(0, ITEMS_PER_PAGE));
  };

  // Show more (menggunakan filteredFoods, bukan allFoods)
  const handleShowMore = () => {
    const newCount = loadedCount + ITEMS_PER_PAGE;
    setLoadedCount(newCount);
    setVisibleFoods(filteredFoods.slice(0, newCount));
  };

  // Jika user mengosongkan filter dan ingin menampilkan semua lagi, bisa pakai reset
  const resetFilters = () => {
    setSearch("");
    setPrice("");
    setCategory("");
    setFilteredFoods(allFoods);
    setLoadedCount(ITEMS_PER_PAGE);
    setVisibleFoods(allFoods.slice(0, ITEMS_PER_PAGE));
  };

  // Loading skeleton
  if (loading) {
    return (
      <section className="bg-gray-50 py-16 px-12 text-center">
        <h2 className="text-3xl font-bold mb-8 text-green-800 animate-pulse">
          Find More Culinary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-[var(--cream)] rounded-2xl shadow-md p-4 animate-pulse">
              <div className="w-full h-56 bg-gray-300 rounded"></div>
              <div className="mt-3 h-4 bg-gray-300 rounded"></div>
              <div className="mt-2 h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="mt-2 h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16 px-12 text-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold mb-8 text-green-800">
          Find More Culinary
        </h2>

        {/* Filters */}
        <div className="flex justify-center mb-10 flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search Food"
            className="border rounded-xl px-4 py-2 w-52"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* gunakan nilai yang sebenarnya ada di data (atau kata kunci yang di-handle di applyFilter) */}
          <select
            className="border rounded-xl px-3 py-2 w-44"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="">Harga</option>
            <option value="10000-30000">10.000 - 30.000</option>
            <option value="30000-70000">30.000 - 70.000</option>
            <option value="70000-100000">70.000 - 100.000</option>
          </select>

          <select
            className="border rounded-md px-3 py-2 w-44"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            {/* <-- pilih value yang sesuai dengan data; aku pake kata kunci yang ada di string data */}
            <option value="lontong">Aneka Lontong</option>
            <option value="nasi">Aneka Nasi</option>
            <option value="kuah">Aneka Kuah</option>
          </select>

          <button
            onClick={applyFilter}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
          >
            Search
          </button>

          <button
            onClick={resetFilters}
            className="bg-white border rounded-md px-4 py-2 ml-2"
          >
            Reset
          </button>
        </div>

        {/* Card List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {visibleFoods.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(`/detailrestaurant/${item.restaurant?.id}`)
              }
              className="bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:bg-[#fff5ea] transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4 text-left">
                <h3 className="text-[var(--green-700)] font-semibold">{item.name}</h3>
                <p className="text-[var(--green-700)] text-sm">{item.restaurant?.name}</p>
                <p className="text-[var(--orange)] font-bold mt-1">
                  Rp{Number(item.price).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show More */}
        {visibleFoods.length < filteredFoods.length && (
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

export default CulinaryCard;
