import dotenv from "dotenv";
import express from "express";
import colors from "colors";
import path from "path";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/error.js";

import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";
import orderRoutes from "./routes/order.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/proshop/products", productRoutes);
app.use("/proshop/users", userRoutes);
app.use("/proshop/orders", orderRoutes);
app.use("/proshop/upload", uploadRoutes);

app.get("/proshop/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
