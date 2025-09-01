import notificationModel from "../model/notificationModel.js";

export const notificationController = async(req, res) => {

    try{
        const userId = req.user._id; 
        const notifications = await notificationModel.find({user: userId}).sort({createdAt: -1});
        res.status(200).json(notifications);  
    }
    catch(error){
        console.log(error); 
        res.status(400).json({messgae: 'error fetching notifications'}); 
    }
};

export const unreadNotificationController = async(req, res) => {
    try{
        const userId = req.user._id; 
        const unreadCount = await notificationModel.countDocuments({user: userId, read: false});
        res.status(200).json({count: unreadCount});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message: 'unable to fetch count'}); 
    }
}; 

export const markAsReadController = async(req, res) => {
    try{
        const userId = req.user._id; 
        await notificationModel.updateMany({user: userId, read: false}, {read: true});
        res.status(200).json({message: 'updated the status of notifs'}); 
    }
    catch(error){
        console.log(error);
        res.status(400).json({message: 'unable to update notif status'}); 
    }
}; 