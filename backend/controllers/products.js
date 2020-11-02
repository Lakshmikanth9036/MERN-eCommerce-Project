import asyncHandler from "express-async-handler";

import Product from "../models/product.js";

/**
 * @desc Fetch all products
 * @route GET /proshop/products
 * @access Public
 */
const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.json(products);
});

/**
 * @desc Fetch single product
 * @route GET /proshop/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req, res, next) => {
  const prodId = req.params.id;
  const product = await Product.findById(prodId);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById };
