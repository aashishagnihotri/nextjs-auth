import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import users from "@/models/userModel";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashed token
    const hashToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      const findUser = await users.findById(userId);

      const update = await users.findByIdAndUpdate(userId, {
        verifiedToken: hashToken,
        verifiedTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      const updateToken = await users.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: `${process.env.MAILER_HOST}`,
      port: process.env.MAILER_PORT,
      auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: "aashish@gmail.com",
      to: email,
      subject: emailType === "RESET" ? "Reset Password" : "Verify your Email",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "RESET" ? "resetPassword" : "verifyEmail"
      }?token=${hashToken}">here</a> to ${
        emailType === "RESET"
          ? "Reset your Account Password"
          : "Verify your Account"
      }</p>
      <br/>
      <p>Or click the link to verify ${process.env.DOMAIN}/${
        emailType === "RESET" ? "resetPassword" : "verifyEmail"
      }?token=${hashToken}</p>`,
    };

    const response = await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
