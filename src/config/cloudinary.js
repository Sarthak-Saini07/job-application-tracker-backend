import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Determine the resource format logically
    const ext = file.originalname.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif"].includes(ext);

    return {
      folder: "jobsy_cvs",
      resource_type: isImage ? "image" : "raw",
      public_id: `${Date.now()}_${file.originalname.replace(/\.[^/.]+$/, "")}`,
    };
  },
});

export const upload = multer({ storage });
