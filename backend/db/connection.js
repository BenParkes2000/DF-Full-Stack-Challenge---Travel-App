import mongoose from "mongoose";

export const connectToDB = async (uri) => {
  await mongoose.connect(uri);
};
