// 

import express from "express";
import useralldata from "../controllers/useralldataget.js";


const useralldataroute = express.Router();

;


// ✅ Create Post Route
useralldataroute.post("/", (req, res) => {
    res.send("userprofle")
})

export default useralldataroute;
