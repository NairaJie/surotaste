const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Culinary = sequelize.define("Culinary", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    restaurant_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    taste: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: "",
    },

    // FK
    foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Culinary;
