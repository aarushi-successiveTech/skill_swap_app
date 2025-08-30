import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    fromUser: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true}, 
    toUser: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true}, 
    message: {type: String, required: true}, 
    createdAt: {type: Date, default: Date.now}, 
    read: {type: Boolean, default: false}
}); 

const chatModel = mongoose.model("chat", chatSchema, "chats");
export default chatModel; 