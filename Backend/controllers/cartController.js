const Cart = require("../models/Cart");
const Book = require("../models/Book");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (!book.inStock) {
      return res.status(400).json({
        success: false,
        message: "Book is out of stock",
      });
    }

    const requestedQty = quantity || 1;

    if (requestedQty > book.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${book.stock} copies available`,
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [
          {
            book: bookId,
            quantity: requestedQty,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.book.toString() === bookId
      );

      if (existingItem) {
        const newQuantity =
          existingItem.quantity + requestedQty;

        if (newQuantity > book.stock) {
          return res.status(400).json({
            success: false,
            message: `Only ${book.stock} copies available`,
          });
        }

        existingItem.quantity = newQuantity;
      } else {
        cart.items.push({
          book: bookId,
          quantity: requestedQty,
        });
      }

      await cart.save();
    }

    const updatedCart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.book");

    res.status(200).json({
      success: true,
      message: "Book added to cart",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET CART
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.book");

    if (!cart) {
      return res.status(200).json({
        success: true,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE CART ITEM
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) =>
        item.book.toString() === req.params.bookId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Book not found in cart",
      });
    }

    const book = await Book.findById(
      req.params.bookId
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (!book.inStock) {
      return res.status(400).json({
        success: false,
        message: "Book is out of stock",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    if (quantity > book.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${book.stock} copies available`,
      });
    }

    item.quantity = quantity;

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.book");

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// REMOVE FROM CART
const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.book.toString() !== req.params.bookId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.book");

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CLEAR CART
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};