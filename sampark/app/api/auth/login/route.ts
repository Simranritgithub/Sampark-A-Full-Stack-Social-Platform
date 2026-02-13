import { NextResponse } from "next/server";
import { loginUser } from "../../../controllers/authcontroller";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await loginUser(body);

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
      },
      { status: error.statusCode || 500 }
    );
  }
}
