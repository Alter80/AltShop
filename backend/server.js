import express from "express";
import dotenv from "dotenv";
import products from "./data/products.js";
import connectDB from "./config/db.js";
import colors from "colors";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    (singleProduct) => singleProduct._id === req.params.id
  );
  res.json(product);
});

const port = process.env.PORT || 5001;
app.listen(
  port,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${port}`
      .bgBrightGreen.bold
  )
);
