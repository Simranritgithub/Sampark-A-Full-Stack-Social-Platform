"use client";
import { useRouter } from "next/navigation";
import GlassCard from "../../components/Glasscard";
import { useEffect, useState } from "react";
import api from "../../lib/axios";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
const handleOnCapture = (e: React.FormEvent<HTMLFormElement>) => {
   
    if (form.password !== form.confirmPassword) {
       e.preventDefault();
      alert("Passwords do not match");
      return;
    }
  }
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Submitting form:", form);
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

      try {
      const res = await api.post("/auth/register", form);
      if (res.data.success) {
        router.push("/auth/login");
      }
    }
      catch (error) {
        console.error("Registration error:", error);
      }
    };
    
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <GlassCard className="w-full max-w-md text-black">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2 text-black">
          Create Account
        </h1>

        <p className="text-center mb-6 text-[#9929EA]">
          Join <span className="font-bold text-[#9929EA]">Sampark</span> and start connecting
        </p>

        {/* Form */}
        <form onSubmitCapture={handleOnCapture} onSubmit={handleOnSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              onChange={handleOnChange}
              name="name"
              value={form.name}
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={handleOnChange}
              name="confirmPassword"
              value={form.confirmPassword}
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

          {/* Register Button */}
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
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-black/20" />
          <span className="text-sm text-black/60">OR</span>
          <div className="flex-1 h-px bg-black/20" />
        </div>

        {/* Login redirect */}
        <p className="text-center text-sm text-black">
          Already have an account?{" "}
          <span onClick={()=>router.push("/auth/login")} className="text-[#edcc10] font-bold cursor-pointer hover:underline text-base">
            Login
          </span>
        </p>

      </GlassCard>
    </div>
  );
}