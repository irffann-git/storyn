const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { addAddress,
        getMyAddresses,
        updateAddress,
        deleteAddress,
        setDefaultAddress
 } = require("../controllers/addressController");
 const validate = require("../middleware/validationMiddleware");

 const {
  addressValidation,
} = require("../validators/addressValidators");

const router = express.Router();

router.post("/",protect,addressValidation,validate,addAddress);
router.get("/", protect, getMyAddresses);
router.put("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);
router.put("/:id/default",protect,setDefaultAddress);

module.exports = router;