import {
  getAllCulinary,
  getCulinaryById,
  getByFoodId,
  getCulinaryByRestaurant,
  createCulinary,
  updateCulinary,
  deleteCulinary,
} from "../repositories/culinaryRepo.js";

// GET ALL
const getAll = async (req, res) => {
  const data = await getAllCulinary();
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const mapped = data.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    taste: item.taste,
    category: item.category,

    image: item.image ? `${baseUrl}/${item.image}` : null,

    food: {
      name: item.food_name,
      category: item.food_category
    },

    restaurant: {
      id: item.restaurant_id,
      name: item.restaurant_name,
      image: item.restaurant_image
        ? `${baseUrl}/restaurants/${item.restaurant_image}`
        : null
    }
  }));

  res.json(mapped);
};

// GET BY ID
const getById = async (req, res) => {
  const item = await getCulinaryById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Culinary not found" });
  }
  res.json(item);
};

// GET BY FOOD
const getByFood = async (req, res) => {
  const data = await getByFoodId(req.params.foodId);
  res.json(data);
};

// GET BY RESTAURANT (route lama tetap hidup)
const getByRestaurantId = async (req, res) => {
  const data = await getCulinaryByRestaurant(req.params.id);
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const mapped = data.map(item => ({
    ...item,
    image: item.image
      ? `${baseUrl}/culinary/${item.image}`
      : null,
  }));

  res.json(mapped);
};

// CREATE
const create = async (req, res) => {
  const id = await createCulinary(req.body);
  res.status(201).json({ success: true, id });
};

// UPDATE
const update = async (req, res) => {
  await updateCulinary(req.params.id, req.body);
  res.json({ success: true });
};

// DELETE
const remove = async (req, res) => {
  await deleteCulinary(req.params.id);
  res.json({ success: true });
};

export default {
  getAll,
  getById,
  getByFood,
  getByRestaurantId,
  create,
  update,
  remove,
};
