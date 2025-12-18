import React, { useState, useEffect, useRef } from "react";
import mascot from "../assets/mascotte.png";
import { IoSend, IoArrowBack } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ChatBot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  const suggestions = [
    "Cariin makanan enak dengan harga terjangkau dong!",
    "Rekomendasikan makanan yang dekat dari pusat kota Surabaya!",
    "Aku lagi laper, menu apa yang cocok buat mood-ku hari ini?",
  ];

  const SuggestionChips = ({ onClick }) => (
  <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-3">
    {suggestions.map((text, i) => (
      <button
        key={i}
        onClick={() => onClick(text)}
        className="bg-[#fff8ee] text-green-800 border border-green-200 
        px-4 py-2 rounded-full whitespace-nowrap text-sm
        hover:bg-green-200 transition active:scale-95"
      >
        {text}
      </button>
    ))}
  </div>
);


  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("https://kingrayyy-smart-travel-ai.hf.space/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.response || data.message || JSON.stringify(data) },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Bot gagal merespons. Coba lagi ya!" },
      ]);
    }

    setIsLoading(false);
  };

  // Auto scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">

      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IoArrowBack
              onClick={() => navigate("/")}
              className="text-2xl cursor-pointer text-green-700 hover:text-green-900 transition"
            />
            <img src={mascot} alt="Cak Suroyo" className="w-10 h-10" />
            <h1 className="text-xl font-semibold">Cak Suroyo</h1>
          </div>

          <FiHelpCircle
            className="text-2xl opacity-70 cursor-pointer"
            onClick={() => setIsHelpOpen(true)}
          />
        </div>
      </div>

      {/* HELP MODAL */}
      {isHelpOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-3">Apa yang bisa dilakukan Cak Suroyo?</h2>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>• Mencarikan rekomendasi makanan sesuai preferensi kamu</li>
              <li>• Menampilkan kuliner paling dekat dengan lokasimu</li>
              <li>• Menyesuaikan pilihan makanan sesuai mood & selera</li>
              <li>• Memberikan rekomendasi harga termurah atau terbaik</li>
              <li>• Menjelaskan info makanan, rasa, rating, dan lokasi</li>
            </ul>

            <button
              onClick={() => setIsHelpOpen(false)}
              className="mt-6 w-full bg-green-700 text-white py-2 rounded-xl"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      {/* CHAT AREA */}
      <div
        ref={chatRef}
        className={`flex-1 overflow-y-auto ${messages.length === 0 ? "pt-52" : "pt-28 pb-48"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* START SCREEN */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl leading-relaxed mb-8">
                Hi! I’m <span className="text-green-700 font-semibold">Cak Suroyo</span>, <br />
                your AI culinary assistant is ready.
              </h2>

              <div className="max-w-2xl w-full">
                <div className="mt-12 mb-8">
  <SuggestionChips onClick={sendMessage} />
</div>


                <div className="flex items-center gap-3 bg-white border rounded-full px-6 py-4 shadow-lg">
                  <input
                    type="text"
                    placeholder="Ketik pesan anda disini"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                    className="flex-1 outline-none text-lg"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    className="bg-green-700 p-4 rounded-full text-white text-xl"
                  >
                    <IoSend />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CHAT BUBBLES */}
          {messages.length > 0 && (
            <>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`my-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`px-5 py-3 rounded-2xl max-w-md shadow text-sm ${msg.sender === "user"
                        ? "bg-green-700 text-white rounded-br-none"
                        : "bg-[#fff8ee] text-gray-800 rounded-bl-none"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="my-4 flex justify-start">
                  <div className="bg-[#fff8ee] px-5 py-3 rounded-2xl rounded-bl-none shadow max-w-xs flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-green-700 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-green-700 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                      <span className="w-2 h-2 bg-green-700 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* CHAT INPUT */}
      {/* CHAT INPUT */}
      {messages.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full shadow-2xl z-4">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">

            {/* SUGGESTION PROMPTS */}
            <SuggestionChips onClick={sendMessage} />


            {/* INPUT BOX */}
            <div className="flex items-center gap-3 bg-white border rounded-full px-6 py-3 shadow">
              <input
                type="text"
                placeholder="Ketik pesan anda disini"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                className="flex-1 outline-none text-lg"
              />
              <button
                onClick={() => sendMessage(input)}
                className="bg-green-700 p-4 rounded-full text-white text-xl"
              >
                <IoSend />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
