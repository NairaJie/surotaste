import {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantByName,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../repositories/restaurantRepo.js";

const getRestaurants = async (req, res) => {
  const data = await getAllRestaurants();
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const mapped = data.map(r => ({
    ...r,
    image: r.image ? `${baseUrl}/${r.image}` : null,
  }));

  res.json(mapped);
};

const getRestaurantDetail = async (req, res) => {
  const restaurant = await getRestaurantById(req.params.id);
  if (!restaurant) {
    return res.status(404).json({ message: "Not found" });
  }

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  res.json({
    ...restaurant,
    image: restaurant.image ? `${baseUrl}/${restaurant.image}` : null,
  });
};

const getByName = async (req, res) => {
  const restaurant = await getRestaurantByName(req.params.name);
  if (!restaurant) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(restaurant);
};

const create = async (req, res) => {
  const id = await createRestaurant(req.body);
  res.status(201).json({ success: true, id });
};

const update = async (req, res) => {
  await updateRestaurant(req.params.id, req.body);
  res.json({ success: true, message: "Updated" });
};

const remove = async (req, res) => {
  await deleteRestaurant(req.params.id);
  res.json({ success: true, message: "Deleted" });
};

export default {
  getRestaurants,
  getRestaurantDetail,
  getByName,
  create,
  update,
  remove,
};
