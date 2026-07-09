const Book = require("../models/Book");

// GET /api/inventory
const getInventory = async (req, res) => {
  try {
    const books = await Book.find().select(
      "title author stock inStock"
    );

    res.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/inventory/low-stock
const getLowStockBooks = async (req, res) => {
  try {
    const books = await Book.find({
      stock: { $lte: 5 },
    }).select("title author stock");

    res.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/inventory/out-of-stock
const getOutOfStockBooks = async (req, res) => {
  try {
    const books = await Book.find({
      stock: 0,
    }).select("title author stock");

    res.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /api/inventory/:id/stock
const updateBookStock = async (req, res) => {
  try {
    const { stock } = req.body || {};

    if (stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Stock is required",
      });
    }

    if (stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    book.stock = stock;

    await book.save();

    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getInventory,
  getLowStockBooks,
  getOutOfStockBooks,
  updateBookStock,
};