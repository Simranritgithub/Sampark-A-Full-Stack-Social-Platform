"use client";

import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../context/Themecontext";


export default function Navbar() {
  const {theme,toggleTheme} =useContext(ThemeContext);
  return (
    <>
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/40 backdrop-blur-md border-b border-white/10">
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
    {/* Logo */}
    <div className="text-xl font-extrabold text-white">
      <span className="text-[#9929EA]">Sam</span>
      <span className="text-[#FF5FCF]">park</span>
    </div>

    {/* Links */}
    <div className="flex items-center gap-6 text-sm font-medium text-white">
      <Link href="/createpost">CreatePost</Link>
      <Link href="/feed">Feed</Link>
      <Link href="/profile">Profile</Link>
     


      <Link
        href="/auth/login"
        className="rounded-full bg-[#9929EA] px-4 py-2 hover:bg-[#FF5FCF]"
      >
        Login
      </Link>
      <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-xl border border-white/20 bg-[#9929EA] text-white dark:bg-[#FF5FCF]"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
       
    </div>
  </div>
  
</nav>


</>
      

  );
}
