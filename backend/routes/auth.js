import express from "express"
import { getMe, login, logout, signup } from "../controllers/auth.js";
import { authenticate } from "../middlewares/auth.js";
import catchMiddleware from "../middlewares/api.js";
import validate from "../middlewares/validate.js";

const authRouter = express.Router();

authRouter.post("/signup", validate("signup"), catchMiddleware(signup))
authRouter.post("/login", validate("login"), catchMiddleware(login))
authRouter.post("/logout", catchMiddleware(logout))
authRouter.get("/me", authenticate, catchMiddleware(getMe))


export default authRouter;