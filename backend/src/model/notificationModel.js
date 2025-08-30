import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}, 
    message: {type: String, required: true}, 
    type: {type: String, enum: ['swap', 'chat'], default: 'swap'}, 
    createdAt: {type: Date, default: Date.now()}, 
    read: {type: Boolean, default: false}
});

const notificationModel = mongoose.model('notification', notificationSchema, 'notifications'); 
export default notificationModel; 