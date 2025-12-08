// admin/index.js

import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { ComponentLoader } from "adminjs";

import { User, Restaurant, Culinary, Food, Menu, Review } from "../models/index.js";

import { beforeHook } from "../utils/beforeHook.js";
import { makeUploadFeature } from "../utils/uploadFeatureFactory.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AdminJS.registerAdapter(AdminJSSequelize);

// COMPONENT LOADER
const componentLoader = new ComponentLoader();

// UPLOAD DIR
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

const addBasicUpload = (modelName, resource) => ({
  resource,
  features: [makeUploadFeature(modelName, UPLOADS_DIR, componentLoader)],
  options: {
    properties: {
      uploadImage: { isVisible: { edit: true } },
      image: { isVisible: { list: true, show: true, edit: false } },
    },
    actions: {
      new: { before: beforeHook },
      edit: { before: beforeHook },
    },
  },
});

const adminJs = new AdminJS({
  rootPath: "/admin",
  componentLoader,

  resources: [
    // USER (with password hash)
    {
      resource: User,
      features: [makeUploadFeature("User", UPLOADS_DIR, componentLoader)],
      options: {
        properties: {
          uploadImage: { isVisible: { edit: true } },
          image: { isVisible: { list: true, show: true, edit: false } },
        },

        actions: {
          new: {
            before: async (req) => {
              if (req.payload?.password)
                req.payload.password = await bcrypt.hash(req.payload.password, 10);
              return req;
            },
          },
          edit: {
            before: async (req) => {
              if (req.payload?.password)
                req.payload.password = await bcrypt.hash(req.payload.password, 10);
              else delete req.payload.password;
              return req;
            },
          },
        },
      },
    },

    addBasicUpload("Restaurant", Restaurant),
    addBasicUpload("Food", Food),
    addBasicUpload("Menu", Menu),
    addBasicUpload("Culinary", Culinary),

    { resource: Review },
  ],

  branding: {
    companyName: "SuroTaste Admin Panel",
    logo: false,
    withMadeWithLove: false,
  },
});

// AUTH
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

export { adminJs, adminRouter, UPLOADS_DIR};
