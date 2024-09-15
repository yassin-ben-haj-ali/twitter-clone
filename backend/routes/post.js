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

router.get("/all", authenticate, catchMiddleware(getAllPosts));
router.get("/following", authenticate, catchMiddleware(getFollowingPosts));
router.get("/likes/:id", authenticate, catchMiddleware(getLikedPosts));
router.get("/user/:username", authenticate, catchMiddleware(getUserPosts));
router.post("/create", authenticate, catchMiddleware(createPost));
router.post("/like/:id", authenticate, catchMiddleware(likeUnlikePost));
router.post("/comment/:id", authenticate, catchMiddleware(commentOnPost));
router.delete("/:id", authenticate, catchMiddleware(deletePost));

export default postRouter;