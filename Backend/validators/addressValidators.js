const { body } = require("express-validator");

const addressValidation = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required"),

  body("addressLine1")
    .notEmpty()
    .withMessage("Address Line 1 is required"),

  body("city")
    .notEmpty()
    .withMessage("City is required"),

  body("state")
    .notEmpty()
    .withMessage("State is required"),

  body("postalCode")
    .notEmpty()
    .withMessage("Postal code is required"),

  body("country")
    .notEmpty()
    .withMessage("Country is required"),
];

module.exports = {
  addressValidation,
};