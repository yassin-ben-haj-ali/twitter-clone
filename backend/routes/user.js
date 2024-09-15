import express from "express"
import { followUnfollowUser, getSuggestedUsers, getUserProfile, updateProfile } from "../controllers/user.js";
import { authenticate } from "../middlewares/auth.js";
import catchMiddleware from "../middlewares/api.js";

const userRouter = express.Router();

userRouter.get("/profile/:username", catchMiddleware(getUserProfile));
userRouter.post("/follow/:id", authenticate, catchMiddleware(followUnfollowUser));
userRouter.get("/suggested", authenticate, catchMiddleware(getSuggestedUsers));
userRouter.post("/update", authenticate, catchMiddleware(updateProfile));




export default userRouter;