import userModel from "../model/userModel.js";

export const matchingService = async(userId) => {

    try{
        const currentUser = await userModel.findById(userId); 
    if(!currentUser){
        return {error: 'incorrect user matching!'}
    }

    const matches = await userModel.find({
      _id: { $ne: userId },
      skillOffered: { $in: currentUser.skillWanted }, 
      skillWanted: { $in: currentUser.skillOffered } 
    }).select("name email skillOffered skillWanted");

    return matches; 
    }
    catch(error){
        return {error: 'could not find the matches'};
    }
}