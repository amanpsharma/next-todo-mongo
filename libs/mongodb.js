import mongoose from "mongoose";
const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
};
export default connectMongodb;
