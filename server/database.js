const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "mydatabase.sqlite", 
});


const Product = sequelize.define("Product", {
  barcode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  productData: {
    type: DataTypes.JSON, 
    allowNull: true,
  },
});

const Nutrition = sequelize.define("Nutrition", {
  ingredients: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nutritionData: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

async function setupDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync(); 
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { Product, Nutrition, User, setupDatabase };
