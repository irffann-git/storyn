const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Address = require("../models/Address");
const Book = require("../models/Book");


//  CREATE ORDER  

const createOrder = async (req, res) => {
  try {
    const { addressId } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.book");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let address;

    if (addressId) {
      address = await Address.findOne({
        _id: addressId,
        user: req.user._id,
      });
    } else {
      address = await Address.findOne({
        user: req.user._id,
        isDefault: true,
      });
    }

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Shipping address not found",
      });
    }

    for (const item of cart.items) {
  const book = item.book;

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  if (!book.inStock) {
    return res.status(400).json({
      success: false,
      message: `${book.title} is out of stock`,
    });
  }

  if (book.stock < item.quantity) {
    return res.status(400).json({
      success: false,
      message: `Only ${book.stock} copies available for ${book.title}`,
    });
  }
}

const orderItems = cart.items.map((item) => ({
  book: item.book._id,
  title: item.book.title,
  coverImage: item.book.image,
  price: item.book.price,
  quantity: item.quantity,
}));

    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const shippingAddress = {
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
    };

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,

      paymentMethod: "Mock",
      paymentStatus: "Pending",
      isPaid: false,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};







// MARK ORDER PAID

const markOrderPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const isOwner =
      order.user.toString() === req.user._id.toString();

    if (!isOwner && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (order.isPaid) {
      return res.status(400).json({
        success: false,
        message: "Order already paid",
      });
    }

    for (const item of order.orderItems) {
  const book = await Book.findById(item.book);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: `${item.title} not found`,
    });
  }

  if (book.stock < item.quantity) {
    return res.status(400).json({
      success: false,
      message: `Only ${book.stock} copies available for ${book.title}`,
    });
  }
}


for (const item of order.orderItems) {
  const book = await Book.findById(item.book);

  book.stock -= item.quantity;

  await book.save();
}
    order.isPaid = true;
    order.paymentStatus = "Paid";
    order.paidAt = new Date();

    order.transactionId =
      "TXN_" + Date.now();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment successful",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// MARK PAYMENT FAILED

const markPaymentFailed = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = "Failed";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment failed",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET PAYMENT STATUS

const getPaymentStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      paymentStatus: order.paymentStatus,
      isPaid: order.isPaid,
      paidAt: order.paidAt,
      transactionId: order.transactionId,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ORDER

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};  


// GET SINGLE ORDER


const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const isOwner =
      order.user._id.toString() === req.user._id.toString();

    if (!isOwner && !req.user.isAdmin) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET  ALL ORDER  FOR ADMIN

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//  UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validation goes here
    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// CANCEL ORDER


const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const isOwner =
      order.user.toString() === req.user._id.toString();

    if (!isOwner && !req.user.isAdmin) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    if (
      order.orderStatus === "Shipped" ||
      order.orderStatus === "Delivered"
    ) {
      return res.status(400).json({
        message: `Cannot cancel ${order.orderStatus} order`,
      });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        message: "Order already cancelled",
      });
    }

    // Restore inventory if order was paid
    if (order.isPaid) {
      for (const item of order.orderItems) {
        const book = await Book.findById(item.book);

        if (book) {
          book.stock += item.quantity;

          await book.save();
        }
      }
    }

    order.orderStatus = "Cancelled";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// REORDER 


const reorderOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const isOwner =
      order.user.toString() === req.user._id.toString();

    if (!isOwner && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    for (const item of order.orderItems) {
      const book = await Book.findById(item.book);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: `${item.title} not found`,
        });
      }

      if (!book.inStock) {
        return res.status(400).json({
          success: false,
          message: `${item.title} is out of stock`,
        });
      }

      if (book.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${book.stock} copies available for ${item.title}`,
        });
      }

      const existingItem = cart.items.find(
        (cartItem) =>
          cartItem.book.toString() === item.book.toString()
      );

      if (existingItem) {
        const newQuantity =
          existingItem.quantity + item.quantity;

        if (newQuantity > book.stock) {
          return res.status(400).json({
            success: false,
            message: `Only ${book.stock} copies available for ${item.title}`,
          });
        }

        existingItem.quantity = newQuantity;
      } else {
        cart.items.push({
          book: item.book,
          quantity: item.quantity,
        });
      }
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Items added to cart successfully",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// GET ORDER STATES



const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      orderStatus: "Pending",
    });

    const processingOrders = await Order.countDocuments({
      orderStatus: "Processing",
    });

    const shippedOrders = await Order.countDocuments({
      orderStatus: "Shipped",
    });

    const deliveredOrders = await Order.countDocuments({
      orderStatus: "Delivered",
    });

    const cancelledOrders = await Order.countDocuments({
      orderStatus: "Cancelled",
    });

    res.status(200).json({
      success: true,
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// REVENUE ANALYSIS

const getRevenueAnalytics = async (req, res) => {
  try {
    const analytics = await Order.aggregate([
      {
        $match: {
          orderStatus: {
            $ne: "Cancelled",
          },
        },
      },
      {
  $group: {
    _id: null,
    totalRevenue: { $sum: "$totalPrice" },
    totalOrders: { $sum: 1 },
    averageOrderValue: { $avg: "$totalPrice" },
    highestOrderValue: { $max: "$totalPrice" },
    lowestOrderValue: { $min: "$totalPrice" }
  }
},
    ]);

    const result = analytics[0] || {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
    };

    res.status(200).json({
      success: true,
      totalRevenue: result.totalRevenue,
      totalOrders: result.totalOrders,
      averageOrderValue: Number(
        result.averageOrderValue?.toFixed(2) || 0
      ),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// MONTHLY SALES REPORT

const getMonthlySalesReport = async (req, res) => {
  try {
    const report = await Order.aggregate([
      {
        $match: {
          orderStatus: {
            $ne: "Cancelled",
          },
        },
      },
      {
  $group: {
    _id: {
      year: { $year: "$createdAt" },
      month: { $month: "$createdAt" }
    },
    totalSales: { $sum: "$totalPrice" },
    totalOrders: { $sum: 1 }
  }
},
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const monthNames = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedReport = report.map((item) => ({
      month: monthNames[item._id.month],
      totalSales: item.totalSales,
      totalOrders: item.totalOrders,
    }));

    res.status(200).json({
      success: true,
      salesReport: formattedReport,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// RECENTLY ORDER

const getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: recentOrders.length,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports = {
  createOrder,
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
};