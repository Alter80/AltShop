const express = require("express");
const products = require("./data/products");

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

const port = 5001;
app.listen(port, console.log(`Server Running on port ${port}`));
