import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { AuthJwtPayload } from "../types/auth";

export function authenticateMiddleware(
  req: NextRequest
): AuthJwtPayload | NextResponse {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthJwtPayload;

    return decoded; // ✅ now TS knows id exists
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}