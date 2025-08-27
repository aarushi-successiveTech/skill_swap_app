import { updateUserService, deleteUserService, getUserService } from "../service/userService.js";

export const updateUserController = async(req, res) => {
    try{
    const userId = req.user._id;
    const updatedUser = await updateUserService(userId, req.body); 
    if(!updatedUser){
        return res.status(400).json({
            message: 'user not found'
        }); 
    }

    return res.status(200).json({message: 'user updated successfully', user: updatedUser}); 
    }
    catch(error){
        return res.status(400).json({
            message: 'updation failed', 
            error
        }); 
    }
}; 

export const deleteUserController = async(req, res) => {
    try{
        const userId = req.user._id; 
        const deleteUser = await deleteUserService(userId); 
        if(!deleteUser){
            return res.status(400).json({
                message: 'user not found'
            }); 
        }
        return res.status(200).json({message: 'user deleted successfully', deleteUser}); 
    }
    catch(error){
        return res.status(400).json({messgae: 'deletion failed', error}); 
    }
}; 

export const getUserController = async(req, res) => {
    try{
        const userId = req.user._id; 
        const fetchedUser = await getUserService(userId); 
        if(!fetchedUser){
            return res.status(400).json({
                message: 'user not found'
            }); 
        }
        return res.status(200).json({
            message: 'user fetched successfully', fetchedUser
        }); 
    }
    catch(error){
        return res.status(400).json({message: 'fetched failed', error}); 
    }
}