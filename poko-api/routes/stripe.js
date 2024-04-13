const { Router } = require("express");
const { makePayment } = require("../controllers/stripe_controller");
const router = Router();

router.post("/payment", makePayment);

module.exports = router;
