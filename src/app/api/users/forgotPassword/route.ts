import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import users from "@/models/userModel";
import { sendMail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await users.findOne({ email: email });
    if (user) {
      await sendMail({
        email: email,
        emailType: "RESET",
        userId: user?._id,
      });
    } else {
      return NextResponse.json({
        message: "User does not Exist",
        status: 404,
        success: false,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      success: false,
      error: error.message,
    });
  }
}
