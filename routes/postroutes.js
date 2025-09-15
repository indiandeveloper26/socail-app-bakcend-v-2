// // // 

// // import express from "express";
// // import multer from "multer";
// // import path from "path";
// // import { fileURLToPath } from "url";
// // import Post from "../models/post.js";
// // import User from "../models/User.js";

// // const postroute = express.Router();

// // // ✅ dirname setup (ESM me __dirname ka alternative)
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // 📂 Multer storage
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, path.join(process.cwd(), "uploads")); // backend root ke andar uploads folder

// //     // cb(null, path.join(__dirname, "../../uploads")); // uploads folder root me hoga
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + "-" + file.originalname);
// //   },
// // });

// // const upload = multer({ storage });

// // // ✅ Create Post Route
// // postroute.post("/", upload.single("image"), async (req, res) => {

// //   console.log(req.body)
// //   try {
// //     let imageUrl = "";
// //     if (req.file) {
// //       imageUrl = `/uploads/${req.file.filename}`;
// //     }

// //     const post = new Post({
// //       user: req.body.id, // frontend se aaya id
// //       content: req.body.content,
// //       image: imageUrl,
// //     });

// //     await post.save();
// //     await User.findByIdAndUpdate(req.body.id, { $push: { posts: post._id } });

// //     res.status(201).json(post);
// //   } catch (err) {
// //     console.error("❌ Post error:", err);
// //     res.status(500).json({ msg: "Server error" });
// //   }
// // });

// // export default postroute;




// import express from "express";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import Post from "../models/post.js";
// import User from "../models/User.js";

// const postroute = express.Router();

// // ✅ dirname setup (ESM me __dirname ka alternative)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 📂 Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(process.cwd(), "uploads")); // backend root ke andar uploads folder
//   },
//   filename: (req, file, cb) => {
//     // spaces aur special characters avoid karne ke liye originalname ko replace karte hain
//     const safeName = file.originalname.replace(/\s+/g, "-");
//     cb(null, Date.now() + "-" + safeName);
//   },
// });

// const upload = multer({ storage });

// // ✅ Create Post Route
// postroute.post("/", upload.single("image"), async (req, res) => {
//   try {
//     // ✅ Debugging logs
//     console.log("Request body:", req.body);
//     console.log("Request file:", req.file);

//     const { id, content, username } = req.body;

//     console.log('iseid', req.body)

//     if (!id || !content) {
//       return res.status(400).json({ msg: "User ID and content are required" });
//     }

//     // ✅ Image path set
//     let imageUrl = "";
//     if (req.file) {
//       imageUrl = `/uploads/${req.file.filename}`;
//     }

//     // ✅ Post create
//     const post = new Post({
//       user: id, // frontend se aaya valid MongoDB ObjectId
//       content,
//       image: imageUrl,
//       username: username,
//     });

//     await post.save();

//     // ✅ User document update
//     await User.findByIdAndUpdate(id, { $push: { posts: post._id } });

//     res.status(201).json({ msg: "Post created successfully", post });
//   } catch (err) {
//     console.error("❌ Post error:", err);
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

// export default postroute;



































// import express from "express";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import Post from "../models/post.js";
// import User from "../models/User.js";

// const postroute = express.Router();

// // ✅ __dirname setup (ESM me)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 📂 Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Backend root ke andar uploads folder
//     cb(null, path.join(process.cwd(), "uploads"));
//   },
//   filename: (req, file, cb) => {
//     // Safe filename (no spaces/special chars)
//     const safeName = file.originalname.replace(/\s+/g, "-");
//     cb(null, Date.now() + "-" + safeName);
//   },
// });

// // Multer middleware
// const upload = multer({ storage });

// // ✅ Create Post Route
// postroute.post("/", upload.single("image"), async (req, res) => {
//   try {
//     console.log("Request body:", req.body);
//     console.log("Request file:", req.file);

//     const { id, content, username } = req.body;

//     if (!id || !content) {
//       return res.status(400).json({ msg: "User ID and content are required" });
//     }

//     // ✅ Full image URL
//     let imageUrl = "";
//     if (req.file) {
//       imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//     }

//     // ✅ Create Post
//     const post = new Post({
//       user: id, // frontend se aaya valid MongoDB ObjectId
//       content,
//       image: imageUrl,
//       username,
//     });

//     await post.save();

//     // ✅ Update User document
//     await User.findByIdAndUpdate(id, { $push: { posts: post._id } });

//     res.status(201).json({ msg: "Post created successfully", post });
//   } catch (err) {
//     console.error("❌ Post error:", err);
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

// export default postroute;

















// import express from "express";
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../cludnary.js"; // 
// import Post from "../models/post.js";
// import User from "../models/User.js";

// const postroute = express.Router();

// // Multer storage for Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "posts", // Cloudinary folder
//     allowed_formats: ["jpg", "png", "jpeg"],
//     transformation: [{ width: 800, crop: "limit" }],
//   },
// });

// const upload = multer({ storage });

// // ✅ Create Post Route
// postroute.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const { id, content, username } = req.body;

//     if (!id || !content) {
//       return res.status(400).json({ msg: "User ID and content are required" });
//     }

//     let imageUrl = req.file?.path || ""; // Cloudinary URL

//     const post = new Post({
//       user: id,
//       content,
//       image: imageUrl,
//       username,
//     });

//     await post.save();
//     await User.findByIdAndUpdate(id, { $push: { posts: post._id } });

//     res.status(201).json({ msg: "Post created successfully", post });


//     console.log()
//   } catch (err) {
//     console.error("Post error:", err);
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });

// export default postroute;
// // 


















import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cludnary.js";
import Post from "../models/post.js";
import User from "../models/User.js"

const postroute = express.Router();

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "posts",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 800, crop: "limit" }],
  },
});

const upload = multer({ storage });

postroute.post("/", upload.single("image"), async (req, res) => {
  try {
    const { id, content, username } = req.body;

    if (!id || !content) {
      return res.status(400).json({ msg: "User ID and content are required" });
    }

    let imageUrl = req.file?.path || ""; // Cloudinary URL

    const post = new Post({
      user: id,
      content,
      image: imageUrl,
      username,
    });

    await post.save();
    await User.findByIdAndUpdate(id, { $push: { posts: post._id } });

    console.log("Uploaded image URL:", imageUrl);

    res.status(201).json({ msg: "Post created successfully", post });
  } catch (err) {
    console.error("Post error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default postroute;
