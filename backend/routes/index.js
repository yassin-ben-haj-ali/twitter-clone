import express from "express"
import authRouter from "./auth.js";
import userRouter from "./user.js";
import postRouter from "./post.js";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/post", postRouter);


export default rootRouter;