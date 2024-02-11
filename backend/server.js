import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running....");
});

// product route
app.use("/api/products", productRoutes);
// user route
app.use("/api/users", userRoutes);
// order route
app.use("/api/orders", orderRoutes);
// upload route
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// making folder static
const __dirname = path.resolve();
app.use("/uploads/", express.static(path.join(__dirname, "/uploads/")));

// fallback for 404 (NOT FOUND)
app.use(notFound);

// error handeler middleware
app.use(errorHandler);

const port = process.env.PORT || 5001;
app.listen(
  port,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${port}`
      .bgBrightGreen.bold
  )
);
