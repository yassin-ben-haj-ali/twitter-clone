import express from "express"
import { authenticate } from "../middlewares/auth.js";
import { followUnfollowUser, getSuggestedUsers, getUserProfile, updateProfile } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/profile/:username",getUserProfile);
userRouter.post("/follow/:id",authenticate,followUnfollowUser);
userRouter.get("/suggested",authenticate,getSuggestedUsers);
userRouter.post("/update",authenticate,updateProfile);




export default userRouter;