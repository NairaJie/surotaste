import React from "react";
import warungBukris from "../assets/restaurants/warung-bukris.png";
import rawonPangat from "../assets/restaurants/rawon-pakpangat.jpg";
import penyetanAli from "../assets/restaurants/penyetan-bangali.jpg";
import lontongBalap from "../assets/restaurants/lontong-balap-rajawali.jpg";
import sotoHar from "../assets/restaurants/soto-ayam-cakhar.jpg";
import nasiKuning from "../assets/restaurants/nasi-kuning-ambon.jpg";

export default function RestaurantHome() {
  const restaurants = [
    { img: warungBukris, title: "Warung Ibu Kris", loc: "Jl. Kayoon No.46B", rating: "4.9" },
    { img: rawonPangat, title: "Rawon Pak Pangat", loc: "Jl. Keltintang Baru Sel.I No.15", rating: "4.8" },
    { img: penyetanAli, title: "Penyetan Bang Ali", loc: "Jl. Simpang Darmo Permai", rating: "4.7" },
    { img: lontongBalap, title: "Lontong Balap Rajawali", loc: "Jl. Kerembangan Timur", rating: "4.6" },
    { img: sotoHar, title: "Soto Ayam Cak Har", loc: "Jl. Dr. Ir. H. Soekarno No.220", rating: "4.8" },
    { img: nasiKuning, title: "Nasi Kuning Ambon", loc: "Jl. Raya Tenggilis Mejoyo", rating: "4.9" },
  ];

  return (
    <section className="py-20 px-12 lg:px-32 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-[var(--green-700)]">
          Featured Restaurant
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {restaurants.map((resto, index) => (
            <div
              key={index}
              className="relative bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:bg-[#fff5ea] transition-all duration-300"
            >
              <span className="absolute top-3 left-3 bg-[var(--orange)] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                ★ {resto.rating}
              </span>

              <img src={resto.img} alt={resto.title} className="w-full h-56 object-cover" />

              <div className="p-4 text-left">
                <h3 className="text-lg font-bold text-[var(--green-700)]">{resto.title}</h3>
                <p className="text-sm text-[var(--orange)] mt-1 flex items-center gap-1">
                  <i className="fa-solid fa-location-dot"></i> {resto.loc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
