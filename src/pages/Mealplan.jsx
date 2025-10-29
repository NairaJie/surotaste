import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Mealplan = () => {
  const [lokasi, setLokasi] = useState("");
  const [preferensi, setPreferensi] = useState([]);
  const [waktu, setWaktu] = useState("");
  const [budget, setBudget] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState("");

  const lokasiList = [
    "Surabaya Barat",
    "Surabaya Timur",
    "Surabaya Pusat",
    "Surabaya Utara",
    "Surabaya Selatan",
  ];
  const preferensiList = ["Manis", "Asam", "Pedas", "Asin", "Gurih", "Segar"];
  const waktuList = ["Sarapan", "Makan Siang", "Makan Malam"];

  const togglePreferensi = (item) => {
    setPreferensi((prev) =>
      prev.includes(item)
        ? prev.filter((x) => x !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = () => {
    if (!lokasi || !waktu || preferensi.length < 1 || !budget || !jumlahOrang) {
      alert("Harap isi semua field terlebih dahulu!");
      return;
    }

    const mealplanData = { lokasi, waktu, preferensi, budget, jumlahOrang };
    localStorage.setItem("mealplanData", JSON.stringify(mealplanData));
    console.log("✅ Data tersimpan:", mealplanData);
    window.location.href = "/rekomendasi";
  };

  return (
    <div className="font-[Poppins] text-gray-800 bg-white">
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

      {/* HERO */}
      <section className="text-center mt-32 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-green-800">Mealplan</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
          Lagi bingung mau makan apa? Tenang aja,<br />
          biarin AI yang cariin makanan paling cocok buat selera dan kantong kamu!
        </p>
      </section>

      {/* FORM */}
      <section className="max-w-4xl mx-auto mt-12 bg-[#FBF8F5] rounded-3xl shadow-md p-10">
        {/* Lokasi */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa-solid fa-location-dot text-xl text-[#FF4400]"></i>
            <h3 className="font-semibold text-lg">Pilih Lokasi yang diinginkan</h3>
          </div>
          <div className="flex space-x-3 overflow-x-auto py-2">
            {lokasiList.map((item) => (
              <button
                key={item}
                onClick={() => setLokasi(item)}
                className={`px-6 py-2 rounded-full border font-medium transition ${
                  lokasi === item
                    ? "bg-green-700 text-white border-green-700"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-green-700 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Preferensi */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa-solid fa-utensils text-xl text-[#FF4400]"></i>
            <h3 className="font-semibold text-lg">Preferensi Makanan</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {preferensiList.map((item) => (
              <button
                key={item}
                onClick={() => togglePreferensi(item)}
                className={`px-5 py-2 rounded-full border font-medium transition ${
                  preferensi.includes(item)
                    ? "bg-green-700 text-white border-green-700"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-green-700 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Waktu */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa-regular fa-clock text-xl text-[#FF4400]"></i>
            <h3 className="font-semibold text-lg">Waktu Makan</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {waktuList.map((item) => (
              <button
                key={item}
                onClick={() => setWaktu(item)}
                className={`px-5 py-2 rounded-full border font-medium transition ${
                  waktu === item
                    ? "bg-green-700 text-white border-green-700"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-green-700 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Input Budget & Jumlah */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Budget Makanan */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <i className="fa-solid fa-money-bill-wave text-xl text-[#FF4400]"></i>
              <h3 className="font-semibold text-lg">Budget Makanan</h3>
            </div>
            <input
              type="text"
              value={budget}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                const formatted = rawValue
                  ? "Rp" + parseInt(rawValue, 10).toLocaleString("id-ID")
                  : "";
                setBudget(formatted);
              }}
              placeholder="Rp"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Jumlah Orang */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <i className="fa-solid fa-user-plus text-xl text-[#FF4400]"></i>
              <h3 className="font-semibold text-lg">Jumlah Orang</h3>
            </div>
            <input
              type="number"
              value={jumlahOrang}
              onChange={(e) => setJumlahOrang(e.target.value)}
              placeholder="Masukkan Jumlah Orang"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white font-semibold py-3 px-10 rounded-full hover:bg-green-800 transition w-full md:w-[calc(50%-12px)] shadow-md hover:scale-105"
          >
            Temukan Makanan
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-gray-200 text-center py-10 bg-[var(--green-dark)] mt-10">
        <ul className="flex justify-center space-x-10 mb-8 text-gray-300 text-lg">
          {["Home", "Culinary", "About", "Mealplan"].map((item) => (
            <li key={item}>
              <a href="#" className="hover:text-white transition">
                {item}
              </a>
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
};

export default Mealplan;
