const axios = require("axios");
const dotenv = require("dotenv");
const { Product, Nutrition } = require("../database");
dotenv.config();

async function getProductInfo(req, res) {
  try {
    const { barcode } = req.body;
    console.log("barcode: ", barcode);
    const cachedProduct = await Product.findOne({ where: { barcode } });

    if (cachedProduct) {
      console.log("cached product found");
      return res.status(200).json({ data: cachedProduct.productData });
    }
    const product = await axios.get(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    // console.log("product: ", product.data.product);

    await Product.create({
      barcode,
      productData: product.data.product,
    });
    console.log("product created");
    res.status(200).json({ data: product.data.product });
  } catch (error) {
    console.log(error);
  }
}

async function getNutritionData(req, res) {
  try {
    const ingredients = req.body.ingredients.ingredient;
    const weights = req.body.ingredients.weight;
    // console.log("ingredients: ", ingredients, "weights: ", weights);
    const appId = process.env.NUTRITION_DATA_APP_ID;
    const appKey = process.env.NUTRITION_DATA_APP_KEY;
    const formattedIngredient = `${weights} ${ingredients}`;
    const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(
      formattedIngredient
    )}`;
    const response = await axios.get(url);
    // console.log('response:', response.data);
    res.status(200).json({ data: response.data });
  } catch (error) {
    console.log("error");
    return null;
  }
}

module.exports = { getProductInfo, getNutritionData };
