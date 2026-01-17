const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false }
);

const pricingSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const mediaSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    pricing: pricingSchema,

    rating: ratingSchema,

    media: mediaSchema,

    flags: {
      sponsored: {
        type: Boolean,
        default: false,
      },
    },

    delivery: {
      text: {
        type: String,
      },
    },

    colors: [
      {
        name: {
          type: String,
          required: true,
        },
        hex: {
          type: String,
          required: true,
        },
        available: {
          type: Boolean,
          default: true,
        },
      },
    ],

    models: [
      {
        name: {
          type: String,
          required: true,
        },
        available: {
          type: Boolean,
          default: true,
        },
      },
    ],

    sizes: [
      {
        name: {
          type: String,
          required: true,
        },
        available: {
          type: Boolean,
          default: true,
        },
      },
    ],

    inventory: {
      stock: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
