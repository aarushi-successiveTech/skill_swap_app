import userModel from "../model/userModel.js";
import swapModel from "../model/swapModel.js";

export const matchingService = async(userId) => {

    try{
        const currentUser = await userModel.findById(userId); 
    if(!currentUser){
        return {error: 'incorrect user matching!'}
    }

    const closedSwaps = await swapModel.find({
        $or: [
            {fromUser: userId, status: {$in: ['accepted', 'rejected']}}, 
            {toUser: userId, status: {$in: ['accepted', 'rejected']}}
        ]
    }); 

    const connections = closedSwaps.map(swap => {
        return swap.fromUser.toString() === userId.toString() ? swap.toUser : swap.fromUser; 
    }); 

    connections.push(userId); 

    const matches = await userModel.find({
      _id: { $nin: connections },
      skillOffered: { $in: currentUser.skillWanted }, 
      skillWanted: { $in: currentUser.skillOffered } 
    }).select("name email skillOffered skillWanted");

    return matches; 
    }
    catch(error){
        return {error: 'could not find the matches'};
    }
}