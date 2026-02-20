import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    videoUrl: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);
export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
