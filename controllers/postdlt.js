import Post from "../models/post.js";


// Delete Post
const deletePost = async (req, res) => {
    const { id } = req.body

    // console.log(id)

    // res.send("delte")
    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error });
    }
};


export default deletePost