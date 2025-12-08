import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import passport from "./utils/googleAuth.js";
import sequelize from "./config/db.js";
import { adminJs, adminRouter, UPLOADS_DIR } from "./setup/admin.js";
import errorHandler from "./middleware/errorHandler.js";

// Routes
import foodRoutes from "./routes/foodRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import culinaryRoutes from "./routes/culinaryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

// Setup __dirname untuk ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5050;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || "secretkey",
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000, // 24 jam
    secure: false, // Set true jika pakai HTTPS
  }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Static files untuk uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// IMPORTANT: Route untuk AdminJS agar bisa akses uploaded files
app.use(
  `${adminJs.options.rootPath}/uploads`, 
  express.static(path.join(__dirname, "uploads"))
);

// AdminJS - HARUS SEBELUM ROUTES LAIN
app.use(adminJs.options.rootPath, adminRouter);

// API Routes
app.use("/api/foods", foodRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/culinary", culinaryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/reviews", reviewRoutes);

//publik
app.use("/culinary", express.static(path.join(process.cwd(), "uploads/culinary")));
app.use("/restaurant", express.static(path.join(process.cwd(), "uploads/restaurant")));
app.use("/menu", express.static(path.join(process.cwd(), "uploads/menu")));
app.use("/users", express.static(path.join(process.cwd(), "uploads/users")));

// Test endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handler - HARUS DI PALING BAWAH
app.use(errorHandler);

// Database & Server - HANYA 1X
sequelize
  .sync() // Atau authenticate() saja jika tabel sudah ada
  .then(() => {
    console.log("✅ Database connected & synced");
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`✅ Admin panel: http://localhost:${PORT}/admin`);
    });
  })
  .catch((err) => {
    console.error("❌ Database error:", err);
    process.exit(1);
  });