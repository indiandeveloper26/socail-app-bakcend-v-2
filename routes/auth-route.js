import express from "express";
import { body } from "express-validator";
import { loginUser, registerUser } from "../controllers/auth-controller.js";

const routerr = express.Router();

// ✅ Register route
routerr.post(
  "/register",
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be 6 chars").isLength({ min: 6 }),
  ],
  registerUser
);

// ✅ Login route
routerr.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  loginUser
);

// ✅ Get user profile (protected)
routerr.get("/me", (req,res)=>{
    res.send(" hi  this is api")
});

export default routerr;
