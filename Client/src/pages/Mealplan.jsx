import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CuteLoader from "../components/CuteLoader";

const Mealplan = () => {
  const navigate = useNavigate();

  const [lokasi, setLokasi] = useState("");
  const [preferensi, setPreferensi] = useState([]);
  const [waktu, setWaktu] = useState("");
  const [budget, setBudget] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (!lokasi || !waktu || preferensi.length < 1 || !budget || !jumlahOrang) {
      alert("Harap isi semua field terlebih dahulu!");
      return;
    }

    const mealplanData = {
      location: lokasi,
      foodType: preferensi[0],
      mealTime: waktu,
      budget: parseInt(budget.replace(/\D/g, ""), 10),
      numberOfPeople: parseInt(jumlahOrang, 10),
    };

    setLoading(true);

    try {
      const res = await fetch(
        "https://kingrayyy-smart-travel-ai.hf.space/food-recommendations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mealplanData),
        }
      );

      const data = await res.json();
      console.log("HASIL API:", data);

      if (!res.ok) {
        alert("Server error: " + JSON.stringify(data));
        setLoading(false);
        return;
      }

      localStorage.setItem("mealplanResult", JSON.stringify(data));
      navigate("/mealplanresult");
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil rekomendasi dari server!");
      setLoading(false);
    }
  };

  return (
    <div className="font-[Poppins] bg-white text-gray-800">
      <Navbar />

      {/* HERO */}
      <section className="text-center mt-32 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--green-700)]">
          Mealplan
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
          Lagi bingung mau makan apa? Tenang aja,<br />
          biarin AI yang cariin makanan paling cocok buat selera dan kantong kamu!
        </p>
      </section>

      {/* LOADING STATE */}
      {loading && (
        <div className="flex justify-center mt-16 mb-20">
          <CuteLoader />
        </div>
      )}

      {/* FORM */}
      {!loading && (
        <section className="max-w-4xl mx-auto mt-12 bg-[#FBF8F5] rounded-3xl shadow-md p-10">
          {/* Lokasi */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <i className="fa-solid fa-location-dot text-xl text-[var(--orange)]"></i>
              <h3 className="font-semibold text-lg">Pilih Lokasi yang diinginkan</h3>
            </div>

            <div className="flex space-x-3 overflow-x-auto py-2">
              {lokasiList.map((item) => (
                <button
                  key={item}
                  onClick={() => setLokasi(item)}
                  className={`px-6 py-2 rounded-full border font-medium transition
                    ${
                      lokasi === item
                        ? "bg-[var(--green-dark)] text-white border-[var(--green-dark)] shadow-md"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-[var(--green-dark)] hover:text-white"
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
              <i className="fa-solid fa-utensils text-xl text-[var(--orange)]"></i>
              <h3 className="font-semibold text-lg">Preferensi Makanan</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {preferensiList.map((item) => (
                <button
                  key={item}
                  onClick={() => togglePreferensi(item)}
                  className={`px-5 py-2 rounded-full border font-medium transition
                    ${
                      preferensi.includes(item)
                        ? "bg-[var(--green-dark)] text-white border-[var(--green-dark)] shadow-md"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-[var(--green-dark)] hover:text-white"
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
              <i className="fa-regular fa-clock text-xl text-[var(--orange)]"></i>
              <h3 className="font-semibold text-lg">Waktu Makan</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {waktuList.map((item) => (
                <button
                  key={item}
                  onClick={() => setWaktu(item)}
                  className={`px-5 py-2 rounded-full border font-medium transition
                    ${
                      waktu === item
                        ? "bg-[var(--green-dark)] text-white border-[var(--green-dark)] shadow-md"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-[var(--green-dark)] hover:text-white"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Budget & Orang */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <i className="fa-solid fa-money-bill-wave text-xl text-[var(--orange)]"></i>
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
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--green-dark)]"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <i className="fa-solid fa-user-plus text-xl text-[var(--orange)]"></i>
                <h3 className="font-semibold text-lg">Jumlah Orang</h3>
              </div>
              <input
                type="number"
                value={jumlahOrang}
                onChange={(e) => setJumlahOrang(e.target.value)}
                placeholder="Masukkan jumlah orang"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--green-dark)]"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-[var(--green-700)] text-white font-semibold py-3 px-10 rounded-full shadow-md hover:scale-[1.05] transition w-full md:w-1/2"
            >
              Temukan Makanan
            </button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Mealplan;
