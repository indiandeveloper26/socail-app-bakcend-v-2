// 



// 

import express from "express";

import toggleFollow from "../controllers/follow.js"

const follwroute = express.Router();

;


// ✅ Create Post Route
follwroute.post("/", toggleFollow)

export default follwroute;













