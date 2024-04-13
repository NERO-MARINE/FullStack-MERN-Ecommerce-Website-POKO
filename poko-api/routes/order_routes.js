const { Router } = require("express");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllUsersOrder,
  getMonthlyIncome,
} = require("../controllers/order_controller");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../controllers/verifyToken");

const router = Router();

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrder);
router.get("/", verifyTokenAndAdmin, getAllUsersOrder);
// get monthly income
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

module.exports = router;
