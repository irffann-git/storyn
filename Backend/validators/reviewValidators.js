const { body } = require("express-validator");

const reviewValidation = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("comment")
    .notEmpty()
    .withMessage("Comment is required"),
];

module.exports = {
  reviewValidation,
};