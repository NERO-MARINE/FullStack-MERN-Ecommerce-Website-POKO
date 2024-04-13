const express = require("express");
// swagger doc
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// swager doc
const mongoose = require("mongoose");
const user_routes = require("./routes/user_routes");
const product_routes = require("./routes/product_routes");
const cart_routes = require("./routes/cart_routes");
const order_routes = require("./routes/order_routes");
const auth_routes = require("./routes/auth_routes");
const stripRoute = require("./routes/stripe");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

// swagger doc set up ends
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce Api",
      version: "1.0.0",
      description: "Ecommerce website",
    },
  },
  apis: ["./controllers/*.js"], // Path to the controllers directory
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//now visit: http://localhost:5000/api-docs/

// swagger doc set up ends

// set up cors
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://poko.onrender.com",
    "https://pokoadmin.onrender.com",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

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
app.use("/api/product", product_routes);
app.use("/api/auth", auth_routes);
app.use("/api/cart", cart_routes);
app.use("/api/order", order_routes);
app.use("/api/checkout", stripRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running at port" + " " + process.env.PORT);
});
