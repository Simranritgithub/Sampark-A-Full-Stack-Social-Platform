"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../lib/axios";

import GlassCard from "../../components/Glasscard";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({  
    email: "",
    password: ""
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form:", form);
    try {
      const res = await api.post("/auth/login", form);
      if (res.data.success) {
        router.push("/dashboard");
      }
    }
    catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <GlassCard className="w-full max-w-md text-black">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2 text-black">
          Welcome Back
        </h1>

        <p className="text-center mb-6 text-[#9929EA] font-semibold text-lg">
          Login to continue to <span className="font-bold">Sampark</span>
        </p>

        {/* Form */}
        <form  onSubmit={handleOnSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={handleOnChange}
              name="email"
              value={form.email}
              className="
                w-full px-4 py-3 rounded-xl
                bg-white/80
                border border-black/20
                focus:outline-none
                focus:border-[#9929EA]
                focus:ring-2 focus:ring-[#9929EA]/40
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={handleOnChange}
              name="password"
              value={form.password}
              className="
                w-full px-4 py-3 rounded-xl
                bg-white/80
                border border-black/20
                focus:outline-none
                focus:border-[#9929EA]
                focus:ring-2 focus:ring-[#9929EA]/40
              "
            />
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <button
              type="button"
              className="text-base text-[#FF5FCF] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-xl
              bg-[#9929EA]
              text-white font-semibold
              hover:bg-[#FF5FCF]
              transition-all duration-300
              shadow-lg shadow-[#9929EA]/40
            "
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-black/20" />
          <span className="text-sm text-black/60">OR</span>
          <div className="flex-1 h-px bg-black/20" />
        </div>

        {/* Sign up */}
        <p className="text-center text-base text-black">
          Don’t have an account?{" "}
          <span onClick={()=>router.push("/auth/register")} className="text-[#d7b807] font-semibold cursor-pointer hover:underline">
          Register
          </span>
        </p>

      </GlassCard>
    </div>
  );
}
