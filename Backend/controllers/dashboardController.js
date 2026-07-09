const User = require("../models/User");
const Book = require("../models/Book");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalBooks = await Book.countDocuments();

    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    const lowStockBooks = await Book.find({
      stock: { $lte: 5 },
    }).select("title author stock price");

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalBooks,
        totalOrders,
        totalRevenue,
        recentOrders,
        lowStockBooks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





module.exports = {
    getDashboardStats
}