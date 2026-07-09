const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const validate = require("../middleware/validationMiddleware");

const { createBookValidation } = require("../validators/bookValidators");
const { reviewValidation } = require("../validators/reviewValidators");

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getFeaturedBooks,
  getLatestBooks,
  getTrendingBooks,
  getBookReviews,
  createBookReview,
  updateReview,
  deleteReview,
} = require("../controllers/bookController");

const router = express.Router();

// ─── Books ────────────────────────────────────────────────────
router.get("/", getBooks);
router.get("/featured", getFeaturedBooks);
router.get("/latest", getLatestBooks);
router.get("/trending", getTrendingBooks);

// ─── Reviews ──────────────────────────────────────────────────
router.get("/:id/reviews", getBookReviews);
router.post("/:id/reviews", protect, reviewValidation, validate, createBookReview);
router.put("/:bookId/reviews/:reviewId", protect, updateReview);
router.delete("/:bookId/reviews/:reviewId", protect, deleteReview);

// ─── Single Book (must be after static routes) ────────────────
router.get("/:id", getBookById);
router.post("/", protect, adminOnly, createBookValidation, validate, createBook);
router.put("/:id", protect, adminOnly, updateBook);
router.delete("/:id", protect, adminOnly, deleteBook);

module.exports = router;