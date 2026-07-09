const mongoose = require("mongoose");
const { CATEGORY_STRUCTURE } = require("../constants/categories");

const CATEGORY_OPTIONS = Object.keys(CATEGORY_STRUCTURE);
const ALL_SUBCATEGORIES = Object.values(CATEGORY_STRUCTURE).flat();

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: CATEGORY_OPTIONS,
    },
    subcategory: {
      type: String,
      required: true,
      trim: true,
      enum: ALL_SUBCATEGORIES,
      validate: {
        validator: function (value) {
          const allowed = CATEGORY_STRUCTURE[this.category] || [];
          return allowed.includes(value);
        },
        message: (props) =>
          `${props.value} is not a valid subcategory for this category`,
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      enum: [0, 5, 10, 15, 20, 25, 30, 40, 45, 50, 90],
      default: 0,
    },
    discountedPrice: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: "",
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      enum: [
        "Bestseller",
        "Trending",
        "New Arrival",
        "Popular",
        "Limited Edition",
      ],
      default: [],
    },
  },
  { timestamps: true }
);

bookSchema.pre("save", function () {
  if (this.isModified("stock")) {
    this.inStock = this.stock > 0;
  }
  if (this.isModified("price") || this.isModified("discount")) {
    this.discountedPrice =
      this.discount > 0
        ? Math.round(this.price - (this.price * this.discount) / 100)
        : this.price;
  }
});

module.exports = mongoose.model("Book", bookSchema);