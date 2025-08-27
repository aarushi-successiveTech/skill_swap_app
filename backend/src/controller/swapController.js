import { createSwapService, respondSwapService, getSWapService } from "../service/swapService.js";

export const creatwSwapController = async(req, res) => {
    try{
        const fromUserId = req.user._id; 
        const {toUser, skillOffered, skillRequested} = req.body; 
        
        const swap = await createSwapService(fromUserId, {toUser, skillOffered, skillRequested});
        return res.status(201).json({
            message: 'swap request created', 
            swap
        }); 
    }
    catch(error){
        return res.status(400).json({
            message: 'swap request unsuccessful',
            error
        });
    }
};

export const respondSwapController = async(req, res) => {

    try{
        const {swapId, status} = req.body; 

        const swap = await respondSwapService(swapId, status); 
        return res.status(200).json({
            message: 'swap status updated successfully', 
            swap
        }); 
    }
    catch(error){
        return res.status(400).json({
            message: 'error updating status', 
            error
        }); 
    }
}; 

export const getSwapController = async(req, res) => {

    try{
        const userId = req.user._id; 
        const swaps = await getSWapService(userId); 
        return res.status(200).json({
            message: "fetched all swaps successfully", 
            swaps
        }); 

    }
    catch(error){

        return res.status(400).json({
            message: 'error fetching swaps',
            error
        });
    }
}; 