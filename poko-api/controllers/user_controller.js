const User = require("../models/user");
const mongoose = require("mongoose");
const { encryptPassword } = require("./auth_controller");

/**
 * @swagger
 * /api/user/:id:
 *   put:
 *     summary: update a users infomation
 *     description: Only the owner of the account or admin can update it. The "verifyTokenAndAuthorization" middleware in the user_routes file enforces this. if user also wants to change their password when they make updates, we need to encrypt it as well before saving the changes
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       description: User data to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Updated user data.
 *       '401':
 *         description: Unauthorized - User is not authorized to perform this action.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid user id" });
    }

    // if user also wants to change their password when they make updates, we need to encrypt it as well.
    if (req.body.password) {
      req.body.password = encryptPassword(req.body.password);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

/**
 * @swagger
 * /api/user/:id:
 *   delete:
 *     summary: deletes a user from the collection
 *     description: Only the owner of the account or admin can delete the account. The "verifyTokenAndAuthorization" middleware in the user_routes file enforces this.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       '200':
 *         description: Updated user data.
 *       '401':
 *         description: Unauthorized - User is not authorized to perform this action.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */

const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid user id" });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
};

/**
 * @swagger
 * /api/user/find/:id:
 *   get:
 *     summary: gets a single user from the collection
 *     description: Only admins can do this. The "verifyTokenAndAdmin" middleware in the user_routes file enforces this.
 *     responses:
 *       '200':
 *         description: Updated user data.
 *       '401':
 *         description: Unauthorized - User is not authorized to perform this action.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "invalid user id" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // extract password from user before sending response
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: gets all users from the collection. When the query string "newUsers" is added, it fetches only the latest 5 users
 *     description: Only admins can do this. The "verifyTokenAndAdmin" middleware in the user_routes file enforces this.
 *     responses:
 *       '200':
 *         description: Updated user data.
 *       '401':
 *         description: Unauthorized - User is not authorized to perform this action.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */

const getAllUsers = async (req, res) => {
  const query = req.query.newUsers; //query string to fetch newest users
  try {
    const users = query
      ? await User.find().sort({ createdAt: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

/**
 * @swagger
 * /api/user/stats:
 *   get:
 *     summary:  retrieves user statistics by counting the number of users created in each month over the past year
 *     description: Only admins can do this. The "verifyTokenAndAdmin" middleware in the user_routes file enforces this.
 *     responses:
 *       '200':
 *         description: Updated user data.
 *       '401':
 *         description: Unauthorized - User is not authorized to perform this action.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    // see comments at the bottom for more details about mongodb aggregation pipeline
    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      }, // match documents with a createdAt field greater than or equal to the date from last year

      {
        $project: { month: { $month: "$createdAt" } }, // take the month value inside createdAt
      },

      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        }, // counting the number of users created in each month over the past year.
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

/*
The JavaScript function "getUserStats" retrieves user statistics using MongoDB's aggregation pipeline. Here's what each part of the pipeline does:

$match: This stage filters documents to include only those created after the specified date. It's using the $gte operator to match documents with a createdAt field greater than or equal to the date from last year.

$project: This stage reshapes the documents to include only the month of the createdAt field. It extracts the month using the $month operator and creates a new field called month in each document.

$group: This stage groups the documents by the month field (which was created in the previous stage). For each distinct month, it calculates the total number of documents using the $sum operator.

So, in summary, this aggregation pipeline retrieves user statistics by counting the number of users created in each month over the past year.

- The aggregation pipeline in MongoDB is a framework for data processing that allows you to transform documents in a collection through a series of stages.
*/

module.exports = {
  updateUser,
  DeleteUser,
  getUser,
  getAllUsers,
  getUserStats,
};

/*

General Knowledge:

The aggregation pipeline in MongoDB is a framework for data processing that allows you to transform documents in a collection through a series of stages.

In MongoDB, $match and $gte are both operators used within the aggregation framework.

$match: This operator filters documents based on specified criteria. It works similarly to the find() method in regular queries but is used within the aggregation pipeline to filter documents before processing further stages.

$gte: This operator stands for "greater than or equal to". It's used to specify a condition where a field's value must be greater than or equal to a specified value.

Here's a brief example of how they might be used together in an aggregation pipeline:
///
db.collection.aggregate([
  {
    $match: {
      age: { $gte: 18 } // Filters documents where the "age" field is greater than or equal to 18
    }
  }
]);
This aggregation pipeline stage would filter out documents from the collection where the "age" field's value is less than 18, effectively selecting only documents where the age is 18 or older.
////

- The $project stage in the MongoDB aggregation pipeline is used to reshape documents by including, excluding, or transforming fields.

- The $group stage in MongoDB's aggregation pipeline is used to group documents together based on certain criteria and perform aggregate functions on them. It's typically used for tasks like calculating totals, averages, maximum or minimum values, or counting occurrences of specific values within a group. Here's a basic example of how $group can be used:

db.sales.aggregate([
  {
    $group: {
      _id: "$product",        // Group by the "product" field
      totalSales: { $sum: "$quantity" },  // Calculate the total quantity sold for each product
      averagePrice: { $avg: "$price" }    // Calculate the average price for each product
    }
  }
]);


*/
