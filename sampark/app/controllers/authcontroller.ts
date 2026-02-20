import { User } from "../models/user";
import { connectDB } from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (body: any) => {
  const { name, email, password } = body;

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};


interface LoginInput {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginInput) => {
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: "Invalid credentials", status: 401 };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, message: "Invalid credentials", status: 401 };
  }

  // JWT payload
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // Remove password
  const { password: _, ...safeUser } = user.toObject();

  return {
    success: true,
    token,
    user: safeUser,
  };
};
