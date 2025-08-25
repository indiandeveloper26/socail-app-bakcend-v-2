// 

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Post from "../models/post.js";
import User from "../models/User.js";

const postroute = express.Router();

// ✅ dirname setup (ESM me __dirname ka alternative)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📂 Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "uploads")); // backend root ke andar uploads folder

    // cb(null, path.join(__dirname, "../../uploads")); // uploads folder root me hoga
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Create Post Route
postroute.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const post = new Post({
      user: req.body.id, // frontend se aaya id
      content: req.body.content,
      image: imageUrl,
    });

    await post.save();
    await User.findByIdAndUpdate(req.body.id, { $push: { posts: post._id } });

    res.status(201).json(post);
  } catch (err) {
    console.error("❌ Post error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default postroute;
