"use client";

import { useEffect, useState } from "react";
import GlassCard from "../components/Glasscard";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import { Heart, ChartBar } from "lucide-react";
interface Author {
  _id?: string;
  name: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  captions?: string;
  likes: string[];
  comments: string[];
  author?: Author;
  createdAt: string;
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  // const [likes, setLikes] = useState(0);
  // const [comments, setComments] = useState(0);

  useEffect(() => {
    const fetchFeed = async () => {
      const res = await api.get("/post");
      if (res.data.success) {
        setPosts(res.data.posts);
      }
    };
    fetchFeed();
  }, []);
  const handleonLike = async (postId: string) => {
    try {
      const res = await api.patch(`/post/${postId}/like`);
      if (res.data.success) {
        // Update the specific post's like status in the UI
        setPosts((prevPosts) =>
          prevPosts.map((post: Post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: res.data.liked
                    ? [...post.likes, "currentUserId"]
                    : post.likes.filter((id: string) => id !== "currentUserId"),
                }
              : post,
          ),
        );
      }
    } catch (error) {
      console.error("Like error:", error);
    }
  };
  const handleonComment = async (postId: string) => {
    try {
      const res = await api.patch(`/post/${postId}/comment`);
      if (res.data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post: Post) =>
            post._id === postId
              ? { ...post, comments: [...post.comments, "CurrentUserId"] }
              : post,
          ),
        );
      }
    } catch (error) {
      console.error("Comment error:", error);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white/90 ">
            Your
             <span className="relative inline-block mx-2 before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-[#e625ac]">
    <span className="relative text-black dark:text-gray-950 ">Feed</span>
  </span>
          </h1>
          <p className="text-white/90 mt-4 text-lg font-medium tracking-widest ">
            Stay updated with the latest posts and updates from your network.
          </p>
        </div>

        <div className=" grid grid-cols-3 gap-6">
          {posts.map((post) => (
            <GlassCard key={post._id}>
              <h2 className="font-bold text-lg text-[#9929EA]">
                {post.author?.name}
              </h2>

              {post.imageUrl ? (
                <img src={post.imageUrl} className="mt-3 rounded-xl " />
              ) : (
                post.videoUrl && (
                  <video
                    src={post.videoUrl}
                    controls
                    className="mt-3 rounded-xl w-full h-64 object-cover"
                  />
                )
              )}
              <p className="text-black/80 mt-2">{post.content}</p>
              <p className="text-sm text-gray-500 mt-1">{post.captions}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <div className="flex flex-row items-center gap-4 mt-4 justify-end">
                <button
                  className=" peer flex flex-row  gap-2 text-sm text-[#9929EA] hover:text-[#FF5FCF] transition"
                  onClick={() => handleonLike(post._id)}
                >
                  <Heart
                    className={`  text-xl ${post.likes?.includes("currentUserId") ? "fill-red-500 text-red-500" : ""}`}
                  ></Heart>
                  {post.likes?.length || 0}
                </button>
                <button
                  className=" flex flex-row  gap-2 text-sm text-[#9929EA] hover:text-[#FF5FCF] transition"
                  onClick={() => handleonComment(post._id)}
                >
                  <ChartBar className="text-xl"></ChartBar>
                  {post.comments?.length || 0}
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
