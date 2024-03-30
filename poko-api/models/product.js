const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requird: true,
      unique: true,
    },

    desc: {
      type: String,
      requird: true,
    },

    img: {
      type: String,
      requird: true,
    },

    categories: {
      type: Array,
    },

    size: {
      type: String,
    },

    color: {
      type: String,
    },

    price: {
      type: String,
      requird: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
