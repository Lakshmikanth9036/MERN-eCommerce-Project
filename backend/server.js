import dotenv from "dotenv"
import express from 'express';
import products from "./data/products.js";

dotenv.config();

const app = express();

app.get("/proshop/products", (req, res, next) => {
  res.json(products);
});

app.get("/proshop/product/:id", (req, res, next) => {
  const prodId = req.params.id;
  const product = products.find((p) => p._id === prodId);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
