const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addToCart,
        getCart,
        updateCartItem,
        removeCartItem,
        clearCart
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.put("/:bookId", protect, updateCartItem);
router.delete("/clear", protect, clearCart);
router.delete("/:bookId", protect, removeCartItem);


module.exports = router;