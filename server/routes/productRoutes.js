const express = require("express");
const router = express.Router();
const { getProductInfo, getNutritionData } = require("../controllers/products");
const authenticateToken = require("../middleware/auth");

router.post("/scanner/productData", authenticateToken, getProductInfo);

router.post("/scanner/nutritionData", authenticateToken, getNutritionData);

module.exports = router;
