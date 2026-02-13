import { NextResponse } from "next/server";
import { registerUser } from "../../../controllers/authcontroller";
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const user = await registerUser(body);

    return NextResponse.json({ user,success:true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
};
