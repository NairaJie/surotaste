import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import uploadFeature from "@adminjs/upload";
import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { ComponentLoader } from "adminjs";

import { User, Restaurant, Culinary, Food, Menu, Review } from "../models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AdminJS.registerAdapter(AdminJSSequelize);

// Component loader - HARUS dibuat dulu
const componentLoader = new ComponentLoader();

// base uploads directory
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

// ==========================
// UNIVERSAL UPLOAD FEATURE
// ==========================
const makeUploadFeature = (folderName, useValidation = true) =>
  uploadFeature({
    componentLoader,
    provider: {
      local: {
        bucket: UPLOADS_DIR,
      },
    },

    properties: {
      key: "image",
      file: "uploadImage",
      mimeType: useValidation ? "mimeType" : undefined,
    },

    uploadPath: (record, filename) => {
      const clean = filename.replace(/\s+/g, "-");
      return `${folderName}/${Date.now()}-${clean}`;
    },

    // kalau useValidation = false → validation di-skip
    ...(useValidation && {
      validation: {
        mimeTypes: [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/gif",
          "image/webp",
        ],
      },
    }),
  });


// =============================
// ADMINJS INSTANCE
// =============================
const adminJs = new AdminJS({
  rootPath: "/admin",
  componentLoader, // CRITICAL: Pass componentLoader di sini juga

  resources: [
    // -------------------------
    // USER (NO UPLOAD)
    // -------------------------
    {
      resource: User,
      features: [makeUploadFeature("users", false)], // TANPA MIME & VALIDATION

      options: {
        navigation: { name: "Users", icon: "User" },

        properties: {
          uploadImage: { isVisible: { edit: true } },
          image: { isVisible: { list: true, show: true, edit: false } },

          password: {
            type: "password",
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
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
              if (req.payload?.password) {
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



    // -------------------------
    // RESTAURANT
    // -------------------------
    {
      resource: Restaurant,
      features: [makeUploadFeature("restaurants")],
      options: {
        navigation: { name: "Content", icon: "Restaurant" },
        properties: {
          uploadImage: { isVisible: { edit: true } },
          image: { isVisible: { list: true, show: true, edit: false } },
        },
      },
    },

    // -------------------------
    // FOOD
    // -------------------------
    {
      resource: Food,
      features: [makeUploadFeature("foods")],
      options: {
        navigation: { name: "Content", icon: "Pizza" },
        properties: {
          uploadImage: { isVisible: { edit: true } },
          image: { isVisible: { list: true, show: true, edit: false } },
        },
      },
    },

    // -------------------------
    // MENU
    // -------------------------
    {
      resource: Menu,
      features: [makeUploadFeature("menus")],
      options: {
        navigation: { name: "Content", icon: "Menu" },
        properties: {
          uploadImage: { isVisible: { edit: true } },
          image: { isVisible: { list: true, show: true, edit: false } },
        },
      },
    },

    // -------------------------
    // CULINARY
    // -------------------------
    {
      resource: Culinary,
      features: [makeUploadFeature("culinary")],
      options: {
        navigation: { name: "Content", icon: "Star" },
        properties: {
          uploadImage: { isVisible: { edit: true } },
          image: { isVisible: { list: true, show: true, edit: false } },
        },
      },
    },

    // -------------------------
    // REVIEW
    // -------------------------
    {
      resource: Review,
      options: {
        navigation: { name: "Reviews", icon: "MessageCircle" },
      },
    },
  ],

  branding: {
    companyName: "SuroTaste Admin Panel",
    logo: false,
    favicon: false,
    withMadeWithLove: false,
  },
});

// =============================
// AUTH
// =============================
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } });
      if (!user || user.role !== "admin") return false;

      const match = await bcrypt.compare(password, user.password);
      return match ? user : false;
    },
    cookieName: "adminjs",
    cookiePassword: process.env.ADMIN_COOKIE_SECRET || "secret123",
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "sessionsecret",
  }
);

export { adminJs, adminRouter, UPLOADS_DIR };