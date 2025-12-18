import SavedRestaurant from "../models/savedRestaurant.js";
import Restaurant from "../models/restaurant.js";

export const findSaved = (userId, restaurantId) => {
  return SavedRestaurant.findOne({
    where: { userId, restaurantId },
  });
};

export const createSaved = (userId, restaurantId) => {
  return SavedRestaurant.create({ userId, restaurantId });
};

export const deleteSaved = (userId, restaurantId) => {
  return SavedRestaurant.destroy({
    where: { userId, restaurantId },
  });
};

export const getSavedByUser = (userId) => {
  return SavedRestaurant.findAll({
    where: { userId },
    include: [
      {
        model: Restaurant,
        as: "restaurant",
      },
    ],
  });
};
