import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
      dbName: "AltShop-DB",
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

// notes

/* 
1. `useNewUrlParser`: This option is used to parse the MongoDB connection string using the new MongoDB Node.js driver's URL parser. This is important because the old parser is now deprecated and will be removed in a future release of Node.js. So, setting this option to true ensures that you're using the latest URL parser.

2. `useCreateIndex`: This option is used to enable the createIndex() function in Mongoose. This is important because the MongoDB driver's ensureIndex() function, which was previously used by Mongoose to create indexes, is now deprecated and will be removed in a future release of MongoDB. So, setting this option to true ensures that you're using the latest method to create indexes.

3. `useUnifiedTopology`: This option is used to enable the new Server Discovery and Monitoring engine in the MongoDB Node.js driver. This is important because the old engine is now deprecated and will be removed in a future release of MongoDB. The new engine provides better support for replica sets and sharded clusters, and includes automatic server monitoring and selection. So, setting this option to true ensures that you're using the latest server discovery and monitoring engine.

*/
