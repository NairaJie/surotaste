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

  const sendMessage = async (text) => {
  if (!text.trim()) return;

  // Tambahkan pesan user ke UI
  const newMsg = { sender: "user", text };
  setMessages((prev) => [...prev, newMsg]);
  setInput("");

  try {
    // Panggil API
    const res = await fetch("https://kingrayyy-smart-travel-ai.hf.space/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,   // <— WAJIB! supaya gak error "Field required"
      }),
    });

    const data = await res.json();

    // Ambil jawaban bot
    const botReply = {
      sender: "bot",
      text: data.response || data.message || JSON.stringify(data),
    };

    setMessages((prev) => [...prev, botReply]);
  } catch (err) {
    console.error("Chat API error:", err);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "⚠️ Bot gagal merespons. Coba lagi ya!" },
    ]);
  }
};

  return (
  <div className="w-full min-h-screen bg-white flex flex-col">
      
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IoArrowBack className="text-2xl cursor-pointer" />
            <img src={mascot} alt="Cak Suroyo" className="w-10 h-10" />
            <h1 className="text-xl font-semibold">Cak Suroyo</h1>
          </div>
          <FiHelpCircle className="text-2xl opacity-70" />
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto pt-28 pb-40">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
          
          {/* SCREEN AWAL */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center mt-32 text-center">
              <h2 className="text-3xl leading-relaxed">
                Hi! I’m <span className="text-green-700 font-semibold">Cak Suroyo</span>, <br />
                your Ai culinary assistant is ready.
              </h2>
            </div>
          )}

          {/* CHAT BUBBLES */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-4 flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-5 py-3 rounded-2xl max-w-md shadow 
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

          {/* QUICK REPLIES */}
          {/* {messages.length > 0 &&
            messages[messages.length - 1].sender === "bot" && (
              <div className="flex flex-wrap gap-3 mt-6">
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
            )} */}

        </div>
      </div>

      {/* INPUT */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-4">
          <div className="flex items-center gap-3 bg-white border rounded-full px-6 py-3 shadow">
            <input
              type="text"
              placeholder="Ketik pesan anda disini"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              className="flex-1 outline-none"
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
  </div>
);

    
}
