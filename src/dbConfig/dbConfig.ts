import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("DB Connection Successful!");
    });

    connection.on("error", () => {
      console.log(
        "MongoDB connection Error. Please check Database for more details!"
      );
      process.exit();
    });
  } catch (error) {
    console.error("Something Went Wrong!");
    console.log(error);
  }
}
