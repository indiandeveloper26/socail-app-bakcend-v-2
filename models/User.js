// 






import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    // ✅ user ke posts ka relation
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post", // Post model ka naam
      },
    ],
  },
  { timestamps: true }
);

// ✅ Password hash before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Password compare
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("socailuser", UserSchema);
export default User;
