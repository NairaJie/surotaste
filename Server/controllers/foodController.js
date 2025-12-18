import {
  getAllFoods,
  createFood,
  getFoodByName,
  getFoodById,
  updateFood,
  deleteFood,
} from "../repositories/foodRepo.js";

const getFoods = async (req, res) => {
  const foods = await getAllFoods();
  res.json(foods);
};

const createFoodController = async (req, res) => {
  const id = await createFood(req.body);
  res.status(201).json({ success: true, id });
};

const getFoodByNameController = async (req, res) => {
  const food = await getFoodByName(req.params.name);
  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }
  res.json(food);
};

const getFoodByIdController = async (req, res) => {
  const food = await getFoodById(req.params.id);
  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }
  res.json(food);
};

const updateFoodController = async (req, res) => {
  await updateFood(req.params.id, req.body);
  res.json({ success: true, message: "Updated" });
};

const deleteFoodController = async (req, res) => {
  await deleteFood(req.params.id);
  res.json({ success: true, message: "Deleted" });
};

export default {
  getFoods,
  createFood: createFoodController,
  getFoodByName: getFoodByNameController,
  getFoodById: getFoodByIdController,
  updateFood: updateFoodController,
  deleteFood: deleteFoodController,
};
