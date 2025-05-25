import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", upload.array(['images']), authSeller, addProduct);
//auth used because only authenticated usres can add product
//upload.array() is a multer function

productRouter.get("/list", productList);
productRouter.get("/id", productById);
productRouter.post("/stock", authSeller, changeStock);
//auth used because only authenticated usres can update product

export default productRouter;