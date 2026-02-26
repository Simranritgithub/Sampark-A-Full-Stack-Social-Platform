import { NextRequest, NextResponse } from "next/server";
import { authenticateMiddleware } from "../../../../Middleware/autheticatemiddleware";
import { addCommentToPost } from "../../../../controllers/postcontroller";
// import "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const auth = authenticateMiddleware(request);
  if (auth instanceof NextResponse) return auth;

  const { text } = await request.json();

  const result = await addCommentToPost(
    params.postId,
    auth.id,
    text
  );

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: 400 }
    );
  }

  return NextResponse.json(result, { status: 200 });
}