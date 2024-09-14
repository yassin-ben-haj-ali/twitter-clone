import Notification from "../models/notification.js";
import User from "../models/user.js"
import { BadRequestError, NotFoundError } from "../utils/appErrors.js";

const getUserProfile = async (username) => {

    const user = await User.findOne({ username }).select("-password");

    if (!user) throw new NotFoundError("user not found");

    return user;
}

const followUnfollowUser = async ({ currentUserId, userId }) => {

    const userToModify = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToModify || !currentUser) throw new NotFoundError("User not found")

    if (userToModify._id === currentUserId.toString()) throw new BadRequestError("You can't follow/unfollow yourself")

    const isFollowing = currentUser.followings.includes(userId)

    let message;

    if (isFollowing) {
        //unfollow user
        await User.findByIdAndUpdate(userId, { $pull: { followers: currentUserId } });
        await User.findByIdAndUpdate(currentUserId, { $pull: { followings: userId } });
        message = "User unfollowed successfully"
    } else {
        //follow user
        await User.findByIdAndUpdate(userId, { $push: { followers: currentUserId } });
        await User.findByIdAndUpdate(currentUserId, { $push: { followings: userId } });
        //send notifciation to the user
        const newNotification = new Notification({
            type: "follow",
            from: currentUserId,
            to: userToModify._id
        })

        await newNotification.save();

        message = "User followed successfully"
    }

    return { message }

}

const userServices = { getUserProfile, followUnfollowUser };

export default userServices