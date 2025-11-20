const { Culinary, Food, Restaurant } = require("../models");

// GET ALL
exports.getAllCulinary = async (req, res) => {
    try {
        const data = await Culinary.findAll({
            include: [
                { model: Food, as: "food" },
                { model: Restaurant, as: "restaurant" }
            ]
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET BY ID
exports.getCulinaryById = async (req, res) => {
    try {
        const item = await Culinary.findByPk(req.params.id, {
            include: [
                { model: Food, as: "food" },
                { model: Restaurant, as: "restaurant" }
            ]
        });

        if (!item) return res.status(404).json({ message: "Not found" });

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET BY FOOD ID
exports.getByFoodId = async (req, res) => {
    try {
        const items = await Culinary.findAll({
            where: { foodId: req.params.foodId },
            include: [{ model: Restaurant, as: "restaurant" }]
        });

        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE
exports.createCulinary = async (req, res) => {
    try {
        const newItem = await Culinary.create(req.body);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE
exports.updateCulinary = async (req, res) => {
    try {
        await Culinary.update(req.body, {
            where: { id: req.params.id }
        });

        res.json({ message: "Updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
exports.deleteCulinary = async (req, res) => {
    try {
        await Culinary.destroy({
            where: { id: req.params.id }
        });

        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
