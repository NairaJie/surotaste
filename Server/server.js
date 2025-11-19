const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const foodRoutes = require("./routes/foodRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");


const app = express();

// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// Routes
app.use("/api/foods", foodRoutes);
app.use("/api/restaurants", restaurantRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Sync DB
sequelize.authenticate().then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log("Error connecting DB:", err);
});

sequelize.sync().then(() => console.log("Database synced"));

// Start server
const PORT = 5050;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

app.use(logger);
app.use(errorHandler);
