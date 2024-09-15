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

const postRouter = express.Router();

router.get("/all", authenticate, getAllPosts);
router.get("/following", authenticate, getFollowingPosts);
router.get("/likes/:id", authenticate, getLikedPosts);
router.get("/user/:username", authenticate, getUserPosts);
router.post("/create", authenticate, createPost);
router.post("/like/:id", authenticate, likeUnlikePost);
router.post("/comment/:id", authenticate, commentOnPost);
router.delete("/:id", authenticate, deletePost);

export default postRouter;