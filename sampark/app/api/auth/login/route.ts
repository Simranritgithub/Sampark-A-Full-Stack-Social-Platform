import { NextResponse } from "next/server";
import { loginUser } from "../../../controllers/authcontroller";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await loginUser(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.status }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        user: result.user,
      },
      { status: 200 }
    );

    // ✅ HTTP-only cookie
    if (!result.token) {
  return NextResponse.json(
    { success: false, message: "Token generation failed" },
    { status: 500 }
  );
}

response.cookies.set(
  "token",
  result.token,
  {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  }
);


    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
