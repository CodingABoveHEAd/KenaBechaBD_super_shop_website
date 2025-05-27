import express, { json } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectdb from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";

config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await connectdb();
await connectCloudinary();

const allowedOrigins = [
  "https://kenabechabd-supershop-website-htcr.onrender.com",
  "http://localhost:5173",
];

app.use(json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API routes
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

// Static frontend build path (adjusted to your structure)
const frontendPath = path.join(
  __dirname,
  "..",
  "kenabechabd-ecommerce-frontend",
  "client",
  "dist"
);
app.use(express.static(frontendPath));

// Catch-all: let React handle unknown routes (for deep linking)
app.get("/:splat(*)", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
