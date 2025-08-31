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