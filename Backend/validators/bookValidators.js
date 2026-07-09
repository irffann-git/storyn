const { body } = require("express-validator");
const { CATEGORY_STRUCTURE } = require("../constants/categories");

const CATEGORY_OPTIONS = Object.keys(CATEGORY_STRUCTURE);
const ALL_SUBCATEGORIES = Object.values(CATEGORY_STRUCTURE).flat();

const createBookValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be greater than 0"),
  body("stock").isInt({ min: 0 }).withMessage("Stock cannot be negative"),

  body("category")
    .notEmpty().withMessage("Category is required")
    .isIn(CATEGORY_OPTIONS).withMessage("Invalid category"),

  body("subcategory")
    .notEmpty().withMessage("Subcategory is required")
    .isIn(ALL_SUBCATEGORIES).withMessage("Invalid subcategory")
    .custom((value, { req }) => {
      const allowed = CATEGORY_STRUCTURE[req.body.category] || [];
      if (!allowed.includes(value)) {
        throw new Error("Subcategory does not belong to the selected category");
      }
      return true;
    }),

  body("tags").optional().isArray().withMessage("Tags must be an array"),

  body("discount")
    .optional()
    .isIn([0, 5, 10, 15, 20, 25, 30, 40, 45, 50, 90])
    .withMessage("Invalid discount value"),
];

module.exports = { createBookValidation };