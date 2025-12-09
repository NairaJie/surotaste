import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


// IMAGE IMPORTS
import bukrisHero from "../assets/foods/warungbukris.png";


// Reviews
import userPic from "../assets/usercomment.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MenuGrid from "../components/MenuGrid";
import MenuModal from "../components/MenuModal";


export default function DetailRestaurant() {
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);
  const [toast, setToast] = useState("");

  const [menus, setMenus] = useState([]);

  const [saved, setSaved] = useState(false);


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

  const handleSave = async () => {
    if (!user) {
      alert("Login dulu ya!");
      return;
    }

    const url = saved
      ? `http://localhost:5050/api/saved/${user.id}/${restaurant.id}`
      : "http://localhost:5050/api/saved";

    const method = saved ? "DELETE" : "POST";

    const body = saved
      ? null
      : JSON.stringify({
        userId: user.id,
        restaurantId: restaurant.id,
      });

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (res.ok) {
      setSaved(!saved);
      setToast(saved ? "Removed from saved ❤️" : "Restaurant saved! ❤️");

      setTimeout(() => setToast(""), 2000);
    }
  };



  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5050/api/restaurants/${id}`)
      .then((res) => res.json())
      .then((data) => setRestaurant(data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (!restaurant) return;

    fetch(`http://localhost:5050/api/restaurants/${restaurant.id}/menus`)
      .then(res => res.json())
      .then(data => setMenus(data))
      .catch(err => console.error("Error load menus:", err));
  }, [restaurant]);


  useEffect(() => {
    if (!user || !restaurant) return;

    fetch(`http://localhost:5050/api/saved/check/${user.id}/${restaurant.id}`)
      .then(res => res.json())
      .then(data => setSaved(data.saved));
  }, [user, restaurant]);


  if (!restaurant) return <div className="p-6">Loading...</div>;





  return (
    <div className="antialiased text-gray-800 bg-white">

      {/* NAVBAR (JANGAN DIUBAH) */}
      <Navbar />

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-28 left-10 text-green-700 text-3xl hover:text-green-900 transition"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      {/* === CONTENT START === */}

      <div className="max-w-7xl mx-auto px-12">


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
                <button
                  onClick={handleSave}
                  className={`px-4 py-2 border rounded-xl flex items-center gap-2 transition ${saved ? "bg-red-100 border-red-300" : ""
                    }`}
                >
                  <i
                    className={`fa-heart text-xl transition-transform ${saved ? "fa-solid text-red-600 scale-110" : "fa-regular"
                      }`}
                  />
                  {saved ? "Saved" : "Save"}
                </button>


                <button className="px-4 py-2 border rounded-xl flex items-center gap-2">
                  <i className="fa-solid fa-share-nodes" /> Share
                </button>

                {/* Instagram */}
                {restaurant.instagram && (
                  <a
                    href={`https://${restaurant.instagram.replace("https://", "").replace("http://", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border rounded-xl"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                )}


                {/* WhatsApp */}
                <a
                  href={restaurant.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border rounded-xl"
                >
                  <i className="fab fa-whatsapp" />
                </a>
              </div>

            </div>


            {/* RIGHT */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">

              {/* FOTO UTAMA */}
              <div className="w-[420px] h-[420px] rounded-2xl shadow-xl overflow-hidden">
                <img
                  src={restaurant.image}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* THUMBNAILS */}

            </div>
          </div>
        </section>

        {/* OUR MENU */}
        <section className="px-12 py-12">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-8">
            Our Menu
          </h2>

          <MenuGrid
            menuItems={menus}
            onSelect={(menu) => {
              setSelected(menu);
              setModalOpen(true);
            }}
          />
        </section>

        <MenuModal
          open={modalOpen}
          item={selected}
          onClose={() => setModalOpen(false)}
        />


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



      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-700 text-white px-4 py-3 rounded-xl shadow-lg animate-bounce z-50">
          {toast}
        </div>
      )}


      {/* FOOTER (JANGAN DIUBAH) */}
      <Footer />

    </div>
  );
}