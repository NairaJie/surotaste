import React, { useState } from "react";
import mascot from "../assets/mascotte.png"; 
import { IoSend } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const regions = [
    "East Surabaya",
    "West Surabaya",
    "North Surabaya",
    "South Surabaya",
    "Central Surabaya",
  ];

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const newMsg = { sender: "user", text };
    setMessages((prev) => [...prev, newMsg]);

    // Fake bot reply (bisa kamu ganti backend)
    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: `Okay neng X, Please tell me the spesific area you will be visiting in surabaya!`,
      };
      setMessages((prev) => [...prev, botReply]);
    }, 600);

    setInput("");
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-5 py-3 shadow">
        <div className="flex items-center gap-3">
          <IoArrowBack className="text-xl" />
          <img src={mascot} alt="Cak Suroyo" className="w-10 h-10" />
          <h1 className="text-xl font-semibold">Cak Suroyo</h1>
        </div>
        <FiHelpCircle className="text-xl opacity-70" />
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-6 pb-28">

        {/* =============== SCREEN AWAL =============== */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-28 animate-fadeIn">
            <h2 className="text-2xl text-center leading-relaxed">
              Hi! I’m <span className="text-green-700 font-semibold">Cak Suroyo</span>,
              <br />
              your Ai culinary assistant is ready.
            </h2>
          </div>
        )}

        {/* =============== BUBBLE CHAT =============== */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-3 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-sm shadow 
                ${
                  msg.sender === "user"
                    ? "bg-green-700 text-white rounded-br-none"
                    : "bg-[#fff8ee] text-gray-800 rounded-bl-none"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* QUICK REPLIES (only after bot message) */}
        {messages.length > 0 &&
          messages[messages.length - 1].sender === "bot" && (
            <div className="flex flex-wrap gap-3 mt-4">
              {regions.map((r, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(r)}
                  className="bg-green-100 text-green-800 px-4 py-2 rounded-xl hover:bg-green-200 transition"
                >
                  {r}
                </button>
              ))}
            </div>
          )}
      </div>

      {/* INPUT BOX */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-2xl">
        <div className="flex items-center gap-3 bg-white border rounded-full px-5 py-3 shadow">
          <input
            type="text"
            placeholder="Ketik pesan anda disini"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 outline-none"
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />

          <button
            onClick={() => sendMessage(input)}
            className="bg-green-700 p-3 rounded-full text-white"
          >
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
}
