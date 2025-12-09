// src/components/FoodCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// === FOODS IMAGES ===
import rujakCingur from "../assets/foods/rujak-cingur2.jpg";
import penyetBukris from "../assets/foods/penyet-bukris2.jpg";
import nasiCampur from "../assets/foods/nasi-campur.jpg";
import nasiKrawu from "../assets/foods/nasi-krawu.jpg";
import nasiKuning from "../assets/foods/nasi-kuning.jpg";
import sotoCakHar2 from "../assets/foods/soto-cakhar2.jpg";
import lontongKupang from "../assets/foods/lontong-kupang.jpg";
import sateKlopo from "../assets/foods/sate-klopo.png";
import lontongBalap from "../assets/foods/lontong-balap.jpg";
import rawon from "../assets/foods/rawon.jpg";
import kikil from "../assets/foods/kikil.jpg";
import nasiCumi from "../assets/foods/nasi-cumi.jpg";
import tahuTek from "../assets/foods/tahu-tek.jpg";

const FoodCard = () => {
  const navigate = useNavigate();

  const foods = [
    { name: "Nasi Kuning", img: nasiKuning },
    { name: "Soto", img: sotoCakHar2 },
    { name: "Rawon", img: rawon },
    { name: "Penyetan", img: penyetBukris },
    { name: "Nasi Campur", img: nasiCampur },
    { name: "Nasi Krawu", img: nasiKrawu },
    { name: "Lontong Kupang", img: lontongKupang },
    { name: "Sate Klopo", img: sateKlopo },
    { name: "Lontong Balap", img: lontongBalap },
    { name: "Kikil", img: kikil },
    { name: "Nasi Cumi", img: nasiCumi },
    { name: "Tahu Tek", img: tahuTek },
    { name: "Rujak Cingur", img: rujakCingur },
  ];

  return (
    <section className="px-8 py-14 bg-white text-center">
      <h2 className="text-3xl font-bold text-green-800 mb-8">Search By Food</h2>

      <div className="overflow-x-auto scroll-x pb-4 px-4">
        <div className="flex space-x-8 w-max">
          {foods.map((food, i) => (
            <div
              key={i}
              className="flex-shrink-0 text-center cursor-pointer"
              onClick={() =>
                navigate(`/detailfood/${encodeURIComponent(food.name)}`)
              }
            >
              <img
                src={food.img}
                alt={food.name}
                className="w-28 h-28 object-cover rounded-full border-4 border-green-700 mx-auto mb-2"
              />
              <p>{food.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodCard;
