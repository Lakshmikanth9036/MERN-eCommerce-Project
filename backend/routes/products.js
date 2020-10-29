import express from "express";
import asyncHandler from "express-async-handler";

import Product from "../models/product.js";

const router = express.Router();

/**
 * @desc Fetch all products
 * @route GET /proshop/products
 * @access Public
 */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const products = await Product.find();
    res.json(products);
  })
);

/**
 * @desc Fetch single product
 * @route GET /proshop/products/:id
 * @access Public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const prodId = req.params.id;
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default router;
