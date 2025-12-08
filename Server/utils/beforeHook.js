// utils/beforeHook.js
import Restaurant from "../models/restaurant.js";

export const beforeHook = async (req) => {
  if (req.payload?.restaurantId) {
    const rest = await Restaurant.findByPk(req.payload.restaurantId);
    req.payload._restaurantName = rest?.name || "restaurant";
  }

  return req;
};
