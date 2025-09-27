// 

import express from "express";
import useralldata from "../controllers/useralldataget.js";
import userprofilee from "../controllers/userprofile.js";


const useralldataroute = express.Router();

;


// ✅ Create Post Route
useralldataroute.post("/", userprofilee)
export default useralldataroute;
