import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("Mongo URI:", process.env.MONGODB_URI);
  if (mongoose.connection.readyState >= 1) {
    console.log("MongoDB already connected");
    

    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // optional: stop server if DB fails
  }
};
