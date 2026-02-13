import { User } from "../models/user";
import { connectDB } from "../lib/db";
import bcrypt from "bcryptjs";

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
export const loginUser = async (body: {
  email: string;
  password: string;
}) => {
  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user) {
    const err: any = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    const err: any = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  // ❗ password remove
  const { password: _, ...safeUser } = user.toObject();

  return safeUser;
};