const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("Decoded Token:", decoded);

      const user = await User.findById(
        decoded.id
      ).select("-password");

      console.log("Found User:", user);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User no longer exists",
        });
      }

      req.user = user;

      return next();
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Token failed",
    });
  }
};

module.exports = { protect };