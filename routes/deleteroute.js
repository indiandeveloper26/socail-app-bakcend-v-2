// 

import express from "express";
import deletePost from "../controllers/postdlt.js";

const deltepostrote = express.Router();

;


// ✅ Create Post Route
deltepostrote.delete("/", deletePost)

export default deltepostrote;
