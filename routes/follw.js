// 



// 

import express from "express";

import toggleFollow from "../controllers/follow.js"

const follwroute = express.Router();

;


// ✅ Create Post Route
follwroute.post("/", toggleFollow)



follwroute.post("unfollow", (req, res) => {
    res.send("user unow ")
})

export default follwroute;












//



// 