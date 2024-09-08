import express from "express"
import authRouter from "./auth.js";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);

export default rootRouter;