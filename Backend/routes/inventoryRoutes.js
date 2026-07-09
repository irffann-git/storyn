const express = require("express");

const {
  getInventory,
  getLowStockBooks,
  getOutOfStockBooks,
  updateBookStock,
} = require("../controllers/inventoryController");

const {protect} = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", protect, adminOnly, getInventory);
router.get("/low-stock",protect,adminOnly,getLowStockBooks);
router.get("/out-of-stock",protect,adminOnly,getOutOfStockBooks);
router.put("/:id/stock",protect,adminOnly,updateBookStock);



module.exports = router;