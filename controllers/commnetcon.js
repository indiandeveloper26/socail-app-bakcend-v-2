import Post from "../models/post.js";

// ✅ Like / Unlike Post
export const likecon = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      // Unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      message: "Like updated successfully",
      likes: post.likes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add Comment to Post
export const addComment = async (req, res) => {
  try {
    const { postId, userId, text } = req.body; // text = comment content

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Naya comment banake push karo
    const newComment = {
      user: userId,
      text,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    res.status(200).json({
      message: "Comment added successfully",
      comments: post.comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Comment from Post
export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId, userId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Sirf usi comment ko delete karne do jo user ne khud likha ho
    const comment = post.comments.find(
      (c) => c._id.toString() === commentId && c.user.toString() === userId
    );

    if (!comment) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    // Filter out the deleted comment
    post.comments = post.comments.filter(
      (c) => c._id.toString() !== commentId
    );

    await post.save();

    res.status(200).json({
      message: "Comment deleted successfully",
      comments: post.comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
