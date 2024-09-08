import express from "express"
import { login, logout, signup } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/signup",signup)
authRouter.get("/login",login)
authRouter.get("/logout",logout)


export default authRouter;