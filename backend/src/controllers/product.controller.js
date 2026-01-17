const Product = require("../models/product.model");
const { apiResponse } = require("../utils/apiResponse");

exports.getProducts = async (req, res) => {
  try {
    const {
      search = "",
      sort = "latest",
      page = 1,
      limit = 8,
      category,
      minPrice,
      maxPrice,
    } = req.query;

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query["pricing.price"] = {};
      if (minPrice) query["pricing.price"].$gte = Number(minPrice);
      if (maxPrice) query["pricing.price"].$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price_low") sortOption = { "pricing.price": 1 };
    if (sort === "price_high") sortOption = { "pricing.price": -1 };
    if (sort === "rating") sortOption = { "rating.value": -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(query).sort(sortOption).skip(skip).limit(Number(limit)),
      Product.countDocuments(query),
    ]);

    const transformedProducts = products.map((product) => ({
      ...product.toObject(),
      price: product.pricing?.price,
      mrp: product.pricing?.mrp,
      discount: product.pricing?.discountPercent,
      images:
        product.media?.images?.length > 0
          ? product.media.images
          : [product.media?.thumbnail],
      rating: product.rating?.value,
      reviews: product.rating?.count,
      reviewsCount: product.rating?.count,
      deliveryText: product.delivery?.text,
      sponsored: product.flags?.sponsored,
      colors: product.colors || [],
      models: product.models || [],
      sizes: product.sizes || [],
    }));

    return res.status(200).json(
      apiResponse(200, {
        products: transformedProducts,
        total,
        page: Number(page),
        limit: Number(limit),
      })
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const transformedProduct = {
      ...product.toObject(),
      price: product.pricing?.price,
      mrp: product.pricing?.mrp,
      discount: product.pricing?.discountPercent,
      images:
        product.media?.images?.length > 0
          ? product.media.images
          : [product.media?.thumbnail],
      rating: product.rating?.value,
      reviews: product.rating?.count,
      reviewsCount: product.rating?.count,
      deliveryText: product.delivery?.text,
      sponsored: product.flags?.sponsored,
      colors: product.colors || [],
      models: product.models || [],
      sizes: product.sizes || [],
    };

    return res.status(200).json(apiResponse(200, transformedProduct));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res
      .status(201)
      .json(apiResponse(201, product, "Product created successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json(apiResponse(200, product, "Product updated successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json(apiResponse(200, null, "Product deleted successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
