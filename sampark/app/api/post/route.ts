import { NextRequest, NextResponse } from "next/server";
import { authenticateMiddleware } from "../../Middleware/autheticatemiddleware";
import { createPost ,getFeedPosts} from "../../controllers/postcontroller";


/* ✅ OPTIONS HANDLER (CORS / PREFLIGHT) */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}


/* ✅ POST HANDLER */
export async function POST(request: NextRequest) {
  try {
    const auth = authenticateMiddleware(request);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const body = await request.json();

    const result = await createPost({
      ...body,
      author: auth.id,
    });
    console.log("AUTH:", auth);
console.log("BODY:", body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, post: result.post },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/post error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  const result = await getFeedPosts();

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, posts: result.posts },
    { status: 200 }
  );
}