import mongoose from "mongoose";

const swapSchema = new mongoose.Schema({
    fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}, 
    toUser: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    skillOffered: {type: String, required: true},
    skillRequested: {type: String, required: true}, 
    status: {
        type: String, 
        enum: ['pending', 'accepted', 'rejected'], 
        default: 'pending'
    }
}); 

const swapModel = mongoose.model('swap', swapSchema, 'swaps');
export default swapModel; 