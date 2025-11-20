const express = require("express");
const router = express.Router();
const culinaryController = require("../controllers/culinaryController");

router.get("/", culinaryController.getAllCulinary);
router.get("/:id", culinaryController.getCulinaryById);
router.get("/food/:foodId", culinaryController.getByFoodId);

router.post("/", culinaryController.createCulinary);
router.put("/:id", culinaryController.updateCulinary);
router.delete("/:id", culinaryController.deleteCulinary);

module.exports = router;
