require("dotenv").config();

const connectDB = require("../config/db");
const Product = require("../models/product.model");
const products = require("./product.data");

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    process.exit();
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
};

seedProducts();
