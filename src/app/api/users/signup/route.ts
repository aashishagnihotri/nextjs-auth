import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;
    // check  if the user already exists

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "User Already Exists",
      });
    }
    // hash Password Now

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username: username,
      password: hashPassword,
      email: email,
    });

    const savedUser = await newUser.save();

    await sendMail({
      email: email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });
    return NextResponse.json({
      message: "User Successfully Created!",
      success: true,
      savedUser,
    });

    //send verification email
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      status: 500,
    });
  }
}
