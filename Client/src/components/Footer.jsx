import React from "react";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="text-gray-200 text-center py-10 bg-[var(--green-dark)] mt-10">
      <ul className="flex justify-center space-x-10 mb-8 text-gray-300 text-lg">
        {["Home", "Culinary", "About", "Mealplan"].map((item) => (
          <li key={item}>
            <a href="#" className="hover:text-white transition">
              {item}
            </a>
          </li>
        ))}
      </ul>

      <img src={logo} alt="Logo" className="w-36 mx-auto mb-4" />
      <p className="text-sm text-gray-300">
        © 2025 | SuroTaste. All rights reserved.
      </p>
    </footer>
  );
}
