const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  (req, res) => {
    console.log("Upload route reached");
    console.log(req.file);

    res.status(200).json({
      success: true,
      image: req.file.path,
    });
  }
);

module.exports = router;