import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { token } = requestBody;

    const user = await User.findOneAndUpdate(
      { verifiedToken: token },
      { isVerified: true, verifiedToken: null, verifiedTokenExpiry: null }
    );

    if (!user) {
      return NextResponse.json({
        message: "User not Found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Email Verified",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
