import {
  findSaved,
  createSaved,
  deleteSaved,
  getSavedByUser,
} from "../repositories/savedRestaurantRepo.js";

const saveRestaurant = async (req, res) => {
  const { userId, restaurantId } = req.body;

  const exists = await findSaved(userId, restaurantId);
  if (exists) {
    return res.status(400).json({ message: "Restaurant already saved" });
  }

  const saved = await createSaved(userId, restaurantId);
  res.json({ success: true, data: saved });
};

const unsaveRestaurant = async (req, res) => {
  const { userId, restaurantId } = req.params;

  const deleted = await deleteSaved(userId, restaurantId);
  res.json({ success: true, removed: deleted > 0 });
};

const getUserSavedRestaurants = async (req, res) => {
  const items = await getSavedByUser(req.params.userId);
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const mapped = items.map(s => ({
    id: s.id,
    restaurantId: s.restaurant.id,
    name: s.restaurant.name,
    image: `${baseUrl}/${s.restaurant.image}`,
    rating: s.restaurant.rating,
    region: s.restaurant.region,
  }));

  res.json(mapped);
};

const checkSavedStatus = async (req, res) => {
  const { userId, restaurantId } = req.params;
  const exists = await findSaved(userId, restaurantId);
  res.json({ saved: !!exists });
};

export default {
  saveRestaurant,
  unsaveRestaurant,
  getUserSavedRestaurants,
  checkSavedStatus,
};
