import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../index.css";


export default function DetailFood() {
    const { foodName } = useParams(); // ambil nama dari URL
    const { state } = useLocation(); // ambil data dari navigate()
    const navigate = useNavigate();

    const food = state;

    return (
        <div className="antialiased text-gray-800 bg-white">
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

            {/* BACK BUTTON */}
            <button
                onClick={() => navigate(-1)}
                className="text-green-700 text-lg mb-6 mt-20"
            >
                ← Back
            </button>

            {/* HERO SECTION */}
            <section className="px-6 lg:px-20 py-16 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                    {/* TEKS KIRI */}
                    <div>
                        <h1 className="text-5xl font-bold text-green-700 mb-5">
                            Rujak Cingur
                        </h1>

                        <div className="flex gap-2 mb-5">
                            <span className="bg-green-100 text-green-800 px-4 py-1.5 rounded-lg text-sm font-medium">
                                Breakfast
                            </span>
                            <span
                                className="px-4 py-1.5 rounded-lg text-sm font-medium"
                                style={{
                                    backgroundColor: "var(--badge-bg)",
                                    color: "var(--orange)",
                                }}
                            >
                                Aneka Lontong
                            </span>
                        </div>

                        <p className="text-gray-700 leading-relaxed text-lg">
                            Rujak Cingur adalah hidangan khas Surabaya yang terkenal dengan
                            perpaduan rasa manis, pedas, gurih, dan segar. Nama “cingur”
                            berarti moncong sapi — bahan utama yang direbus hingga empuk,
                            lalu disajikan bersama irisan buah-buahan segar seperti mangga
                            muda, nanas, mentimun, serta sayuran rebus seperti kangkung dan
                            taoge. Semua bahan ini disiram dengan bumbu petis udang kental
                            yang kaya rasa. Perpaduan unik antara daging, buah, dan bumbu
                            petis menjadikan rujak cingur sebagai ikon kuliner Jawa Timur
                            yang autentik dan menggoda selera.
                        </p>
                    </div>

                    {/* GAMBAR KANAN */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[700px] h-[400px] sm:h-[480px] md:h-[540px] lg:h-[580px]">
                            <img
                                src="../assets/foods/default-cingur.png"
                                alt="Rujak Cingur"
                                className="w-full h-full object-cover rounded-2xl shadow-2xl border border-gray-100"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* HISTORY SECTION */}
            <section className="pl-12 pr-12 lg:pl-12 lg:pr-12 py-10">
                <div className="bg-[#FBF8F5] rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-center text-2xl font-bold text-green-700 mb-4">
                        History
                    </h2>
                    <p className="text-gray-700 text-base leading-relaxed text-justify">
                        Rujak cingur telah ada sejak masa kolonial dan berkembang di
                        Surabaya sebagai sajian rakyat yang merakyat. Dahulu, hidangan ini
                        hanya disajikan dalam acara-acara tradisional atau kenduri, namun
                        kini bisa ditemukan di berbagai warung hingga restoran modern.
                        Keistimewaannya terletak pada bumbu petis khas Jawa Timur yang
                        menjadi warisan turun-temurun. Resepnya mungkin sederhana, tetapi
                        cita rasa dan maknanya mencerminkan kekayaan budaya kuliner
                        Nusantara.
                    </p>
                </div>
            </section>

            <section className="pl-12 pr-12 lg:pl-12 lg:pr-12 py-12">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-8">
                    Rujak Cingur
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        {
                            img: "../assets/foods/cingur-wagiti.jpg",
                            title: "Rujak Cingur Bu Wagiti",
                            price: "Rp.25,000",
                        },
                        {
                            img: "../assets/foods/cingur-bbm.jpg",
                            title: "Rujak Cingur BBM",
                            price: "Rp.25,000",
                        },
                        {
                            img: "../assets/foods/cingur-genteng.jpg",
                            title: "Rujak Cingur Genteng",
                            price: "Rp.25,000",
                        },
                        {
                            img: "../assets/foods/cingur-delta.jpg",
                            title: "Rujak Cingur Delta",
                            price: "Rp.25,000",
                        },
                    ].map((item) => (
                        <div key={item.title} className="card bg-[#FBF8F5] rounded-2xl shadow-md overflow-hidden">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="card-title text-[var(--green-700)] font-semibold text-lg">
                                    {item.title}
                                </h3>
                                <p className="card-price text-[var(--orange)] font-bold">
                                    {item.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="text-gray-200 text-center py-10 bg-[var(--green-dark)] mt-10">
                <ul className="flex justify-center space-x-10 mb-8 text-gray-300 text-lg">
                    {["Home", "Culinary", "About", "Mealplan"].map((item) => (
                        <li key={item}>
                            <a href="#" className="hover:text-white transition">{item}</a>
                        </li>
                    ))}
                </ul>
                <img src={logo} alt="Logo" className="w-36 mx-auto mb-4" />
                <p className="text-sm text-gray-300">© 2025 | SuroTaste. All rights reserved.</p>
            </footer>

            {food ? (
                <>
                    <h1 className="text-4xl font-bold text-green-700 mb-6">{food.name}</h1>
                    <img
                        src={food.img}
                        alt={food.name}
                        className="w-full max-w-lg h-auto rounded-2xl shadow-lg mb-6"
                    />
                    <p className="text-lg text-gray-700 leading-relaxed">
                        {food.description || "Deskripsi makanan belum tersedia."}
                    </p>
                </>
            ) : (
                <p className="text-center text-gray-500 mt-20">
                    Tidak ada data untuk <strong>{foodName}</strong>.
                </p>
            )}

        </div>
    );
}