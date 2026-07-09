const Book = require("../models/Book");


// GET ALL BOOKS

const getBooks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1000000;
    

    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { author: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};

    const category = req.query.category
      ? { category: { $regex: `^${req.query.category}$`, $options: "i" } }
      : {};

    const subcategory = req.query.subcategory
      ? { subcategory: { $regex: `^${req.query.subcategory}$`, $options: "i" } }
      : {};

    const query = { ...keyword, ...category, ...subcategory };

    const totalBooks = await Book.countDocuments(query);
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// GET SINGLE BOOK

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({ success: true, book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// CREATE BOOK

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// UPDATE BOOK

const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    Object.assign(book, req.body);
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// DELETE BOOK

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// FEATURED BOOKS

const getFeaturedBooks = async (req, res) => {
  try {
    const books = await Book.find({ featured: true });

    res.status(200).json({ success: true, count: books.length, books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// LATEST BOOKS

const getLatestBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({ success: true, count: books.length, books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// TRENDING BOOKS

const getTrendingBooks = async (req, res) => {
  try {
    const books = await Book.find({ tags: "Trending" }).limit(10);

    res.status(200).json({ success: true, count: books.length, books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET REVIEWS

const getBookReviews = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .select("reviews")
      .populate("reviews.user", "name");

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    // Newest first
    const reviews = [...book.reviews].reverse();

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// CREATE REVIEW

const createBookReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    const alreadyReviewed = book.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this book",
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    };

    book.reviews.push(review);
    book.numReviews = book.reviews.length;
    book.rating =
      book.reviews.reduce((acc, item) => acc + item.rating, 0) /
      book.reviews.length;

    await book.save();

    const savedReview = book.reviews[book.reviews.length - 1];

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: {
        _id: savedReview._id,
        user: { _id: req.user._id, name: req.user.name },
        rating: savedReview.rating,
        comment: savedReview.comment,
        createdAt: savedReview.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// UPDATE REVIEW

const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    const review = book.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    review.rating = Number(rating);
    review.comment = comment;

    book.rating =
      book.reviews.reduce((acc, item) => acc + item.rating, 0) /
      book.reviews.length;

    await book.save();

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// DELETE REVIEW

const deleteReview = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    const review = book.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    review.deleteOne();

    book.numReviews = book.reviews.length;
    book.rating =
      book.numReviews === 0
        ? 0
        : book.reviews.reduce((acc, item) => acc + item.rating, 0) /
          book.numReviews;

    await book.save();

    res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
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
};