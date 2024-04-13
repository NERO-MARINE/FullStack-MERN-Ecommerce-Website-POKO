const Order = require("../models/order");
const mongoose = require("mongoose");

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Internal Server error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid user id" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid user id" });
    }
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order has been deleted" });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
};

const getUserOrder = async (req, res) => {
  try {
    const id = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid user id" });
    }
    const userOrders = await Cart.find({ _id: id });
    if (!userOrders) {
      return res.status(404).json({ error: "User Orders not found" });
    }

    res.status(200).json(userOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

const getAllUsersOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

const getMonthlyIncome = async (req, res) => {
  try {
    const date = new Date(); // example March 2024
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); // example Feb 2024
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    ); // example January 2024

    // mongodb aggregation pipeline. See users controller for explanation
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: { $toDate: "$createdAt" } }, // Convert string to date
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Internal server error" });
  }
};

/*

getMonthlyIncome:

1) Date Calculation:

The code starts by creating a Date object representing the current date (date).
It then calculates the dates for the last month (lastMonth) and the month before that (previousMonth) using the setMonth method of the Date object. For example, if the current date is March 2024, lastMonth would be February 2024, and previousMonth would be January 2024.

2) MongoDB Aggregation Pipeline:

The code then uses Mongoose's aggregate method to perform an aggregation query on the Order collection in the MongoDB database.
The aggregation pipeline consists of several stages:
$match: Filters the orders based on the createdAt field, selecting only those orders created after the previousMonth.
$project: Projects a new field month representing the month extracted from the createdAt field, and sales representing the amount field of each order.
$group: Groups the orders by the month field and calculates the total sales (total) for each month.
*/

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllUsersOrder,
  getMonthlyIncome,
};
