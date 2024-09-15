import express from "express"
import authRouter from "./auth.js";
import userRouter from "./user.js";
import postRouter from "./post.js";
import notificationRouter from "./notification.js";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/post", postRouter);
rootRouter.use("/notification", notificationRouter);



export default rootRouter;