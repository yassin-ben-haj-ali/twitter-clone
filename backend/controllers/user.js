import userServices from "../services/user.js"

export const getUserProfile = async (req, res, next) => {
    try {

        const { username } = req.params;

        const user = await userServices.getUserProfile(username)

        res.json(user);

    } catch (err) {

        next(err)
    }

}

export const followUnfollowUser = async (req, res, next) => {

    const { id: userId } = req.params;
    const { _id: currentUserId } = req.user
    try {
        const user = await userServices.followUnfollowUser({ currentUserId, userId });
        res.json(user);
    } catch (err) {
        next(err)
    }

}

export const getSuggestedUsers = async (req, res, next) => {

    const { _id: currentUserId } = req.user;

    try {
        const users = await userServices.getSuggestedUsers(currentUserId);
        res.json(users);
    } catch (err) {
        next(err)
    }

}

export const updateProfile = async (req, res, next) => {
    const { body: updatedData } = req;
    const { _id: userId } = req.user;
    try {
        const user = await userServices.updateProfile(updatedData, userId);
        res.json(user)
    } catch (err) {
        console.log(err)
        next(err);
    }
}