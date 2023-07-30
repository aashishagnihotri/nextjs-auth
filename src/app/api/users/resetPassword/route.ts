import { NextRequest, NextResponse } from "next/server";
import users from "@/models/userModel";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from "@/helpers/getDataFromToken";
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { resetToken, password } = requestBody;

    const findUser = await users.findOne({
      forgotPasswordToken: resetToken,
    });

    if (findUser) {
      //   const checkToken = await jwt.verify(
      //     resetToken,
      //     process.env.TOKEN_SECRET!
      //   );
      //   if (checkToken) {
      const salt = await bcryptjs.genSalt(10);

      const hashPassword = await bcryptjs.hash(password, salt);

      await users.findOneAndUpdate(
        { forgotPasswordToken: resetToken },
        {
          password: hashPassword,
          forgotPasswordToken: null,
          forgotPasswordTokenExpiry: null,
        }
      );
      return NextResponse.json({
        message: "Password Successfully Changed",
        success: true,
        status: 200,
      });
      //   } else {
      //     return NextResponse.json({
      //       message: "Timeout Occured. Please try again later!",
      //       status: 500,
      //       success: false,
      //     });
      //   }
    } else {
      return NextResponse.json({
        message: "User Not Found!",
        status: 500,
        success: false,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    });
  }
}
