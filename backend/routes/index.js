import express from "express"
import authRouter from "./auth.js";
import userRouter from "./user.js";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);


export default rootRouter;