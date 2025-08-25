// 

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Post from "../models/post.js";
import User from "../models/User.js";
import { likecon } from "../controllers/like-contrler.js";

const likeroute = express.Router();

;


// ✅ Create Post Route
likeroute.post("/",likecon)

export default likeroute;
