const { Router } = require("express");
const {
  updateUser,
  DeleteUser,
  getUser,
  getAllUsers,
  getUserStats,
} = require("../controllers/user_controller");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

const router = Router();

router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAuthorization, DeleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/stats", verifyTokenAndAdmin, getUserStats);

module.exports = router;
