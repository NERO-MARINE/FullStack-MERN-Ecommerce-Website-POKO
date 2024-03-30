const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requird: true,
      unique: true,
    },

    email: {
      type: String,
      requird: true,
      unique: true,
    },

    password: {
      type: String,
      requird: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
