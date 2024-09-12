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