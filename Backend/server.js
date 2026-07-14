const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const contactRoutes = require("./routes/contactRoutes");

const { protect } = require("./middleware/authMiddleware");
const limiter = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorMiddleware");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

connectDB();

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://storyn-kappa.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(helmet());

// Rate Limiter
app.use(limiter);

// Static Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);

// Protected Profile Route
app.get("/api/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// Home Route
app.get("/", (req, res) => {
  res.send("Storyn API Running");
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});