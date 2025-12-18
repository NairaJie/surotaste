import {
  getMenuByRestaurant,
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../repositories/menuRepo.js";

const getMenusByRestaurantId = async (req, res) => {
  const menus = await getMenuByRestaurant(req.params.id);
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const mapped = menus.map(m => ({
    ...m,
    image: m.image ? `${baseUrl}/${m.image}` : null,
  }));

  res.json(mapped);
};

const getAll = async (req, res) => {
  const menus = await getAllMenus();
  res.json(menus);
};

const getById = async (req, res) => {
  const menu = await getMenuById(req.params.id);
  if (!menu) {
    return res.status(404).json({ message: "Menu not found" });
  }
  res.json(menu);
};

const create = async (req, res) => {
  const id = await createMenu(req.body);
  res.status(201).json({ success: true, id });
};

const update = async (req, res) => {
  await updateMenu(req.params.id, req.body);
  res.json({ success: true, message: "Updated" });
};

const remove = async (req, res) => {
  await deleteMenu(req.params.id);
  res.json({ success: true, message: "Deleted" });
};

export default {
  getMenusByRestaurantId,
  getAll,
  getById,
  create,
  update,
  remove,
};
