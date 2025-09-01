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

export const getUsers = async(page=1 ,limit = 10) => {
    try{
        const skip = (page-1) * limit; 
        const totalUsers = await userModel.countDocuments(); 
        const fetchUsers = await userModel.find()
        .skip(skip)
        .limit(limit); 

        return {
            users: fetchUsers, 
            total : totalUsers, 
            page: parseInt(page), 
            pages: Math.ceil(totalUsers/ limit)
        }; 
    }
    catch(error){
        return {error: 'fetching unsuccessful'}
    }
}; 