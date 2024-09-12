import express from "express"
import { authenticate } from "../middlewares/auth.js";
import { followUnfollowUser, getUserProfile } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/profile/:username",getUserProfile);
userRouter.post("/follow/:id",authenticate,followUnfollowUser);


export default userRouter;