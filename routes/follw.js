// 



// 

import express from "express";
import deletePost from "../controllers/postdlt.js";
import { follwscont } from "../controllers/follow.js";

const follwroute = express.Router();

;


// ✅ Create Post Route
follwroute.post("/", follwscont)

export default follwroute;
