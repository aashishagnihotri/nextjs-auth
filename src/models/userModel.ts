import mongoose from "mongoose";
const schema = mongoose.Schema;
const userSchema = new schema({
  username: {
    type: String,
    required: [true, "Please provide an Username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide an Password"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: { type: String },
  forgotPasswordTokenExpiry: { type: Date },
  verifiedToken: { type: String },
  verifiedTokenExpiry: { type: Date },
});
console.log("models at user: ", mongoose.models);
const userModel = mongoose.models.users ?? mongoose.model("users", userSchema);

export default userModel;
