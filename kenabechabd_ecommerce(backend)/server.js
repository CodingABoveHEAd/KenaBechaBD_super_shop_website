import express, { json } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectdb from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";

config();

const app = express();

await connectdb();
await connectCloudinary();

const allowedOrigins = ["http://localhost:9000"];

//middleware configuration
app.use(json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => {
  res.send("Hello from KenaBechaBD E-commerce Backend");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
