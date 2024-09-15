import Notification from "../models/notification.js";

const getNotifications = async (userId) => {

    const notifications = await Notification.find({ to: userId }).populate({
        path: "from",
        select: "username profileImg",
    });

    await Notification.updateMany({ to: userId }, { read: true });

    return notifications
};

const deleteNotifications = async (userId) => {

    await Notification.deleteMany({ to: userId });

    return { message: "Notifications deleted successfully" }

};

const notifciationServices = { getNotifications, deleteNotifications };

export default notifciationServices