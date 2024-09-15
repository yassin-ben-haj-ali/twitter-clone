import postServices from "../services/post.js";

export const createPost = async (req, res, next) => {
    const { body: postData } = req;
    const { _id: userId } = req.user;
    const post = await postServices.createPost(postData, userId);
    res.json(post);
};

export const deletePost = async (req, res, next) => {
    const { id: postId } = req.params;
    const { _id: userId } = req.user;
    const post = await postServices.deletePost(postId, userId)
    res.json(post)
};

export const commentOnPost = async (req, res, next) => {

    const { body: commentData } = req;
    const { id: postId } = req.params;
    const { _id: userId } = req.user;
    const post = await postServices.commentOnPost(commentData, postId, userId);
    res.json(post);
};

export const likeUnlikePost = async (req, res, next) => {

    const { _id: userId } = req.user;
    const { id: postId } = req.params;
    const post = await postServices.likeUnlikePost(userId, postId);
    res.json(post)
};

export const getAllPosts = async (req, res, next) => {
    const posts = await postServices.getAllPosts();
    res.json(posts)
};

export const getLikedPosts = async (req, res, next) => {

    const { _id: userId } = req.params;
    const posts = await postServices.getLikedPosts(userId);
    res.json(posts);
};

export const getFollowingPosts = async (req, res, next) => {

    const { _id: userId } = req.user;
    const posts = await postServices.getFollowingPosts(userId);
    res.json(posts);
};

export const getUserPosts = async (req, res, next) => {

    const { username } = req.params;
    const posts = await postServices.getUserPosts(username);
    res.json(posts)
};
