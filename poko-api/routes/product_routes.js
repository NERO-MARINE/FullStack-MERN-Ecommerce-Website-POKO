const { Router } = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/productController");
const { verifyTokenAndAdmin } = require("../controllers/verifyToken");
const router = Router();

router.post("/", verifyTokenAndAdmin, createProduct);
router.put("/:id", verifyTokenAndAdmin, updateProduct);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/find/:id", getProduct);
router.get("/", getAllProducts);
module.exports = router;
