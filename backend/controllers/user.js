import userServices from "../services/user.js"

export const getUserProfile = async (req, res, next) => {

    const { username } = req.params;

    const user = await userServices.getUserProfile(username)

    res.json(user);
}

export const followUnfollowUser = async (req, res, next) => {

    const { id: userId } = req.params;
    const { _id: currentUserId } = req.user
    const user = await userServices.followUnfollowUser({ currentUserId, userId });
    res.json(user);
}

export const getSuggestedUsers = async (req, res, next) => {

    const { _id: currentUserId } = req.user;
    const users = await userServices.getSuggestedUsers(currentUserId);
    res.json(users);
}

export const updateProfile = async (req, res, next) => {
    const { body: updatedData } = req;
    const { _id: userId } = req.user;
    const user = await userServices.updateProfile(updatedData, userId);
    res.json(user)
}