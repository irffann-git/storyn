    const dotenv = require("dotenv");
    dotenv.config();
    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");
    const helmet = require("helmet");
    const morgan = require("morgan");
    const path = require("path");


    const connectDB = require("./config/db");
    const authRoutes = require("./routes/authRoutes");
    const { protect } = require("./middleware/authMiddleware");
    const bookRoutes = require("./routes/bookRoutes");
    const cartRoutes = require("./routes/cartRoutes");
    const orderRoutes = require("./routes/orderRoutes");
    const addressRoutes = require("./routes/addressRoutes");
    const inventoryRoutes = require("./routes/inventoryRoutes");
    const wishlistRoutes = require("./routes/wishlistRoutes");
    const dashboardRoutes = require("./routes/dashboardRoutes");
    const limiter = require("./middleware/rateLimiter");
    const swaggerUi = require("swagger-ui-express");
    const swaggerSpec = require("./config/swagger");
    const errorHandler = require("./middleware/errorMiddleware");
    const uploadRoutes = require("./routes/uploadRoutes");
    const contactRoutes = require("./routes/contactRoutes");

    

    connectDB();

    const app = express();
    app.use(morgan("dev"));

    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(limiter);
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    app.use("/api/upload", uploadRoutes);
    app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
    app.use("/api/auth", authRoutes);
    app.use("/api/books", bookRoutes);
    app.use("/api/cart", cartRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/addresses", addressRoutes);
    app.use("/api/inventory", inventoryRoutes);
    app.use("/api/wishlist", wishlistRoutes);
    app.use("/api/admin/dashboard", dashboardRoutes);
    app.use("/api/contact", contactRoutes);
    app.use(errorHandler);

    app.get("/", (req, res) => {
    res.send("Storyn API Running");
    });

    app.get("/api/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});


    const PORT = process.env.PORT || 3007;

    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });