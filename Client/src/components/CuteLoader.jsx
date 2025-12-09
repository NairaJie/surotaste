import React from "react";
import foodIcon from "../assets/mascotte.png"; // bebas ganti icon makanan lucu

export default function CuteLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <img
        src={foodIcon}
        className="w-28 h-28 loader-food"
        alt="loading cute"
      />

      <p className="mt-4 text-lg font-semibold text-green-800 animate-pulse">
        Sebentar yaa..
      </p>
    </div>
  );
}
