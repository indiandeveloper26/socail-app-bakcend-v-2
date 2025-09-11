import express from "express";
import postuserprofilee from "../controllers/postuserprofile.js";


const postuserprofiles = express.Router();

postuserprofiles.post("/", postuserprofilee)


export default postuserprofiles;
