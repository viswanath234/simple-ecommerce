const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files - serve images with proper headers
const path = require("path");
const publicPath = path.join(__dirname, "..", "public");
console.log("Serving static files from:", publicPath);

// Serve static files with cache control
app.use(
  express.static(publicPath, {
    maxAge: "1h",
    etag: false,
  })
);

// Allow direct access to images
app.get("/images/*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=3600");
  next();
});

// Routes
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/auth", authRoutes);

// Error handling middleware
const errorMiddleware = require("./middlewares/error.middleware");
app.use(errorMiddleware);

module.exports = app;
