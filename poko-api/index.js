const express = require("express");
const mongoose = require("mongoose");
const user_routes = require("./routes/user_routes");
const product_routes = require("./routes/product_routes");
const cart_routes = require("./routes/cart_routes");
const order_routes = require("./routes/order_routes");
const auth_routes = require("./routes/auth_routes");
const dotenv = require("dotenv");
const app = express();

// configure .env
dotenv.config();
// use express json
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.use("/api/user", user_routes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running at port" + " " + process.env.PORT);
});
