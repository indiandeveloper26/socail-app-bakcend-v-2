// controllers/postController.js

import Post from "../models/post.js"
// ✅ Like / Unlike Post
export const likecon = async (req, res) => {
  try {
    const { userId, postId } = req.body; // frontend se dono bhejna hoga

    // Find Post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if already liked
    if (post.likes.includes(userId)) {
      // Agar already liked hai -> Unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // Agar like nahi hai -> Like
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      message: "Like updated successfully",
      likes: post.likes, // return updated likes array
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
