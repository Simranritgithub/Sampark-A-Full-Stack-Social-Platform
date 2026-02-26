import { title } from "process";
import { Post } from "../models/post";
import { User } from "../models/user";
import { connectDB } from "../lib/db";
import { Types } from "mongoose";

interface CreatePostInput {
  title?: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  author: string;
  captions?: string;
  
}

export const createPost = async (body: CreatePostInput) => {
  console.log("AUTHOR:", body.author);
console.log("TITLE:", body.title);
  try {
    await connectDB();
    const { title, content, imageUrl, videoUrl ,captions} = body;

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
    //Only create
    const newPost = new Post({
      title,
      content,
      author: authorId,
      imageUrl: imageUrl || null,
      videoUrl: videoUrl || null,
      captions: captions || null,
    });
//then save in db
    await newPost.save();

    return { success: true, post: newPost };
  } catch (error) {
    console.error("Create post error:", error);
    return { success: false, message: "Error creating post" };
  }
};
// controllers/postcontroller.ts

export const getFeedPosts = async () => {
  try {
    await connectDB();
    const posts = await Post.find()
      .populate("author", "name email ")
      .sort({ createdAt: -1 });

    return { success: true, posts };
  } catch (error) {
    console.error("Get feed error:", error);
    return { success: false, message: "Failed to fetch feed" };
  }
};
export const toggleLikePost = async (
  postId: string,
  userId: string
) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return { success: false, message: "Post not found" };
    }

    const alreadyLiked = post.likes.some(
  (id:Types.ObjectId) => id.toString() === userId
);

    if (alreadyLiked) {
      post.likes.pull(userId); // unlike
    } else {
      post.likes.push(userId); // like
    }

    await post.save();

    return {
      success: true,
      liked: !alreadyLiked,
      likesCount: post.likes.length,
    };
  } catch (error) {
    console.error("Toggle like error:", error);
    return { success: false, message: "Like failed" };
  }
};
export const addCommentToPost = async (
  postId: string,
  userId: string,
  text: string
) => {
  try {
    if (!text) {
      return { success: false, message: "Comment cannot be empty" };
    }

    const post = await Post.findById(postId);
    if (!post) {
      return { success: false, message: "Post not found" };
    }

    post.comments.push({
      user: userId,
      text,
      createdAt: new Date(),
    });

    await post.save();

    return {
      success: true,
      comments: post.comments,
      commentsCount: post.comments.length,
    };
  } catch (error) {
    console.error("Add comment error:", error);
    return { success: false, message: "Comment failed" };
  }
};