import React from "react";

export default function MenuModal({ open, item, onClose }) {
  if (!open || !item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-8 w-[92%] max-w-3xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-3xl text-gray-500 hover:text-black"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden">
            <img
              src={item.image}
              className="w-full h-full object-cover"
              alt={item.name || item.title}
            />
          </div>

          <div className="flex-1">
            <h3 className="text-3xl font-bold text-green-700">{item.name || item.title}</h3>
            <p className="text-[var(--orange)] font-bold text-xl mt-3">
              Rp{Number(item.price).toLocaleString()}
            </p>
            {item.description && (
              <p className="text-gray-600 mt-4 leading-relaxed">{item.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
