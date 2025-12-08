// utils/renameImage.js
export const renameImage = (modelName, record, filename) => {
  const clean = filename.replace(/\s+/g, "-").toLowerCase();
  const timestamp = Date.now();

  const safe = (str, fallback) =>
    (str ? str.toString().replace(/\s+/g, "-").toLowerCase() : fallback);

  const name = safe(record.params.name, modelName.toLowerCase());
  const restaurantName = safe(record.params._restaurantName, "restaurant");

  switch (modelName) {
    case "User":
      return `users/${name}-${timestamp}-${clean}`;
    case "Restaurant":
      return `restaurants/${name}-${timestamp}-${clean}`;
    case "Food":
      return `foods/${name}-${timestamp}-${clean}`;
    case "Menu":
      return `menus/${restaurantName}-${name}-${timestamp}-${clean}`;
    case "Culinary":
      return `culinary/${restaurantName}-${name}-${timestamp}-${clean}`;
    default:
      return `${modelName.toLowerCase()}/${timestamp}-${clean}`;
  }
};
