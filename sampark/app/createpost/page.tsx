"use client";

import React, { useState } from "react";
import GlassCard from "../components/Glasscard";
import Navbar from "../components/Navbar";
import api from "../lib/axios";

export default function CreatePostPage() {
//   console.log(
//   "ENV TEST:",
//   process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
// );
  const [form, setForm] = useState({
    title: "",
    content: "",
    imageUrl: "",
    videoUrl: "",
    captions: "",
  });

  const [uploading, setUploading] = useState(false);

  /* ---------------- TEXT CHANGE ---------------- */
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  

  /* ---------------- IMAGE UPLOAD (CLOUDINARY) ---------------- */
  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const resourceType = file.type.startsWith("video")
    ? "video"
    : "image";

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "sampark_uploads"); // 👈 your preset
      

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      setForm((prev) => ({
        ...prev,
        imageUrl: result.secure_url,
        videoUrl: result.secure_url // ✅ URL saved
      }));
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- SUBMIT POST ---------------- */
  const HandleonPostSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const res = await api.post("/post", form);

      if (res.data.success) {
        alert("Post created successfully!");
        setForm({
          title: "",
          content: "",
          imageUrl: "",
          videoUrl: "",
          captions: "",
        });
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen px-4 pt-24 flex justify-center">
      <Navbar />

      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-4 text-[#e4dcea]">
          Create a New Post
        </h1>

        <GlassCard>
          <form className="space-y-5" onSubmit={HandleonPostSubmit}>
            {/* Content */}
            <div className="group">
  <h1 className="text-2xl font-bold mb-2 text-center text-[#771bb9]">
    Your <span className="text-[#FF5FCF]">Posts</span>
  </h1>

  <label className="block text-sm font-semibold mb-1 text-[#6b21a8] group-hover:text-[#FF5FCF]/60 transition">
    Title
  </label>

  <input
    type="text"
    name="title"
    required
    value={form.title}
    onChange={handleOnChange}
    placeholder="Enter a title for your post..."
    className="
      w-full rounded-xl px-4 py-3
      bg-white/80
      border border-black/20
      focus:ring-2 focus:ring-[#9929EA]/40
      group-hover:border-[#FF5FCF]/60
      transition-all
    "
  />

  <label className="block text-sm font-semibold mt-6 text-[#6b21a8] group-hover:text-[#FF5FCF] transition">
    What’s on your mind?
  </label>

  <textarea
    rows={5}
    name="content"
    value={form.content}
    onChange={handleOnChange}
    placeholder="Write something meaningful..."
    className="
      w-full rounded-xl px-4 py-3
      bg-white/80
      border border-black/20
      focus:ring-2 focus:ring-[#9929EA]/40
      group-hover:border-[#FF5FCF]/60
      transition-all
    "
  />
</div>

            {/* Image Upload */}
            <div className="group">
              <label className="block text-sm font-semibold mb-1 text-[#6b21a8] group-hover:text-[#FF5FCF] transition">
                Upload Image or Video
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleImageUpload(e.target.files[0])
                }
                className="w-full"
              />
              {uploading && (
                <p className="text-sm text-[#FF5FCF] mt-1">
                 {form.imageUrl?"Uploading image...":"Uploading video"} 
                </p>
              )}
              {form.imageUrl ? (

                <img
                  src={form.imageUrl}
                  alt="preview"
                  className="mt-3 rounded-xl max-h-60"
                />
              ):(form.videoUrl && (
               <video
    src={form.videoUrl}
    controls
    className="mt-3 rounded-xl max-h-60"
  />
                
              ))}<br />
              <label className="block text-sm font-medium mt-6 text-black group-hover:text-[#FF5FCF] transition">
                Captions</label>
              <input
                type="text"
                name="captions"
                value={form.captions}
                onChange={handleOnChange}
                placeholder="Add a caption for your media..."
                className="w-full rounded-xl px-4 py-3 bg-white/80 border border-black/20 focus:ring-2 focus:ring-[#9929EA]/40 group-hover:border-[#FF5FCF]/60 transition-all"
              />
            </div>
            

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={uploading}
                className="rounded-full px-6 py-2.5 bg-[#9929EA] text-white font-semibold hover:bg-[#FF5FCF] transition"
              >
                Post
              </button>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}