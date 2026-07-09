const express = require ("express");
const {
  submitContact,
  getContacts,
  getContactById,
  markContactAsRead,
  replyToContact,
  deleteContact,
} = require ("../controllers/contactController.js");
const { protect } = require ("../middleware/authMiddleware.js");
const admin = require("../middleware/adminMiddleware.js");

const router = express.Router();

// Public
router.post("/", submitContact);

// Admin only
router.get("/", protect, admin, getContacts);
router.put("/:id/read", protect, admin, markContactAsRead);
router.post("/:id/reply", protect, admin, replyToContact);
router.get("/:id", protect, admin, getContactById);
router.delete("/:id", protect, admin, deleteContact);

module.exports = router;