import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import uploadFeature from "@adminjs/upload";
import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { User, Restaurant, Culinary, Food, Menu, Review } from "../models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AdminJS.registerAdapter(AdminJSSequelize);

const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

// === Buat AdminJS dengan resources langsung ===
const adminJs = new AdminJS({
  resources: [
    // User
    {
      resource: User,
      options: {
        navigation: { name: "Users", icon: "User" },
        properties: {
          password: { 
            type: "password",
            isVisible: { list: false, edit: true, filter: false, show: false } 
          },
        },
        actions: {
          new: {
            before: async (req) => {
              if (req.payload?.password) {
                req.payload.password = await bcrypt.hash(req.payload.password, 10);
              }
              return req;
            },
          },
          edit: {
            before: async (req) => {
              if (req.payload?.password && req.payload.password !== '') {
                req.payload.password = await bcrypt.hash(req.payload.password, 10);
              } else {
                delete req.payload.password;
              }
              return req;
            },
          },
        },
      },
    },
    
    // Restaurant TANPA upload feature dulu
    {
      resource: Restaurant,
      options: {
        navigation: { name: "Content", icon: "Restaurant" },
        properties: { 
          image: { isVisible: true },
        },
      },
    },
    
    // Food
    {
      resource: Food,
      options: {
        navigation: { name: "Content", icon: "Food" },
      },
    },
    
    // Menu
    {
      resource: Menu,
      options: {
        navigation: { name: "Content", icon: "Menu" },
      },
    },
    
    // Culinary
    {
      resource: Culinary,
      options: {
        navigation: { name: "Content", icon: "Star" },
      },
    },
    
    // Review
    {
      resource: Review,
      options: {
        navigation: { name: "Reviews", icon: "MessageCircle" },
      },
    },
  ],
  rootPath: "/admin",
  branding: {
    companyName: "SuroTaste Admin Panel",
    logo: false,
    favicon: false,
    withMadeWithLove: false,
  },
});

// === Authenticated Router ===
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user || user.role !== "admin") return false;
        const match = await bcrypt.compare(password, user.password);
        return match ? user : false;
      } catch (error) {
        console.error("Authentication error:", error);
        return false;
      }
    },
    cookieName: "adminjs",
    cookiePassword: process.env.ADMIN_COOKIE_SECRET || "supersecret123456",
  },
  null,
  { 
    resave: false, 
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "sessionsecret123456",
  }
);

export { adminJs, adminRouter };