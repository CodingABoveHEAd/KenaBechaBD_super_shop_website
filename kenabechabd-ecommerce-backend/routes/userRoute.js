import express from "express";
const userRouter = express.Router();

import { authUser } from "../middlewares/authUser.js";
import { isAuth, login, logout, register } from "../controllers/userController.js";

userRouter.post("/register",register);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", authUser, logout);

export default userRouter;
