import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ChatBot from "./Chatbot";
import mascot from "../assets/mascotte.png"; // pakai ilustrasi lucu

export default function ChatBotPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fff8f3] to-[#f3fff5] px-6 text-center">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-green-700 text-2xl hover:text-green-900 transition"
        >
           <i className="fa-solid fa-arrow-left"></i>
        </button>

         


        {/* Header / Mascot */}
        <div className="flex flex-col items-center mb-8">
          <img src={mascot} alt="Cak Suroyo" className="w-32 h-32 mb-4 animate-bounce" />
          <h1 className="text-3xl font-bold text-green-700 mb-2">Halo, Foodie!</h1>
          <p className="text-gray-700 max-w-md">
            Cak Suroyo, AI Culinary Assistant-mu, siap membantu mencari makanan enak di Surabaya.
            Tapi sebelumnya, kamu harus login dulu untuk bisa mengobrol dengannya.
          </p>
        </div>

        {/* Login Button */}
        <button
          onClick={() => navigate("/signin", { state: { redirectTo: "/chatbot" } })}
          className="bg-green-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-green-800 transition-all"
        >
          Login Sekarang
        </button>

        {/* Optional Footer */}
        <p className="text-gray-500 mt-6 text-sm max-w-xs">
          Belum punya akun?{" "}
          <span 
            onClick={() => navigate("/signup")} 
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            Daftar di sini
          </span>
        </p>
      </div>
    );
  }

  // Jika user sudah login, tampilkan ChatBot
  return <ChatBot />;
}
