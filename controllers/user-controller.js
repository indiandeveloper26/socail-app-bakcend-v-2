import { body, validationResult } from 'express-validator';
import User from '../models/User.js';


export const validateUpdate = [
body('name').optional().isLength({ min: 2 }).withMessage('Name too short'),
body('bio').optional().isLength({ max: 200 }).withMessage('Bio too long'),
];


export const getProfile = async (req, res) => {
const { id } = req.params;
const user = await User.findById(id).select('-password');
if (!user) return res.status(404).json({ message: 'User not found' });
const postsCount = await Post.countDocuments({ author: id });
res.json({ user, stats: { postsCount } });
};


export const updateMe = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


const update = {};
if (req.body.name) update.name = req.body.name;
if (req.body.bio) update.bio = req.body.bio;
if (req.file) update.avatar = `/uploads/${req.file.filename}`;


const user = await User.findByIdAndUpdate(req.user._id, update, { new: true }).select('-password');
res.json({ user });
};