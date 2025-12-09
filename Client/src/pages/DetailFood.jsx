import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../index.css";

import rujakCingur from "../assets/foods/rujak-cingur2.jpg";
import penyetBukris from "../assets/foods/penyet-bukris2.jpg";
import nasiCampur from "../assets/foods/nasi-campur.jpg";
import nasiKrawu from "../assets/foods/nasi-krawu.jpg";
import nasiKuning from "../assets/foods/nasi-kuning.jpg";
import sotoCakHar2 from "../assets/foods/soto-cakhar2.jpg";
import lontongKupang from "../assets/foods/lontong-kupang.jpg";
import sateKlopo from "../assets/foods/sate-klopo.png";
import lontongBalap from "../assets/foods/lontong-balap.jpg";
import rawon from "../assets/foods/rawon.jpg";
import kikil from "../assets/foods/kikil.jpg";
import nasiCumi from "../assets/foods/nasi-cumi.jpg";
import tahuTek from "../assets/foods/tahu-tek.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const foodImages = {
    "Rujak Cingur": rujakCingur,
    "Penyetan": penyetBukris,
    "Nasi Campur": nasiCampur,
    "Nasi Krawu": nasiKrawu,
    "Nasi Kuning": nasiKuning,
    "Soto": sotoCakHar2,
    "Lontong Kupang": lontongKupang,
    "Sate Klopo": sateKlopo,
    "Lontong Balap": lontongBalap,
    "Rawon": rawon,
    "Kikil": kikil,
    "Nasi Cumi": nasiCumi,
    "Tahu Tek": tahuTek,
};

export default function DetailFood() {
    const { name } = useParams();
    const navigate = useNavigate();

    const [food, setFood] = useState(null);
    const [culinaryList, setCulinaryList] = useState([]);

    // 1) Fetch food by name
    useEffect(() => {
        fetch(`http://localhost:5050/api/foods/name/${name}`)
            .then(res => {
                if (!res.ok) throw new Error("Food not found");
                return res.json();
            })
            .then(data => setFood(data))
            .catch(err => console.log(err));
    }, [name]);

    // 2) Fetch culinary after food loaded (HOOK SELALU DI LUAR CONDITION)
    useEffect(() => {
        if (!food) return;

        fetch(`http://localhost:5050/api/culinary/food/${food.id}`)
            .then(res => res.json())
            .then(data => setCulinaryList(data))
            .catch(err => console.log(err));
    }, [food]);


    if (!food) return <div className="p-10">Loading...</div>;

    return (
        <div className="antialiased text-gray-800 bg-white">
            {/* NAVBAR */}
            <Navbar />

            {/* BACK BUTTON */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-28 left-10 text-green-700 text-3xl hover:text-green-900 transition"
            >
                <i className="fa-solid fa-arrow-left"></i>
            </button>

            <div className="max-w-7xl mx-auto px-12">

                {/* HERO SECTION */}
                <section className="pt-48 px-6 lg:px-20 py-28 bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

                        {/* TEKS KIRI */}
                        <div>
                            <h1 className="text-5xl font-bold text-green-700 mb-5">{food.name}</h1>


                            <div className="flex gap-2 mb-5">
                                <span className="bg-green-100 text-green-800 px-4 py-1.5 rounded-lg text-sm font-medium">
                                    {food.meals}
                                </span>
                                <span className="bg-orange-100 text-orange-400 px-4 py-1.5 rounded-lg text-sm font-medium">
                                    {food.category}
                                </span>
                            </div>

                            <p className="text-gray-700 leading-relaxed text-lg">
                                {food.description}
                            </p>
                        </div>

                        {/* GAMBAR KANAN */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-[580px] aspect-square">
                                <img
                                    src={foodImages[food.name] || rujakCingur}
                                    alt={food.name}
                                    className="w-full h-full object-cover rounded-2xl shadow-2xl border border-gray-100"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* HISTORY SECTION */}
                <section className="px-12 py-10">
                    <div className="bg-[#FBF8F5] rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-center text-2xl font-bold text-green-700 mb-4">
                            History
                        </h2>
                        <p className="text-gray-700 text-base leading-relaxed text-justify">
                            {food.history}
                        </p>
                    </div>
                </section>

                {/* VARIASI RUJAK CINGUR */}
                <section className="px-12 py-12">
                    <h2 className="text-2xl font-bold text-center text-green-700 mb-8">
                        Variasi {food.name}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {culinaryList.length === 0 ? (
                            <p className="col-span-4 text-center text-gray-500">
                                Belum ada variasi kuliner untuk makanan ini 😢
                            </p>
                        ) : (
                            culinaryList.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:bg-[#fff5ea] transition-all duration-300"
                                >
                                    <img
                                        src={`http://localhost:5050/${item.image}`}
                                        alt={item.name}
                                        className="w-full h-56 object-cover"
                                    />

                                    <div className="p-4">
                                        <h3 className="text-[var(--green-700)] font-semibold text-lg">
                                            {item.name}
                                        </h3>

                                        <p className="text-[var(--green-700)] text-sm">
                                            {item.restaurant_name}
                                        </p>

                                        <p className="text-[var(--orange)] font-bold mt-1">
                                            Rp{item.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>


            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}
