import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      //   socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      //   family: 4, // Use IPv4, skip trying IPv6
    });

    console.info(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`ERROR: ${error.message}`.red.underline);
    process.exit(1);
  }
};

export default connectDB;
