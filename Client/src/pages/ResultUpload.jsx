import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CuteLoader from "../components/CuteLoader";

export default function ResultUpload() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const file = state?.file;

  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (!file) return;

    const fetchPrediction = async () => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(
          "https://kingrayyy-backend-fooddetection.hf.space/predict",
          { method: "POST", body: formData }
        );

        const data = await res.json();
        console.log("API RESPONSE:", data);

        // ambil sesuai format API kamu
        setPrediction({
          label: data.predicted_class,
          confidence: data.confidence,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrediction();
  }, [file]);

  if (!file) {
    return (
      <div className="p-10 text-center">
        <p className="text-xl">Tidak ada foto yang diupload</p>
        <button onClick={() => navigate(-1)} className="text-green-600 mt-4">
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="antialiased text-gray-800 bg-white">
      <Navbar />

      <div className="pt-36 text-center">
        <h1 className="text-4xl font-extrabold text-green-800">
          Hasil Deteksi Makanan
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Kami menemukan makanan berikut berdasarkan foto Anda
        </p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="absolute top-28 left-10 text-green-700 text-3xl"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      <div className="pt-12 pb-20 flex justify-center">
        <div className="bg-[#f8f5ee] p-8 rounded-[30px] shadow-sm max-w-xl text-center">

          {/* Preview image */}
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded"
            className="w-96 h-96 object-cover rounded-3xl"
          />

          {/* Prediction */}
          {!prediction ? (
            <div className="mt-6">
              <CuteLoader />
            </div>
          ) : (
            <>
              <h2 className="text-4xl font-bold text-green-800 mt-6">
                {prediction.label}
              </h2>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
