require("dotenv").config();

const connectDB = require("../config/db");
const Product = require("../models/product.model");
const products = require("./product.data");

const seedProducts = async () => {
  try {
    await connectDB();

    console.log("Clearing existing products...");
    await Product.deleteMany();

    console.log("Inserting products...");
    await Product.insertMany(products);

    console.log("Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
};

seedProducts();
