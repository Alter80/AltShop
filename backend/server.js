import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running....");
});

// product route
app.use("/api/products", productRoutes);

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
