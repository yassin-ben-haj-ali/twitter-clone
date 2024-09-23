import bcrypt from "bcryptjs"

import Notification from "../models/notification.js";
import User from "../models/user.js"

import { BadRequestError, NotFoundError } from "../utils/appErrors.js";
import uploadFile from "../utils/uploadFile.js";

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

//TODO: optimize this function
const getSuggestedUsers = async (userId) => {

    const usersFollowedByMe = await User.findById(userId).select("followings")

    const users = await User.aggregate([
        {
            $match: {
                _id: { $ne: userId }
            }
        },
        { $sample: { size: 10 } }
    ])
    
    const filteredUsers = users.filter(user => !usersFollowedByMe.followings?.includes(user._id))
    const suggestedUsers = filteredUsers.slice(0, 4)

    suggestedUsers.forEach(user => user.password = null)

    return suggestedUsers;

}

const updateProfile = async (updatedData, userId) => {

    const { fullName, email, username, currentPassword, newPassword, bio, link } = updatedData;
    let { profileImg, coverImg } = updatedData

    let user = await User.findById(userId);

    if (!user) throw new NotFoundError("User not found")

    if ((!currentPassword && newPassword) || (!newPassword && currentPassword)) throw new BadRequestError("Please provide both current password and new password")

    if (currentPassword && newPassword) {
        const isMatched = await bcrypt.compare(currentPassword, user.password);
        if (!isMatched) throw new BadRequestError("Current password is incorrect")
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
        profileImg = await uploadFile(profileImg, user.profileImg);
    }

    if (coverImg) {
        coverImg = await uploadFile(coverImg, user.coverImg);
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    await user.save();
    //password should be null in the response
    user.password = null

    return user;

}

const userServices = { getUserProfile, followUnfollowUser, getSuggestedUsers, updateProfile };

export default userServices