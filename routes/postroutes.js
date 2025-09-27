















// // import express from "express";
// // import multer from "multer";
// // import { CloudinaryStorage } from "multer-storage-cloudinary";
// // import cloudinary from "../cludnary.js";
// // import Post from "../models/post.js";
// // import User from "../models/User.js"

// // const postroute = express.Router();

// // // Multer storage for Cloudinary
// // const storage = new CloudinaryStorage({
// //   cloudinary: cloudinary,
// //   params: {
// //     folder: "posts",
// //     allowed_formats: ["jpg", "png", "jpeg"],
// //     transformation: [{ width: 800, crop: "limit" }],
// //   },
// // });

// // const upload = multer({ storage });

// // postroute.post("/", upload.single("image"), async (req, res) => {
// //   try {
// //     const { id, content, username } = req.body;

// //     if (!id || !content) {
// //       return res.status(400).json({ msg: "User ID and content are required" });
// //     }

// //     let imageUrl = req.file?.path || ""; // Cloudinary URL

// //     const post = new Post({
// //       user: id,
// //       content,
// //       image: imageUrl,
// //       username,
// //     });

// //     await post.save();
// //     await User.findByIdAndUpdate(id, { $push: { posts: post._id } });

// //     console.log("Uploaded image URL:", imageUrl);

// //     res.status(201).json({ msg: "Post created successfully", post });
// //   } catch (err) {
// //     console.error("Post error:", err);
// //     res.status(500).json({ msg: "Server error", error: err.message });
// //   }
// // });

// // export default postroute;


















// import express from "express";
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../cludnary.js";
// import Post from "../models/post.js";
// import User from "../models/User.js";

// const postroute = express.Router();

// // Multer storage for Cloudinary (image + video)
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     let folder = "posts";
//     let resourceType = file.mimetype.startsWith("video") ? "video" : "image";

//     return {
//       folder,
//       resource_type: resourceType, // 👈 important (video support)
//       allowed_formats: ["jpg", "png", "jpeg", "mp4", "mov", "avi"],
//       transformation:
//         resourceType === "image"
//           ? [{ width: 800, crop: "limit" }]
//           : [], // video me transform avoid karna
//     };
//   },
// });

// const upload = multer({ storage });

// // Upload post (image/video + content)
// postroute.post("/", upload.single("media"), async (req, res) => {
//   try {
//     const { id, content, username } = req.body;

//     if (!id || !content) {
//       return res.status(400).json({ msg: "User ID and content are required" });
//     }

//     let mediaUrl = req.file?.path || "";
//     let mediaType = req.file?.mimetype || "";

//     const post = new Post({
//       user: id,
//       content,
//       mediaUrl,  // 👈 single field (image or video link)
//       mediaType, // 👈 store type (e.g. "image/jpeg", "video/mp4")
//       username,
//     });

//     await post.save();
//     await User.findByIdAndUpdate(id, { $push: { posts: post._id } });

//     console.log("Uploaded media:", mediaUrl);

//     res.status(201).json({ msg: "Post created successfully", post });
//   } catch (err) {
//     console.error("Post error:", err);
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

// export default postroute;





import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cludnary.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

const postroute = express.Router();

// Cloudinary storage config (auto detect image/video)
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "posts",
    resource_type: "auto", // image + video + gif
    allowed_formats: ["jpg", "png", "jpeg", "mp4", "mov", "avi"],
    transformation: file.mimetype.startsWith("image")
      ? [{ width: 800, crop: "limit" }]
      : [],
  }),
});

const upload = multer({ storage });

// Upload Post
postroute.post("/", upload.single("media"), async (req, res) => {
  try {
    const { id, content, username } = req.body;
    if (!id || !content) {
      return res.status(400).json({ msg: "User ID and content are required" });
    }

    console.log("📩 Body:", req.body);
    console.log("📂 File:", req.file);

    const postData = {
      user: id,
      content,
      username,
    };

    if (req.file) {
      if (req.file.mimetype.startsWith("image")) {
        postData.imageUrl = req.file.path;
      } else if (req.file.mimetype.startsWith("video")) {
        postData.videoUrl = req.file.path;
        postData.videoType = req.file.mimetype;
      }
    }

    const post = new Post(postData);
    await post.save();
    await User.findByIdAndUpdate(id, { $push: { posts: post._id } });

    res.status(201).json({ msg: "Post created successfully", post });
  } catch (err) {
    console.error("❌ Post error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get all posts
postroute.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default postroute;
