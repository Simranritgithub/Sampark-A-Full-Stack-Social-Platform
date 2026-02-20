import { title } from "process";
import { Post } from "../models/post";
import { User } from "../models/user";

interface CreatePostInput {
  title?: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  author: string;
}

export const createPost = async (body: CreatePostInput) => {
  console.log("AUTHOR:", body.author);
console.log("TITLE:", body.title);
  try {
    const { title, content, imageUrl, videoUrl } = body;

    if (!content) {
      return { success: false, message: "Content is required" };
    }
    if (!title) {
  return { success: false, message: "Title is required" };
}
    const authorId = body.author;

    const user = await User.findById(authorId);
    if (!user) {
      return { success: false, message: "Author not found" };
    }

    const newPost = new Post({
      title,
      content,
      author: authorId,
      imageUrl: imageUrl || null,
      videoUrl: videoUrl || null,
    });

    await newPost.save();

    return { success: true, post: newPost };
  } catch (error) {
    console.error("Create post error:", error);
    return { success: false, message: "Error creating post" };
  }
};
