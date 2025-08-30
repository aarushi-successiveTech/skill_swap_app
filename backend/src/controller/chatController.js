import { sendChatService } from "../service/chatService.js";
import swapModel from "../model/swapModel.js";
import chatModel from "../model/chatModel.js";

export const sendChatController = async(req, res) => {

    try{
        const fromUserId = req.user._id;
        const {toUser, message} = req.body ; 

        const result = await sendChatService(fromUserId, {toUser, message}); 
        if(result?.error) return res.status(403).json({error: result.error}); 

        res.status(201).json(result); 
    }
    catch(error){
        console.log(error); 
    }; 
}; 

export const getChatHistory = async(req, res) => {
    try{
        const userId = req.user._id; 
        const otherUserId = req.params.otherUserId; 

        const messages = await chatModel.find({
            $or: [
                {fromUser: userId, toUser: otherUserId}, 
                {fromUser: otherUserId, toUser: userId}
            ],
        }).sort({createdAt: 1});

        res.json(messages); 
    }
    catch(error){
        console.log(error); 
    }
}; 