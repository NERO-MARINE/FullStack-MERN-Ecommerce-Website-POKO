const User = require("../models/user");
const CryptoJS = require("crypto-js");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// Function to Encrypt User Password
const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString();
};

// Function to Decrypt User Password
const decryptPassword = (password) => {
  return CryptoJS.AES.decrypt(password, process.env.PASS_SECRET).toString(
    CryptoJS.enc.Utf8
  );
};

// Regular expression for password complexity
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All field must be field" });
    }

    const emailIsExisting = await User.findOne({ email: email });
    if (emailIsExisting) {
      return res.status(401).json({ error: "Email is already in use" });
    }

    const usernameIsExisting = await User.findOne({ username: username });
    if (usernameIsExisting) {
      return res.status(401).json({ error: "username is already in use" });
    }

    if (!validator.isEmail(email)) {
      return res.status(401).json({ error: "email is not valid" });
    }

    if (!validator.matches(password, PASSWORD_REGEX)) {
      return res.status(401).json({
        error:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    const newUser = new User({
      username: username,
      email: email,
      password: encryptPassword(password),
    });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All field must be field" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("wrong credentials");
    }

    const decryptedPassword = decryptPassword(user.password);
    const isPasswordCorrect = decryptedPassword === password;

    if (!isPasswordCorrect) {
      return res.status(401).json("wrong credentials");
    }

    // create access token with jwt
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // extract password from user before sending response
    const { password: userPassword, isAdmin, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  register,
  login,
  encryptPassword,
};
