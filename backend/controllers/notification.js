import notifciationServices from "../services/notification.js";

export const getNotifications = async (req, res) => {
    const { _id: userId } = req.user;
    const notifciations = await notifciationServices.getNotifications(userId);
    res.json(notifciations)
}

export const deleteNotifications = async (userId) => {

    const { _id: userId } = req.user;
    const notifciations = await notifciationServices.deleteNotifications(userId);
    res.json(notifciations)

}

