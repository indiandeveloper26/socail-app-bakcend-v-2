import express from "express";
import mongoose from "mongoose";
import Comment from "../models/commnet.js";
import Post from "../models/post.js";

const commentRouter = express.Router();

commentRouter.post("/", async (req, res) => {
    const { userId, postId, text } = req.body;

    console.log(req.body)

    if (!userId || !postId || !text)
        return res.status(400).json({ msg: "All fields required" });

    try {
        // Create comment document
        const comment = new Comment({
            user: userId,
            text,
        });
        await comment.save();

        // Add comment to post (embedded)
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ msg: "Post not found" });

        post.comments.push({ user: comment.user, text: comment.text });
        await post.save();



        res.send(" commetn save now")
        console.log('sace commnet')
    } catch (err) {
        console.error("Comment Error:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

export default commentRouter;
