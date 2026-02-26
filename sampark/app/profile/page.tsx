"use client";

import React from "react";
import Navbar from "../components/Navbar";
import GlassCard from "../components/Glasscard";

const Profile = () => {
  return (
    <div className="min-h-screen pt-24 px-4">
      <Navbar />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white/90">
            Your
            <span className="relative inline-block mx-2 before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-[#e625ac]">
              <span className="relative text-black">Profile</span>
            </span>
          </h1>

          <p className="text-white/90 mt-4 text-lg font-medium tracking-widest">
            Stay updated with your profile.
          </p>
        </div>

        {/* Profile Card */}
        <GlassCard>
          <div className="px-6 py-6 border-2 border-gray-200 rounded-xl shadow-2xl">

            {/* Top Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src="https://i.pravatar.cc/150"
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#e625ac] hover:border-white transition"
              />

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-black">
                  Simran Rout
                </h2>
                <p className="text-black/70">@simranrout</p>
                <p className="mt-2 text-sm text-black/60 max-w-md">
                  Building Sampark ✨ | Sharing thoughts, ideas & moments.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center mt-8">
              <div className="p-4 rounded-xl bg-white/70 border border-black/10">
                <p className="text-2xl font-bold text-[#9929EA]">24</p>
                <p className="text-sm text-black/60">Posts</p>
              </div>
              <div className="p-4 rounded-xl bg-white/70 border border-black/10">
                <p className="text-2xl font-bold text-[#FF5FCF]">312</p>
                <p className="text-sm text-black/60">Connections</p>
              </div>
              <div className="p-4 rounded-xl bg-white/70 border border-black/10">
                <p className="text-2xl font-bold text-[#FAEB92]">1.2k</p>
                <p className="text-sm text-black/60">Likes</p>
              </div>
            </div>

            {/* About */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-black mb-2">
                About
              </h3>
              <p className="text-black/70 leading-relaxed">
                Passionate about creating meaningful social experiences.
                Exploring full-stack development and building Sampark step by
                step 🚀
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                className="
                  px-5 py-2 rounded-full
                  border border-[#9929EA]
                  text-[#9929EA]
                  hover:bg-[#9929EA] hover:text-white
                  transition-all
                "
              >
                Edit Profile
              </button>

              <button
                className="
                  px-5 py-2 rounded-full
                  bg-[#FF5FCF]
                  text-white font-semibold
                  hover:bg-[#9929EA]
                  transition-all
                "
              >
                Save
              </button>
            </div>

          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Profile;