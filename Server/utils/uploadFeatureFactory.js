// utils/uploadFeatureFactory.js
import uploadFeature from "@adminjs/upload";
import path from "path";
import { renameImage } from "./renameImage.js";

export const makeUploadFeature = (modelName, UPLOADS_DIR, componentLoader) => {
  return uploadFeature({
    componentLoader,
    provider: {
      local: { bucket: UPLOADS_DIR },
    },

    properties: {
      key: "image",
      file: "uploadImage",
      mimeType: "mimeType",
    },

    uploadPath: (record, filename) => renameImage(modelName, record, filename),

    validation: {
      mimeTypes: [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
        "image/webp",
      ],
    },
  });
};
