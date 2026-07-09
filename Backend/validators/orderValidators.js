const { body } = require("express-validator");

const orderValidation = [
  body("addressId")
    .notEmpty()
    .withMessage("Address ID is required"),


];

module.exports = {
  orderValidation,
};