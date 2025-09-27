


// // // import mongoose from "mongoose";

// // // const postSchema = new mongoose.Schema(
// // //   {
// // //     user: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "User", // User model ka reference
// // //       required: true,
// // //     },
// // //     username: {
// // //       type: String,   // ✅ jisne post banayi uska naam
// // //       required: true, // ensure every post has username
// // //       trim: true,
// // //     },

// // //     content: {
// // //       type: String,
// // //       trim: true,
// // //     },
// // //     image: {
// // //       type: String, // optional image url / path
// // //     },
// // //     likes: [
// // //       {
// // //         type: mongoose.Schema.Types.ObjectId,
// // //         ref: "User",
// // //       },
// // //     ],
// // //     comments: [
// // //       {
// // //         user: {
// // //           type: mongoose.Schema.Types.ObjectId,
// // //           ref: "Comment",
// // //           required: true,
// // //         },
// // //         text: {
// // //           type: String,
// // //           required: true,
// // //           trim: true,
// // //         },
// // //         createdAt: {
// // //           type: Date,
// // //           default: Date.now,
// // //         },
// // //       },
// // //     ],
// // //   },
// // //   { timestamps: true }
// // // );

// // // const Post = mongoose.model("Post", postSchema);

// // // export default Post;




// // import mongoose from "mongoose";

// // const postSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     username: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //     content: {
// //       type: String,
// //       trim: true,
// //     },
// //     image: {
// //       type: String,
// //     },

// //     // ✅ Always array by default
// //     likes: [
// //       {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: "User",
// //       },
// //     ],
// //     comments: [
// //       {
// //         user: {
// //           type: mongoose.Schema.Types.ObjectId,
// //           ref: "User",   // 🔴 yaha galti thi, Comment nahi User hoga
// //           required: true,
// //         },
// //         text: {
// //           type: String,
// //           required: true,
// //           trim: true,
// //         },
// //         createdAt: {
// //           type: Date,
// //           default: Date.now,
// //         },
// //       },
// //     ],
// //   },
// //   { timestamps: true }
// // );

// // // ✅ Default values set karo
// // postSchema.path("likes").default([]);
// // postSchema.path("comments").default([]);

// // const Post = mongoose.model("Post", postSchema);

// // export default Post;








// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "socailuser", // ✅ User model ka naam
//       required: true,
//     },
//     mediaUrl: {
//       type: String, // image ya video ka Cloudinary URL
//       default: "",
//     },
//     username: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     content: {
//       type: String,
//       trim: true,
//     },
//     image: {
//       type: String,
//     },
//     likes: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "socailuser",
//       },
//     ],
//     comments: [
//       {
//         user: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "socailuser", // ya "Comment" agar alag se comment model banaya hai
//         },
//         text: {
//           type: String,
//           required: true,
//           trim: true,
//         },
//         createdAt: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// // ✅ Yaha Capital P rakho
// const Post = mongoose.model("Post", postSchema);
// export default Post;
















import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "socailuser",
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String, // sirf image ke liye
    },
    videoUrl: {
      type: String, // sirf video ke liye
    },
    videoType: {
      type: String, // video/mp4 ya video/avi etc
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "socailuser",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "socailuser",
        },
        text: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
