const Product = require("../models/product");
const mongoose = require("mongoose");

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Internal Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid user id" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid user id" });
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }
    res.status(200).json({ message: "product has been deleted" });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid user id" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

const getAllProducts = async (req, res) => {
  const qNew = req.query.new; //query string to fetch newest products
  const qCategory = req.query.category; //query string to fetch products by category
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      // when finding check if qCategory(value from the query) in the categories array of any Product in our collection
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      // if no query, get all products
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
