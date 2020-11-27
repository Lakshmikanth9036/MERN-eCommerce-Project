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

/**
 * @desc Delete a product
 * @route DELETE /proshop/products/:id
 * @access Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const prodId = req.params.id;
  const product = await Product.findById(prodId);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/*
 * @desc Create a product
 * @route POST /proshop/products
 * @access Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Product",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Top selling product.",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/*
 * @desc Update a product
 * @route PUT /proshop/products/:id
 * @access Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
