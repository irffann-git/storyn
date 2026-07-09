const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },

        title: {
          type: String,
          required: true,
        },

        coverImage: {
          type: String,
          default: "",
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      addressLine1: {
        type: String,
        required: true,
      },

      addressLine2: {
        type: String,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },
    },

    paymentMethod: {
      type: String,
      enum: ["Mock", "COD", "Razorpay"],
      default: "Mock",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    transactionId: {
      type: String,
      default: null,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);