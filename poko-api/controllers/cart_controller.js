const Cart = require("../models/cart");
const mongoose = require("mongoose");

const createCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);

    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Internal Server error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid user id" });
    }

    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(updatedCart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

const deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid user id" });
    }
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      return res.status(404).json({ error: "cart not found" });
    }
    res.status(200).json({ message: "cart has been deleted" });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
};

const getUserCart = async (req, res) => {
  try {
    const id = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid user id" });
    }
    const userCart = await Cart.findOne({ _id: id });
    if (!userCart) {
      return res.status(404).json({ error: "User Cart not found" });
    }

    res.status(200).json(userCart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

const getAllUsersCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllUsersCart,
};
