const { Router } = require("express");
const {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllUsersCart,
} = require("../controllers/cart_controller");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

const router = Router();

router.post("/", verifyToken, createCart);
router.put("/:id", verifyTokenAndAuthorization, updateCart);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);
router.get("/", verifyTokenAndAdmin, getAllUsersCart);

module.exports = router;
