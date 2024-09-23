import Notification from "../models/notification.js";
import Post from "../models/post.js";
import User from "../models/user.js";
import {v2 as cloudinary } from "cloudinary"
import { AuthorizationError, BadRequestError, NotFoundError } from "../utils/appErrors.js";
import uploadFile from "../utils/uploadFile.js";

const createPost = async (postData, userId) => {
    const { text } = postData;
    let { img } = postData;

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User not found")

    if (!text && !img) {
        throw new BadRequestError("Post must have text or image")
    }

    if (img) {
        img = await uploadFile(img);
    }

    const newPost = new Post({
        user: userId,
        text,
        img,
    });

    await newPost.save();
    return newPost;

};

const deletePost = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new NotFoundError("Post not found");
    }

    if (post.user.toString() !== userId.toString()) {
        throw new AuthorizationError("You are not authorized to delete this post")
    }

    if (post.img) {
        const imgId = post.img.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(postId);

    return { message: "Post deleted successfully" };

};

const commentOnPost = async (commentData, postId, userId) => {
    const { text } = commentData;

    if (!text) {
        throw new BadRequestError("Text field is required");
    }
    const post = await Post.findById(postId)

    if (!post) {
        throw new NotFoundError("Post not found");
    }

    const comment = { user: userId, text };

    post.comments.push(comment);
    await post.save()
    const populatedPost=await Post.populate(post, { path: "comments.user", select: "-password" })
    return populatedPost.comments;

};

const likeUnlikePost = async (userId, postId) => {

    const post = await Post.findById(postId);

    if (!post) {
        throw new NotFoundError("Post not found");
    }

    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
        // Unlike post
        await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
        await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

        const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
        return updatedLikes;
    } else {
        // Like post
        post.likes.push(userId);
        await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
        await post.save();

        const notification = new Notification({
            from: userId,
            to: post.user,
            type: "like",
        });
        await notification.save();

        const updatedLikes = post.likes;
        return updatedLikes;
    }
};

const getAllPosts = async () => {
    const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });

    if (posts.length === 0) {
        return [];
    }

    return posts;

};

const getLikedPosts = async (userId) => {

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });

    return likedPosts;
};

const getFollowingPosts = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    const followings = user.followings;

    const feedPosts = await Post.find({ user: { $in: followings } })
        .sort({ createdAt: -1 })
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });

    return feedPosts;
};

const getUserPosts = async (username) => {

    const user = await User.findOne({ username });
    if (!user) throw new NotFoundError("User not found");

    const posts = await Post.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });

    return posts;
};

const postServices = { createPost, deletePost, commentOnPost, likeUnlikePost, getAllPosts, getLikedPosts, getFollowingPosts, getUserPosts }

export default postServices;