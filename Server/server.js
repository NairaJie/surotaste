require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const sequelize = require("./config/db");

// Routes
const foodRoutes = require("./routes/foodRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const culinaryRoutes = require("./routes/culinaryRoutes");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");

// Middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// Passport (Google OAuth)
const passport = require("./utils/googleAuth");

const app = express();

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);


app.use(express.json());

// Session (wajib untuk OAuth)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Logger
app.use(logger);

// Routes
app.use("/api/foods", foodRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/culinary", culinaryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/menus", menuRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// DB Connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting DB:", err));

// Sync DB
sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = 5050;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
