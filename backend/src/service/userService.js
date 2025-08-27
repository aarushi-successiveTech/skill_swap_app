import userModel from "../model/userModel.js";

export const updateUserService = async(userId, data) =>{

    try{
        const updatedUser = await userModel.findByIdAndUpdate(userId, data, {new: true});
        return updatedUser; 
    } 

    catch(error){
        return {error: 'updation unsucessful'}
    }
}; 


export const deleteUserService = async(userId) => {
    try{
        const deletedUser = await userModel.findByIdAndDelete(userId); 
        return deletedUser; 
    }
    catch(error){
        return {error: 'deletion unsuccessful'}
    }
}; 

export const getUserService = async(userId) => {
    try{
        const fetchedUser = await userModel.findById(userId); 
        return fetchedUser; 
    }
    catch(error){
        return {error: 'fetching unsuccessful'}
    }
};