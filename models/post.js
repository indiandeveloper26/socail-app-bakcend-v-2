// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // User model ka reference
//       required: true,
//     },
//     content: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     image: {
//       type: String, // optional image url
//     },
//     likes: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     comments: [
//       {
//         user: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User",
//         },
//         text: {
//           type: String,
//           required: true,
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


// const Post=mongoose.model("Post", postSchema);
// export default  Post





import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User model ka reference
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // optional image url / path
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
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

const Post = mongoose.model("Post", postSchema);

export default Post;
