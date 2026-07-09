const express = require("express");

const router = express.Router();

const { createOrder,
        markOrderPaid,
        markPaymentFailed,
        getPaymentStatus,
        getMyOrders,
        getOrderById,
        getAllOrders,
        updateOrderStatus,
        cancelOrder,
        reorderOrder,
        getOrderStats,
        getRevenueAnalytics,
        getMonthlySalesReport,
        getRecentOrders,
 } = require("../controllers/orderController");
 const validate = require("../middleware/validationMiddleware");

 const {
  orderValidation,
} = require("../validators/orderValidators");

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
router.post("/", protect, orderValidation, validate, createOrder);

// Static GET routes first
router.get("/my-orders", protect, getMyOrders);
router.get("/stats", protect, adminOnly, getOrderStats);
router.get("/recent", protect, adminOnly, getRecentOrders);
router.get("/analytics/revenue", protect, adminOnly, getRevenueAnalytics);
router.get("/analytics/monthly-sales", protect, adminOnly, getMonthlySalesReport);
router.get("/", protect, adminOnly, getAllOrders);

// Param routes after
router.get("/:id", protect, getOrderById);
router.get("/:id/payment-status", protect, getPaymentStatus);

router.put("/:id/pay", protect, markOrderPaid);
router.put("/:id/payment-failed", protect, markPaymentFailed);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.put("/:id/cancel", protect, cancelOrder);

router.post("/:id/reorder", protect, reorderOrder);

module.exports = router;