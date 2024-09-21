import express from "express";
import {
    createPost,
    deletePost,
    commentOnPost,
    getAllPosts,
    getFollowingPosts,
    getLikedPosts,
    getUserPosts,
    likeUnlikePost,
} from "../controllers/post.js";
import { authenticate } from "../middlewares/auth.js";
import catchMiddleware from "../middlewares/api.js";

const postRouter = express.Router();

postRouter.get("/all", authenticate, catchMiddleware(getAllPosts));
postRouter.get("/following", authenticate, catchMiddleware(getFollowingPosts));
postRouter.get("/likes/:id", authenticate, catchMiddleware(getLikedPosts));
postRouter.get("/user/:username", authenticate, catchMiddleware(getUserPosts));
postRouter.post("/create", authenticate, catchMiddleware(createPost));
postRouter.post("/like/:id", authenticate, catchMiddleware(likeUnlikePost));
postRouter.post("/comment/:id", authenticate, catchMiddleware(commentOnPost));
postRouter.delete("/:id", authenticate, catchMiddleware(deletePost));

export default postRouter;