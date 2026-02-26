import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    videoUrl: String,
    captions: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    createdAt: Date,
  },
]
  },
  { timestamps: true }
);
export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
