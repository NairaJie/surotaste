import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-r from-[#fff8f3] to-[#f3fff5] overflow-hidden">

      
      {/* Tombol Back */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 text-green-700 text-3xl hover:text-green-900 transition"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      {/* Card Login */}
      <div className="bg-white w-full max-w-lg p-10 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Sign In to your account
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Enter your email and password to log in
        </p>

        {/* EMAIL */}
        <label className="text-gray-700 font-medium">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mt-2 mb-6 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none"
        />

        {/* PASSWORD */}
        <label className="text-gray-700 font-medium">Password</label>
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full mt-2 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
          
        </div>

        <button className="text-sm text-green-700 mt-2 mb-5 hover:underline">
          Forgot password?
        </button>

        {/* BUTTON SIGN IN */}
        <button className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition">
          Sign In
        </button>

        {/* Garis */}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">Or Sign In with</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* GOOGLE SIGN IN */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Continue with Google
        </button>

        {/* FOOTER */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-700 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
