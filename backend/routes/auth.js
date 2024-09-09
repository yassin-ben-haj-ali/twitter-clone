import express from "express"
import { getMe, login, logout, signup } from "../controllers/auth.js";
import { authenticate } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.get("/logout", logout)
authRouter.get("/me", authenticate, getMe)


export default authRouter;