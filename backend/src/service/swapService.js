import swapModel from "../model/swapModel.js";
import userModel from "../model/userModel.js";

export const createSwapService = async(fromUserId, data) => {
    try{
        const {toUser, skillOffered, skillRequested} = data; 

        const fromUser = await userModel.findById(fromUserId);
        const toUserExists = await userModel.findById(toUser); 

        if(!fromUser || !toUserExists){
            return {error: 'invalid users'}
        }
        const swap = new swapModel({
            fromUser: fromUserId, 
            toUser,
            skillOffered,
            skillRequested,
            status:'pending'
        }); 
        const savedSwap = await swap.save();
        return savedSwap; 
    }
    catch(error){
        console.log('error creating swap request',error); 
    }
}; 

export const respondSwapService = async(swapId, status) => {
    try{
        const swap = await swapModel.findById(swapId); 

        if(!swap){
            return {error: 'swap request not found!'}
        }
        swap.status = status;
        const updatedSwap = await swap.save(); 
        return updatedSwap; 
    }
    catch(error){
        console.log('error updating the status', error)
    }
}; 

export const getSWapService = async(userId) => {

    try{
        const swaps = await swapModel.find({
        $or: [{ fromUser: userId }, { toUser: userId }]
      })
      .populate("fromUser", "name email")
      .populate("toUser", "name email");

      return swaps; 

    }
    catch(error){
        console.log('error retriving swaps', error);
    }
};