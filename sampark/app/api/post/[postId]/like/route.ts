import { NextRequest, NextResponse } from "next/server";
import { authenticateMiddleware } from "../../../../Middleware/autheticatemiddleware";
import { toggleLikePost } from "../../../../controllers/postcontroller";
// import "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const auth = authenticateMiddleware(request);
  if (auth instanceof NextResponse) 
    return auth;

  const result = await toggleLikePost(params.postId, auth.id);

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: 400 }
    );
  }

  return NextResponse.json(result, { status: 200 });
}