import SavedRestaurant from "../models/savedRestaurant.js";

export const saveRestaurant = async (req, res) => {
  const { userId, restaurantId } = req.body;

  try {
    const exists = await SavedRestaurant.findOne({
      where: { userId, restaurantId },
    });

    if (exists) {
      return res.status(400).json({ message: "Restaurant already saved" });
    }

    const saved = await SavedRestaurant.create({ userId, restaurantId });
    res.json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const unsaveRestaurant = async (req, res) => {
  const { userId, restaurantId } = req.params;

  try {
    const deleted = await SavedRestaurant.destroy({
      where: { userId, restaurantId },
    });

    res.json({ success: true, removed: deleted > 0 });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getUserSavedRestaurants = async (req, res) => {
  const { userId } = req.params;

  try {
    const saved = await SavedRestaurant.findAll({
      where: { userId },
      include: [
        {
          model: Restaurant,
          as: "restaurant",
        },
      ],
    });

    // FORMAT DATA BIAR FE PAHAM
    const formatted = saved.map((item) => ({
      id: item.id,                        // ID saved
      restaurantId: item.restaurant.id,   // ID restaurant asli (buat navigate)
      name: item.restaurant.name,
      image: `http://localhost:5050/restaurants/${item.restaurant.image}`, // fix path
      rating: item.restaurant.rating,
      region: item.restaurant.region,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};


export const checkSavedStatus = async (req, res) => {
  const { userId, restaurantId } = req.params;

  try {
    const exists = await SavedRestaurant.findOne({
      where: { userId, restaurantId },
    });

    res.json({ saved: !!exists });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
