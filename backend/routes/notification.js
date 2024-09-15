import express from "express";
import { deleteNotifications, getNotifications } from "../controllers/notification.js";

import { authenticate } from "../middlewares/auth.js";
import catchMiddleware from "../middlewares/api.js";

const notificationRouter = express.Router();

router.get("/", authenticate, catchMiddleware(getNotifications));
router.delete("/", authenticate, catchMiddleware(deleteNotifications));

export default notificationRouter;