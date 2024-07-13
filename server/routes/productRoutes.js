const express = require("express");
const router = express.Router();
const { getProductInfo, getNutritionData } = require("../controllers/products");

router.post("/scanner/productData", getProductInfo);

router.post("/scanner/nutritionData", getNutritionData);

module.exports = router;
