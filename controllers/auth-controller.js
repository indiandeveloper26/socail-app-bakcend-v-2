import { validationResult } from "express-validator";
// import User from "../models/User.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, 'qwsdrt123456', {
    expiresIn: "30d",
  });
};

// ✅ Register user
export const registerUser = async (req, res) => {
  console.log('hii',req.body)

    // res.send("this is singup routes")
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;


  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password:user.password,
      token: generateToken(user._id),
    });
      console.log('hii two',)

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};











// ✅ Login user
export const loginUser = async (req, res) => {
  console.log('hii',req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get logged-in user
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
